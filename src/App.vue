<template>
  <Header
      @toggle-description="toggleDescription"
      :title="title"
      :showDescription="showDescription"
    />
  <div v-show="showDescription" class="description">
    <h1>Game Description:</h1>
    <p>At the beginning of the game, the numerical string "-1 1 2 3 4" is given and each player has a score of 0.
    The players make moves sequentially by removing one number from the numerical string and adding it to the player's current score.
    The game ends when one number is left in the numerical string.
    The player with a score of 6 loses the game. If the score is equal, the game is a draw.
    In all other cases, the player with the highest score wins the game.</p>
  </div>
  <div v-if="!isPlaying">
    <Button 
        text="Start from Me"
        @click="startGame"
    />
    <Button 
        text="Start from CPU"
        @click="startGame"
    />
  </div>
  <Game v-if="isPlaying"/>
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
      isPlaying: false
    };
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription
    },
    startGame() {
      this.isPlaying = true
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
</style>