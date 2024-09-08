// src/routes/index.js

const express = require('express');
const router = express.Router();

// 定义基础 API 路由
router.get('/status', (req, res) => {
  res.json({ message: 'API is working!' });
});

// 其他路由可以放在这里

module.exports = router;
