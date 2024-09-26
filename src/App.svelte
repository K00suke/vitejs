<script>
    import Board from "./Board.svelte";
    export let gems = [];
    const L = 9;
    const maxColor = 7;

    shuffle();

    function shuffle(){
        for(let i = 0; i < L*L; i++){
            gems[i] = Math.floor(Math.random() * maxColor)
        }
    }
</script>
<div class="bg-gradient-to-br from-orange-200 to-orange-400 h-svh w-svw justify-center">
    <div class="h-svh max-w-xl flex flex-col gap-4 justify-center mx-auto">
        <!--レベル表示-->
        <div class="bg-orange-300 border-orange-50 rounded-2xl border-4 p-2 mx-4 flex flex-row justify-around">
            <div class="font-bold text-white text-center w-1/3">れべる</div>
            <div class="bg-orange-50 rounded-full px-4  w-[10rem] text-right text-gray-800">★★★★</div>
        </div>

        <!--スコア表示-->
        <div class="bg-orange-300 border-orange-50 rounded-2xl border-4 p-2 mx-4 flex flex-row justify-around">
            <div class="font-bold text-white text-center w-1/3">すこあ</div>
            <div class="bg-orange-50 rounded-full px-4  w-[10rem] text-right text-gray-800 font-extrabold">10</div>
        </div>
        
        <!--盤面-->
        <div class="bg-gray-100 aspect-square mx-4 border-4 rounded-2xl border-orange-50">
            <Board bind:gems/>
        </div>

        <!--残り時間-->
        <div class="bg-gray-400 border-4 rounded-xl h-8 overflow-hidden flex">
            <div class="bg-orange-400 w-3/4"></div>
        </div>

        <!--ヒントの表示スペース-->
        <div class="text-center text-white font-extrabold text-2xl">ヒントの表示スペース</div>
    </div>
</div>