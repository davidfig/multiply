import { el } from '../el'
import { game } from './game'

const TIME = 20000
const LINE_WIDTH = 5
const CENTER_PERCENT = 0.025
const ARC_PERCENT = 0.6
const TICK_SIZE = 4

enum ClockState {
    running,
    waiting,
}

class Clock {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private time: number = 0
    private goal: number
    private state = ClockState.waiting

    init() {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.className = 'clock'
        el('.game').appendChild(this.canvas)
        this.canvas.addEventListener('pointerdown', () => {
            if (this.state === ClockState.waiting) {
                game.start()
            }
        })
    }

    resize() {
        const resolution = window.devicePixelRatio
        this.canvas.width = this.canvas.offsetWidth * resolution
        this.canvas.height = this.canvas.offsetHeight * resolution
    }

    isRunning() {
        return this.state === ClockState.running
    }

    start(time: number) {
        this.state = ClockState.running
        this.goal = time
        this.time = 0
        this.draw(false)
    }

    stop() {
        this.state = ClockState.waiting
    }

    show() {
        this.resize()
        this.state = ClockState.waiting
        this.draw(false)
    }

    draw(empty: boolean) {
        const width = this.canvas.width
        const height = this.canvas.height

        this.context.clearRect(0, 0, width, height)
        const radius = width * 0.4
        const centerX = width / 2
        const centerY = height / 2

        const arcSize = centerX * ARC_PERCENT

        // middle circle
        this.context.beginPath()
        this.context.fillStyle = 'black'
        const centerSize = width * CENTER_PERCENT
        this.context.arc(centerX, centerY, centerSize, 0, Math.PI * 2)
        this.context.fill()

        // draw ticks
        const ticks = TIME / 1000
        const spacing = Math.PI * 2 / ticks
        let tickAngle = -Math.PI / 2
        for (let i = 0; i < ticks; i++) {
            this.context.beginPath()
            this.context.fillStyle = 'rgb(150,150,150)'
            const distance = arcSize - TICK_SIZE
            this.context.arc(
                centerX + Math.cos(tickAngle) * distance,
                centerY + Math.sin(tickAngle) * distance,
                TICK_SIZE, 0, Math.PI * 2)
            tickAngle += spacing
            this.context.fill()
        }

        if (!empty) {
            this.context.beginPath()
            this.context.strokeStyle = 'black'
            this.context.lineWidth = LINE_WIDTH
            this.context.arc(centerX, centerY, radius, 0, Math.PI * 2)
            this.context.stroke()

            const angle = this.time / TIME * Math.PI * 2 - Math.PI / 2
            const goalAngle = (this.goal / TIME) * Math.PI * 2 - Math.PI / 2
            // draw gray arc
            this.context.beginPath()
            this.context.fillStyle = 'rgba(200,200,200,0.75)'
            this.context.moveTo(centerX, centerY)
            this.context.lineTo(centerX + Math.cos(angle) * arcSize, centerY + Math.sin(angle) * arcSize)
            this.context.arc(centerX, centerY, arcSize, angle, goalAngle)
            this.context.lineTo(centerX, centerY)
            this.context.fill()
            // draw line
            this.context.beginPath()
            this.context.moveTo(centerX, centerY)
            this.context.lineTo(centerX + Math.cos(angle) * arcSize, centerY + Math.sin(angle) * arcSize)
            this.context.stroke()
        }
    }

    update(elapsed: number) {
        if (this.state === ClockState.running) {
            this.time += elapsed
            if (this.time >= this.goal) {
                this.time = this.goal
                this.state = ClockState.waiting
            }
            this.draw(false)
        }
    }
}

export const clock = new Clock()