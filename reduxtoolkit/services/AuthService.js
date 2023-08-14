import axios from "axios";
import {url} from "./Urls"
const register = (name, lastName, email, password) => {
  const params = {
    name,
    lastName,
    email: email.trim(),
    password,
  };
  console.log(params);
  return axios
    .post(`${url}/api/auth/register`, params)
    .then((response) => {
        console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      return error.response.data;
    });
};
const login = async (email, password) => {
    const params = {
      email: email.trim(),
      password,
    };
    return await axios
      .post(`${url}/api/auth/login`, params)
      
  };


const AuthServises= {
    register,
    login
}

export default AuthServises;