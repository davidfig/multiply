import fontfaceobserver from 'fontfaceobserver'
import { state } from './state'

class Main {
    async start() {
        await new fontfaceobserver('FONT').load()
        state.init()
    }
}

const main = new Main()

window.onload = () => main.start()