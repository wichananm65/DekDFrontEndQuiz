import { ref } from 'vue'

const visibleCount = ref(9)
const showMore = () => {
    visibleCount.value += 6
}
const showLess = () => {
    visibleCount.value = Math.max(9, visibleCount.value - 6)
}

export { visibleCount, showMore, showLess }