<template>
  <div class="container my-5">
    <div class="d-flex align-items-center flex-wrap">
      <p style="font-size: xx-large; font-weight: bold;">รายการที่คั่นไว้</p>
      <div class="ms-auto d-flex flex-row" style="min-width: 200px; max-width: 100%;">
        <SearchBar v-model="searchQuery" v-model:modelSort="SortBy" />
      </div>
    </div>
  </div>
  <hr />
  <div class="container my-5">
    <div class="d-flex align-items-center flex-wrap">
      <p style="color: gray;">จำนวนทั้งหมด {{ bookmarks.length }}</p>

      <div class="d-flex ms-auto">
        <div v-if="!isEditing">
          <button class="btn btn-outline-secondary ms-auto rounded-pill btn-sm" @click="toggleEditing">แก้ไข</button>
        </div>

        <div v-if="isEditing">
          <button class="btn btn-outline-secondary rounded-pill btn-sm" @click="toggleEditing"
            style="margin-right: 10px;">ยกเลิก</button>
          <button class="btn btn-outline-secondary rounded-pill btn-sm" @click="unBookmarks(selectedIds)">
            <i class="bi bi-trash"></i> {{ selectedIds.length }} รายการ
          </button>
        </div>
      </div>
    </div>

    <!--Card-->
    <div class="row g-4 mt-3 mb-5">
      <div class="col-6 col-sm-6 col-md-4" v-for="bookmark in filteredBookmarks.slice(0, visibleBooksMarksCount)"
        :key="bookmark.id" style="cursor: pointer;">
        <div class="card border-0 " :class="{ 'border-primary': selectedIds.includes(bookmark.id) }">

          <!--Checkbox-->
          <div v-if="isEditing" class="form-check position-absolute top-0 end-0 m-2">
            <label class="checkbox-wrapper">
              <input type="checkbox" class="round-checkbox" :value="bookmark.id" v-model="selectedIds" />
              <span class="checkmark">
                <i class="bi bi-check" style="color: white; font-size: 20px;"></i>
              </span>
            </label>
          </div>
          <!--End Checkbox-->

          <img :src="bookmark.cover" />
          <div class="card-body">
            <p class="card-title">{{ bookmark.title }}</p>
            <p class="card-text">{{ bookmark.author }}</p>
            <br class="hide-mobile" />
            <div style="color: gray;">
              <p class="card-text"><i class="bi bi-list-ul"></i> ตอนที่ {{ bookmark.chapter }}</p>
              <p class="card-text"><i class="bi bi-bookmark-fill"></i> คั่นล่าสุด {{ bookmark.lastBookmark }}</p>
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
          style="margin-right: 20px; border: 3px solid palevioletred; color: palevioletred;">แสดงน้อยลง</button>
      </div>
      <div v-else>
        <button class="btn btn-outline-secondary" style="margin-right: 20px; border: 3px solid gray;" @click="showLess"
          disabled>แสดงน้อยลง</button>
      </div>

      <div v-if="visibleCount >= bookmarks.length">
        <button class="btn btn-outline-secondary" @click="showMore" disabled
          style="border: 3px solid gray;">แสดงเพิ่มเติม</button>
      </div>
      <div v-else>
        <button class="btn btn-outline-secondary" @click="showMore"
          style="margin-right: 20px; color: orange; border: 3px solid orange;">แสดงเพิ่มเติม</button>
      </div>
    </div>
    <!--End Show More/Less Buttons-->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { bookmarks, deleteBookmarks } from '../../data/bookmarks.js'
import { computed } from 'vue'
import SearchBar from '../Function/searchBar.vue'
import SortBy from '../Function/sortBy.vue'

const isEditing = ref(false)
const selectedIds = ref([])

const toggleEditing = () => {
  isEditing.value = !isEditing.value
  selectedIds.value = []
}

const unBookmarks = (ids) => {
  deleteBookmarks(ids)
  selectedIds.value = []
  toggleEditing()
}

const searchQuery = ref('')
const filteringBookmarks = computed(() =>
  bookmarks.filter(b =>
    b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const visibleCount = ref(9)
const showMore = () => {
  visibleCount.value += 6
}
const showLess = () => {
  visibleCount.value = Math.max(9, visibleCount.value - 6)
}
const filteredBookmarks = computed(() =>
  filteringBookmarks.value.slice(0, visibleCount.value)
)
</script>
