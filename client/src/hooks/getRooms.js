import axios from "axios";
import { SERVER_URL } from 'config';

export const getRooms = () => {
  const url = SERVER_URL + '/rooms'
  return axios.get(url)
    .then((response) => {
      return response.data
    })
}