// Tệp này định nghĩa cấu trúc (Schema) cho collection "Nhân viên"
const mongoose = require('mongoose');

// Định nghĩa Schema khớp với collection của bạn
const employeeSchema = new mongoose.Schema({
    MaNhanVien: {type: String, required: true, unique: true},
    TenNhanVien: {type: String, required: true},
    SoDienThoai: {type: String, unique: true},
    PhongBan: {type: String},
    Email: {type: String, unique: true},
    DiaChi: {type: String}
},{
    collection: 'employee'
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;