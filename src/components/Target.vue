<template>
  <div class="ball"></div>
</template>

<script>
export default {
  name: "Target",
  props: ["color", "status"],
  mounted() {
    this.$el.classList.add(`${this.color}_${this.status}`)
  },
  updated() {
    this.$el.classList.add(`${this.color}_${this.status}`)
  }
}
</script>

<style scoped>
.ball {
  height: var(--target-size);
  width: var(--target-size);
  border-radius:50px;
}
.red_active {
  background: url("../assets/red_active.png") no-repeat center;
  background-size: var(--target-size);
}
.red_inactive {
  background: url("../assets/red_inactive.png") no-repeat center;
  background-size: var(--target-size);
}
.yellow_active {
  background: url("../assets/yellow_active.png") no-repeat center;
  background-size: var(--target-size);
}
.yellow_inactive {
  background: url("../assets/yellow_inactive.png") no-repeat center;
  background-size: var(--target-size);
}
.blue_active {
  background: url("../assets/blue_active.png") no-repeat center;
  background-size: var(--target-size);
}
.blue_inactive {
  background: url("../assets/blue_inactive.png") no-repeat center;
  background-size: var(--target-size);
}
.nose_active {
  background: url("../assets/red_nose_active.png") no-repeat center;
  background-size: var(--target-size);
}
.nose_inactive {
  background: url("../assets/red_nose_inactive.png") no-repeat center;
  background-size: var(--target-size);
}
.eye_active {
  background: url("../assets/blue_eye_active.png") no-repeat center;
  background-size: var(--target-size);
}
.eye_inactive {
  background: url("../assets/blue_eye_inactive.png") no-repeat center;
  background-size: var(--target-size);
}
</style>
