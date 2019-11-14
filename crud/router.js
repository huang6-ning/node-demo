var fs = require('fs')
var express = require('express')
var students = require('./students')

var router = express.Router()

//首页
router.get('/students', function(req, res) {

    students.find(function (err, data) {
        
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('index.html', {
            data: ['huang', 'jing', 'ling'],
            students: data
        })
    })
})

//转到添加学生页
router.get('/students/new', function (req, res) {
    res.render('new.html')
})

//添加学生，提交表单
router.post('/students', function (req, res) {
    students.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

//进入编辑页
router.get('/students/edit', function (req, res) {
    students.findById(parseInt(req.query.id), function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('edit.html', {
            student: data
        })
    })
})

router.post('/students/edit', function (req, res) {
    students.updataById(req.body, function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    students.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('server error')
        }
    })
    res.redirect('/students')
})

//把router 导出来
module.exports = router
