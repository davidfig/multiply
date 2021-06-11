import { el } from '../el'
import { Answer } from './answer'
import { problem } from './problem'

class Answers {
    div: HTMLElement
    private answers: Answer[] = []

    init() {
        this.div = document.createElement('div')
        this.div.className = 'answers'
        el('.game').appendChild(this.div)
    }

    show() {
        this.div.innerHTML = ''
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (const number of numbers) {
            this.answers.push(new Answer(number))
        }
    }

    clear() {
        for (const answer of this.answers) {
            answer.clear()
        }
    }

    update(elapsed: number) {
        for (const answer of this.answers) {
            answer.update(elapsed)
        }
    }

    pressed(answer: Answer) {
        problem.checkAnswer(answer.number)
    }
}

export const answers = new Answers()