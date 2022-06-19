<template>
  <div>
    <div id="logo">
      <img src="./assets/shoot_the_clown.png" id="logo-image" alt="" />
    </div>
    <div id="scoreboard">
      <Scoreboard />
    </div>
    <div id="music">
      Music: {{ sharedData.music }} <br /><br />~ through 9 "aim at target"
      <br />SHIFT is the trigger <br />Enter toggles music <br />Score is top
      left (temp)
    </div>
    <div id="balls-juggle">
      <PointBalls />
    </div>
    <div id="targets">
      <Target color="eye" v-bind:status="target.leftEye" class="left-eye" />
      <Target color="eye" v-bind:status="target.rightEye" class="right-eye" />
      <Target color="nose" v-bind:status="target.nose" class="nose" />
      <Target
        color="yellow"
        v-bind:status="target.hatYellowLeft"
        class="hat-yellow-left"
      />
      <Target
        color="yellow"
        v-bind:status="target.hatYellowMid"
        class="hat-yellow-mid"
      />
      <Target
        color="yellow"
        v-bind:status="target.hatYellowRight"
        class="hat-yellow-right"
      />
      <Target
        color="blue"
        v-bind:status="target.hatBlueLeft"
        class="hat-blue-left"
      />
      <Target
        color="blue"
        v-bind:status="target.hatBlueRight"
        class="hat-blue-right"
      />
      <Target color="red" v-bind:status="target.redLeft" class="red-left" />
      <Target color="red" v-bind:status="target.redRight" class="red-right" />
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
import Scoreboard from "./components/Scoreboard.vue"
import Target from "./components/Target.vue"
import { sharedData } from "./components/Data.js"
import config from "./config.json"
import LaughingMan from "./assets/laughing_man.mp3"
import ShotWhiff from "./assets/shot-whiff.mp3"
import ShotHit from "./assets/shot-hit.mp3"
import ShotFart from "./assets/shot-fart.mp3"

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
        leftEye: "active",
        rightEye: "active",
        nose: "active",
        hatYellowLeft: "active",
        hatYellowMid: "active",
        hatYellowRight: "active",
        hatBlueLeft: "active",
        hatBlueRight: "active",
        redLeft: "active",
        redRight: "active"
      }
    }
  },
  mounted() {
    let backgroundMusic = new Audio(LaughingMan)
    window.addEventListener("keypress", (e) => {
      switch (e.key) {
        case "Enter":
          this.musicToggle(backgroundMusic)
          break
        case "~":
          this.targetShoot("leftEye")
          this.shotHandler("hit")
          break
        case "!":
          this.targetShoot("rightEye")
          this.shotHandler("miss")
          break
        case "@":
          this.targetShoot("nose")
          this.shotHandler("forcedMiss")
          break
        case "#":
          this.targetShoot("hatYellowLeft")
          this.shotHandler("hit")
          break
        case "$":
          this.targetShoot("hatYellowMid")
          this.shotHandler("hit")
          break
        case "%":
          this.targetShoot("hatYellowRight")
          this.shotHandler("hit")
          break
        case "^":
          this.targetShoot("hatBlueLeft")
          this.shotHandler("hit")
          break
        case "&":
          this.targetShoot("hatBlueRight")
          this.shotHandler("hit")
          break
        case "*":
          this.targetShoot("redLeft")
          this.shotHandler("hit")
          break
        case "(":
          this.targetShoot("redRight")
          this.shotHandler("hit")
          break
        default:
          break
      }
    })
  },
  methods: {
    shotHandler: function (action) {
      let shotHit = new Audio(ShotHit)
      let shotMiss = new Audio(ShotWhiff)
      let shotFart = new Audio(ShotFart)
      switch (action) {
        case "hit":
          shotHit.play()
          break
        case "miss":
          shotMiss.play()
          break
        case "forcedMiss":
          shotFart.play()
          break
      }
    },
    musicToggle: function (audio) {
      if (sharedData.music) {
        audio.pause()
        sharedData.music = false
      } else {
        audio.play()
        sharedData.music = true
      }
    },
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
      alert("miss shot unit activated")
    }
  }
}
</script>

<style>
:root {
  --ball-size: 54px;
  --target-size: 60px;
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
  z-index: 3;
}
#right-clown {
  width: 196px;
  height: 280px;
  background: url("./assets/clown_right.png") center/196px 280px no-repeat;
  position: absolute;
  bottom: -3px;
  right: 0px;
  z-index: 3;
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
  z-index: 2;
}
#right-drape {
  width: 226px;
  height: 1080px;
  background: url("./assets/curtain_right.png") center/226px 1080px no-repeat;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 2;
}
/* balls */
#balls-juggle {
  z-index: 1;
  width: 824px;
  height: 630px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
#targets {
  z-index: 1;
  width: 824px;
  height: 630px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
/* decoration */
#scoreboard {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 4;
  color: #ffffff;
  font-weight: bold;
  font-size: 10px;
}
#music {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 4;
  color: #ffffff;
  font-weight: bold;
  font-size: 10px;
}
#logo {
  position: absolute;
  top: 20px;
  left: 0px;
  z-index: 4;
}
#logo-image {
  height: 150px;
  width: 200px;
}
/* targets */
.left-eye {
  position: absolute;
  top: 285px;
  left: 322px;
}
.right-eye {
  position: absolute;
  top: 285px;
  left: 422px;
}
.nose {
  position: absolute;
  top: 332px;
  left: 372px;
}
.hat-yellow-left {
  position: absolute;
  top: 140px;
  left: 260px;
}
.hat-yellow-mid {
  position: absolute;
  top: 185px;
  left: 365px;
}
.hat-yellow-right {
  position: absolute;
  top: 130px;
  left: 455px;
}
.hat-blue-left {
  position: absolute;
  top: 210px;
  left: 210px;
}
.hat-blue-right {
  position: absolute;
  top: 192px;
  left: 520px;
}
.red-left {
  position: absolute;
  top: 340px;
  left: 195px;
}
.red-right {
  position: absolute;
  top: 340px;
  left: 540px;
}
</style>
