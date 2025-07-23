<template>
  <!--Banner-->
  <header>
    <div style="margin-top: 10px;">
      <Swiper :modules="[Navigation, Autoplay]" :slides-per-view="2" :lazy="true" :load-prev-next="true"
        :load-prev-next-amount="3" :space-between="30" :centered-slides="true" :loop="true"
        :looped-slides="banners.length" :autoplay="{ delay: 10000, disableOnInteraction: false }"
        :watch-slides-progress="true" :slide-visible-class="'swiper-slide-visible'" class="w-full">
        <SwiperSlide v-for="item in banners" :key="item.id" class="custom-slide">
          <div class="slide-content">
            <img :src="item.image" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </header>
  <!--End Banner-->

  <body>
    <!--Bookmarks-->
    <div style="
      margin-top: 100px; 
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 1px;">
      <p style="font-size: xx-large; font-weight: bold;">รายการที่คั่นไว้</p>
    </div>
    <hr>
    <div style="    
      margin-top: 50px; 
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 1px;">
      <!--Bookmarks Header-->
      <div class="d-flex align-items-center">
        <p style="color: gray;">จำนวนทั้งหมด {{ bookmarks.length }} </p>

        <div class="d-flex ms-auto">
          <div v-if="!isEditing">
            <button class="btn btn-outline-secondary ms-auto rounded-pill btn-sm" @click="toggleEditing">แก้ไข</button>
          </div>

          <div v-if="isEditing">
            <button class="btn btn-outline-secondary rounded-pill btn-sm" @click="toggleEditing"
              style="margin-right: 10px;"> ยกเลิก </button>
            <button class="btn btn-outline-secondary rounded-pill btn-sm" @click="unBookmarks(selectedIds)"><i
                class="bi bi-trash"></i> {{ selectedIds.length }} รายการ </button>
          </div>
        </div>
      </div>
      <!--End Bookmarks Header-->

      <!--Bookmarks Card-->
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4" v-for="bookmark in bookmarks" :key="bookmark.id" style="cursor: pointer;">
          <div class="card border-0 d-flex flex-row" :class="{ 'border-primary': selectedIds.includes(bookmark.id) }">

            <!--Bookmarks checkbox-->
            <div v-if="isEditing" class="form-check position-absolute top-0 end-0 m-2">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="round-checkbox" :value="bookmark.id" v-model="selectedIds"
                  style="color: orange;">
                <span class="checkmark">
                  <i class="bi bi-check" style="color: white; font-size: 20px;"></i>
                </span>
              </label>
            </div>
            <!--End Bookmarks checkbox-->

            <img :src="bookmark.cover" alt="cover" class="card-img-top rounded"
              style="height: 220px; width: 150px; object-fit: cover" />
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold;">{{ bookmark.title }}</h5>
              <p class="card-text">{{ bookmark.author }}</p>
              <br>
              <br>
              <div style="color: gray;">
                <p class="card-text"><i class="bi bi-list-ul"></i> ตอนที่ {{ bookmark.chapter }}</p>
                <p class="card-text"><i class="bi bi-bookmark-fill"></i> คั่นล่าสุด {{ bookmark.lastBookmark }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <!--EndBookmarks Card-->

    </div>
    <!--End Bookmarks-->

    <!--All Novels-->
    <div style="
      margin-top: 100px; 
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 1px;">
      <p style="font-size: xx-large; font-weight: bold;">รายการทั้งหมด</p>
    </div>
    <hr>
    <div style="    
      margin-top: 50px; 
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 1px;">
      <!--Novels Header-->
      <div class="d-flex align-items-center">
        <p style="color: gray;">จำนวนทั้งหมด {{ novels.length }} </p>
      </div>
      <!--End Bookmarks Header-->

      <!--Novels Card-->
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4" v-for="novel in novels" :key="novel.id" style="cursor: pointer;">
          <div class="card border-0 d-flex flex-row" :class="{ 'border-primary': selectedIds.includes(novel.id) }">

            <div class="form-check position-absolute top-0 end-0 m-2">
              <div v-if="bookmarks.some(value => value.id === novel.id)">
                <i class="bi bi-bookmark-fill" style="color: orange; font-size: 20px;"
                  @click="deleteBookmarks([novel.id])"></i>
              </div>

              <div v-else>
                <i class="bi bi-bookmark" style="color: orange; font-size: 20px;" @click="addBookmarks([novel])"></i>
              </div>
            </div>

            <img :src="novel.cover" alt="cover" class="card-img-top rounded"
              style="height: 220px; width: 150px; object-fit: cover" />
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold;">{{ novel.title }}</h5>
              <p class="card-text">{{ novel.author }}</p>
              <div style="color: gray;">
                <p class="card-text"><i class="bi bi-list-ul"></i> ตอนที่ {{ novel.chapter }}</p>
              </div>
              <br>
              <br>
              <div style="color: gray;">
                <p class="card-text"><i class="bi bi-calendar-fill"></i> วันที่อัปโหลด {{ novel.uploadDate }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <!--End Novels Card-->

    </div>
    <!--End All Novels-->

  </body>



</template>
<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { novels } from '../src/data/novels.js'
import '../src/assets/css/checkbox.css'
import '../src/assets/css/slide.css'
import { banners } from '../src/data/banners.js'
import { addBookmarks, bookmarks, deleteBookmarks } from './data/bookmarks.js'

const isEditing = ref(false)
const selectedIds = ref([])

const toggleEditing = () => {
  isEditing.value = !isEditing.value
  selectedIds.value = []
}

const unBookmarks = (selectedIds) => {
  deleteBookmarks(selectedIds)
  selectedIds.value = []
  toggleEditing()
}

</script>

<style scoped></style>
