import axios from "@/utils/request"

let baseUrl = axios.prototype.baseUrl;

export function queryList(data){
    return axios({
        url:baseUrl+"/tmesh/person/queryPersons",
        method:"get",
        params:data
    })
}

export function loginOut(data){
    return axios({
        url:baseUrl+"/tmesh/person/loginOut",
        method:"post",
        params:data
    })
}

export function update(data){
    return axios({
        url:baseUrl+"/tmesh/person/update",
        method:"post",
        data
    })
}
