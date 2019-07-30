export default function successHandler(data:any,message:string,status:number) {
    return {
        message:message||'fake response',
        status:status||'200',
        data:data||'data'
    }    
}