import { el } from '../el'
import { tables, levels } from '../settings'
import { Point } from '../util'
import { data } from '../data'

const PADDING = 10

interface ProgressElement extends HTMLDivElement {
    x?: number
    y?: number
}

class Progress {
    private div: HTMLElement
    private progress: HTMLDivElement
    private problem: HTMLCanvasElement
    private results: HTMLCanvasElement
    private maxSizeX: number
    private xSize: number
    private ySize: number

    init() {
        this.progress = document.createElement('div')
        this.progress.className = 'progress-canvases'
        el('.game').appendChild(this.progress)

        this.results = document.createElement('canvas')
        this.results.className = 'progress-canvas'
        this.progress.appendChild(this.results)

        this.problem = document.createElement('canvas')
        this.problem.className = 'progress-canvas progress-canvas-hide'
        this.progress.appendChild(this.problem)

        this.div = document.createElement('div')
        this.div.className = 'progress'
        el('.game').appendChild(this.div)
        this.testSize()
        this.showNumbers()
        this.resize()
    }

    resize() {
        const resolution = window.devicePixelRatio
        this.problem.width = this.results.width = window.innerWidth * resolution
        this.problem.height = this.results.height = window.innerHeight * resolution

        for (let i = 0; i < 2; i++) {
            const context = i === 0 ? this.results.getContext('2d') : this.problem.getContext('2d')
            context.restore()
            context.save()
            context.clearRect(0, 0, this.results.width, this.results.height)
            context.scale(resolution, resolution)
        }
    }

    showProblem(a: number, b: number) {
        const context = this.problem.getContext('2d')
        context.beginPath()
        const color = 'rgb(0,0,0,0.15)'
        context.clearRect(0, 0, this.problem.width, this.problem.height)
        context.fillStyle = color
        context.rect(0, this.ySize * (a + 1) - this.ySize / 2, this.xSize * (b + 0.5), this.ySize)
        context.rect(this.xSize * (b + 1) - this.xSize / 2, 0, this.xSize, this.ySize * (a + 0.5))
        context.fill()
        context.beginPath()
        context.strokeStyle = 'gray'
        context.rect(this.xSize * (b + 0.5), this.ySize * (a + 0.5), this.xSize, this.ySize)
        context.stroke()
        this.problem.classList.remove('progress-canvas-hide')
    }

    show() {
        const context = this.results.getContext('2d')
        context.clearRect(0, 0, this.results.width, this.results.height)
        for (let x = 0; x <= tables; x++) {
            for (let y = 0; y <= tables; y++) {
                const result = data.getResult(y, x).level / levels
                context.beginPath()
                context.fillStyle = `rgba(0,255,0,${result * 0.5})`
                context.rect(this.xSize * (x + 0.5), this.ySize * (y + 0.5), this.xSize, this.ySize)
                context.fill()
            }
        }
    }

    start(a: number, b: number) {
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