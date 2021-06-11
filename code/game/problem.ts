import { el } from '../el'
import { Game } from './game'

class Problem {
    private game: Game
    private div: HTMLElement
    firstDigit: boolean = true

    init(game: Game) {
        this.game = game
        this.div = document.createElement('div')
        this.div.className = 'problem'
        this.div.innerHTML = '<span class="problem-a"></span> &#xd7; <span class="problem-b"></span>' +
            ' = <span class="problem-answer problem-answer-1"></span><span class="problem-answer problem-answer-2"></span>'
        el('.game').appendChild(this.div)
    }

    getDigit(): DOMRect {
        const span = el(`.problem-answer-${this.firstDigit ? '1' : '2'}`) as HTMLSpanElement
        if (this.firstDigit) {
            el('.problem-answer-1').classList.add('problem-answer-fade')
            if (this.game.problem.answer.toString().length === 2) {
                el('.problem-answer-2').innerText = '?'
            }
        } else {
            el('.problem-answer-2').classList.add('problem-answer-fade')
        }
        this.firstDigit = false
        return span.getBoundingClientRect()
    }

    show() {
        el('.problem-a').innerHTML = this.game.problem.a.toString()
        el('.problem-b').innerHTML = this.game.problem.b.toString()
        el('.problem-answer-1').innerHTML = '?'
        el('.problem-answer-2').innerHTML = ''
        this.div.classList.add('problem-hide')
        this.firstDigit = true
    }

    start() {
        this.div.classList.remove('problem-hide')
    }
}

export const problem = new Problem()