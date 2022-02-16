<template>
  <div>
    <PointBalls />
  </div>
</template>

<script>
import PointBalls from "./components/PointBalls.vue"

export default {
  name: "App",
  components: {
    PointBalls
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
