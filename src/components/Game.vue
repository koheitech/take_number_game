<template>
    <div class="button-container">
        <div v-for="num in numbers" :key="num">
            <button class="square-button" @click="chooseNum(num)">{{ num }}</button>
        </div>
    </div>
    <div class="score">
        <h2>CPU score: {{ scoreForPlayer1 }}</h2>
        <h2>Your score: {{ scoreForPlayer2 }}</h2>
    </div>
</template>

<script>
const InitialNumbers = [4, 3, 2, 1, -1]

import { alphaBeta, findTakenNumber } from '../alpha-beta-pruning'

export default {
    data() {
        return {
            numbers: [...InitialNumbers],
            result: '',
            scoreForPlayer1: 0,
            scoreForPlayer2: 0,
            isPlayer1: this.isCPUfirst
        }
    },
    props: {
        isCPUfirst: Boolean,
    },
    mounted() {
        if (this.isPlayer1) {
            this.chooseCPUmove()
        }
    },
    methods: {
        chooseNum(num) {
            this.numbers = this.numbers.filter(item => num !== item )

            if (this.isPlayer1)
                this.scoreForPlayer1 += num
            else
                this.scoreForPlayer2 += num
            
            this.isPlayer1 = !this.isPlayer1

            if (this.isGameFinished()) {
                this.checkResult()
                return;
            }

            if (this.isPlayer1)
                this.chooseCPUmove()
        },
        chooseCPUmove() {
            const currentState = {
                givenNumbers: this.numbers,
                scoreForPlayer1: this.scoreForPlayer1,
                scoreForPlayer2: this.scoreForPlayer2,
            }
            const result = alphaBeta(currentState, currentState.givenNumbers.length - 1, -Infinity, Infinity, this.isPlayer1)
            const takenNumber = findTakenNumber(currentState, result.move);
            console.log("best number to take: ", takenNumber);

            this.chooseNum(takenNumber)
        },
        isGameFinished() {
            return this.numbers.length === 1
        },
        checkResult() {
            if (this.scoreForPlayer1 == this.scoreForPlayer2)
                this.result = 'Draw!'
            else if (this.scoreForPlayer2 === 7)
                this.result = 'CPU win!'
            else if (this.scoreForPlayer2 > this.scoreForPlayer1)
                this.result = 'You win!'
            else 
                this.result = 'CPU win!'

            this.$emit("end", [this.result, this.scoreForPlayer1, this.scoreForPlayer2])
        }
    }
}
</script>

<style>
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.square-button {
  width: 100px;
  height: 100px;
  border-color: #015551;
  color: black;
  font-size: 18px;
  margin-right: 10px;
}
</style>
