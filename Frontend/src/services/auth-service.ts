import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as acessTokenRepository from "../localstorage/acess-token-repository";

export function loginRequest(loginData: CredentialsDTO){
    const headers = {
       "Content-Type": "application/x-www-form-urlencoded",
       Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) 
    }

    const requestBody = QueryString.stringify({...loginData, grant_type: "password"});
    
    const config : AxiosRequestConfig = {
        method: "POST",
        url: "/oauth/token",
        data: requestBody,
        headers: headers
    }
    
    return requestBackend(config);
}

export function logout(){
    acessTokenRepository.remove();
}

export function saveAcessToken(token: string){
    acessTokenRepository.save(token);
}

export function getAcessToken(){
    return acessTokenRepository.get();
}