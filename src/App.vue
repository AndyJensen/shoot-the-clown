<template>
  <div>
    <PointBalls />
    <Scoreboard />
    <button v-on:click="updateScore(5)">Add Selected Ball Point Value</button>
    <br /><br />
    <div style="display: flex; flex-wrap: wrap;">
      <Target status="active" color="red" />
      <Target status="inactive" color="red" />
      <Target status="active" color="yellow" />
      <Target status="inactive" color="yellow" />
      <Target status="active" color="blue" />
      <Target status="inactive" color="blue" />
      <Target status="active" color="nose" />
      <Target status="inactive" color="nose" />
      <Target status="active" color="eye" />
      <Target status="inactive" color="eye" />
    </div>
  </div>
</template>

<script>
import PointBalls from "./components/PointBalls.vue"
import Scoreboard from "./components/Scoreboard.vue"
import Target from "./components/Target.vue"
import { sharedData } from "./components/Data.js"

export default {
  name: "App",
  components: {
    PointBalls,
    Scoreboard,
    Target
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
