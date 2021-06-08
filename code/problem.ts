import animejs from 'animejs'
import { el } from './el'
import { answers } from './answers'
import { clock } from './clock'
import { progress } from './progress'
import { Point } from './util'

class Problem {
    private div: HTMLElement
    private size: Point
    firstDigit: boolean = true
    answer: number

    init() {
        progress.init()
        clock.init()
        answers.init()
        this.div = document.createElement('div')
        this.div.className = 'problem'
        this.div.innerHTML = '<span class="problem-a"></span> &#xd7; <span class="problem-b"></span>' +
            ' = <span class="problem-answer problem-answer-1"></span><span class="problem-answer problem-answer-2"></span>'
        document.body.appendChild(this.div)
    }

    getDigit(): DOMRect {
        const span = el(`.problem-answer-${this.firstDigit ? '1' : '2'}`) as HTMLSpanElement
        if (this.firstDigit) {
            el('.problem-answer-1').classList.add('problem-answer-fade')
            if (this.answer.toString().length === 2) {
                el('.problem-answer-2').innerText = '?'
            } else {
                this.end()
            }
        } else {
            el('.problem-answer-2').classList.add('problem-answer-fade')
            this.end()
        }
        this.firstDigit = false
        return span.getBoundingClientRect()
    }

    findProblem(): { a: number, b: number } {
        return { a: 9, b: 3 }
    }

    show() {
        const problem = this.findProblem()
        this.answer = problem.a * problem.b
        el('.problem-a').innerHTML = problem.a.toString()
        el('.problem-b').innerHTML = problem.b.toString()
        el('.problem-answer-1').innerHTML = '?'
        el('.problem-answer-2').innerHTML = ''
        // const start = progress.get(problem.index)
        // this.size = { x: this.div.offsetWidth, y: this.div.offsetHeight }
        // const scale = 0.1
        // this.div.style.transform = `translate(${start.x - this.size.x / 2}px, ${start.y - this.size.y / 2}px) scale(${scale}) `
        // el('.problem-wrapper').style.transform = 'scale(0.1) translate(-50%, -50%)'
        // animejs({
        //     targets: [this.div],
        //     translateX: window.innerWidth / 2,
        //     translateY: window.innerHeight / 2,
        //     duration: 2000,
        // })
        progress.show(problem.a, problem.b)
        answers.show(problem.a, problem.b)
        this.firstDigit = true
    }

    clear() {
        answers.clear()
        clock.stop()
    }

    checkAnswer(n: number) {
        if (n === this.answer) {

        }
    }

    update(elapsed: number) {
        clock.update(elapsed)
        answers.update(elapsed)
    }

    end() {
        answers.clear()
    }
}

export const problem = new Problem()