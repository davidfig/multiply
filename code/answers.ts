import { Answer } from './answer'

class Answers {
    div: HTMLElement
    private answers: Answer[] = []

    init() {
        this.div = document.createElement('div')
        this.div.className = 'answers'
        document.body.appendChild(this.div)
    }

    show(a: number, b: number) {
        this.div.innerHTML = ''
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        // check if we need extra numbers because of duplicate numbers in the answer
        const answer = (a * b).toString()
        if (answer.length > 1) {
            for (let i = 0; i < answer.length; i++) {
                for (let j = i + 1; j < answer.length; j++) {
                    if (answer[i] === answer[j]) {
                        numbers.push(parseInt(answer[i]))
                    }
                }
            }
        }

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
}

export const answers = new Answers()