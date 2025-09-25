# Hướng dẫn Deploy TodoX App

## Các vấn đề đã được sửa

1. **Cấu hình Axios**: Đã sửa để sử dụng BASE_URL thay vì hardcode localhost
2. **Cấu hình CORS**: Đã cập nhật để hỗ trợ production
3. **Biến môi trường**: Đã sửa tên biến MONGODB_URI
4. **Module type**: Đã đồng nhất type module giữa các package.json

## Các bước deploy

### 1. Chuẩn bị MongoDB Atlas

1. Truy cập https://cloud.mongodb.com
2. Tạo cluster miễn phí
3. Tạo database user với username/password
4. Whitelist IP addresses (0.0.0.0/0 cho tất cả IP)
5. Lấy connection string: `mongodb+srv://username:password@cluster.mongodb.net/todox`

### 2. Deploy trên Render.com

#### Cấu hình Render:
1. **Repository**: Kết nối GitHub repository `HuynhPPP/hpCode_todoXApp`
2. **Root Directory**: Để trống (sử dụng root của repo)
3. **Build Command**: `npm run build`
4. **Start Command**: `npm start`
5. **Node Version**: 18.x hoặc 20.x

#### Biến môi trường trên Render:
Vào **Environment** tab và thêm:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todox
NODE_ENV=production
PORT=5001
```

**⚠️ QUAN TRỌNG**: Thay `username`, `password`, và `cluster` bằng thông tin thực từ MongoDB Atlas của bạn!

### 3. Khắc phục lỗi "Connected to MongoDB failed"

Nếu vẫn gặp lỗi này, kiểm tra:

1. **Biến môi trường đã được set chưa**:
   - Vào Render Dashboard → Environment
   - Đảm bảo có `MONGODB_URI` với connection string đúng

2. **Connection string đúng format**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/todox?retryWrites=true&w=majority
   ```

3. **MongoDB Atlas Network Access**:
   - Vào MongoDB Atlas → Network Access
   - Thêm IP `0.0.0.0/0` để allow tất cả IP

4. **Database User**:
   - Tạo user với quyền `Read and write to any database`

### 4. Test deployment

Sau khi deploy thành công:
1. **Backend API**: `https://your-render-app.onrender.com/api/tasks`
2. **Frontend**: `https://your-render-app.onrender.com`
3. Kiểm tra console để đảm bảo không có lỗi CORS

## Troubleshooting

### Lỗi thường gặp:

1. **"Connected to MongoDB failed"**:
   - Kiểm tra biến môi trường `MONGODB_URI`
   - Kiểm tra MongoDB Atlas Network Access
   - Kiểm tra username/password

2. **"ERR_CONNECTION_REFUSED"**:
   - Đã được sửa bằng cách cập nhật axios config
   - Frontend sẽ sử dụng relative path `/api`

3. **CORS errors**:
   - Đã được sửa bằng cách cập nhật CORS config
   - Backend sẽ allow tất cả origins trong production

## Lưu ý quan trọng

- Render free tier sẽ sleep sau 15 phút không hoạt động
- Lần đầu truy cập có thể mất 30-50 giây để wake up
- Đảm bảo NODE_ENV=production khi deploy
- Frontend sẽ tự động sử dụng relative path `/api` thay vì localhost
