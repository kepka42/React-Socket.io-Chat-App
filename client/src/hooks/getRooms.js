import axios from "axios";

const SERVER_API_URL = 'http://localhost:5001'

export const getRooms = () => {
  const url = SERVER_API_URL + '/rooms'
  return axios.get(url)
    .then((response) => {
      return response.data
    })
}