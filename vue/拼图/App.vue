<template>
    <div>
        <d-puzzle v-bind="puzzleConfig[level]" @next="handleNext"></d-puzzle>
    </div>
</template>



<script>
import DPuzzle from './Puzzle'

export default {
    components: {
        DPuzzle
    },
    data (){
        return {
            level: 0,
            puzzleConfig: [
                { row: 3, col: 3, img: './img/0.jpg'},
                { row: 4, col: 4, img: './img/1.jpg'},
                { row: 6, col: 6, img: './img/2.jpg'},
                { row: 8, col: 8, img: './img/3.jpg'},
            ]
        }
    },
    methods: {
        handleNext (){
            if(++this.level == this.puzzleConfig.length){
                const answerFlag = confirm('已经是最后一关了，是否要重新开始？');
                if(answerFlag){
                    this.level = 0;
                }
            }
        }
    }
}
</script>



<style>

</style>