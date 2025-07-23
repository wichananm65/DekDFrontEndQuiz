<template>
  <div class="mt-4">
    <Swiper :modules="[Navigation, Autoplay]" :slides-per-view="2" :lazy="true" :load-prev-next="true"
      :load-prev-next-amount="3" :space-between="30" :centered-slides="true" :loop="true"
      :looped-slides="banners.length" :autoplay="{ delay: 10000, disableOnInteraction: false }"
      :watch-slides-progress="true" :slide-visible-class="'swiper-slide-visible'" class="w-full">
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
import { Navigation, Autoplay } from 'swiper/modules'
import { banners } from '../../data/banners.js'
import 'swiper/css'
import 'swiper/css/navigation'
import '../../assets/css/checkbox.css'
import '../../assets/css/slide.css'
</script>
