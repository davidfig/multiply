import { el } from '../el'
import { name } from '../settings'
import { data } from '../data'
import { state } from '../state'

class Menu {
    private div: HTMLDivElement

    init() {
        this.div = document.createElement('div')
        this.div.className = 'menu'
        this.div.innerHTML = `<div class="menu-title">${name}</div>` +
            '<div class="menu-names">' +
            '<div class="menu-players"></div>' +
            '<button class="menu-add">Create New Player</button>' +
            '</div>'
        document.body.appendChild(this.div)
        el('.menu-add').addEventListener('pointerdown', () => this.createPlayer())
        for (const player of data.players) {
            this.addPlayer(player.name)
        }
    }

    addPlayer(name: string) {
        const add = document.createElement('div')
        add.className = 'menu-player'
        add.innerHTML = name
        el('.menu-players').appendChild(add)
        add.addEventListener('pointerdown', () => {
            data.setCurrent(name)
            state.state = 'game'
        })
    }

    add(name: string): boolean {
        if (data.isValid(name)) {
            data.add(name)
            this.addPlayer(name)
            return true
        }
        el('.menu-add-player-edit').classList.add('menu-add-player-invalid')
        return false
    }

    createPlayer() {
        const add = document.createElement('div')
        add.className = 'menu-add-player'
        add.innerHTML = '<input class="menu-add-player-edit" placeholder="Your name"><button class="menu-add-player-submit">add</button>'
        el('.menu-players').appendChild(add)
        const edit = el('.menu-add-player-edit') as HTMLInputElement
        edit.focus()
        edit.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                if (this.add(edit.value)) {
                    add.remove()
                }
            } else if (e.code === 'Escape') {
                add.remove()
            } else {
                edit.classList.remove('menu-add-player-invalid')
            }
        })
        el('.menu-add-player-submit').addEventListener('pointerdown', () => {
            if (this.add(edit.value)) {
                add.remove()
            }
        })
    }

    show() {
        this.div.style.display = 'flex'
    }

    hide() {
        this.div.style.display = 'none'
    }

    update() { }
}

export const menu = new Menu()