import { el } from '../el'

class Help {
    private div: HTMLDivElement

    init() {
        this.div = document.createElement('div')
        this.div.className = 'help'
        el('.game').appendChild(this.div)
        this.div.innerHTML = 'Press the clock for the next problem'
    }

    show() {
        this.div.classList.remove('help-hide')
    }

    hide() {
        this.div.classList.add('help-hide')
    }
}

export const help = new Help()