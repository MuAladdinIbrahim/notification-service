import { IRepository } from "../../Abstracts/DataAccess/IRepository";

export class UserRepository {
    constructor(private DataRepository: IRepository){}
    get(id: string) {
        return this.DataRepository.get(id)
    }
    set(id: string, data: any){
        this.DataRepository.set(id, data)
    }
}