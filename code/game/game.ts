import { problem } from './problem'
import { answers } from './answers'
import { clock } from './clock'
import { progress } from './progress'

export interface IProblem {
    a: number
    b: number
    answer: number
}

export class Game {
    div: HTMLDivElement
    problem: IProblem

    init() {
        this.div = document.createElement('div')
        this.div.className = 'game'
        document.body.appendChild(this.div)
        problem.init(this)
        progress.init()
        clock.init()
        answers.init()
    }

    findProblem(): IProblem {
        return { a: 9, b: 3, answer: 9 * 3 }
    }

    show() {
        this.div.classList.add('game-show')
        this.problem = this.findProblem()
        problem.show()
        answers.show()
        clock.show(5000)
    }

    hide() {
        this.div.classList.remove('game-show')
    }

    end(n: number) {
        if (n === this.problem.answer) {

        }
    }

    start() {
        problem.start()
        progress.show(this.problem.a, this.problem.b)
    }

    update(elapsed: number) {
        clock.update(elapsed)
        answers.update(elapsed)
    }
}

export const game = new Game()