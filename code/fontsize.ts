/**
 * @file index.js
 * @summary calculate font-size for a given bounding box
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2017
 * {@link https://github.com/davidfig/calcFontSize}
 */

export interface IFontSize {
    width?: number
    height?: number
    fontFamily?: string
    min: number
    max: number
    remove: boolean
}

let _dummy: HTMLDivElement

/**
  * @param {string} text
  * @param {object} options
  * @param {number} [width] bounding box width and/or height
  * @param {number} [height] "
  * @param {string} [fontFamily] use this font-family to determine the size
  * @param {number} [min=10] minimum font size
  * @param {number} [max=1000] maximum font size
  * @param {boolean} [remove=false] remove dummy element instead of hiding it for use on next call
  * @returns {number} fontSize
  */
export function fontSize(text: string, options: IFontSize): number {
    if (!text) {
        return 0
    }
    if (!options || (!options.width && !options.height)) {
        console.error('ERROR: calc-fontsize requires either a width or height specified')
        return 0
    }
    if (!_dummy) {
        _dummy = document.createElement('div')
        document.body.appendChild(_dummy)
        _dummy.style.position = 'absolute'
        _dummy.style.padding = '0'
        _dummy.style.margin = '0'
        _dummy.style.float = 'left'
        _dummy.style.whiteSpace = 'no-wrap'
        _dummy.style.visibility = 'hidden'
    }
    else {
        _dummy.style.display = 'block'
    }
    _dummy.style.fontFamily = options.fontFamily || ''
    let size = options.min || 10
    const max = options.max || 1000
    _dummy.style.fontSize = size + 'px'
    _dummy.innerHTML = text
    while (size <= max && (!options.width || _dummy.offsetWidth < options.width) && (!options.height || _dummy.offsetHeight < options.height)) {
        size++
        _dummy.style.fontSize = size + 'px'
    }
    if (options.remove) {
        document.body.removeChild(_dummy)
        _dummy = null
    }
    else {
        _dummy.style.display = 'none'
    }
    return size - 1
}
