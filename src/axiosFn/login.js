import axios from "@/utils/request"

let baseUrl = axios.prototype.baseUrl;
export function login(data){
    return axios({
        url:baseUrl+"/tmesh/person/login",
        method:"post",
        data
    })
}