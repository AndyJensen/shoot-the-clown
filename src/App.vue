<template>
  <div id="gameOver" v-if="gameOver">
    GAME OVER<br />YOU STINKY LOSER<br />FINAL SCORE:
    {{ sharedData.totalScore }}
  </div>
  <div>
    <div id="logo">
      <img src="./assets/shoot_the_clown.png" id="logo-image" alt="" />
    </div>
    <div id="scoreboard">
      {{ sharedData.totalScore }} - Shots Remaining:
      {{ shotsRemaining }}
    </div>
    <div id="music">
      Music: {{ sharedData.music }} <br /><br />Mouse to aim/fire<br />Enter
      toggles music <br />Score is top left (temp)
    </div>
    <div id="balls-juggle">
      <PointBalls />
    </div>
    <div id="targets">
      <Target
        color="eye"
        v-bind:status="target.leftEye"
        class="left-eye"
        v-on:click="clickHandler('leftEye')"
      />
      <Target
        color="eye"
        v-bind:status="target.rightEye"
        class="right-eye"
        v-on:click="clickHandler('rightEye')"
      />
      <Target
        color="nose"
        v-bind:status="target.nose"
        class="nose"
        v-on:click="clickHandler('nose')"
      />
      <Target
        color="yellow"
        v-bind:status="target.hatYellowLeft"
        class="hat-yellow-left"
        v-on:click="clickHandler('hatYellowLeft')"
      />
      <Target
        color="yellow"
        v-bind:status="target.hatYellowMid"
        class="hat-yellow-mid"
        v-on:click="clickHandler('hatYellowMid')"
      />
      <Target
        color="yellow"
        v-bind:status="target.hatYellowRight"
        class="hat-yellow-right"
        v-on:click="clickHandler('hatYellowRight')"
      />
      <Target
        color="blue"
        v-bind:status="target.hatBlueLeft"
        class="hat-blue-left"
        v-on:click="clickHandler('hatBlueLeft')"
      />
      <Target
        color="blue"
        v-bind:status="target.hatBlueRight"
        class="hat-blue-right"
        v-on:click="clickHandler('hatBlueRight')"
      />
      <Target
        color="red"
        v-bind:status="target.redLeft"
        class="red-left"
        v-on:click="clickHandler('redLeft')"
      />
      <Target
        color="red"
        v-bind:status="target.redRight"
        class="red-right"
        v-on:click="clickHandler('redRight')"
      />
    </div>
    <div id="left-clown"></div>
    <div id="right-clown"></div>
    <div id="eric-the-clown"></div>
    <div id="left-drape"></div>
    <div id="right-drape"></div>
  </div>
</template>

<script>
//TODO: pre-load images so state change isn't forced to load...maybe sprite it? (low priority)
//TODO: make the shot sprites darker to better indicate they've been hit
import PointBalls from "./components/PointBalls.vue"
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
        redRight: "active",
        void: "inactive"
      },
      gameOver: false,
      shotsRemaining: 12
    }
  },
  watch: {
    shotsRemaining(newV) {
      if (newV == 0 && this.gameOver == false) {
        this.gameOver = true
      }
    }
  },
  mounted() {
    let backgroundMusic = new Audio(LaughingMan)
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.musicToggle(backgroundMusic)
        return
      }
    })
    window.addEventListener("click", (e) => {
      if (e.target.classList[0] != "ball") {
        this.shotHandler("miss", null)
      }
    })
  },
  methods: {
    clickHandler: function (loc) {
      this.shotHandler("hit", loc)
    },
    codeCheck: function (value, event) {
      if (event.code == value && event.shiftKey === true) {
        return true
      }
    },
    shotHandler: function (action, location) {
      if (this.shotsRemaining <= 0) {
        return
      }
      let shotHit = new Audio(ShotHit)
      let shotMiss = new Audio(ShotWhiff)
      let shotFart = new Audio(ShotFart)
      if (this.targetStatus(location)) {
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
      } else {
        shotMiss.play()
      }
      this.shotsRemaining--
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
    targetStatus: function (id) {
      // TODO: refactor so that a forced miss is reflected accurately in audio
      if (this.target[id] == "active" && this.missShotUnit()) {
        this.updateScore()
        this.target[id] = "inactive"
        return true
      } else {
        return false
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
#gameOver {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 80%);
  color: #ffffff;
  font-size: 100px;
  z-index: 20;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
