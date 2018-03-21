# express+mongoose

> 应用express+mongoose技术栈写的博客后台系统，包含博客后台管理系统和博客主页展示

## 功能

- [x] 用户登录注册 -- 完成
- [x] 记住密码  token验证  退出登录 -- 完成
- [x] 管理员对数据分类的增删改查 -- 完成
- [x] 管理员对博客文章的增删改查 -- 完成
- [x] 博客首页接口 -- 完成
- [x] 博客分类查询内容接口 -- 完成
- [x] 用户头像修改功能 -- 完成



## 启动步骤


``` bash
## 启动数据库
安装mongodb数据库后，在server目录里面创建一个db目录，用 mongod  --dbpath=‘db文件夹路径’，启动mongodb

## 启动服务器
#  在server目录中安装后端依赖
npm install
# 在server目录中启动后端服务
npm run dev

## 启动网页
#  在根目录中安装前端依赖
npm install
# 在根目录中启动后端服务
npm run dev
```


```
## 后端server目录文件结构
.                                   
├── models                          ├──数据模型                                                          
│   ├── Cate.js                     │   ├──	分类模型               	
│   ├── content.js                  │   ├──	博客内容模型
│   ├── user.js                 	│   ├── 用户资料模型
├── public                          ├──静态资源
│   ├── css               			│   ├── css
│   ├── font              			│   ├──	字体文件
│   ├── imgaes              		│   ├── 图片资源
│   └── js              			│   └──	js
├── router                          ├──路由及相关操作（后续可进行模块分割）
│   ├── admin						│   ├──	后台管理页面路由及相应操作
│   └── api              			│   └──	博客页面路由及相应操作
├── uploads                         ├──用户上传图片
├── app                   		    ├──入口文件	
├── packjson                       
├── ReadMe                         
.

```