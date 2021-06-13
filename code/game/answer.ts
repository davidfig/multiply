import animejs from 'animejs'
import random from 'yy-random'
import { answers } from './answers'
import { problem } from './problem'
import { Point, dist } from '../util'
import { clock } from './clock'

const SPEED = 0.075
const CLEAR_SPEED = 0.75
const ANSWER_SPEED = 1

export class Answer {
    private div: HTMLElement
    private busy = false
    number: number
    selected = false

    constructor(n: number) {
        this.number = n
        this.div = document.createElement('div')
        this.div.className = 'number'
        this.div.innerHTML = n.toString()
        this.div.addEventListener('pointerdown', (e: PointerEvent) => this.press(e))
        answers.div.appendChild(this.div)
        const find = this.findClear()
        this.x = find.x
        this.y = find.y
    }

    reset() {
        this.div.classList.remove('number-selected')
        this.busy = false
        this.nextMove(ANSWER_SPEED)
    }

    removeAnswer() {
        this.div.classList.remove('number-selected')
        this.busy = false
        this.clear()
    }

    answer(index: number, complete?: () => void) {
        const to = problem.getPosition(index)
        const element = window.getComputedStyle(this.div, null)
        const paddingLeft = parseInt(element.getPropertyValue('padding-left'))
        const paddingTop = parseInt(element.getPropertyValue('padding-top'))
        to.x -= paddingLeft
        to.y -= paddingTop
        const distance = dist(this.position, to)
        animejs.remove(this.div)
        animejs({
            targets: this.div,
            translateX: to.x,
            translateY: to.y,
            duration: distance / ANSWER_SPEED,
            easing: 'easeOutSine',
            complete,
        })
        this.busy = true
        this.div.classList.add('number-selected')
    }

    private press(e: PointerEvent) {
        if (clock.isRunning()) {
            answers.answer(this)
            e.stopPropagation()
            e.preventDefault()
        }
    }

    findClear(): Point {
        const distance = Math.max(window.innerWidth, window.innerHeight)
        const angle = random.angle()
        return {
            x: window.innerWidth / 2 + Math.cos(angle) * distance,
            y: window.innerHeight / 2 + Math.sin(angle) * distance
        }
    }

    clear() {
        if (!this.busy) {
            const to = this.findClear()
            animejs.remove(this.div)
            animejs({
                targets: this.div,
                translateX: to.x,
                translateY: to.y,
                duration: dist(this.position, to) / CLEAR_SPEED,
                easing: 'linear',
            })
        }
    }

    findPlace(): Point {
        const x = random.get(window.innerWidth - this.div.offsetWidth)
        const y = random.get(window.innerHeight - this.div.offsetHeight)
        return { x, y }
    }

    nextMove(speed = SPEED) {
        const to = this.findPlace()
        const distance = dist(this.position, to)
        animejs.remove(this.div)
        animejs({
            targets: this.div,
            translateX: to.x,
            translateY: to.y,
            duration: distance / speed,
            easing: 'linear',
            complete: () => this.nextMove()
        })
    }

    get position(): Point {
        return { x: this.x, y: this.y }
    }

    set x(x: number) {
        animejs.set(this.div, { translateX: x })
    }
    get x() {
        const translateX = animejs.get(this.div, 'translateX')
        return translateX ? parseInt(translateX as string) : 0
    }

    set y(y: number) {
        animejs.set(this.div, { translateY: y })
    }
    get y() {
        const translateY = animejs.get(this.div, 'translateY')
        return translateY ? parseInt(translateY as string) : 0
    }
}