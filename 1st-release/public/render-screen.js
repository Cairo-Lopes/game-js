export default function renderScreen(game,screen,requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    const players = game.state.players
    context.fillStyle = 'white'
    context.clearRect(0,0,10,10)
    
    for (const playerId in players){
       
        const player = game.state.players[playerId]
        context.fillStyle = 'black' 
        context.fillRect( player.x, player.y, 1, 1)
    
    }

    for (const fruitId in game.state.fruits){
    
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    
    }
    
    const currentPlayer = game.state.players[currentPlayerId]

    
    if(currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect( currentPlayer.x, currentPlayer.y, 1, 1)
    }
    

    requestAnimationFrame(()=> {
        renderScreen(game,screen,requestAnimationFrame,currentPlayerId)
    })
    

}