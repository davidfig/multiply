import animejs from 'animejs'
import { el } from './el'
import { answers } from './answers'
import { clock } from './clock'
import { progress } from './progress'

class Problem {
    private div: HTMLElement

    init() {
        progress.init()
        clock.init()
        answers.init()
        this.div = document.createElement('div')
        this.div.className = 'problem'
        this.div.innerHTML = '<div class="problem-wrapper">' +
            '<span class="problem-a"></span> &#xd7; <span class="problem-b"></span>' +
            ' = <span class="problem-answer" > </span>' +
            '</div>'
        document.body.appendChild(this.div)
        document.body.addEventListener('mousedown', () => this.clear())
    }

    findProblem(): { a: number, b: number, index: number } {
        return { a: 2, b: 4, index: 3 }
    }

    show() {
        const problem = this.findProblem()
        const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 } //progress.get(problem.index)
        el('.problem-a').innerHTML = problem.a.toString()
        el('.problem-b').innerHTML = problem.b.toString()
        el('.problem-answer').innerHTML = '?'
        this.div.style.transform = `translate(${start.x}px, ${start.y}px)`
        // el('.problem-wrapper').style.transform = 'scale(0.1)'
        // animejs({
        //     targets: [this.div],
        //     translateX: window.innerWidth / 2,
        //     translateY: window.innerHeight / 2,
        //     duration: 2000,
        // })
        answers.show(problem.a, problem.b)
    }

    clear() {
        answers.clear()
        clock.stop()
    }

    update(elapsed: number) {
        clock.update(elapsed)
        answers.update(elapsed)
    }
}

export const problem = new Problem()