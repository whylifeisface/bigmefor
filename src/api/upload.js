import request from '@/utils/request'

export function upload(file) { 

    return request.post("/api/freeimg/upload", {
        file
    })
}