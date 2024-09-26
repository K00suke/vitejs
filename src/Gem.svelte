<script>
    import blue from "./assets/blue.png";
    import red from "./assets/red.png";
    import green from "./assets/green.png";
    import orange from "./assets/orange.png";
    import yellow from "./assets/yellow.png";
    import rainbow from "./assets/rainbow.png";
    import shuffle from "./assets/shuffle.png";
    export let color = 0;
    const images = [rainbow, red, blue, green, orange, yellow, shuffle];
</script>
<button class="border-gray-300 border-2 rounded-md">
    <img src={images[color]}/>
</button>