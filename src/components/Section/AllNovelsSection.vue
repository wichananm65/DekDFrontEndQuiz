<template>
    <div style="margin-top: 100px; margin-left: 100px; margin-right: 100px; margin-bottom: 10px;">
        <div class="d-flex align-items-center">
            <p style="font-size: xx-large; font-weight: bold;">รายการทั้งหมด</p>
            <div class="ms-auto">
                <SearchBar v-model="searchQuery" />
            </div>
        </div>
    </div>
    <hr />
    <div style="margin-top: 50px; margin-left: 100px; margin-right: 100px; margin-bottom: 1px;">
        <div class="d-flex align-items-center">
            <p style="color: gray;">จำนวนทั้งหมด {{ filteredNovels.length }} </p>
        </div>

        <!--Card-->
        <div class="row g-4" style="margin-bottom: 30px;">
            <div class="col-12 col-sm-6 col-md-4" v-for="novel in filteredNovels" :key="novel.id"
                style="cursor: pointer;">
                <div class="card border-0 d-flex flex-row"
                    :class="{ 'border-primary': selectedIds.includes(novel.id) }">
                    <div class="form-check position-absolute top-0 end-0 m-2">
                        <div v-if="bookmarks.some(value => value.id === novel.id)">
                            <i class="bi bi-bookmark-fill" style="color: orange; font-size: 20px;"
                                @click="deleteBookmarks([novel.id])"></i>
                        </div>
                        <div v-else>
                            <i class="bi bi-bookmark" style="color: orange; font-size: 20px;"
                                @click="addBookmarks([novel])"></i>
                        </div>
                    </div>

                    <img :src="novel.cover" alt="cover" class="card-img-top rounded"
                        style="height: 220px; width: 150px; object-fit: cover" />
                    <div class="card-body">
                        <h5 class="card-title" style="font-weight: bold;">{{ novel.title }}</h5>
                        <p class="card-text">{{ novel.author }}</p>
                        <div style="color: gray;">
                            <p class="card-text"><i class="bi bi-list-ul"></i> ตอนที่ {{ novel.chapter }}</p>
                            <p class="card-text"><i class="bi bi-calendar-fill"></i> วันที่อัปโหลด {{ novel.uploadDate
                                }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Card-->

        <!--Show More/Less Buttons-->
        <div class="d-flex justify-content-center" style="margin-bottom: 50px;">
            <div v-if="visibleCount > 9">
                <button class="btn btn-outline-secondary" @click="showLess"
                    style="margin-right: 20px; border: 3px solid palevioletred; color: palevioletred;">แสดงน้อยลง</button>
            </div>
            <div v-else>
                <button class="btn btn-outline-secondary" style="margin-right: 20px; border: 3px solid gray;"
                    @click="showLess" disabled>แสดงน้อยลง</button>
            </div>

            <div v-if="visibleCount >= novels.length">
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
import { ref, computed } from 'vue'
import { novels } from '../../data/novels.js'
import { addBookmarks, deleteBookmarks, bookmarks } from '../../data/bookmarks.js'
const selectedIds = ref([])

import { showMore, showLess, visibleCount } from '../Function/ManageShow.js'

//Search Function
import SearchBar from '../Function/searchBar.vue'
const searchQuery = ref('')
const filteringNovels = computed(() =>
    novels.filter(b =>
        b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

const filteredNovels = computed(() =>
    filteringNovels.value.slice(0, visibleCount.value)
)










</script>
