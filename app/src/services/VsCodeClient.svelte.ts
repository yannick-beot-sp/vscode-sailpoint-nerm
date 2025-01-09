import type { User } from "src/model/User";
import type { Client, Users } from "./Client";
import { messageHandler } from "./MessageHandler";
import { Messenger } from "./Messenger";


interface State {
    users?: User[]
}

export class VsCodeClient implements Client {
    private state: State = {}

    async getUsers(): Promise<User[]> {
        return await messageHandler.request<User[]>("getUsers")
    }
}