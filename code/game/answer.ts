import random from 'yy-random'
import { answers } from './answers'
import { problem } from './problem'
import { Point } from './util'

const SPEED = 0.1
const CLEAR_SPEED = 0.75
const ANSWER_SPEED = 0.5

enum AnswerState {
    normal,
    clearing,
    answering,
    stopped,
}

export class Answer {
    private div: HTMLElement
    private _x: number
    private _y: number
    private to: Point
    private velocity: Point
    private time: number
    private state: AnswerState
    number: number
    selected = false

    constructor(n: number) {
        this.number = n
        this.div = document.createElement('div')
        this.div.className = 'number'
        this.div.innerHTML = n.toString()
        this.div.addEventListener('pointerdown', (e: PointerEvent) => this.press(e))
        answers.div.appendChild(this.div)
        const find = this.findPlace()
        this.x = find.x
        this.y = find.y
        this.nextMove()
    }

    private press(e: PointerEvent) {
        this.state = AnswerState.answering
        this.to = problem.getDigit()
        const element = window.getComputedStyle(this.div, null)
        const paddingLeft = parseInt(element.getPropertyValue('padding-left'))
        const paddingTop = parseInt(element.getPropertyValue('padding-top'))
        this.to.x -= paddingLeft
        this.to.y -= paddingTop
        this.nextMove(ANSWER_SPEED)
        this.div.classList.add('number-selected')
        answers.pressed(this)
        e.stopPropagation()
        e.preventDefault()
    }

    clear() {
        if (this.state === AnswerState.normal) {
            this.state = AnswerState.clearing
            const distance = Math.max(window.innerWidth, window.innerHeight)
            const angle = random.angle()
            this.to = { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance }
            this.velocity = { x: Math.cos(angle) * CLEAR_SPEED, y: Math.sin(angle) * CLEAR_SPEED }
            this.time = distance / CLEAR_SPEED
        }
    }

    findPlace(): Point {
        const x = random.get(window.innerWidth - this.div.offsetWidth)
        const y = random.get(window.innerHeight - this.div.offsetHeight)
        return { x, y }
    }

    nextMove(speed?: number) {
        if (!speed) {
            this.to = this.findPlace()
        }
        const distance = Math.sqrt(Math.pow(this.to.x - this.x, 2) + Math.pow(this.to.y - this.y, 2))
        const angle = Math.atan2(this.to.y - this.y, this.to.x - this.x)
        speed = speed || SPEED
        this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }
        this.time = distance / speed
    }

    set x(x: number) {
        if (x !== this._x) {
            this._x = x
            this.place()
        }
    }
    get x() {
        return this._x
    }

    set y(y: number) {
        if (y !== this._y) {
            this._y = y
            this.place()
        }
    }
    get y() {
        return this._y
    }


    place() {
        this.div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    update(elapsed: number) {
        if (this.state !== AnswerState.stopped) {
            this.time -= elapsed
            if (this.time < 0) {
                this.x = this.to.x
                this.y = this.to.y
                if ([AnswerState.clearing, AnswerState.answering].includes(this.state)) {
                    this.state = AnswerState.stopped
                } else {
                    this.nextMove()
                }
            } else {
                this.x += this.velocity.x * elapsed
                this.y += this.velocity.y * elapsed
            }
        }
    }
}