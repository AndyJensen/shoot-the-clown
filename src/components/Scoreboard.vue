<template>
  <div id="scoreboard">{{ sharedData.totalScore }}</div>
</template>

<script>
import { sharedData } from './Data.js'
export default {
  name: "Scoreboard",
  data() {
    return {
      sharedData
    }
  },
  props: ["score"]
}
</script>

<style scoped>
#scoreboard {
  display: flex;
}
</style>
