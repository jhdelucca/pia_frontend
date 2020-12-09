import Axios from "axios";

const api = Axios.create({
   //baseURL: 'http://localhost:3333/',
  baseURL:'https://pia-mybudget.herokuapp.com/',
})

export default api;