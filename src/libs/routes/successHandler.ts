export default function successHandler(data: any, message: string, status: number) {
    return {
        data: data || 'data',
        message: message || 'fake response',
        status: status || 400,
    };
}
