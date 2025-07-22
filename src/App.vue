<template>
  <header>
    <div class = "overflow: visible;" style="margin-top: 10px; margin-left: -10vw; margin-right: -10vw;">
        <Swiper
        :modules="[Navigation, Autoplay]"
        :slides-per-view="2"
        :lazy="true"
        :load-prev-next="true"
        :load-prev-next-amount="3"
        :space-between="30"
        :centered-slides="true"
        :loop="true"
        :looped-slides="banners.length"
        :autoplay="{ delay: 15000, disableOnInteraction: false }"
        :watch-slides-progress="true"
        :slide-visible-class="'swiper-slide-visible'"
        class="w-full"
      >
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
        
      <div class = "d-flex align-items-center" >
        <p style="color: gray;">จำนวนทั้งหมด</p>
        
        <button class="btn btn-outline-secondary ms-auto rounded-pill btn-sm">แก้ไข</button>
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
