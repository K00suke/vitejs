<script>
    import { createEventDispatcher } from "svelte";
    import Gem from "./Gem.svelte";

    const dispatch = createEventDispatcher();
    export let gems = [];

    let selected = -1;
    function gemClicked(i){
        if(selected === i){
            gems[i].isSelected = false;
            selected = -1;
        }
        else if(selected === -1){
            gems[i].isSelected = true;
            selected = i;

        }
        else{
            gems[selected].isSelected = false;
            gems[i].isSelected = true;
            dispatch("rectangleSelected", {i1: selected, i2: i});
            selected = -1;
        }
    }
</script>
<div class="grid grid-cols-9 gird-rows-9">
    {#each gems as gem, i}
        <Gem {...gem} on:click={ () => gemClicked(i)}/>
    {/each}
</div>