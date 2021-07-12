export interface IProvider {
    send(msgs: string[]): Promise<boolean|string[]>
}