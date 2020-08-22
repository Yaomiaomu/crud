//导入模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/test', {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});

//获取Schama引用
var Schema = mongoose.Schema;

//设计文档结构
var studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0,1],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  hobbies: String
});

//将文档架构转换为模型
module.exports = mongoose.model('Student',studentSchema);


