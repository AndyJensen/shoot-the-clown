<template>
  <div>
    <PointBalls />
    <Scoreboard />
    <button v-on:click="updateScore(5)">Add Selected Ball Point Value</button>
  </div>
</template>

<script>
import PointBalls from "./components/PointBalls.vue"
import Scoreboard from "./components/Scoreboard.vue"
import { sharedData } from './components/Data.js'


export default {
  name: "App",
  components: {
    PointBalls,
    Scoreboard
  },
  data() {
    return {
      sharedData
    }
  },
  methods: {
    updateScore: function () {
      sharedData.totalScore += sharedData.score
      return true
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
