import random from 'yy-random'
import { answers } from './answers'
import { Point } from './util'

const SPEED = 0.1
const CLEAR_SPEED = 0.75

export class Answer {
    private div: HTMLElement
    private _x: number
    private _y: number
    private to: Point
    private velocity: Point
    private time: number
    private clearing = false
    private stop = false
    number: number
    selected = false

    constructor(n: number) {
        this.number = n
        this.div = document.createElement('div')
        this.div.className = 'number'
        this.div.innerHTML = n.toString()
        this.div.addEventListener('pointerdown', () => answers.pressed(this))
        answers.div.appendChild(this.div)
        const find = this.findPlace()
        this.x = find.x
        this.y = find.y
        this.nextMove()
    }

    clear() {
        if (!this.selected && !this.clearing) {
            this.clearing = true
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

    nextMove() {
        this.to = this.findPlace()
        const distance = Math.sqrt(Math.pow(this.to.x - this.x, 2) + Math.pow(this.to.y - this.y, 2))
        const angle = Math.atan2(this.to.y - this.y, this.to.x - this.x)
        this.velocity = { x: Math.cos(angle) * SPEED, y: Math.sin(angle) * SPEED }
        this.time = distance / SPEED
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
        if (!this.stop) {
            this.time -= elapsed
            if (this.time < 0) {
                if (this.clearing) {
                    this.stop = true
                } else {
                    this.x = this.to.x
                    this.y = this.to.y
                    this.nextMove()
                }
            } else {
                this.x += this.velocity.x * elapsed
                this.y += this.velocity.y * elapsed
            }
        }
    }
}