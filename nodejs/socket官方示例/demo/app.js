import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5500',
  }
})

io.on('connection', socket => {
  console.log(socket)

  socket.emit('hello', 'this is a message from server')

  setTimeout(() => {
    socket.emit("hello", 1, "2", { 3: '4', 5: Buffer.from([6]) })
  }, 2000);

  socket.on('client hello', (data) => {
    console.log(data)
  })
})

httpServer.listen(3000)
