import { FPS } from 'yy-fps'
import { menu } from './menu/menu'
import { game } from './game/game'

class State {
    private fps: FPS
    private _state: string
    private states = {
        menu,
        game,
    }
    private lastTime: number

    init() {
        for (const key in this.states) {
            this.states[key].init()
        }
        this.state = 'game'
        this.lastTime = performance.now()
        this.fps = new FPS()
        requestAnimationFrame(() => this.update())
    }

    set state(state) {
        if (state !== this._state) {
            if (this._state) {
                this.state.hide()
            }
            this._state = state
            this.state.show()
        }
    }
    get state() {
        return this.states[this._state]
    }

    resize() {
        for (const key in this.states) {
            this.states[key].resize()
        }
    }

    update() {
        const now = performance.now()
        this.state.update(now - this.lastTime)
        this.lastTime = now
        requestAnimationFrame(() => this.update())
        this.fps.frame()
    }
}

export const state = new State()