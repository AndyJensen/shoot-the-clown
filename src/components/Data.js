import { reactive } from "vue"

export const sharedData = reactive({
  activeBall: 0,
  score: 0,
  totalScore: 0,
  music: false
})
