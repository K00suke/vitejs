<script>
    import Board from "./Board.svelte";

    export let gems = [];

    const L = 9;
    const maxColor = 7;

    let debugMsg = "デバッグメッセージ";

    shuffle(0,L,0,L);

    function shuffle(left, right, top, bottom){
        for(let x = left; x <= right; x++){
            for(let y = top; y <= bottom; y++){
                const i = xy2i(x,y);
                gems[i] = {
                    color: Math.floor(Math.random() * maxColor),
                    isSelected: false
                };
            }
        }
    }

    function rectangleSelected(event){
        const [x1, y1] = i2xy(event.detail.i1);
        const [x2, y2] = i2xy(event.detail.i2);
        const left = Math.min(x1, x2);
        const right = Math.max(x1, x2);
        const top = Math.min(y1, y2);
        const bottom = Math.max(y1, y2);
        if(right - left + 1 > 1 && bottom - top + 1 > 1){
            const count = (right - left + 1) * (bottom - top + 1);
            shuffle(left, right, top, bottom);
            debugMsg = `${count}個をシャッフル`
        }
        else{
            debugMsg = "消せない...";
        }

    }

    function i2xy(i){
        if(i<0 || i>=L*L) return [-1,-1];
        else return [i%L, Math.floor(i / L)];
    }

    function xy2i(x, y){
        if(x < 0 || y < 0 || x >= L || y >= L) return -1;
        else return x + y*L;
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
        <div class="bg-gray-300 aspect-square">
            <Board bind:gems on:rectangleSelected={rectangleSelected}/>
        </div>

        <!--残り時間-->
        <div class="bg-gray-400 border-4 rounded-xl h-8 overflow-hidden flex">
            <div class="bg-orange-400 w-3/4"></div>
        </div>

        <!--ヒントの表示スペース-->
        <div class="text-center text-white font-extrabold text-2xl">
            {debugMsg}
        </div>
    </div>
</div>