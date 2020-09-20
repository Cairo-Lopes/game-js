
import express from 'express'
import http from 'http'
import createGame  from './public/game.js'
import socketio from 'socket.io'
import createKeyboardListener from './public/keyboard-listener.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
// 
app.use(express.static('public'))


const game = createGame()
// game.start()

game.subscribe((command) => {
    console.log(`>  (SERVER) Emitting ${command.type}`)
    sockets.emit(command.type, command)
})



sockets.on('connection', (socket) => {

    const playerId = socket.id 
    console.log(`>(server/sockets) Player connected: ${playerId} `)
    game.addPlayer({ playerId: playerId});
    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log(`>> (server/sockets) Player disconnect || id: ${playerId}`)
    })
    
    socket.on('move-player',(command) => {
        command.playerId = playerId
        command.type = 'move-player'
        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log('> Server listening on port: 3000')
 
    
})
