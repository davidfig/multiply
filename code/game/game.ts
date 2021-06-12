import { problem } from './problem'
import { answers } from './answers'
import { clock } from './clock'
import { progress } from './progress'
import { help } from './help'
import { data } from '../data'
import { cheer } from './cheer'

export interface IProblem {
    a: number
    b: number
    answer: number
    time: number
}

export class Game {
    private div: HTMLDivElement
    problem: IProblem

    init() {
        this.div = document.createElement('div')
        this.div.className = 'game'
        document.body.appendChild(this.div)
        problem.init(this)
        progress.init()
        clock.init()
        answers.init()
        help.init()
        cheer.init()
    }

    show() {
        this.div.classList.add('game-show')
        problem.show()
        progress.show()
        help.show()
        clock.show()
    }

    noMoreProblems() {
        console.log('you win today!!!')
    }

    hide() {
        this.div.classList.remove('game-show')
    }

    end(n: number) {
        if (n === this.problem.answer) {

        }
    }

    start() {
        cheer.hide()
        // const result = { a: 11, b: 11, time: 5000, answer: 121 }
        const result = data.findProblem()
        if (result === false) {
            this.noMoreProblems()
        } else {
            this.problem = result
            clock.start(result.time)
            answers.start()
            problem.start()
            progress.start(this.problem.a, this.problem.b)
            help.hide()
        }
    }

    update(elapsed: number) {
        clock.update(elapsed)
    }

    correctAnswer() {
        clock.stop()
        answers.clear()
        data.correctAnswer(this.problem.a, this.problem.b)
        help.show()
        progress.show()
        cheer.win()
    }

    wrongAnswer() {
        clock.stop()
        answers.correct(this.problem.a, this.problem.b)
        answers.clear()
        help.show()
    }

    checkAnswer(n: number) {
        if (this.problem.answer.toString().length === n.toString().length) {
            if (n === this.problem.answer) {
                this.correctAnswer()
            } else {
                this.wrongAnswer()
            }
        }
    }
}

export const game = new Game()