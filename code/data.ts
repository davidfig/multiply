interface IResultSave {
    key: string
    lastSeen: number
    level: number
}

interface IPlayerSave {
    name: string
    results: IResultSave[]
}

export interface IDataSave {
    players: IPlayerSave[]
    current: number
}

interface IResult {
    lastSeen: number
    level: number
}

interface ResultMap {
    [key: string]: IResult
}

interface IPlayer {
    name: string
    results: ResultMap
}

export class Data {
    players: IPlayer[] = []
    current: IPlayer
    dirty: boolean = false

    isValid(name: string): boolean {
        if (name.length === 0) {
            return false
        }
        for (const player of this.players) {
            if (player.name === name) {
                return false
            }
        }
        return true
    }

    setCurrent(name: string) {
        this.current = this.players.find(player => player.name === name)
    }

    add(name: string) {
        const player = { name, results: {} }
        this.players.push(player)
        this.current = player
        this.dirty = true
    }

    key(a: number, b: number) {
        return `${a}x${b}`
    }

    getResult(a: number, b: number): IResult {
        let result = this.current.results[this.key(a, b)]
        if (!result) {
            result = this.current.results[this.key(a, b)] = { lastSeen: 0, level: 0 }
        }
        return result
    }

    success(a: number, b: number) {
        const result = this.getResult(a, b)
        result.lastSeen = Date.now()
        result.level++
    }

    failure(a: number, b: number) {
        const result = this.getResult(a, b)
        result.lastSeen = Date.now()
        result.level++
    }

    save(): IDataSave {
        debugger
        const players: IPlayerSave[] = []
        const save = { players } as IDataSave
        for (const player of this.players) {
            const playerSave = {
                name: player.name,
                results: [],
            } as IPlayerSave
            for (const key in player.results) {
                const result = player.results[key]
                playerSave.results.push({
                    key,
                    ...result,
                } as IResultSave)
            }
            save.players.push(playerSave)
        }
        save.current = this.players.indexOf(this.current)
        return save
    }

    load(load: IDataSave) {
        this.players = []
        for (const playerSave of load.players) {
            const player = { name: playerSave.name, results: {} }
            for (const result of playerSave.results) {
                player.results[result.key] = { lastSeen: result.lastSeen, level: result.level }
            }
            this.players.push(player)
        }
        this.current = this.players[load.current]
    }
}

export const data = new Data()