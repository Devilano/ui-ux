import axios from "axios";

const Api = axios.create ({
    baseURL: "http://localhost:5000",
    withCredentials :true,
    headers:{
        "Content-Type" :"multipart/form-data",
    }
})

// make seperate header for authorization

const config={
    headers :{
    'authorization' :`Bearer ${localStorage.getItem('token')}`
}}

export const testApi =()=> Api.get("/test")

//create user api
export const createUserApi = (data) =>Api.post('/api/user/create',data)

//Login User  Api 
export const loginUserApi = (data)=> Api.post('/api/user/login',data)


// Forget Password

export const forgetPasswordApi =(data)=> Api.post('/api/user/forgetpassword',data)



//create voting api 
export const createVoteApi = (data) =>Api.post('/api/vote/create', data, config)
export const getVoteApi = () =>Api.get('/api/vote/get_vote')



// FOr All party Dashboard 
export const createPropertyApi = (data) => Api.post('/api/property/create_property',data,config)

export const getAllPropertyApi = () =>Api.get('/api/property/get_property')

export const getSinglePropertyApi = (id) => Api.get(`/api/property/get_property/${id}`,config)

export const updatePropertyApi = (id,formData) => Api.put(`/api/property/update_property/${id}`,formData,config)
export const deletePropertyApi= (id)=> Api.delete(`/api/property/delete_property/${id}`,config)

// For Progress 
export const createProgressApi = (data) => Api.post('/api/progress/create_progress',data,config)
export const getAllProgressApi = () =>Api.get('/api/progress/get_progress')
export const deleteProgressApi= (id)=> Api.delete(`/api/progress/delete_progress/${id}`,config)
export const getSingleProgressApi = (id) => Api.get(`/api/progress/get_progress/${id}`)









