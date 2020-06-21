var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
function searchBycondtion(dburl,collectionurl,data,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dburl);// 查询条件
        dbo.collection(collectionurl).find(data).toArray(function(err, result) {
            if (err) throw err;
            callback(result)
            db.close();
        });
    });
}
function getClasses(callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Classes_System");
        dbo.collection("classes"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
}
function save(dburl,collectionurl,data,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dburl);
        dbo.collection(collectionurl).insertOne(data, function(err, res) {
            if (err) {
                callback("-1");
                throw err;
            }
            callback("1");
            db.close();
        });
    });
}
function delet(dburl,collectionurl,data,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dburl);// 查询条件
        dbo.collection(collectionurl).deleteOne(data, function(err, obj) {
            if (err) {
                callback("-1")
            }
            else    callback("1")
            db.close();
        });
    });
}
function change(dburl,collectionurl,str1,str2,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dburl);
        var whereStr = {"name":str1};  // 查询条件
        var updateStr = {$set: { "password" :str2}};
        console.log(updateStr)
        dbo.collection(collectionurl).updateOne(whereStr, updateStr, function(err, res) {
            if (err) throw err;
            callback("1")
            db.close();
        });
    });
}
function updat(dburl,collectionurl,data,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dburl);
        var whereStr = {"id":data.id};  // 查询条件
        var updateStr = {$set: data};
        console.log(updateStr)
        dbo.collection(collectionurl).updateOne(whereStr, updateStr, function(err, res) {
            if (err) throw err;
            callback("1")
            db.close();
        });
    });

}
exports.searchBycondtion=searchBycondtion;//导出
exports.getClasses=getClasses;//导出
exports.save=save;
exports.delete=delet;
exports.change=change;
exports.updat=updat;






















