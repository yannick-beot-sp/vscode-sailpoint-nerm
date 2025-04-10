import * as vscode from 'vscode';
import { IRequestHandler } from './interfaces';
import * as constants from '../constants';

export class OpenWebViewCommand implements IRequestHandler<string, void> {
    public readonly command = "openWebView"

    constructor(private readonly tenantId:string)  { }

    async handle(request: string): Promise<void> {

        await vscode.commands.executeCommand(constants.OPEN_WEBVIEW, `${this.tenantId}${request}`)

    }
}