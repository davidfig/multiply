import localforage from 'localforage'

import { name, clearStorage, storageName } from './settings'
import { data, IDataSave } from '../data/data'

class File {
    async init() {
        localforage.config({ name: name, storeName: name })
        if (clearStorage) {
            localforage.clear()
            if (log) {
                console.log('[DEBUG] Cleared storage.')
            }
        } else {
            const saved = await localforage.getItem(storageName) as IDataSave
            if (saved) {
                // sanity check
                if (saved.version && saved.events && saved.days) {
                    data.load(saved)
                } else {
                    console.warn('Problem with saved file')
                }
            } else {
                // todo: help should show once it's activated
                // help.show()
            }
        }
        dropbox.start()
        setInterval(() => this.save(), saveInterval)
    }

    async save() {
        if (data.dirty) {
            const save = data.save()
            localforage.setItem(storageName, save)
            if (log) {
                console.log('[DEBUG] Locally saving data')
            }
            data.dirty = false
            dropbox.dirty = true
        }
    }
}

export const file = new File()