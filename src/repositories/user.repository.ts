import ResponseApp from '../utils/response.interface';

class UserRepository {
    findAll = async():Promise<ResponseApp<any>> =>{
        return new ResponseApp(200, 'hallo', null)
    }

    findById = async(id: string):Promise<ResponseApp<any>> =>{
        return new ResponseApp(200, `show user by id ${id}`, null)
    }
}

export default UserRepository;