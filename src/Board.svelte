<script>
    import Gem from "./Gem.svelte";
    export let gems = [];
</script>
<div class="grid grid-cols-9 gird-rows-9">
    {#each gems as gem}
        <Gem color = {gem}/>
    {/each}
</div>