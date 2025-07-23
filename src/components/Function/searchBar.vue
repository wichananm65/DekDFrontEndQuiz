<template>
  <input
    type="text"
    v-model="searchQuery"
    placeholder="ค้นหา..."
    class="form-control"
    style="border-radius: 100px;"
    @input="$emit('update:modelValue', searchQuery)"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})

const searchQuery = ref(props.modelValue || '')
watch(() => props.modelValue, (newVal) => {
  searchQuery.value = newVal
})

</script>

<style scoped>
</style>
