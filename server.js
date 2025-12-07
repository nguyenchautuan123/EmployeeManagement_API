const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Tải biến môi trường từ file .env

const Employee = require('./models/Employee');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Cho phép React Native gọi API này
app.use(express.json());

// Kết nối đến MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Đã kết nối thành công đến MongoDB Atlas"))
.catch(err => console.error("Lỗi kết nối đến MongoDB Atlas:", err));

// === TẠO ENDPOINT ĐỂ APP GỌI ===
// Endpoint: GET /employee
// Chức năng: Lấy tất cả nhân viên từ database
app.get('/employee', async (req, res) => {
    try{
        const employeesList = await Employee.find();
        res.status(200).json(employeesList);
    }catch(err){
        console.error("Lỗi lấy danh sách nhân viên:", err);
        res.status(500).json({ message: "Lỗi máy chủ"});
    }
});

// Endpoint: GET /employee/search?keyWord=...
// Ví dụ gọi: http://localhost:3001/employee/search?keyWord=nv001
app.get('/employee/search', async(req, res) => {
    try {
        const keyWord = req.query.keyWord;
        if(!keyWord){
            return res.status(400).json({ message: 'Vui lòng nhập từ khóa' });
        }

        const result = await Employee.find({
            $or: [
                { TenNhanVien: { $regex: keyWord, $options: 'i' } },
                { MaNhanVien: { $regex: keyWord, $options: 'i' } }
            ]
        });
        res.status(200).json(result);

    } catch (error) {
        console.error('Lỗi tìm kiếm', error);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}/employee`);
    console.log(`Để tìm kiếm nhân viên http://localhost:${PORT}/employee/search?keyWord=nv001`);
});

