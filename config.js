/* =============================================================
   💌 FILE CẤU HÌNH — Duyên chỉ cần sửa file này là đủ nha
   -------------------------------------------------------------
   - Sửa chữ trong dấu ngoặc kép "..." thôi, đừng xoá dấu phẩy.
   - Lưu file lại rồi mở (hoặc tải lại) index.html để xem.
   ============================================================= */

window.LOVE_CONFIG = {
  /* ---------- 1. Tên hai đứa ---------- */
  herName: "Duyên",
  hisName: "Tít",

  /* ---------- 2. Nhạc nền ----------
     Bỏ file nhạc vào thư mục /music và đặt tên là love-song.mp3
     (hoặc đổi đường dẫn bên dưới cho khớp tên file của bạn).
     Chưa có file thì web vẫn chạy bình thường. */
  music: "music/love-song.mp3",

  // true = tự bật nhạc ngay khi anh ấy bấm nút "Nhấn vào đây nhé ♡"
  // false = chỉ bật khi bấm nút nhạc ở góc màn hình
  playMusicOnOpen: false,

  /* ---------- 3. Timeline ----------
     Sửa phần "date" thành ngày thật, ví dụ: "14 · 02 · 2024"
     "title" là tiêu đề, "note" là một câu nhỏ bên dưới. */
  timeline: [
    {
      date: "[Ngày chúng mình gặp nhau]",
      title: "Ngày mình gặp nhau",
      note: "Lúc đó em đâu có biết người này sau này lại quan trọng với em như vậy.",
    },
    {
      date: "[Ngày em nhận ra mình thích anh]",
      title: "Ngày em bắt đầu để ý anh",
      note: "Tự nhiên thấy mình hay mở điện thoại xem anh nhắn chưa. Lạ ghê.",
    },
    {
      date: "[Ngày anh trở thành người đặc biệt]",
      title: "Ngày anh trở thành người đặc biệt",
      note: "Là lúc em nhận ra có chuyện gì vui cũng muốn kể anh nghe đầu tiên.",
    },
    {
      date: "[Ngày anh trở thành người yêu của em]",
      title: "Ngày chúng mình gọi nhau là người yêu",
      note: "Hôm đó em vui lắm. Chỉ là giả vờ bình tĩnh thôi.",
    },
    {
      date: "hôm nay, ngày mai, và nữa...",
      title: "Và những ngày sắp tới...",
      note: "Chưa biết sẽ thế nào, nhưng em muốn đi cùng anh rồi mình cùng biết.",
      future: true,
    },
  ],

  /* ---------- 4. Album ảnh ----------
     Bỏ ảnh vào thư mục /images, đặt tên photo-1.jpg, photo-2.jpg...
     Ảnh nào chưa có thì web sẽ hiện ô trống dễ thương thay thế.
     Muốn thêm/bớt ảnh thì thêm/bớt dòng { src, caption }. */
  photos: [
    { src: "images/photo-1.jpg", caption: "Nhìn lại vẫn thấy thương ghê." },
    { src: "images/photo-2.jpg", caption: "Khoảnh khắc em muốn giữ lại thật lâu." },
    { src: "images/photo-3.jpg", caption: "Ừ thì... người yêu em đẹp trai thật." },
    { src: "images/photo-4.jpg", caption: "Hôm đó anh làm em cười quá trời." },
    { src: "images/photo-5.jpg", caption: "Chụp xấu cũng được, miễn là có anh." },
    { src: "images/photo-6.jpg", caption: "Một ngày bình thường mà em nhớ mãi." },
  ],
};
