<template>
  <div>
    <div id="balls-juggle">
      <PointBalls />
    </div>
    <div id="left-clown"></div>
    <div id="right-clown"></div>
    <div id="eric-the-clown"></div>
    <div id="left-drape"></div>
    <div id="right-drape"></div>
  </div>
</template>

<script>
import PointBalls from "./components/PointBalls.vue"
// import Scoreboard from "./components/Scoreboard.vue"
// import Target from "./components/Target.vue"
import { sharedData } from "./components/Data.js"
import config from "./config.json"

export default {
  name: "App",
  components: {
    PointBalls
    // Scoreboard,
    // Target
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
:root {
  --ball-size: 54px;
}
html,
body {
  margin: 0px;
  background: #803c3c;
  /* url("./assets/background.png"); */
  background-size: 1920px 1080px;
  height: 1080px;
  width: 1920px;
  overflow: hidden;
}
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* clowns */
#left-clown {
  width: 198px;
  height: 297px;
  background: url("./assets/clown_left.png") center/198px 297px no-repeat;
  position: absolute;
  bottom: -3px;
  left: 0px;
  z-index: 1;
}
#right-clown {
  width: 196px;
  height: 280px;
  background: url("./assets/clown_right.png") center/196px 280px no-repeat;
  position: absolute;
  bottom: -3px;
  right: 0px;
  z-index: 1;
}
#eric-the-clown {
  width: 824px;
  height: 600px;
  background: url("./assets/clown.png") center/824px 600px no-repeat;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}
/* who shot the drapes */
#left-drape {
  width: 226px;
  height: 1080px;
  background: url("./assets/curtain_left.png") center/226px 1080px no-repeat;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
}
#right-drape {
  width: 226px;
  height: 1080px;
  background: url("./assets/curtain_right.png") center/226px 1080px no-repeat;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 0;
}
/* balls */
#balls-juggle {
  z-index: 3;
  width: 824px;
  height: 630px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
