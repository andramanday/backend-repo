class ResponseApp<D>{    
    err: boolean;

    code: number;

    msg: string;

    data: D

    constructor(
        code: number,
        msg: string,
        data: D
    ){
        this.err = [200, 201, 202, 204, 206].includes(code) ? false : true;
        this.code = code
        this.msg = msg
        this.data = data
    }
}

export default ResponseApp;