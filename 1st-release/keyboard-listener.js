export default function createKeyboardListener(){

    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }

    function notifyAll(command){
        console.log(`Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers){
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event){

        const keyPressed = event.key

        const command = {
            playerId: 'player_One',
            keyPressed
        }

        notifyAll(command)
    }

    return{

        subscribe
    }
}