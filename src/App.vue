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

        <button class="btn btn-outline-secondary ms-auto rounded-pill btn-sm">แก้ไข</button>
      </div>

      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4" v-for="novel in novels" :key="novel.id">
          <div class="card border-0 d-flex flex-row">
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

const banners = ref([
  { id: 1, image: '../src/assets/ReZero.webp' },
  { id: 2, image: '../src/assets/iminlovewithvillainess.jpg' },
  { id: 3, image: '../src/assets/unnamedmemory.jpg' },
  { id: 4, image: '../src/assets/86-eighty-six-banner.webp' },
  { id: 1, image: '../src/assets/ReZero.webp' },
  { id: 2, image: '../src/assets/iminlovewithvillainess.jpg' },
  { id: 3, image: '../src/assets/unnamedmemory.jpg' },
  { id: 4, image: '../src/assets/86-eighty-six-banner.webp' },
])


</script>

<style scoped>
.swiper-slide {
  visibility: visible !important;
  opacity: 1 !important;
  transition: none !important;
  transform: translate3d(0, 0, 0) !important;
}

.custom-slide {
  width: 360px;
  border-radius: 12px;
  overflow: hidden;
}

.slide-content {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  background: white;
}

.slide-content:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.slide-content img {
  width: 100%;
  height: 500px;
  display: block;
  border-radius: 12px 12px 0 0;
}

@media (max-width: 1024px) {
  .custom-slide {
    width: 280px;
  }

  .slide-content img {
    height: 180px;
  }
}

@media (max-width: 640px) {
  .custom-slide {
    width: 220px;
  }

  .slide-content img {
    height: 140px;
  }
}
</style>
