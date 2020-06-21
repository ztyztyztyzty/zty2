let express = require("express");
var bodyParser = require('body-parser')

var session=require('express-session')
let students = require("./controllers/students")
let app = express();
app.use(express.static(__dirname+"/public" ));//配置资源,比如静态页面、CSS和其他一些静态资源
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 通过req.body得到客户端传递过来的数据
app.use(session({
    secret:'recommend 128 bytes random string',
    cookie:{maxAge:20*60*1000},
    resave:true,
    saveUninitialized:true
})
)
app.set("view engine","ejs")

// 显示添加学生表单
app.get("/add",students.add)
// 处理添加生学的逻辑
app.get("/login",students.login)

app.get("/classes",students.classes)

app.post("/SearchClasses",students.SearchClasses);
app.get("/SearchResult",students.SearchResult)
app.get("/allStudents",students.showStudents)
app.post("/delete",students.delete)
app.post("/edit",students.csadd)
app.post("/register",students.doRegister)
app.post("/getname",students.getname)
app.get("/ClassesResult",students.ClassesRusult)
app.get("/revise_password",students.revise_password)
app.post("/judge",students.judge)
app.post("/change",students.change)
app.get("/register",students.register)
app.get("/MyClasses",students.MyClasses)
app.get("/user_list",students.user_list)
app.post("/searchsc",students.searchsc)
app.get("/showsc",students.shwosc)
app.get("/allclasses",students.allclasses)
app.post("/editclass",students.editclass)
app.get("/doedit",students.doedit)
app.post("/revise",students.revise)
app.get("/addclass",students.addclass)
app.post("/doaddclasses",students.doaddclass)
app.listen(8080,()=>{
    console.log("服务器在3030端口启动了~")
})






































































