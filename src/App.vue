<template>

    <body>
        <BannerSection />
        <BookMarksSection />
        <AllNovelsSection />
    </body>

</template>
<script setup>
import BannerSection from './components/Section/BannerSection.vue';
import AllNovelsSection from './components/Section/AllNovelsSection.vue'
import BookMarksSection from './components/Section/BookMarksSection.vue'
import './assets/css/custom-card.css'
import './assets/css/custom-checkbox.css'
</script>

<style scoped>
body {
    font-family: 'Prompt', sans-serif;
    font-size: 15px;
}

</style>
