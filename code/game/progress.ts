import random from 'yy-random'
import { el } from '../el'
import { tables } from '../settings'
import { Point } from '../util'

const PADDING = 10

interface ProgressElement extends HTMLDivElement {
    x?: number
    y?: number
}

class Progress {
    private div: HTMLElement
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private maxSizeX: number
    private xSize: number
    private ySize: number

    init() {
        this.canvas = document.createElement('canvas')
        this.canvas.className = 'progress-canvas'
        this.context = this.canvas.getContext('2d')
        el('.game').appendChild(this.canvas)
        this.div = document.createElement('div')
        this.div.className = 'progress'
        el('.game').appendChild(this.div)
        this.testSize()
        this.showNumbers()
        this.resize()
        this.showResults()
    }

    resize() {
        const resolution = window.devicePixelRatio
        this.canvas.width = this.canvas.offsetWidth * resolution
        this.canvas.height = this.canvas.offsetHeight * resolution
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.restore()
        this.context.save()
        this.context.scale(resolution, resolution)
    }

    showProblem(a: number, b: number) {
        this.context.beginPath()
        const color = 'rgb(0,0,0,0.15)'
        this.context.fillStyle = color
        this.context.rect(0, this.ySize * (a + 1) - this.ySize / 2, this.xSize * (b + 0.5), this.ySize)
        this.context.rect(this.xSize * (b + 1) - this.xSize / 2, 0, this.xSize, this.ySize * (a + 0.5))
        this.context.fill()
        this.context.beginPath()
        this.context.strokeStyle = 'gray'
        this.context.rect(this.xSize * (b + 0.5), this.ySize * (a + 0.5), this.xSize, this.ySize)
        this.context.stroke()
    }

    showResults() {
        for (let x = 0; x <= tables; x++) {
            for (let y = 0; y <= tables; y++) {
                const result = random.get(1, true)
                this.context.beginPath()
                this.context.fillStyle = `rgba(0,255,0,${result * 0.5})`
                this.context.rect(this.xSize * (x + 0.5), this.ySize * (y + 0.5), this.xSize, this.ySize)
                this.context.fill()
            }
        }
    }

    show(a: number, b: number) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.showProblem(a, b)
    }

    testSize() {
        const test = document.createElement('div')
        test.className = 'progress-test'
        document.body.appendChild(test)
        test.innerHTML = '88'
        this.maxSizeX = test.offsetWidth
        test.remove()
    }

    add(n: number, direction: 'top' | 'left') {
        const number = document.createElement('div')
        number.className = 'progress-number'
        number.innerHTML = n.toString()
        this.div.appendChild(number)
        if (direction === 'top') {
            number.style.left = `${this.xSize * (n + 1) - number.offsetWidth / 2}px`
            number.style.top = `${PADDING}px`
        } else {
            number.style.left = `${PADDING + this.maxSizeX / 2 - number.offsetWidth / 2}px`
            number.style.top = `${this.ySize * (n + 1) - number.offsetHeight / 2}px`
        }
    }

    showNumbers() {
        this.xSize = window.innerWidth / (tables + 2)
        this.ySize = window.innerHeight / (tables + 2)
        for (let x = 0; x <= tables; x++) {
            this.add(x, 'top')
        }
        for (let y = 0; y <= tables; y++) {
            this.add(y, 'left')
        }
    }

    get(index: number): Point {
        const child = this.div.children[index] as ProgressElement
        return { x: child.x, y: child.y }
    }
}

export const progress = new Progress()