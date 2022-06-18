<template>
  <div id="ball-holder">
    <div class="ball" v-for="point in points" :key="point.value">
      {{ point.value }}
    </div>
  </div>
</template>

<script>
/**
 * Cycling balls with point values and activity indication.
 * config.json in the root directory controls the timer speed.
 * TODO: (High Priority) Determine timing from physical cabinet and update config.
 * TODO: (Low Priority) Refactor ballRotate function.
 */
import config from "../config.json"
import { sharedData } from "./Data.js"
export default {
  name: "PointBalls",
  data() {
    return {
      sharedData,
      points: [
        { value: 10 },
        { value: 20 },
        { value: 30 },
        { value: 40 },
        { value: 50 },
        { value: 40 },
        { value: 30 },
        { value: 20 },
        { value: 10 }
      ]
    }
  },
  mounted() {
    setInterval(this.ballRotate, config.ballTimer)
  },
  methods: {
    ballRotate: function () {
      switch (sharedData.activeBall) {
        case 0:
          this.pointToggle(1, 9)
          break
        case 1:
          this.pointToggle(2, 1)
          break
        case 2:
          this.pointToggle(3, 2)
          break
        case 3:
          this.pointToggle(4, 3)
          break
        case 4:
          this.pointToggle(5, 4)
          break
        case 5:
          this.pointToggle(6, 5)
          break
        case 6:
          this.pointToggle(7, 6)
          break
        case 7:
          this.pointToggle(8, 7)
          break
        case 8:
          this.pointToggle(9, 8)
          break
        default:
          console.log("something is remarkably broken")
          break
      }

      sharedData.score = this.points[sharedData.activeBall].value

      if (sharedData.activeBall + 1 != 9) {
        sharedData.activeBall = sharedData.activeBall + 1
      } else {
        sharedData.activeBall = 0
      }

      return true
    },
    pointToggle: function (on, off) {
      document
        .querySelector(`#ball-holder :nth-child(${on})`)
        .classList.add("active")
      document
        .querySelector(`#ball-holder :nth-child(${off})`)
        .classList.remove("active")
    },
    getCurrentPoints: function () {
      return sharedData.activeBall
    }
  }
}
</script>

<style scoped>
/* your mom */
#ball-holder {
  display: flex;
}
#ball-holder div:nth-child(1) {
  position: absolute;
  top: 143px;
  left: 95px;
}
#ball-holder div:nth-child(2) {
  position: absolute;
  top: 75px;
  left: 135px;
}
#ball-holder div:nth-child(3) {
  position: absolute;
  top: 30px;
  left: 205px;
}
#ball-holder div:nth-child(4) {
  position: absolute;
  top: 12px;
  left: 283px;
}
#ball-holder div:nth-child(5) {
  position: absolute;
  top: 9px;
  left: 364px;
}
#ball-holder div:nth-child(6) {
  position: absolute;
  top: 12px;
  left: 454px;
}
#ball-holder div:nth-child(7) {
  position: absolute;
  top: 37px;
  left: 540px;
}
#ball-holder div:nth-child(8) {
  position: absolute;
  top: 90px;
  left: 600px;
}
#ball-holder div:nth-child(9) {
  position: absolute;
  top: 163px;
  left: 630px;
}
.ball {
  width: var(--ball-size);
  height: var(--ball-size);
  background: url("../assets/ball_inactive.png") no-repeat center;
  background-size: var(--ball-size) var(--ball-size);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #50473c;
  margin: 10px;
}
.active {
  background: url("../assets/ball_active.png") no-repeat center;
  background-size: var(--ball-size) var(--ball-size);
  color: #493926;
}
</style>
