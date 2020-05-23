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
    const { data: { data: home } } = await axios.post(URL, JSON.stringify(graphqlQuery));
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
    await axios.post(URL, JSON.stringify(graphqlQuery));
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
    await axios.post(URL, JSON.stringify(graphqlQuery));
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
          user {
            _id,
            name,
            username,
            bio,
            website, 
            location, 
            createdAt, 
            email
          },
          follow
          }
        }      
      `
    };
    const { data: { data: { showUser } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return showUser;
  } catch ({ response }) {
    console.log(response);
    return { ...response.data.errors[0] }
  }
}

export const follow = async (_id) => {
  try {
    const graphqlQuery = {
      query: `
        mutation {
          follow(followunfollowData:{_id: "${_id}"})
        }        
      `
    }
    await axios.post(URL, JSON.stringify(graphqlQuery));

  } catch (error) {
    console.log(error.response);
  }
}

export const unfollow = async (_id) => {
  try {
    const graphqlQuery = {
      query: `
        mutation {
          unfollow(followunfollowData:{_id: "${_id}"})
        }        
      `
    }
    await axios.post(URL, JSON.stringify(graphqlQuery));

  } catch (error) {
    console.log(error.response);
  }
}

export const follower = async () => {
  try {
    const graphqlQuery = {
      query: `
        {
          followers{
            _id,
            to,
            from{
              _id,
              name,
              username
            }
          }
        }              
      `
    }
    const { data: { data: { followers } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return followers;
  } catch (error) {
    console.log(error.response);
  }
}

export const following = async () => {
  try {
    const graphqlQuery = {
      query: `
        {
          following{
            _id,
            from,
            to{
              _id,
              email,
              username
            }
          }
        }
      `
    }
    const { data: { data: { following } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return following;
  } catch (error) {
    console.log(error.response);
  }
}