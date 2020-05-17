import axios from 'axios';

const URL = "https://sonido.herokuapp.com/graphql";

export const login = async ({ email, password }) => {
  try {
    const graphqlQuery = {
      query: `
          {
            login(loginData: {email: "${email}", password: "${password}"}) {
              token
              userId
            }
          }        
        `
    };
    const { data: { data: { login } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return { ...login };
  } catch ({ response: { data } }) {
    if (data.errors.length > 0) {
      return data.errors[0];
    }
  }
}

export const singup = async ({ username, email, password, confirmPassword }) => {
  try {
    const graphqlQuery = {
      query: `
        mutation{
          signup(signupData: {
            email: "${email}", 
            username:"${username}", 
            password: "${password}", 
            confirm_password: "${confirmPassword}"
          }) {
            token, 
            userId
          }     
        }
        `
    };
    const { data: { data: { signup } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return { ...signup };
  } catch ({ response: { data } }) {
    if (data.errors.length > 0) {
      return data.errors[0];
    }
  }
}

