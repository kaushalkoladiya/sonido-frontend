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

export const home = async () => {
  try {
    const graphqlQuery = {
      query: `
      {
        home {
          users {
              _id,
            username,
            createdAt
          },
          receivedDedications {
            _id,
            sender{
              _id,
              username,
              name
            },
            receiver,
            previewUrl,
            artworkUrl,
            trackName,
            artistName,
            createdAt
          },
          sendedDedications {
            _id,
            receiver{
              _id,
              username,
              name
            }
            sender,
            previewUrl,
            artworkUrl,
            trackName,
            artistName,
            createdAt
          },
          notifications{
            sender{
              _id,
              name,
              username
            },
            receiver,
            type,
            dedicateId{
              _id,
              previewUrl,
              trackName,
              artistName
            },
            createdAt
          }
        }  
      }
    `
    }
    const { data: { data: home } } = await axios.post('http://localhost:5000/graphql', JSON.stringify(graphqlQuery));
    return home;
  } catch ({ response }) {
    console.log(response)
  }
}

export const getTracks = async (term) => {
  try {
    const { data: { results } } = await axios.get(`https://itunes.apple.com/search?term=${term}&limit=1`, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      }
    });
    return results;
  } catch (error) {
    console.log(error.response)
  }
}

export const searchUsers = async (term) => {
  try {
    const graphqlQuery = {
      query: `
      {
        searchUser(term: "${term}"){
          _id,
          username,
          name
        }
      }
      `
    }
    const { data: { data: { searchUser } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return searchUser;
  } catch (error) {
    console.log(error.response);
  }
}

export const dedicateSong = async (receiverId, previewUrl, artworkUrl100, trackName, artistName) => {
  try {
    const graphqlQuery = {
      query: `
        mutation {
          dedicate(dedicateData:{
            receiver: "${receiverId}",
            previewUrl: "${previewUrl}",
            artworkUrl: "${artworkUrl100}",
            trackName: "${trackName}",
            artistName: "${artistName}"
          }) {
              _id
          }
        }  
      `
    };
    const { data } = await axios.post(URL, JSON.stringify(graphqlQuery));
    console.log(data);
    return;
  } catch (error) {
    console.log(error.response);
  }
}

export const editUser = async (name, location, bio, website) => {
  try {
    const graphqlQuery = {
      query: `
        mutation {
          editUser(editUserData: {
            name: "${name}",
            bio: "${bio}",
            website: "${website}",
            location: "${location}",
          }) {
            name, 
            username
          }
        }  
      `
    };
    const { data } = await axios.post(URL, JSON.stringify(graphqlQuery));
    console.log(data)
    return;
  } catch (error) {
    console.log(error.response);
  }
}

export const showUser = async (_id) => {
  try {
    const graphqlQuery = {
      query: `
        {
          showUser(_id:"${_id}") {
            _id,
            name,
            username,
            bio,
            website, 
            location, 
            createdAt, 
            email
          }
        }      
      `
    };
    const { data: { data: { showUser } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return showUser;
  } catch (error) {
    console.log(error.response);
  }
}

