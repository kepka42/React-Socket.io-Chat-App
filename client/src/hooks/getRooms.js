import axios from "axios";
import { SERVER_URL_API } from 'config';

export const getRooms = () => {
  const url = SERVER_URL_API + '/rooms'
  return axios.get(url)
    .then((response) => {
      return response.data
    })
}