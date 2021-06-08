const TIME = 5000
const LINE_WIDTH = 5
const CENTER_PERCENT = 0.025
const ARC_PERCENT = 0.6

class Clock {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private time: number = 0
    private stopped = false

    init() {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.className = 'clock'
        document.body.appendChild(this.canvas)
        const resolution = window.devicePixelRatio
        this.canvas.width = this.canvas.offsetWidth * resolution
        this.canvas.height = this.canvas.offsetHeight * resolution
        this.stopped = true
        this.time = TIME
        this.draw()
    }

    draw() {
        const width = this.canvas.width
        const height = this.canvas.height
        this.context.clearRect(0, 0, width, height)
        const radius = width * 0.4
        const centerX = width / 2
        const centerY = height / 2

        this.context.beginPath()
        this.context.strokeStyle = 'black'
        this.context.lineWidth = LINE_WIDTH
        this.context.arc(centerX, centerY, radius, 0, Math.PI * 2)
        this.context.stroke()

        const arcSize = centerX * ARC_PERCENT
        const angle = (1 - this.time / TIME) * Math.PI * 2 - Math.PI / 2

        // draw gray arc
        this.context.beginPath()
        this.context.fillStyle = 'rgba(200,200,200,0.75)'
        this.context.moveTo(centerX, centerY)
        this.context.lineTo(centerX + Math.cos(angle) * arcSize, centerY + Math.sin(angle) * arcSize)
        this.context.arc(centerX, centerY, arcSize, angle, Math.PI * 2 - Math.PI / 2, false)
        this.context.lineTo(centerX, centerY)
        this.context.fill()

        // middle circle
        this.context.beginPath()
        this.context.fillStyle = 'black'
        const centerSize = width * CENTER_PERCENT
        this.context.arc(centerX, centerY, centerSize, 0, Math.PI * 2)
        this.context.fill()

        // draw line
        this.context.beginPath()
        this.context.moveTo(centerX, centerY)
        this.context.lineTo(centerX + Math.cos(angle) * arcSize, centerY + Math.sin(angle) * arcSize)
        this.context.stroke()
    }

    update(elapsed: number) {
        if (!this.stopped) {
            this.time -= elapsed
            if (this.time < 0) {
                this.time = TIME
            }
            this.draw()
        }
    }

    start() {
        this.stopped = false
    }

    stop() {
        this.stopped = true
    }
}

export const clock = new Clock()