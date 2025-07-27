export function parseThaiDate(dateStr) {
    if (!dateStr) return new Date(0);
    let [datePart, timePart] = dateStr.split('/');
    datePart = datePart.trim();
    timePart = timePart ? timePart.replace('น.', '').trim() : null;

    const thaiMonths = {
        'ม.ค.': 0, 'ก.พ.': 1, 'มี.ค.': 2, 'เม.ย.': 3,
        'พ.ค.': 4, 'มิ.ย.': 5, 'ก.ค.': 6, 'ส.ค.': 7,
        'ก.ย.': 8, 'ต.ค.': 9, 'พ.ย.': 10, 'ธ.ค.': 11
    };

    const dateRegex = /(\d{1,2})\s([ก-๙\.]+)\s(\d{2,4})/;
    const match = datePart.match(dateRegex);
    if (!match) return new Date(0);

    let day = parseInt(match[1]);
    let month = thaiMonths[match[2]] ?? 0;
    let year = parseInt(match[3]);
    if (year < 1000) year += 2500;

    let hours = 0, minutes = 0;
    if (timePart) {
        const timeRegex = /(\d{1,2})\.(\d{1,2})/;
        const timeMatch = timePart.match(timeRegex);
        if (timeMatch) {
            hours = parseInt(timeMatch[1]);
            minutes = parseInt(timeMatch[2]);
        }
    }

    return new Date(year, month, day, hours, minutes);
}
