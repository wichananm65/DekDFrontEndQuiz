<template>
  <header>
    <div class="overflow: visible;" style="margin-top: 10px;">
      <Swiper :modules="[Navigation, Autoplay]" :slides-per-view="2" :lazy="true" :load-prev-next="true"
        :load-prev-next-amount="3" :space-between="30" :centered-slides="true" :loop="true"
        :looped-slides="banners.length" :autoplay="{ delay: 15000, disableOnInteraction: false }"
        :watch-slides-progress="true" :slide-visible-class="'swiper-slide-visible'" class="w-full">
        <SwiperSlide v-for="item in banners" :key="item.id" class="custom-slide">
          <div class="slide-content">
            <img :src="item.image" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  </header>


  <body>
    <div style="
      margin-top: 100px; 
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 1px;">
      <h1 class="h5 fw-bold mb-3">รายการที่คั่นไว้</h1>
    </div>
    <hr>
    <div style="
      margin-top: 50px; 
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 1px;">

      <div class="d-flex align-items-center">
        <p style="color: gray;">จำนวนทั้งหมด {{ novels.length }} </p>

        <button class="btn btn-outline-secondary ms-auto rounded-pill btn-sm" @click="toggleEditing">{{ isEditing ?
          'ลบ' : 'แก้ไข' }}</button>
      </div>

      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4" v-for="novel in novels" :key="novel.id">
          <div class="card border-0 d-flex flex-row" :class="{ 'border-primary': selectedIds.includes(novel.id) }">

            <div v-if="isEditing" class="form-check position-absolute top-0 end-0 m-2">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="round-checkbox" :value="novel.id" v-model="selectedIds"
                  style="color: orange;">
                <span class="checkmark">
                  <i class="bi bi-check" style="color: white; font-size: 20px;"></i>
                </span>
              </label>

            </div>

            <img :src="novel.cover" alt="cover" class="card-img-top rounded"
              style="height: 220px; width: 150px; object-fit: cover" />
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold;">{{ novel.title }}</h5>
              <p class="card-text">{{ novel.author }}</p>
              <br>
              <br>
              <div style="color: gray;">
                <p class="card-text"><i class="bi bi-list-ul"></i> ตอนที่ {{ novel.chapter }}</p>
                <p class="card-text"><i class="bi bi-bookmark-fill"></i> คั่นล่าสุด {{ novel.lastBookmark }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
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

const isEditing = ref(false)
const selectedIds = ref([])
const toggleEditing = () => {
  if (isEditing.value && selectedIds.value.length > 0) {
    novels.value = novels.value.filter(novel => !selectedIds.value.includes(novel.id))
    selectedIds.value = []
  }
  isEditing.value = !isEditing.value
}

</script>

<style scoped>

</style>
