<script>
    import Board from "./Board.svelte";import { onMount } from "svelte";
    import StartModal from "./StartModal.svelte";
    import GameoverModal from "./GameoverModal.svelte";
    import {addScore, getBestScore} from "./supabase.js";
    let startModal, gameoverModal;

    export let gems = [];

    const L = 9;
    const MAX_TIME = 60;
    let time;
    let highScore = 1;

    const levelDesign = {
        1: {maxColor: 2, levelUp: 1000, shuffleThresh: 17},
        2: {maxColor: 3, levelUp: 20000, shuffleThresh: 26},
        3: {maxColor: 4, levelUp: 300000, shuffleThresh: 31},
        4: {maxColor: 5, levelUp: 4000000, shuffleThresh: 37},
        5: {maxColor: 5, levelUp: 50000000, shuffleThresh: 43},
        6: {maxColor: 5, levelUp: 1e256, shuffleThresh: 49}
    }

    let gamedata = {score:0, level:1, bestBlow:0, blowCount:0}
    let debugMsg = "デバッグメッセージ";

    let state = "INITIAL";
    async function changeState(newState){
        state = newState;
        if(state == "START"){
            shuffle(0, L-1, 0, L-1, 5);
            gameoverModal.close();
            highScore = await getBestScore();
            startModal.showModal();
        }
        else if(state == "GAME"){
            gamedata = {score:0, level:1, bestBlow:0, blowCount:0};
            debugMsg = "";
            time = MAX_TIME;
            shuffle(0, L-1, 0, L-1, levelDesign[gamedata.level].maxColor);
            startModal.close();
            timerTick();
        }
        else if(state == "END"){
            await addScore(gamedata.score);
            gameoverModal.showModal();
        }
        else{
            throw "changeStateのエラー";
        }
    }
    onMount(()=>changeState("START"));

    function timerTick(){
        time -= 0.1;
        if(time > 0){
            setTimeout(timerTick, 1000*0.1);
        }
        else{
            changeState("END");
        }
    }

    function shuffle(left, right, top, bottom, maxColor){
        for(let x = left; x <= right; x++){
            for(let y = top; y <= bottom; y++){
                const i = xy2i(x,y);
                gems[i] = {
                    color: Math.floor(Math.random() * maxColor + 1),
                    isSelected: false
                };
            }
        }
    }

    function forceShuffle(){
        debugMsg = "強制シャッフル!";
        shuffle(0,L,0,L, 2);
    }

    function rectangleSelected(event){
        const [x1, y1] = i2xy(event.detail.i1);
        const [x2, y2] = i2xy(event.detail.i2);
        const left = Math.min(x1, x2);
        const right = Math.max(x1, x2);
        const top = Math.min(y1, y2);
        const bottom = Math.max(y1, y2);

        const area = (right-left+1)*(bottom-top+1);
        gamedata.blowCount += area;
        const point = calcPoint(area);
        gamedata.bestBlow = Math.max(gamedata.bestBlow, point);
        gamedata.score += point;
        time += point / 1000;
        if(x1 === x2 || y1 === y2) return;
        if(isCorrect(left, right, top, bottom)){
            const count = (right - left + 1) * (bottom - top + 1);
            shuffle(left, right, top, bottom, levelDesign[gamedata.level].maxColor);
            debugMsg = `${count}個をシャッフル`;

            let i;
            if(right-left === bottom-top){
                const x = Math.floor(Math.random()*(right-left+1) + left);
                const y = Math.floor(Math.random()*(bottom-top+1) + top);
                i = xy2i(x, y);
                gems[i].color = 0;
            }
            if(area >= levelDesign[gamedata.level].shuffleThresh){
                let x;
                let y;
                function randomi(){
                    x = Math.floor(Math.random()*(right-left+1) + left);
                    y = Math.floor(Math.random()*(bottom-top+1) + top);
                    const k = xy2i(x,y);
                    if(i === k){
                        return randomi();
                    }
                    else{
                        return k;
                    }
                }
                const j = randomi();
                gems[j].color = 6;
            }

            if(gamedata.score >= levelDesign[gamedata.level].levelUp){
                gamedata.level++;
            }
        }
        else{
            debugMsg = "消せない...";
        }

        function calcPoint(area){
            let rainbow = 0;
            let shuffle = 0;
            for(let y = top; y <= bottom; y++){
                for(let x = left; x <= right; x++){
                    const i = xy2i(x, y);
                    switch(gems[i].color){
                        case 0:
                            rainbow += 1;
                        break;
                        case 6:
                            shuffle += 1;
                        break;
                    }
                }
            }

            return area * 2*(rainbow + 1) * Math.pow(2, shuffle + 1) * Math.pow(gamedata.level,2);
        }

    }

    function isCorrect(l,r,t,b){
        const c1 = gems[xy2i(l,t)].color;
        const c2 = gems[xy2i(l,b)].color;
        const c3 = gems[xy2i(r,t)].color;
        const c4 = gems[xy2i(r,b)].color;
        console.assert(l<r, "l<rではない", {l, r});
        console.assert(t<b, "t<bではない", {t, b});

        const corners = new Set([c1, c2, c3, c4]);
        console.log(corners);
        return corners.size - Number(corners.has(0)) + 9999999 * Number(corners.has(6)) <= 1;
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
<StartModal bind:modal={startModal} {highScore} on:click={()=>changeState("GAME")}/>
<GameoverModal bind:modal={gameoverModal} {...gamedata}  on:click={()=>changeState("START")}/>
<svelte:head>
    <title>ょすみん？</title>
</svelte:head>
<div class="bg-gradient-to-br from-orange-200 to-orange-400 h-svh w-svw justify-center">
    <div class="h-svh max-w-xl flex flex-col gap-4 justify-center mx-auto p-6">
        <!--レベル表示-->
        <div class="bg-orange-300 border-orange-50 rounded-2xl border-4 p-2 mx-4 flex flex-row justify-around">
            <div class="font-bold text-white text-center w-1/3">れべる</div>
            <div class="bg-orange-50 rounded-full px-4  w-[10rem] text-right text-gray-800">{"★".repeat(gamedata.level)}</div>
        </div>

        <!--スコア表示-->
        <div class="bg-orange-300 border-orange-50 rounded-2xl border-4 p-2 mx-4 flex flex-row justify-around">
            <div class="font-bold text-white text-center w-1/3">すこあ</div>
            <div class="bg-orange-50 rounded-full px-4  w-[10rem] text-right text-gray-800 font-extrabold">{gamedata.score}</div>
        </div>
        
        <!--盤面-->
        <div class="bg-gray-300 aspect-square">
            <Board 
                bind:gems 
                on:rectangleSelected={rectangleSelected} 
                on:forceShuffle={forceShuffle}
            />
        </div>

        <!--－残り時間-->
        <div class="bg-gray-300 border-4 rounded-xl border-orange-50 h-4 overflow-hidden flex">
            <div class="bg-orange-300 w-1/3" style:width='{time/MAX_TIME*100}%'></div>
        </div>

        <!--ヒントの表示スペース
        <div class="text-center text-white font-extrabold text-2xl">
            {debugMsg}
        </div>
        -->
    </div>
</div>