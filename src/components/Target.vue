<template>
  <div class="ball"></div>
</template>

<script>
export default {
  name: "Target",
  props: ["color", "status"],
  mounted() {
    this.$el.classList.add(`${this.color}_${this.status}`)
  }
}
</script>

<style scoped>
.ball {
  height: 130px;
  width: 130px;
  margin: 10px;
}
.red_active {
  background: url("../assets/red_active.png") no-repeat center;
}
.red_inactive {
  background: url("../assets/red_inactive.png") no-repeat center;
}
.yellow_active {
  background: url("../assets/yellow_active.png") no-repeat center;
}
.yellow_inactive {
  background: url("../assets/yellow_inactive.png") no-repeat center;
}
.blue_active {
  background: url("../assets/blue_active.png") no-repeat center;
}
.blue_inactive {
  background: url("../assets/blue_inactive.png") no-repeat center;
}
.nose_active {
  background: url("../assets/red_nose_active.png") no-repeat center;
}
.nose_inactive {
  background: url("../assets/red_nose_inactive.png") no-repeat center;
}
.eye_active {
  background: url("../assets/blue_eye_active.png") no-repeat center;
}
.eye_inactive {
  background: url("../assets/blue_eye_inactive.png") no-repeat center;
}
</style>
