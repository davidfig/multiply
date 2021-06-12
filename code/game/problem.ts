import { el } from '../el'
import { tables } from '../settings'
import { Game } from './game'

class Problem {
    private game: Game
    private div: HTMLElement
    private digits: number

    init(game: Game) {
        this.game = game
        this.div = document.createElement('div')
        this.div.className = 'problem'
        let s = '<span class="problem-a"></span> &#xd7; <span class="problem-b"></span> = '
        this.digits = Math.pow(tables - 1, 2).toString().length
        for (let i = 0; i < this.digits; i++) {
            s += `<span class="problem-answer problem-answer-${i}${i !== 0 ? ' problem-answer-fade' : ''}">?</span>`
        }
        this.div.innerHTML = s
        el('.game').appendChild(this.div)
    }

    getPosition(index: number): DOMRect {
        const span = el(`.problem-answer-${index}`) as HTMLSpanElement
        return span.getBoundingClientRect()
    }

    revealAnswer(index: number) {
        el(`.problem-answer-${index}`).classList.add('problem-answer-fade')
        const answerLength = this.game.problem.answer.toString().length
        if (index + 1 < answerLength) {
            el(`.problem-answer-${index + 1}`).classList.remove('problem-answer-fade')
        }
    }

    show() {
        this.div.classList.add('problem-hide')
    }

    start() {
        this.div.classList.remove('problem-hide')
        el('.problem-a').innerHTML = this.game.problem.a.toString()
        el('.problem-b').innerHTML = this.game.problem.b.toString()
        for (let i = 1; i < this.digits; i++) {
            el(`.problem-answer-${i}`).classList.add('problem-answer-fade')
        }
    }
}

export const problem = new Problem()