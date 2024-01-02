import request from '@/utils/ts/request'

export function upload(file: File) { 

    return request.post("/api/freeimg/upload", {
        file
    })
}