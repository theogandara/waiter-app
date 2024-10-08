import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

const PORT = 3001;

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

io.on('connect', (socket) => {
  console.log(`Socket conectado: ${socket.id}`);
});

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(express.json());
    app.use(router);

    server.listen(PORT, () => {
      console.log(`Server is running in http://localhost:${PORT} 🍔`);
    });
  })
  .catch(() => console.log('erro'));
