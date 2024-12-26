<script>
    import {getBestScore} from "./supabase.js";
    export let modal;
    export let score, blowCount, bestBlow;
</script>

<dialog bind:this={modal} class="rounded-xl backdrop-blur-sm bg-white/60">
    <div class="p-10 flex flex-col content-center text-center font-extrabold text-gray-600 gap-4">
        <div class="text-orange-400 text-2xl tracking-widest">げーむおーばー</div>
        <div class="text-2xl p-6 ">{score} てん！</div>
        <div>最高の一撃 : {bestBlow}てん</div>
        <div>消した個数 : {blowCount}こ</div>
        {#await getBestScore() then bestScore}
            <div>最高得点 : {bestScore}点</div>
        {/await}
        <button on:click class="rounded-full
            focus:outline-none hover:bg-orange-100 hover:text-orange-400 bg-orange-400
            text-white text-xl font-extrabold p-4">
            OK
        </button>
    </div>
</dialog>