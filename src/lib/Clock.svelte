<script>
  import { title } from "../store/store";

  export let time;
  export let onClick;
  export let initialTime;


  let percentage = 100;

  $: percentage = initialTime ? (time / initialTime) * 100 : 100;

  function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (3600 * 1000));
    const minutes = Math.floor((milliseconds % (3600 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    // const remainingMilliseconds = milliseconds % 1000;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
</script>

<main>
  <div
    on:click={onClick}
    tabindex="0"
    role="button"
    on:keydown={(e) => {
      if (e.key === " " || e.key === "Enter") {
        onClick();
      }
    }}
    class="w-80 h-80 rounded-full flex items-center justify-center cursor-pointer"
    style="background: radial-gradient(closest-side, black 98%, transparent 99% 100%), conic-gradient(white {percentage}%, transparent 0);"
  >
    <div class="text-6xl font-light">{$title === "Flowmodoro"? "Start" : formatTime(time)}</div>
  </div>
</main>

<style>
</style>
