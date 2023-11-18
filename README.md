# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`: dùng để chạy code(port 3000)

### `npm install`: dùng để cập nhật package -> khi pull code về hoặc thêm package
khi pull code 

---

Cấu trúc code:
api: lưu các API để lấy dữ liệu từ backend

page: nơi viết giao diện cho các thành phần của chương trình

redux: lưu trữ các global state

routes: định tuyến từ đường dẫn đến các component ở trong page

App.js và index.js: thành phần bao bọc tất cả các code bên trong

----------
Todo:
Trong routes/index, định nghĩa đường dẫn đến trang và component sử dụng:

VD: {path: '/home', component: <Home />}

khi đến URL: localhost:3000/home sẽ truy cập đến component Home trong page

! Phần định tuyến URL viết thế nào cũng được, có thể điều chỉnh sau

! Chỉ cần làm phần giao diện, xử lý logic để sau

---
nếu khó quá cứ hỏi chatgpt là được:

VD: tạo trang Cấp tài khoản cho giao dịch viên tại điểm giao dịch.

input gồm: username, password, name, transaction place

sử dụng mui

=> Trang CreateTransactionAccount