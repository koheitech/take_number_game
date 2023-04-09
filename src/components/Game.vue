<template>
    <div class="button-container">
        <div v-for="num in InitialNumbers" :key="num">
            <button class="square-button">{{ num }}</button>
        </div>
    </div>
    <div class="score">
        <!-- TODO: dynamically change the score depending on which to start -->
        <h2>Your score: {{ scoreForPlayer1 }}</h2>
        <h2>CPU score: {{ scoreForPlayer1 }}</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            InitialNumbers: [4, 3, 2, 1, -1],
            scoreForPlayer1: 0,
            scoreForPlayer2: 0,        
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
