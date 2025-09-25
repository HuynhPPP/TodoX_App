# 🔍 Debug MongoDB Connection Issues

## Các bước kiểm tra chi tiết

### 1. Kiểm tra biến môi trường trên Render

Vào **Render Dashboard** → **Environment** và đảm bảo có:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todox?retryWrites=true&w=majority
NODE_ENV=production
PORT=5001
```

### 2. Kiểm tra MongoDB Atlas

#### A. Network Access:
1. Vào MongoDB Atlas → **Network Access**
2. Click **Add IP Address**
3. Chọn **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

#### B. Database User:
1. Vào **Database Access**
2. Click **Add New Database User**
3. Chọn **Password** authentication
4. Username: `todox-user` (hoặc tên khác)
5. Password: Tạo password mạnh
6. **Database User Privileges**: Chọn **Read and write to any database**
7. Click **Add User**

#### C. Connection String:
1. Vào **Database** → **Connect**
2. Chọn **Connect your application**
3. Driver: **Node.js**
4. Version: **4.1 or later**
5. Copy connection string

**Format đúng:**
```
mongodb+srv://todox-user:your-password@cluster0.xxxxx.mongodb.net/todox?retryWrites=true&w=majority
```

### 3. Test connection string

Thay thế trong connection string:
- `todox-user` → username thực của bạn
- `your-password` → password thực của bạn  
- `cluster0.xxxxx` → cluster name thực của bạn
- `todox` → tên database (có thể thay đổi)

### 4. Kiểm tra Render Logs

Sau khi deploy, kiểm tra logs sẽ hiển thị:

```
Attempting to connect to MongoDB...
MONGODB_URI exists: true
MONGODB_URI length: 123
✅ Connected to MongoDB successfully
```

Nếu thấy:
```
MONGODB_URI exists: false
```
→ Biến môi trường chưa được set

Nếu thấy:
```
MONGODB_URI exists: true
MONGODB_URI length: 0
```
→ Biến môi trường rỗng

### 5. Test local connection

Tạo file `.env` trong `Backend/`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todox?retryWrites=true&w=majority
NODE_ENV=development
PORT=5001
```

Chạy local:
```bash
cd Backend
npm start
```

### 6. Common Issues & Solutions

#### Issue 1: "MONGODB_URI environment variable is not set"
**Solution**: Thêm biến môi trường trên Render

#### Issue 2: "Authentication failed"
**Solution**: 
- Kiểm tra username/password
- Đảm bảo user có quyền "Read and write to any database"

#### Issue 3: "Network timeout"
**Solution**:
- Kiểm tra Network Access trên MongoDB Atlas
- Thêm IP 0.0.0.0/0

#### Issue 4: "Invalid connection string"
**Solution**:
- Kiểm tra format connection string
- Đảm bảo có `?retryWrites=true&w=majority`

### 7. Alternative: MongoDB Compass Test

1. Download MongoDB Compass
2. Paste connection string vào
3. Test connection
4. Nếu thành công → connection string đúng

## Quick Fix Checklist

- [ ] Biến môi trường `MONGODB_URI` đã được set trên Render
- [ ] MongoDB Atlas Network Access cho phép 0.0.0.0/0
- [ ] Database user có quyền "Read and write to any database"
- [ ] Connection string đúng format
- [ ] Username/password chính xác
- [ ] Cluster name chính xác
