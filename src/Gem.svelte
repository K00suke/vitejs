<script>
    import blue from "./assets/blue.png";
    import red from "./assets/red.png";
    import green from "./assets/green.png";
    import orange from "./assets/orange.png";
    import yellow from "./assets/yellow.png";
    import rainbow from "./assets/rainbow.png";
    import shuffle from "./assets/shuffle.png";

    export let color;
    export let isSelected;
    const images = [rainbow, red, blue, green, orange, yellow, shuffle];
</script>
<button class="border-gray-200 border-2 rounded-md"
    class:border-orange-500={isSelected}
    class:hover:border-gray-400={!isSelected}
    on:click>
    <img src={images[color]}/>
</button>