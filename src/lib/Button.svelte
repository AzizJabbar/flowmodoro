<script>
  export let text;
  export let onClick;
  export let hidden;
  export let subText = undefined;
  export let active = undefined;
</script>

<main>
  <button on:click={onClick} class="{hidden && "opacity-0"} {active && "shadow-custom"} w-fit min-w-28 min-h-20 bg-transparent flex flex-col justify-center items-center text-white font-light py-2 px-4 rounded border-white border">
    <div>{text}</div>
    {#if subText}
      <div class="text-sm text-light opacity-70">{subText}</div>
    {/if}
  </button>
</main>
