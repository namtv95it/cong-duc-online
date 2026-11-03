/** Trả về ngày dạng YYYY-MM-DD theo múi giờ Việt Nam (Asia/Ho_Chi_Minh) */
export function getVietnamDateKey(date: Date = new Date()): string {
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' });
}
