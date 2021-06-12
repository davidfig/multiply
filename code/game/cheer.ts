import animejs from 'animejs'
import random from 'yy-random'
import { el } from '../el'

const images = ['g1149.png', 'g1226.png', 'g1285.png', 'g1317.png', 'g1411.png']
const count = 30
const duration = [500, 1000]

class Cheer {
    private div: HTMLDivElement

    init() {
        this.div = document.createElement('div')
        this.div.className = 'cheer'
        el('.game').appendChild(this.div)
        let s = '<div class="cheer-kids">'
        let x = -50
        let y = window.innerHeight
        const xDistance = window.innerWidth / (count - 1.5)
        for (let i = 0; i < count; i++) {
            const scale = random.chance() ? 'scale(-1, 1); ' : ''
            s += `<img class="cheer-kid cheer-kid-${i}" src="images/${random.pick(images, false)}" style="${scale}transform: translateX(${x}px) translateY(${y}px)">`
            x += xDistance
        }
        s += '</div>'
        this.div.innerHTML = s
        setTimeout(() => this.hide(), 3000)
    }

    win() {
        const bounce = window.innerHeight * 0.2
        for (let i = 0; i < count; i++) {
            animejs({
                targets: `.cheer-kid-${i}`,
                translateY: window.innerHeight - random.get(bounce),
                loop: true,
                direction: 'alternate',
                duration: random.range(duration[0], duration[1]),
                easing: 'easeInOutSine'
            })
        }
    }

    hide() {
        for (let i = 0; i < count; i++) {
            animejs.remove(`.cheer-kid-${i}`)
            animejs({
                targets: `.cheer-kid-${i}`,
                translateY: window.innerHeight,
                duration: random.range(duration[0], duration[1]),
                easing: 'easeOutSine',
            })
        }
    }
}

export const cheer = new Cheer()