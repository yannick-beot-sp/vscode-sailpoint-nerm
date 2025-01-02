import type { User } from "src/model/User";
import type { Client, Users } from "./Client";
import * as commands from "./Commands";
import { messageHandler } from "./MessageHandler";
import { Messenger } from "./Messenger";


interface State {
    users?: User[]
}

export class VsCodeClient implements Client {
    private state: State = {}

    getUsers(): Promise<Users> {
        throw new Error("Method not implemented.");
    }
}