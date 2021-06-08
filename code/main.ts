import { state } from './state'

class Main {
    async start() {
        state.init()
    }
}

const main = new Main()

window.onload = () => main.start()