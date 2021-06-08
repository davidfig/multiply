export type HTMLQuery = string | HTMLElement | Document

export function el(query: HTMLQuery, parent: HTMLQuery = document): HTMLElement {
    if (typeof query === 'string') {
        return el(parent).querySelector(query)
    } else {
        return query as HTMLElement
    }
}

export function els(query: string, parent: HTMLQuery = document): NodeListOf<HTMLElement> {
    return el(parent).querySelectorAll(query)
}

export function removeChildren(query: HTMLQuery, parent?: HTMLQuery) {
    const e = el(query, parent)
    e.innerHTML = ''
}

export function show(query: HTMLQuery, display: string = 'block') {
    el(query).style.display = display
}

export function hide(query: HTMLQuery) {
    el(query).style.display = 'none'
}

export interface Point {
    x: number
    y: number
}

export function translateEvent(event: UIEvent): Point {
    let x: number, y: number
    if (event instanceof MouseEvent) {
        x = event.clientX
        y = event.clientY
    } else if (event instanceof TouchEvent) {
        if (event.touches.length) {
            x = event.touches[0].clientX
            y = event.touches[0].clientY
        } else {
            x = event.changedTouches[0].clientX
            y = event.changedTouches[0].clientY
        }
    }
    return { x, y }
}

export enum CSSTypes {
    rem
}

export interface ICSSVariableOptions {
    parent?: HTMLElement
    type?: CSSTypes
}

export function getCSSVariable(name: string, options: ICSSVariableOptions = {}): any {
    const value = getComputedStyle(options.parent || document.body).getPropertyValue(name)
    if (options.type === CSSTypes.rem) {
        return parseFloat(value.replace('rem', ''))
    }
    return value
}