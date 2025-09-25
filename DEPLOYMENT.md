# Hướng dẫn Deploy TodoX App

## Các vấn đề đã được sửa

1. **Cấu hình Axios**: Đã sửa để sử dụng BASE_URL thay vì hardcode localhost
2. **Cấu hình CORS**: Đã cập nhật để hỗ trợ production
3. **Biến môi trường**: Đã sửa tên biến MONGODB_URI

## Các bước deploy

### 1. Chuẩn bị Backend

Tạo file `.env` trong thư mục `Backend/` với nội dung:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todox

# Server
PORT=5001
NODE_ENV=production

# CORS (tùy chọn - nếu không set sẽ allow all origins)
FRONTEND_URL=https://your-frontend-domain.com
```

### 2. Build Frontend

```bash
cd Frontend
npm run build
```

### 3. Deploy Backend

#### Với Render.com:
1. Kết nối repository GitHub
2. Chọn thư mục `Backend` làm root directory
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Thêm các biến môi trường trong dashboard

#### Với Heroku:
```bash
cd Backend
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-connection-string
git subtree push --prefix Backend heroku main
```

### 4. Deploy Frontend

#### Với Vercel/Netlify:
1. Kết nối repository
2. Set build command: `cd Frontend && npm run build`
3. Set output directory: `Frontend/dist`
4. Set root directory: `Frontend`

### 5. Cấu hình Database

Sử dụng MongoDB Atlas (miễn phí):
1. Tạo cluster tại https://cloud.mongodb.com
2. Tạo database user
3. Whitelist IP addresses (0.0.0.0/0 cho tất cả)
4. Lấy connection string và thêm vào biến môi trường

## Kiểm tra sau khi deploy

1. Backend API: `https://your-backend-url.com/api/tasks`
2. Frontend: `https://your-frontend-url.com`
3. Kiểm tra console để đảm bảo không có lỗi CORS

## Lưu ý quan trọng

- Đảm bảo NODE_ENV=production khi deploy
- Frontend sẽ tự động sử dụng relative path `/api` thay vì localhost
- CORS đã được cấu hình để hoạt động với production
