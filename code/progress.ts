import { tables } from './settings'
import { Point } from './util'

const PADDING = 0.25

interface ProgressElement extends HTMLDivElement {
    x?: number
    y?: number
}

class Progress {
    private div: HTMLElement

    init() {
        this.div = document.createElement('div')
        this.div.className = 'progress'
        this.redraw()
        document.body.appendChild(this.div)
    }

    redraw() {
        const totalProblems = (tables + 1) * (tables + 1)
        const totalPerimeter = window.innerWidth * 2 + window.innerHeight * 2
        let size = totalPerimeter / totalProblems
        let more: boolean
        let top: number, bottom: number, right: number, left: number
        do {
            top = Math.floor(window.innerWidth / size)
            bottom = top - 1
            right = Math.floor(window.innerHeight / size) - 1
            left = right - 1
            if (top + bottom + right + left < totalProblems) {
                size -= 0.1
                more = true
            } else {
                more = false
            }
        } while (more)
        const dotSize = size * (1 - PADDING)
        let s = ''
        for (let i = 0; i < totalProblems; i++) {
            s += `<div class="progress-dot" style="width: ${dotSize}px; height: ${dotSize}px"></div>`
        }
        this.div.innerHTML = s
        let place = 'top'
        let index = 0
        const padding = size * PADDING
        let x = padding
        let y = padding
        let lastX: number
        let lastY: number
        let count = 0
        let horizontalCount = 0
        let verticalCount = 1
        while (index < this.div.children.length) {
            const dot = this.div.children[index] as ProgressElement
            dot.style.transform = `translate(${x}px, ${y}px)`
            dot.x = x
            dot.y = y
            count++
            if (place === 'top') {
                horizontalCount++
                x += size
                if (--top === 0) {
                    lastX = x - size
                    place = 'right'
                    x = lastX
                    y = size + padding
                }
            } else if (place === 'right') {
                verticalCount++
                y += size
                if (--right === 0) {
                    lastY = y - size
                    place = 'bottom'
                    x = lastX - size
                    y = lastY
                }
            } else if (place === 'bottom') {
                x -= size
                if (--bottom === 0) {
                    place = 'left'
                    x = padding
                    y = lastY - size
                }
            } else if (place === 'left') {
                y -= size
                if (--left === 0) {
                    break
                }
            }
            index++
        }
        // this.div.style.transform = `translate(${(window.innerWidth - horizontalCount * size) / 2}px, ${(window.innerHeight - verticalCount * size) / 2}px)`
    }

    get(index: number): Point {
        const child = this.div.children[index] as ProgressElement
        return { x: child.x, y: child.y }
    }
}

export const progress = new Progress()