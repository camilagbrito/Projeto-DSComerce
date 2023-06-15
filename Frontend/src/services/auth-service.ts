import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { Axios, AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

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