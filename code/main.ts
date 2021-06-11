import fontfaceobserver from 'fontfaceobserver'
import { file } from './file'
import { state } from './state'

class Main {
    async start() {
        await new fontfaceobserver('FONT').load()
        await file.init()
        state.init()
    }
}

const main = new Main()

window.onload = () => main.start()