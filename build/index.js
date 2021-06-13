import childProcess from 'child_process'
import chokidar from 'chokidar'
import { production } from './production'
// import killPort from 'kill-port'

const index = 'build/dev.js'
let _process, _lock

const PRODUCTION = 'docs'
const _waitToRestart = 250

async function run(file) {
    if (_lock) {
        return
    }
    if (file !== true) {
        console.log(`reloading node.js server because ${file} changed...`)
    }
    _lock = true
    if (_process) {
        _process.kill()
        _process = null
        // await killPort(1235, 'tcp')
        setTimeout(_restart, _waitToRestart)
    } else {
        _restart()
    }
}

async function _restart() {
    _lock = false
    _process = childProcess.fork(index)
    _process.on('error', err => {
        if (!_lock) {
            _lock = true
            console.log(err)
        }
    })
}

async function start() {
    if (process.argv[2] === '--minify') {
        console.log('building for production...')
        await production()
        process.exit(0)
    } else {
        console.log('starting live-reload development server script')
        const awaitWriteFinish = {
            stabilityThreshold: 250,
            pollInterval: 100
        }
        run(true)
        const watch = chokidar.watch(['build/**/*'], { awaitWriteFinish })
        watch.on('change', file => run(file))
    }
}

start()
