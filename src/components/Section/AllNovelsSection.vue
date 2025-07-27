<template>
  <div class="container my-5 mb-0">
    <div class="d-flex align-items-center flex-wrap">
      <p style="font-size: xx-large; font-weight: bold;">รายการทั้งหมด</p>
      <div class="ms-auto" style="min-width: 200px; max-width: 100%;">
        <SearchBar v-model="searchQuery" v-model:modelSort="sortQuery" :show-sort="false" />
      </div>
    </div>
  </div>

  <hr />

  <div class="container" style="margin-bottom: 10px;">

    <!--Card-->
    <div class="row g-4 mt-3 mb-5">
      <div class="col-4 col-sm-6 col-md-4" v-for="novel in filteredNovels" :key="novel.id" style="cursor: pointer;">
        <div class="card border-0" :class="{ 'border-primary': selectedIds.includes(novel.id) }">
          <div class="form-check position-absolute top-0 end-0 m-2">
            <div v-if="bookmarks.some(value => value.id === novel.id)">
              <i class="bi bi-bookmark-fill" style="color: orange; font-size: 20px;"
                @click="deleteBookmarks([novel.id])"></i>
            </div>
            <div v-else>
              <i class="bi bi-bookmark" style="color: orange; font-size: 20px;" @click="addBookmarks([novel])"></i>
            </div>
          </div>

          <img :src="novel.cover" alt="cover" />
          <div class="card-body">
            <p class="card-title">{{ novel.title }}</p>
            <p class="card-text">{{ novel.author }}</p>
            <br>
            <div style="color: gray;">
              <p class="card-text">
                <i class="bi bi-list-ul"></i> ตอนที่ {{ novel.chapter }}
              </p>
              <p class="card-text">
                <i class="bi bi-calendar-fill"></i> วันที่อัปโหลด {{ novel.uploadDate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End Card-->

    <!--Show More/Less Buttons-->
    <div class="d-flex justify-content-center flex-wrap" style="margin-bottom: 50px; gap: 10px;">
      <div v-if="visibleCount > 9">
        <button class="btn btn-outline-secondary" @click="showLess"
          style="margin-right: 20px; border: 3px solid palevioletred; color: palevioletred;">
          แสดงน้อยลง
        </button>
      </div>
      <div v-else>
        <button class="btn btn-outline-secondary" style="margin-right: 20px; border: 3px solid gray;" @click="showLess"
          disabled>
          แสดงน้อยลง
        </button>
      </div>

      <div v-if="visibleCount >= novels.length">
        <button class="btn btn-outline-secondary" @click="showMore" disabled style="border: 3px solid gray;">
          แสดงเพิ่มเติม
        </button>
      </div>
      <div v-else>
        <button class="btn btn-outline-secondary" @click="showMore"
          style="margin-right: 20px; color: orange; border: 3px solid orange;">
          แสดงเพิ่มเติม
        </button>
      </div>
    </div>
    <!--End Show More/Less Buttons-->
  </div>
</template>

<style scoped>
@media (max-width: 576px) {
  .container {
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }
}
</style>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { addBookmarks, deleteBookmarks, bookmarks } from '../../data/bookmarks.js'
import { fetchMangaList } from '../API.js'

const selectedIds = ref([])
const novels = ref([])
const visibleCount = ref(9)

const limit = 100
let offset = 0

// API
async function loadMoreNovels() {
  try {
    const data = await fetchMangaList(limit, offset)
    if (data.length > 0) {
      novels.value = [...novels.value, ...data]
      offset += limit
    }
  } catch (error) {
    console.error('Error loading novels:', error)
  }
}
onMounted(() => {
  loadMoreNovels()
})

//Search Sort Function
import SearchBar from '../Function/searchBar.vue'
import { parseThaiDate } from '../Function/parseThaiDate.js'
const searchQuery = ref('')
const filteringNovels = computed(() =>
  sortedNovels.value.filter(b =>
    b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
const filteredNovels = computed(() =>
  filteringNovels.value.slice(0, visibleCount.value)
)
const sortedNovels = computed(() => {
  return [...novels.value].sort((a, b) => {
      return new parseThaiDate(b.uploadDate) - new parseThaiDate(a.uploadDate)
  })
})

// Show more/less
const showMore = () => {
  visibleCount.value += 6
  if (visibleCount.value > novels.value.length) {
    loadMoreNovels()
  }
}
const showLess = () => {
  visibleCount.value = Math.max(9, visibleCount.value - 6)
}

</script>
