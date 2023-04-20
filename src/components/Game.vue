<!-- 
  This component is responsible for the GUI of game logic
-->
<template>
    <div class="button-container">
        <div v-for="(number, index) in numbers" :key="index">
            <button class="square-button" @click="chooseNum(number)">{{ number }}</button>
        </div>
    </div>
    <div class="score">
        <div v-if="isCPUfirst">
            <h2>CPU score: {{ scoreForPlayer1 }}</h2>
            <h2>Your score: {{ scoreForPlayer2 }}</h2>
        </div>
        <div v-else>
            <h2>CPU score: {{ scoreForPlayer2 }}</h2>
            <h2>Your score: {{ scoreForPlayer1 }}</h2>
        </div>
    </div>
</template>

<script>
const InitialNumbers = [4, 3, 3, 2, 2, 1, -1]

import { alphaBeta, findTakenNumber } from '../alpha-beta-pruning'

export default {
    data() {
        return {
            numbers: [...InitialNumbers],
            result: '',
            scoreForPlayer1: 0,
            scoreForPlayer2: 0,
            isCPUTurn: false,
        }
    },
    props: {
        isCPUfirst: Boolean,
    },
    mounted() {
        if (this.isCPUfirst) {
            this.isCPUTurn = true
            this.chooseCPUmove()
        }
    },
    methods: {
        chooseNum(num) {
            this.numbers.splice(this.numbers.indexOf(num), 1)
            
            if (this.isCPUTurn) {
                if (this.isCPUfirst)
                    this.scoreForPlayer1 += num
                else
                    this.scoreForPlayer2 += num
            } else {
                if (this.isCPUfirst)
                    this.scoreForPlayer2 += num
                else
                    this.scoreForPlayer1 += num
            }

            this.isCPUTurn = !this.isCPUTurn

            if (this.isGameFinished()) {
                this.checkResult()
                return;
            }

            if (this.isCPUTurn)
                this.chooseCPUmove()
        },
        chooseCPUmove() {
            const currentState = {
                givenNumbers: this.numbers,
                scoreForPlayer1: this.scoreForPlayer1,
                scoreForPlayer2: this.scoreForPlayer2
            }
            const result = alphaBeta(currentState, currentState.givenNumbers.length - 1, -Infinity, Infinity, this.isCPUfirst)
            const takenNumber = findTakenNumber(Array.from(currentState.givenNumbers), Array.from(result.move.givenNumbers));
            // console.log("best number to take: ", takenNumber);

            this.chooseNum(takenNumber)
        },
        isGameFinished() {
            return this.numbers.length === 1
        },
        checkResult() {
            if (this.scoreForPlayer1 == this.scoreForPlayer2) {
                this.result = 'Draw!'
                this.$emit("end", [this.result, this.scoreForPlayer1, this.scoreForPlayer2])
                return
            }

            if (this.isCPUfirst) {
                // Then, CPU is player1
                if (this.scoreForPlayer1 >= 9)
                    this.result = 'You win!'
                else if (this.scoreForPlayer2 >= 9)
                    this.result = 'CPU win!'
                else if (this.scoreForPlayer1 > this.scoreForPlayer2)
                    this.result = 'CPU win!'
                else
                    this.result = 'You win!'
            } else {
                // Then, Human is player1
                if (this.scoreForPlayer1 >= 9)
                    this.result = 'CPU win!'
                else if (this.scoreForPlayer2 >= 9)
                    this.result = 'You win!'
                else if (this.scoreForPlayer1 > this.scoreForPlayer2)
                    this.result = 'You win!'
                else
                    this.result = 'CPU win!'
            }

            this.$emit("end", [this.result, this.scoreForPlayer1, this.scoreForPlayer2])
        }
    }
}
</script>

<style>
.button-container {
  display: flex;
  flex-wrap: wrap;
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
