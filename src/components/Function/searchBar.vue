<template>
  <div class="button-group scale-control" style="border: 1px solid #ccc; border-radius: 30px; overflow: hidden; max-width: 300px;">

      <div class="d-flex flex-row align-items-center">
        <button v-if="showSort" type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle"
        data-bs-toggle="dropdown" aria-expanded="false" style="border: none; background: transparent;">
        <i class="bi bi-funnel ms-auto" style="color: gray;"></i>
        <span class="ms-1">{{ sortLabels[sortBy] }}</span>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#" @click.prevent="setSort('title')">ตัวอักษร</a></li>
        <li><a class="dropdown-item" href="#" @click.prevent="setSort('uploadDate')">วันที่อัปโหลด</a></li>
        <li><a class="dropdown-item" href="#" @click.prevent="setSort('lastBookmark')">วันที่คั่น</a></li>
      </ul>
      <input type="text" v-model="searchQuery" placeholder="ค้นหา..." class="form-control"
        @input="$emit('update:modelValue', searchQuery)" />

    </div>
    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  modelSort: {
    type: String,
    default: 'title'
  },
  showSort: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue', 'update:modelSort'])

const searchQuery = ref(props.modelValue || '')
const sortBy = ref(props.modelSort || 'title')

const sortLabels = {
  title: 'ตัวอักษร',
  uploadDate: 'วันที่อัปโหลด',
  lastBookmark: 'วันที่คั่น'
}

watch(() => props.modelValue, (newVal) => {
  searchQuery.value = newVal
})

watch(() => props.modelSort, (newVal) => {
  sortBy.value = newVal
})

function setSort(key) {
  sortBy.value = key
  emits('update:modelSort', key)
}


</script>

<style>
@media (max-width: 576px) {
  .form-control {
    max-width: 100px;
  }
  .scale-control {
    margin-bottom: 10px;
  }
}
</style>
