<script>
  import Clock from "./lib/Clock.svelte";
  import Button from "./lib/Button.svelte";
  import { title } from "./store/store";
  import { onDestroy } from "svelte";
  import Modal from "./lib/Modal.svelte";

  let time = 0;
  let isRunning = false;
  let interval;
  let isPaused = false;
  let initialTime = null;
  let level = 0.28;
  let isModalOpen = false;

  requestNotificationPermission();

  function startPause() {
    isRunning = !isRunning;
    isPaused = !isRunning;
    if (isRunning) {
      if ($title === "Focus") {
        startStopwatch();
      } else if ($title === "Flowmodoro") {
        title.set("Focus");
        startStopwatch();
      } else {
        startTimer();
      }
    } else {
      clearInterval(interval);
    }
  }

  function requestNotificationPermission() {
    Notification.requestPermission().then(function (result) {
      if (result === "granted") {
        console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
    });
  }

  function sendNotification(head, body) {
    if (Notification.permission === "granted") {
      var notification = new Notification(head, {
        body: body,
      });

      notification.onclick = function () {
        window.focus();
      };
    }
  }

  function startTimer() {
    interval = setInterval(() => {
      if (time > 0) {
        time -= 10;
      } else {
        clearInterval(interval);
        isRunning = false;
        handleFlowChange();
        sendNotification("Time's up!", "Time to focus again!");
        initialTime = null;
      }
    }, 10);
  }

  function startStopwatch() {
    interval = setInterval(() => {
      time += 10;
    }, 10);
  }

  function reset() {
    time = 0;
    clearInterval(interval);
    isRunning = false;
    isPaused = false;
  }

  function handleFlowChange() {
    title.update((t) => (t === "Focus" ? "Break" : "Focus"));
    if (isRunning) {
      clearInterval(interval);
      isRunning = false;
    }
    isPaused = false;
    if ($title === "Focus") {
      time = 0;
    } else {
      time = Math.floor(time * level);
      initialTime = time;
    }
  }

  function handleLevelChange(newLevel) {
    level = newLevel;
  }

  function handleHomeButtonClick() {
    title.set("Flowmodoro");
    initialTime = 0;
    reset();
  }

  function handleOpenModal() {
    isModalOpen = true;
  }

  function handleCloseModal() {
    isModalOpen = false;
  }

</script>

<main>
  <Modal title="What is Flowmodoro?" onClose={handleCloseModal} isOpen={isModalOpen}>
    <!-- Content to be displayed inside the modal -->
    <div class="text-center mb-12">Work until you start feeling tired or distracted, then take a break based on the length of time you worked.</div>

    <div class="grid grid-cols-2 gap-2 items-center mb-12">
      <div class="flex justify-center items-center">
        <img src="/levels.png" width="70%" alt="levels">
      </div>
      <div>
        Pick a level. Let's say beginner level (35%)
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 items-center mb-12">
      <div class="flex justify-center items-center">
        <img src="/stopwatch.png" width="50%" alt="stopwatch">
      </div>
      <div>
        Start focusing. Reach flow state. When you start to feel tired, start break.
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 items-center">
      <div class="flex justify-center items-center">
        <img src="/timer.png" width="50%" alt="timer">
      </div>
      <div>
        The timer will show the time you need to rest. In this case, if you work for 7 minutes and 32 seconds, then the rest time you need is 35% of that: 2 minutes. Start focusing again when the timer ends.
      </div>
    </div>
    <!-- <div class="mb-4">Let's break it down</div> -->
    <!-- <div class="font-semibold">Flow State</div>
    <p class="mb-2">
      Flow is a state of optimal experience where you're fully immersed and focused on what you're doing. It's
      characterized by complete absorption, effortless concentration, and enjoyment in the process.
    </p>
    <div class="font-semibold">Pomodoro Technique</div>
    <p class="mb-2">
      The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a
      timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
    </p> -->

  </Modal>
  <div class="flex flex-col justify-center items-center gap-10 p-4 h-screen relative">
    <div class="absolute text-light top-10 left-10">
      {#if $title === "Flowmodoro"}
        <div class="font-semibold" role="button" tabindex="0" on:click={handleOpenModal}>What is flomodoro?</div>
      {:else}
        <div
          tabindex="0"
          role="button"
          on:keydown={(e) => {
            if (e.key === "Escape") {
              handleHomeButtonClick();
            }
          }}
          on:click={handleHomeButtonClick}
        >
          <img src="/house-solid.svg" width={20} height={20} alt="home" />
        </div>
      {/if}
    </div>
    <div class="text-4xl font-light">{$title}</div>
    <Clock {initialTime} onClick={startPause} time={time >= 0 ? time : 0} />
    <!-- <Button onClick={startPause} text={isRunning ? 'Pause' : 'Start'} /> -->
    <!-- <Button onClick={reset} text="Reset" /> -->
    {#if $title !== "Flowmodoro"}
      <Button
        hidden={!(isRunning || isPaused)}
        onClick={handleFlowChange}
        text={`Start ${$title === "Focus" ? "Break" : "Focus"}`}
      />
    {:else}
      <div class="flex justify-center items-center gap-8">
        <Button
          active={level === 0.35}
          subText="Beginner"
          text={`35%`}
          onClick={() => handleLevelChange(0.35)}
          hidden={false}
        ></Button>
        <Button
          active={level === 0.28}
          subText="Reguler"
          text={`28%`}
          onClick={() => handleLevelChange(0.28)}
          hidden={false}
        ></Button>
        <Button
          active={level === 0.2}
          subText="Enthusiast"
          text={`20%`}
          onClick={() => handleLevelChange(0.2)}
          hidden={false}
        ></Button>
      </div>
    {/if}
  </div>
</main>
