import localforage from 'localforage'

import { name, clearStorage, storageName, saveInterval } from './settings'
import { data, IDataSave } from './data'

class File {
    async init() {
        localforage.config({ name: name, storeName: name })
        if (clearStorage) {
            localforage.clear()
            console.log('[DEBUG] Cleared storage.')
        } else {
            const saved = await localforage.getItem(storageName) as IDataSave
            if (saved) {
                data.load(saved)
            }
        }
        setInterval(() => this.save(), saveInterval)
    }

    async save() {
        if (data.dirty) {
            localforage.setItem(storageName, data.save())
            console.log('[DEBUG] Locally saving data')
            data.dirty = false
        }
    }
}

export const file = new File()