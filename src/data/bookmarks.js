import { reactive } from 'vue'
import mock from '../assets/mock.jpg'

export const bookmarks = reactive([
  { id: 11, title: 'ผู้พิทักษ์แห่งเวลา', author: 'วรพล', chapter: 10, lastBookmark: '20 ก.ค. 68 / 18.05 น.', uploadDate: '18 ก.ค. 68', cover: mock },
  { id: 12, title: 'เสียงกระซิบ', author: 'อรวรรณ', chapter: 4, lastBookmark: '18 ก.ค. 68 / 21.30 น.', uploadDate: '16 ก.ค. 68', cover: mock },
  { id: 13, title: 'ดอกไม้ไฟกลางคืน', author: 'นพดล', chapter: 13, lastBookmark: '22 ก.ค. 68 / 10.10 น.', uploadDate: '20 ก.ค. 68', cover: mock },
  { id: 14, title: 'ทะเลทรายไร้ฝน', author: 'ปริญญา', chapter: 11, lastBookmark: '19 ก.ค. 68 / 16.50 น.', uploadDate: '17 ก.ค. 68', cover: mock },
  { id: 15, title: 'นักเดินทางแห่งมิติ', author: 'ธเนศ', chapter: 18, lastBookmark: '20 ก.ค. 68 / 14.00 น.', uploadDate: '19 ก.ค. 68', cover: mock },
])

export const deleteBookmarks = (selectedIds) => {
  for (let i = bookmarks.length - 1; i >= 0; i--) {
    if (selectedIds.includes(bookmarks[i].id)) {
      bookmarks.splice(i, 1)
    }
  }
}

export const addBookmarks = (newBookmark) => {
  const now = new Date()
  const date = now.toLocaleDateString('th-TH', {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
  })
  const time = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit'
  }).replace(':', '.')
  newBookmark.forEach(novel => {
    if (!bookmarks.some(item => item.id === novel.id)) {
      bookmarks.push({ ...novel, lastBookmark: `${date} / ${time} น.`})
    }
  })
}
