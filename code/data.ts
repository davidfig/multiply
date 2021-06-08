interface IDataSave {

}

interface IResult {
    lastSeen: number
    level: number
}

interface IPlayer {
    name: string
    results: IResult
}

export class Data {
    private players: IPlayer[]
    constructor(save?: IDataSave) {
        if (save) {

        }
    }

    create() {

    }
}