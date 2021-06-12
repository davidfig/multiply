import { el } from '../el'
import { Answer } from './answer'
import { game } from './game'
import { problem } from './problem'

class Answers {
    div: HTMLElement
    private answers: Answer[] = []
    private current: Answer[] = []

    init() {
        this.div = document.createElement('div')
        this.div.className = 'answers'
        el('.game').appendChild(this.div)
        this.div.innerHTML = ''
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (const number of numbers) {
            this.answers.push(new Answer(number))
        }
    }

    start() {
        for (const answer of this.answers) {
            answer.reset()
        }
        this.current = []
    }

    find(n: number, found: Answer[]) {
        return this.answers.find(answer => answer.number === n && !found.includes(answer) && !this.current.includes(answer))
    }

    checkAnswer() {
        let answer = ''
        for (const digit of this.current) {
            answer += digit.number.toString()
        }
        game.checkAnswer(parseInt(answer))
    }

    answer(answer: Answer) {
        answer.answer(this.current.length, () => this.checkAnswer())
        problem.revealAnswer(this.current.length)
        this.current.push(answer)
    }

    correct(a: number, b: number) {
        const answer = (a * b).toString()
        const wrongAnswers = []
        const found = []
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] !== this.current[i].number.toString()) {
                wrongAnswers.push(this.current[i])
                const correct = this.find(parseInt(answer[i]), found)
                found.push(correct)
                correct.answer(i)
            }
        }
        for (const a of wrongAnswers) {
            a.removeAnswer()
        }
    }

    clear() {
        for (const answer of this.answers) {
            answer.clear()
        }
    }
}

export const answers = new Answers()