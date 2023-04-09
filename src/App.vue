<template>
  <Header
      @toggle-description="toggleDescription"
      :title="title"
      :showDescription="showDescription"
    />
  <div v-show="showDescription" class="description">
    <h1 class="centered-text">Game Description:</h1>
    <p>At the beginning of the game, the numerical string "4 3 2 1 -1" is given and each player has a score of 0.
    The players make moves sequentially by removing one number from the numerical string and adding it to the player's current score.
    The game ends when one number is left in the numerical string.
    The player with a score of 7 loses the game. If the score is equal, the game is a draw.
    In all other cases, the player with the highest score wins the game.</p>
  </div>
  <Game v-if="isPlaying" :isCPUfirst="isCPUfirst" @end="endGame"/>
  <div v-if="isFinished">
    <h1>Result:</h1>
    <h2>{{ result }}</h2>
    <div class="score">
      <div v-if="isCPUfirst">
        <h3>CPU score: {{ scoreForPlayer1 }}</h3>
        <h3>Your score: {{ scoreForPlayer2 }}</h3>
      </div>
      <div v-else>
        <h3>CPU score: {{ scoreForPlayer2 }}</h3>
        <h3>Your score: {{ scoreForPlayer1 }}</h3>
      </div>
    </div>
    <h3>Do you want to play again? Why not??</h3>
  </div>
  <div v-if="!isPlaying">
    <Button 
        text="Start from Me"
        @click="startGame(isCPUfirst=false)"
    />
    <Button 
        text="Start from CPU"
        @click="startGame(isCPUfirst=true)"
    />
  </div>
</template>

<script>
import Header from "./components/Header";
import Button from "./components/Button";
import Game from "./components/Game";

export default {
  name: 'App',
  components: {
    Header,
    Button,
    Game
  },
  data() {
    return {
      title: 'Take Number',
      showDescription: true,
      isPlaying: false,
      isFinished: false,
      isCPUfirst: false,
      result: '',
      scoreForPlayer1: 0,
      scoreForPlayer2: 0,
    };
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription
    },
    startGame(isCPUfirst) {
      this.isPlaying = true,
      this.isFinished = false,
      this.isCPUfirst = isCPUfirst
    },
    endGame([result, scoreForPlayer1, scoreForPlayer2]) {
      this.result = result
      this.scoreForPlayer1 = scoreForPlayer1
      this.scoreForPlayer2 = scoreForPlayer2
      this.isFinished = true
      this.isPlaying = false
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.description {
  text-align: left;
  max-width: 700px;
  margin: 30px auto;
  overflow: auto;
  min-height: auto;
  border: 1px solid darkgrey;
  padding: 30px;
  border-radius: 5px;
}
.centered-text {
  text-align: center;
}
.score {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>