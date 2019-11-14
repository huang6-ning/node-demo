//操作文件中的数据，只处理数据，不关心业务
var fs = require('fs')

//获取所有学生列表
exports.find = function (callback) {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data).students);
    });
};

//添加保存学生
exports.save = function (student, callback) {
    //读文件
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students.length + 1

        students.push(student)
        console.log(students)

        var newDate = JSON.stringify({
            students: students
        })

        fs.writeFile('./db.json', newDate, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
},


//获取单个学生信息
exports.findById = function (id, callback) {
    //读文件
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err);
        }

        var students = JSON.parse(data).students;
        
        var stu = students.find(function (item) {
            return item.id === id;
        });

        callback(null, stu)
    })
},

//更新学生
exports.updataById = function (student, callback) {
    //读文件
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err);
        }
        student.id = parseInt(student.id)
        var students = JSON.parse(data).students;
        
        var stu = students.find(function (item) {
            return item.id === student.id;
        });

        for(var key in stu) {
            stu[key] = student[key];
        }

        var newDate = JSON.stringify({
            students: students
        });

        fs.writeFile('./db.json', newDate, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
},

//删除学生
exports.deleteById = function (id, callback) {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err);
        }
        id = parseInt(id)
        var students = JSON.parse(data).students;
        var deleteId = students.findIndex(function (item) {
            return item.id === id
        })
        students.splice(deleteId, 1)

        var newDate = JSON.stringify({
            students: students
        });

        fs.writeFile('./db.json', newDate, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}


