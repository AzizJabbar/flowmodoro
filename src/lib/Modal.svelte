<script>
  import {slimscroll} from "svelte-slimscroll";

  export let isOpen = false;
  export let title = "Modal";
  export let onClose = () => {};

  function closeModal() {
    onClose();
  }
</script>

<!-- Modal backdrop -->
<div
  on:click={closeModal}
  on:keydown={(e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  }}
  class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity {!isOpen && 'hidden'}"
  class:opacity-100={isOpen}
></div>

<!-- Modal dialog -->
<div

  class="h-[90%] border border-white fixed w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-md z-50 transition-all {!isOpen &&
    'hidden'}"
  class:scale-100={isOpen}
  class:opacity-100={isOpen}
>
<div class="p-8" use:slimscroll="{{height:"100%",width:"100%",alwaysVisible:true,color:"white"}}">
      <div class="text-center text-lg font-bold mb-4">{title}</div>
      <!-- Modal content -->
      <div class="">
        <slot />
        <!-- Close button -->
        <!-- <button
      class="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg focus:outline-none"
      on:click={closeModal}>Close</button
    > -->
      </div>
</div>



</div>
