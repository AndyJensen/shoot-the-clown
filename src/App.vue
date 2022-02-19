<template>
  <div>
    <PointBalls />
    <Scoreboard />
    <button v-on:click="updateScore()">Add Selected Ball Point Value</button>
    <br /><br />
    <hr />
    <br />
    <button v-on:click="targetShoot(1)">Shoot out the Red Target</button>
    <button v-on:click="targetShoot(2)">Shoot out the Yellow Target</button>
    <button v-on:click="targetShoot(3)">Shoot out the Blue Target</button>
    <div style="display: flex; flex-wrap: wrap">
      <Target v-bind:status="target[1]" color="red" />
      <Target v-bind:status="target[2]" color="yellow" />
      <Target v-bind:status="target[3]" color="blue" />
    </div>
    <hr />
    <br />
    <div style="display: flex; flex-wrap: wrap">
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
import config from "./config.json"

export default {
  name: "App",
  components: {
    PointBalls,
    Scoreboard,
    Target
  },
  data() {
    return {
      sharedData,
      target: {
        1: "active",
        2: "active",
        3: "active"
      }
    }
  },
  methods: {
    updateScore: function () {
      sharedData.totalScore += sharedData.score
      return true
    },
    targetShoot: function (id) {
      if (this.target[id] == "active" && this.missShotUnit()) {
        this.updateScore()
        this.target[id] = "inactive"
      }
    },
    missShotUnit: function () {
      if (
        Math.round(Math.random() * config.missShotCeiling) !=
        config.missShotValue
      ) {
        return true
      }
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
