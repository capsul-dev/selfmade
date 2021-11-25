const axios = require("axios");

//const baseURL = `localhost:${await process.env.DEV_EXPRESS_PORT}`;

// const setupAxios = () => {
//   if(process.env.NODE_ENV === "development") {
//     return axios.create({
//       baseURL: "localhost:3000",
//       timeout: 15000,
//     })
//   } else {
//     return axios.create({  
//       timeout: 15000,
//     })  
//   };
// };

// const axiosInstance = setupAxios();

// module.exports = axiosInstance;

module.exports = axios.create({  
  timeout: 15000,
});