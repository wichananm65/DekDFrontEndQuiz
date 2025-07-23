import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

function formatDateToThai(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    return d.toLocaleDateString('th-TH', options);
}

function mapMangaItem(item) {
    const attr = item.attributes || {};
    let title = '';
    if (typeof attr.title === 'object') {
        title = attr.title.th || attr.title.en || Object.values(attr.title)[0] || 'ไม่มีชื่อเรื่อง';
    } else {
        title = attr.title || 'ไม่มีชื่อเรื่อง';
    }

    const coverRel = item.relationships?.find(rel => rel.type === 'cover_art');
    const coverFileName = coverRel?.attributes?.fileName;
    const cover = coverFileName
        ?   `https://uploads.mangadex.org/covers/${item.id}/${coverFileName}.256.jpg`
        : '';

    const authorRel = item.relationships?.find(rel => rel.type === 'author');
    const authorName = authorRel?.attributes?.name || 'ไม่ระบุ';

    return {
        id: item.id,
        title,
        author: authorName,
        chapter: attr.lastChapter || '-',
        cover,
        uploadDate: formatDateToThai(attr.updatedAt || attr.createdAt),
    };
}

export async function fetchMangaList(limit = 20) {
    try {
        const res = await api.get('/manga', {
            params: {
                limit,
                includes: ['cover_art', 'author'],
                availableTranslatedLanguage: ['en', 'th'],
                order: {
                    updatedAt: 'desc',
                },
            },
        });

        if (res.data?.data) {
            return res.data.data.map(mapMangaItem);
        }
        return [];
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export async function get(url, config = {}) {
  return api.get(url, config);
}

export default {
    fetchMangaList,
};
