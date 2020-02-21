import Axios from 'axios'
import { config } from 'dotenv'

// Load ENV variables
config()

export const register = async () => {
  const url = 'http://localhost:8081/chains'
  const postResponse = await Axios.post(url, JSON.parse(process.env.CHAIN_DATA!), {
    timeout: 5
  })

  const chainResponse = await Axios.get(`${url}/${postResponse.data.uuid}`)

  console.log('New chain registered', chainResponse.data)
}
