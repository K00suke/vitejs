<script>
    export let modal;
    export let highScore;
</script>

<dialog bind:this={modal} class="rounded-xl backdrop-blur-sm bg-white/60">
    <div class="p-10 flex flex-col gap-10 content-center">
        <div class="text-center text-orange-400 text-4xl font-extrabold tracking-widest">ょすみん？</div>
        <button on:click class="rounded-full
            focus:outline-none hover:bg-orange-100 hover:text-orange-400 bg-orange-400
            text-white p-4 text-xl font-extrabold">
            すたーと
        </button>
        <div class="text-center text-gray-500">
            はいすこあ:{highScore}
        </div>
    </div>
</dialog>