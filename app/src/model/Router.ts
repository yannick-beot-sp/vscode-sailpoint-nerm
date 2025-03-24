import type { Component } from "svelte"

export interface Route {

    path: string
    component: Component<any,{},string>
}

export interface RouterConfig {
    window: Window
    routes: { [routeName: string]: Route }
}
