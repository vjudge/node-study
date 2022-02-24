import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://app.co-engine.com:8000', changeOrigin: true }));
app.use('/res', createProxyMiddleware({ target: 'http://res.co-engine.com:8100', changeOrigin: true }));

app.listen(3000);