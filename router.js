/*
* 路由页面
*/

//导入模块
var express = require('express');

var router = express.Router();

var Student = require('./student');

//配置路由
router.get('/', (req, res) => {
  res.redirect('/student');
});

router.get('/student', (req, res) => {
  Student.find((err, data) => {
    if (err) {
      return res.status(500).send('server error');
    }
    res.render('student.html', {
      students: data
    });
  });
});

router.get('/student/add', (req, res) => {
  res.render('add.html');
});

router.post('/student/add', (req, res) => {
  new Student(req.body).save()
   .then(() => {
    res.redirect('/student');
   }, () => {
    res.status(500).send('server error');
   });
});

router.get('/student/edit', (req, res) => {
  Student.findById(req.query.id.replace(/"/g, ''), (err, student) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render('edit.html', {student});
  })
});

router.post('/student/edit', (req, res) => {
  req.body._id = req.body._id.replace(/"/g, '');
    Student.findByIdAndUpdate(req.body._id, req.body, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('server error');
      }
      res.redirect('/student');
    }); 
});

router.get('/student/delete', (req, res) => {
  Student.findByIdAndRemove(req.query.id.replace(/"/g, ''), err => {
    if (err) {
      return res.status(500).send('server error');
    }
    res.redirect('/student');
  })
});

module.exports = router;