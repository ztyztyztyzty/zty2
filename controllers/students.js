let db = require("../models/db")
var user,dd,status,data2;
exports.showStudents = (req,res)=>{
    db.searchBycondtion("aaa","site","",function(arr){
        res.render("indexByEjs",{"arr":arr})
    });
}
// 渲染一个添加学生的表单
exports.add = (req,res)=>{
    res.render("add");
}
exports.login=(req,res)=>{
    res.render("adminLogin");
}
exports.classes=(req,res)=> {
    var c=dd;
    db.searchBycondtion("Classes_System", "students",dd, function (arr) {
        db.searchBycondtion("Classes_System", "classes",{'acd':arr[0].acd,'grade':arr[0].grade}, function (data) {
            res.render("classes", {"arr": data})
        })
    })
    dd=c;
}
exports.SearchClasses=(req,res)=>{
    db.searchBycondtion("Classes_System","classes",req.body,function(arr){
        data=arr;
        res.send("1")
    })
}
exports.SearchResult=(req,res)=>{
    res.render("SearchResult",{"data":data});
}
exports.csadd=(req,res)=>{
    db.searchBycondtion("Classes_System","s-c",req.body,function(arr) {
        if(arr[0]!=undefined){
            res.send("-1")
        }
        else{
            db.save("Classes_System","s-c",req.body,function(info){
                res.send(info)
            })
        }
    })
}
exports.doRegister=(req,res)=>{
    db.searchBycondtion("Classes_System","students",req.body,function(arr) {
        if(arr[0]!=undefined){
            res.send("-1")
        }
        else{
            console.log(req.body)
            db.save("Classes_System","students",req.body,function(info){
                res.send(info)
            })
        }
    })
}
exports.getname=(req,res)=>{
    res.send(dd);
}
exports.ClassesRusult=(req,res)=>{
    db.searchBycondtion("Classes_System","s-c",dd,function(arr){
        res.render("ClassesResult",{"arr":arr})
    })
}
exports.delete=(req,res)=>{
    db.searchBycondtion("Classes_System","s-c",req.body,function(arr) {
        console.log(req.body)
        if(arr[0]==undefined){
            res.send("-1")
        }
        else{
            db.delete("Classes_System","s-c",req.body,function(info){
                res.send(info)
            })
        }
    })
}
exports.revise_password=(req,res)=>{
    res.render("revise_password")
}
exports.judge=(req,res)=> {
    var c;
    req.session.username=req.body;
    dd= req.session.username;
    db.searchBycondtion("Classes_System", "students", req.body, function (arr) {
        res.send(arr);
    })
}
exports.change=(req,res)=>{
    var str1=req.body.name;
    var str2=req.body.password;
    db.change("Classes_System", "students", str1,str2, function (info) {
        res.send(info);
    })
}
exports.register=(req,res)=>{
    res.render("register");
}
exports.MyClasses=(req,res)=>{
    db.searchBycondtion("Classes_System","s-c",dd,function(arr){
         var lessons=new Array;
        for(var i=0;i<55;i++){
            lessons[i]="'coursename':'','teacher':'','place':''"
        }
         for(var i=0;i<arr.length;i++){
             lessons[arr[i].location]=arr[i];
         }
        res.render("MyClasses",{"lessons":lessons})
    })
}
function getlevel(callback) {
    db.searchBycondtion("Classes_System", "students", dd, function (arr) {
        status=arr[0].level;
        console.log(status)
        callback(status);
    })

}
exports.user_list=(req,res)=>{
    var st;
   getlevel(function (status) {
       st=status;
       if(st==1) {
           db.searchBycondtion("Classes_System", "students", " ", function (arr) {
               res.render("user_list", {"arr": arr})
           })
       }
       else{
           db.searchBycondtion("Classes_System", "students",{ 'name': '不存在' } , function (arr) {
               res.render("user_list", {"arr": arr})
           })
       }
   });
}
exports.searchsc=(req,res)=>{
    db.searchBycondtion("Classes_System","s-c",req.body,function(arr){
        data2=arr;
        res.send("1")
    })
}
exports.shwosc=(req,res)=>{
    res.render("showsc",{"arr":data2});
}
exports.allclasses=(req,res)=>{
    var st;
    getlevel(function (status) {
        st=status;
        if(st==1) {
          db.getClasses(function(arr){
                res.render("allclasses", {"arr": arr})
               //    console.log(arr[0])
            })
        }
        else{
            db.searchBycondtion("Classes_System", "classes",{ 'name': '不存在' } , function (arr) {
                res.render("allclasses", {"arr": arr})
            })
        }
    });
}
var editclassed;
exports.editclass=(req,res)=> {
    editclassed=req.body;
    res.send("1")
}
exports.doedit=(req,res)=>{
    res.render("doedit",{"arr":editclassed})
}
exports.revise=(req,res)=>{
    db.updat("Classes_System", "classes", req.body, function (info){
        res.send(info)
    })
}
exports.addclass=(req,res)=>{
    var st;
    getlevel(function (status) {
        st=status;
        console.log(st)
        res.render("addclass",{"status":st})
})
}
exports.doaddclass=(req,res)=>{
    db.searchBycondtion("Classes_System", "classes",{ 'id':req.body.id } , function (arr) {
        if(arr[0]==undefined){
            db.searchBycondtion("Classes_System", "classes",{
                "name":req.body.name,
                "teacher":req.body.teacher,
                "acd":req.body.acd,
                "grade":req.body.grade,
                "credit":req.body.credit,
                "location":req.body.location,
                "time":req.body.time,
                "place":req.body.place,
            },function (brr) {
                if(brr[0]==undefined){
                    db.save("Classes_System", "classes",req.body,function(info){
                        res.send(info)
                    })
                }
                else res.send("-2")
            })
        }
        else res.send("-1")
    })

}