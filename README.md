# 💌 Gửi Tít — một lá thư nhỏ từ Duyên

Website "love letter interactive": HTML, CSS, JavaScript thuần. Không cần backend, không cần cài gì thêm.

## 1. Cấu trúc project

```
totinh/
├── index.html      ← toàn bộ nội dung và lời nhắn
├── style.css       ← giao diện, màu sắc, animation
├── script.js       ← hiệu ứng: gõ chữ, chat, tim bay, nhạc, modal...
├── config.js       ← ⭐ FILE CẦN SỬA: tên, ngày tháng, ảnh, nhạc
├── images/         ← bỏ ảnh của hai đứa vào đây (photo-1.jpg ... photo-6.jpg)
└── music/          ← bỏ nhạc vào đây (love-song.mp3)
```

Trang gồm 8 phần: Mở đầu → Lời thú nhận (dạng tin nhắn) → Những điều em thích ở anh (thẻ lật) → Timeline → Album ảnh → Lá thư → Câu hỏi → Lời cuối, cộng thêm nút bí mật (easter egg) và nút nhạc ở góc phải trên.

## 2. Chạy thử trên máy

**Cách nhanh nhất:** bấm đúp vào `index.html`, trang sẽ mở ngay trong trình duyệt.

**Hoặc dùng VS Code:** cài extension **Live Server**, chuột phải vào `index.html` rồi chọn **Open with Live Server**. Mỗi lần lưu file, trang tự tải lại.

> Muốn xem giao diện điện thoại: mở trang, bấm `F12`, rồi bấm biểu tượng 📱 (Toggle device toolbar).

## 3. Thay ảnh

1. Chép ảnh vào thư mục `images/` và đặt tên `photo-1.jpg`, `photo-2.jpg`, … `photo-6.jpg`.
2. Ảnh nào chưa có thì trang tự hiện một ô trống dễ thương thay thế.
3. Muốn đổi câu chú thích dưới ảnh: mở `config.js` và sửa phần `photos`:

```js
photos: [
  { src: "images/photo-1.jpg", caption: "Nhìn lại vẫn thấy thương ghê." },
  ...
],
```

Muốn thêm ảnh thì thêm một dòng `{ src: ..., caption: ... }`, muốn bớt thì xoá dòng đó đi.

⚠️ Lưu ý:
- Khi đưa lên mạng, tên file **phân biệt chữ hoa/thường**: `photo-1.JPG` ≠ `photo-1.jpg`.
- Ảnh iPhone đuôi `.HEIC` sẽ không hiện được. Hãy đổi sang `.jpg` trước.
- Ảnh dọc tỉ lệ 4:5 là đẹp nhất. Nên nén ảnh xuống dưới 500KB (ví dụ bằng squoosh.app) để trang load nhanh trên 4G.

## 4. Thay tên

Mở `config.js`:

```js
herName: "Duyên",
hisName: "Tít",
```

Tên sẽ tự thay ở mọi chỗ trên trang (tiêu đề tab, khung chat, timeline, lá thư, chữ ký…).
Tiêu đề trong `<title>` và `og:title` của `index.html` (hiện ra khi gửi link qua Messenger/Zalo) cũng nên sửa theo.

## 5. Thay ngày tháng

Mở `config.js`, tìm phần `timeline` rồi sửa `date`:

```js
{ date: "[Ngày chúng mình gặp nhau]", ... }
// sửa thành:
{ date: "14 · 02 · 2024", ... }
```

Có thể sửa luôn `title` (tiêu đề) và `note` (câu nhỏ bên dưới).

## 6. Thay nhạc

1. Chép file nhạc vào `music/` và đặt tên `love-song.mp3`.
2. Xong. Bấm nút ♪ ở góc phải trên là nhạc phát.

- Tên file khác thì sửa `music: "music/ten-file.mp3"` trong `config.js`.
- Muốn nhạc tự bật ngay khi anh ấy bấm nút "Nhấn vào đây nhé ♡" thì đặt `playMusicOnOpen: true`. (Trình duyệt không cho tự phát nhạc trước khi người dùng chạm vào màn hình, nên đây là thời điểm sớm nhất có thể.)
- Chưa có file nhạc thì trang vẫn chạy bình thường. Bấm nút nhạc sẽ hiện thông báo nhỏ "Duyên chưa kịp bỏ nhạc vào nè 🥲".
- Nên dùng file dưới 5MB để load nhanh.

## 7. Sửa lời nhắn

Toàn bộ câu chữ (tin nhắn, thẻ lật, lá thư, lời cuối, bí mật) nằm trong `index.html`. Chỉ cần sửa chữ giữa các thẻ, ví dụ:

```html
<p class="msg">Em thích cảm giác có anh ở bên.</p>
```

## 8. Deploy miễn phí

### Cách A — GitHub Pages
1. Tạo tài khoản tại github.com và bấm **New repository**. Đặt tên, ví dụ `gui-tit`, chọn **Public** rồi bấm **Create**.
2. Bấm **uploading an existing file**, kéo thả **toàn bộ nội dung** thư mục `totinh` (gồm cả thư mục `images`, `music`) vào, rồi bấm **Commit changes**.
3. Vào **Settings → Pages**, phần **Source** chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`, rồi bấm **Save**.
4. Đợi 1–2 phút, link sẽ có dạng: `https://<tên-github>.github.io/gui-tit/`

### Cách B — Vercel
1. Đẩy code lên GitHub như bước 1–2 ở trên.
2. Vào vercel.com, đăng nhập bằng GitHub, bấm **Add New → Project** rồi chọn repo `gui-tit`.
3. Framework Preset chọn **Other** rồi bấm **Deploy**. Link sẽ có dạng `https://gui-tit.vercel.app`.

### Cách C — Netlify Drop (không cần GitHub)
Vào app.netlify.com/drop rồi kéo thả cả thư mục `totinh` vào là có link ngay.

> 💡 Repo Public thì ai có link cũng xem được. Nên đặt tên repo khó đoán một chút nếu muốn riêng tư hơn.
> Trước khi gửi, hãy mở thử link trên chính điện thoại của mình một lần nhé.
