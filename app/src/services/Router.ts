import type { Component } from "svelte"

export interface Route {

    path: string
    component: Component
}

export interface RouterConfig {
    window: Window
    routes: { [routeName: string]: Route }
}

export default class Router {
    constructor(private conf: RouterConfig) {

    }

    public getComponent(path: string): Component | undefined {
        for (const [routeName, route] of Object.entries(this.conf.routes)) {
            if (route.path === path) {
                return route.component
            }
        }
        return undefined
    }
}