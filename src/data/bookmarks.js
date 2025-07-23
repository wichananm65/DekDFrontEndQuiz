import { reactive } from 'vue'

export const bookmarks = reactive([
  { id: 11, title: 'ผู้พิทักษ์แห่งเวลา', author: 'วรพล', chapter: 10, lastBookmark: '20 ก.ค. 68 / 18.05 น.', uploadDate: '18 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 12, title: 'เสียงกระซิบ', author: 'อรวรรณ', chapter: 4, lastBookmark: '18 ก.ค. 68 / 21.30 น.', uploadDate: '16 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 13, title: 'ดอกไม้ไฟกลางคืน', author: 'นพดล', chapter: 13, lastBookmark: '22 ก.ค. 68 / 10.10 น.', uploadDate: '20 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 14, title: 'ทะเลทรายไร้ฝน', author: 'ปริญญา', chapter: 11, lastBookmark: '19 ก.ค. 68 / 16.50 น.', uploadDate: '17 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 15, title: 'นักเดินทางแห่งมิติ', author: 'ธเนศ', chapter: 18, lastBookmark: '20 ก.ค. 68 / 14.00 น.', uploadDate: '19 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 16, title: 'ดวงดาวบนฟ้า', author: 'สิริพร', chapter: 2, lastBookmark: '17 ก.ค. 68 / 19.15 น.', uploadDate: '15 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 17, title: 'เทพนิยายสู่โลกจริง', author: 'สุธี', chapter: 16, lastBookmark: '21 ก.ค. 68 / 09.25 น.', uploadDate: '20 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 18, title: 'รักในสายลม', author: 'ธนัช', chapter: 1, lastBookmark: '16 ก.ค. 68 / 12.00 น.', uploadDate: '14 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 19, title: 'สายฟ้าฟาด', author: 'กิติ', chapter: 19, lastBookmark: '22 ก.ค. 68 / 13.45 น.', uploadDate: '21 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 20, title: 'แสงทองในสายหมอก', author: 'ปวีณา', chapter: 17, lastBookmark: '20 ก.ค. 68 / 11.55 น.', uploadDate: '18 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 21, title: 'ผจญภัยในป่าใหญ่', author: 'ชลธิชา', chapter: 21, lastBookmark: '21 ก.ค. 68 / 20.10 น.', uploadDate: '19 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 22, title: 'ความลับใต้ทะเล', author: 'พงศกร', chapter: 22, lastBookmark: '22 ก.ค. 68 / 07.30 น.', uploadDate: '20 ก.ค. 68', cover: '../src/assets/mock.jpg' },
  { id: 23, title: 'เงามืดแห่งอดีต', author: 'อัครินทร์', chapter: 23, lastBookmark: '19 ก.ค. 68 / 18.45 น.', uploadDate: '17 ก.ค. 68', cover: '../src/assets/mock.jpg' },
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
