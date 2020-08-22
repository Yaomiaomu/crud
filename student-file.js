/*
***用于封装操作students数据的方法
*/


var fs = require("fs");

var dbPath = './db.json';

/*
  读取所有students数据
*/
exports.findAll = function (callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
}


/*
  读取指定id的数据
*/
exports.findById = function (id,callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var student = students.find(item => {
      return item.id === id;
    })
    callback(null, student);
  });
}

/*
  添加数据
*/

exports.add = function (student, callback) {
  this.findAll((err, data) => {
    if (err) {
      return callback(err);
    }
    student.id = data[data.length-1].id + 1;
    student.gender = parseInt(student.gender);
    data.push(student);

    fs.writeFile(dbPath, JSON.stringify({students:data}), (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });
  });
}


/*
  更新数据
*/

exports.update = function (student, callback) {
  this.findAll((err, data) => {
    if (err) {
      return callback(err);
    }
    student.id = parseInt(student.id);
    student.gender = parseInt(student.gender);
    var item = data.find(item => {
      return item.id === student.id;
    });
    for (let key in student) {
      item[key] = student[key];
    }

    fs.writeFile(dbPath, JSON.stringify({students:data}), (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });
  });
}


/*
  删除数据
*/
exports.deleteById = function (id, callback) {
  this.findAll((err, data) => {
    if (err) {
      return callback(err);
    }
    var index = data.findIndex(item => {
      return item.id === id;
    });
    data.splice(index, 1);
    
    fs.writeFile(dbPath, JSON.stringify({students:data}), (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });
  })
}

