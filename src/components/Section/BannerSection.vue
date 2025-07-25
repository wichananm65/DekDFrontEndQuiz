<template>
  <div class="mt-4">
    <Swiper :modules="[Autoplay, Pagination]" :lazy="true" :load-prev-next="true" :load-prev-next-amount="3"
      :space-between="30" :centered-slides="true" :loop="true" :looped-slides="banners.length"
      :autoplay="{ delay: 10000, disableOnInteraction: false }" :watch-slides-progress="true"
      :slide-visible-class="'swiper-slide-visible'" :pagination="{ clickable: true }" :breakpoints="{
        0: { slidesPerView: 1.5 },
        768: { slidesPerView: 1.5 },
        962: { slidesPerView: 2 }
      }">
      <SwiperSlide v-for="item in banners" :key="item.id" class="custom-slide">
        <div class="slide-content">
          <img :src="item.image" alt="banner" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>


<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { banners } from '../../data/banners.js'
import 'swiper/css'
import 'swiper/css/pagination'
</script>

<style>
.swiper-pagination-bullet {
  background-color: #ffffff;
  width: 10px;
  height: 10px;
  opacity: 0.7;
}

.swiper-pagination-bullet-active {
  background-color: orange;
  border-color: black;
  opacity: 1;
}

.custom-slide {
  width: 360px;
  border-radius: 12px;
  overflow: hidden;
}

.slide-content {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.slide-content img {
  width: 100%;
  height: 500px;
  display: block;
  border-radius: 12px 12px 0 0;
}

@media (max-width: 768px) {
  .custom-slide {
    width: 200px;
    border-radius: 12px;
    overflow: hidden;
  }

  .slide-content {
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
  }

  .slide-content img {
    width: 100%;
    height: 200px;
    display: block;
    border-radius: 12px 12px 0 0;
  }
}
</style>
