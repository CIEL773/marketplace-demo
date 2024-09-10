# Product Management System

Frontend: React

Backend: Node.js (Express) 

Database: MongoDB


## How to run
```bash
cd backend
npm start // 用于生产环境的启动
npm run dev // 使用 nodemon 实时监听代码变化并重新启动服务器
```

访问 http://localhost:5000, 会看到 "Welcome to the Node.js Framework Project!"

访问 http://localhost:5000/api/status, 返回JSON 响应
"API is working!"


```bash
cd frontend
npm start
```

## Nodemon:

Install: `npm install --save-dev nodemon`

In package.json, add

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```