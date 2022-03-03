import axios from 'axios';
import { useContext } from 'react';
import { MyContext } from "../index";
import dajys from 'dayjs'
import jwt_decode from "jwt-decode";

const baseURL = 'http://localhost:5000'

const useAxios = () =>{
    const { user, setUser } = useContext(MyContext);
    const axiosPrivateRouteInstance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: { Authorization: `Bearer ${user?.accessToken}` }
    })

    axiosPrivateRouteInstance.interceptors.request.use(async (req)=>{
        const userAccessTokenExpiry = user?.exp;
        const isExpired = dajys.unix(userAccessTokenExpiry).diff(dajys()) < 1;
        if(!isExpired) return req;
        try{
        const response = await axios.post(`${baseURL}/api/token/refresh`,{
            token: user?.refreshToken
        })
        const newAccessToken = response?.data?.data?.accessToken
        const newUser = await jwt_decode(newAccessToken);
        newUser.accessToken = newAccessToken;
        setUser({...user, ...newUser});

        req.headers.Authorization = `Bearer ${newAccessToken}`;
        return req

    }catch(error){
        console.log("break while refreshing token ", error.response);
        setUser({})
    }
    },(error)=>{
        console.log("error in interceptor", error);
        return Promise((reject)=>{
            reject("Session Expired")
        })
    })

    return axiosPrivateRouteInstance
}

export default useAxios