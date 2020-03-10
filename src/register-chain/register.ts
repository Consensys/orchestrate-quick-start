import Axios from 'axios'
import { config } from 'dotenv'
import { utils } from 'ethers'

// Load ENV variables
config()

export const register = async () => {
  const chainResponse = await Axios.post('http://localhost:8081/chains', JSON.parse(process.env.CHAIN_DATA!))
  console.log('New chain registered', chainResponse.data)

  const faucetResponse = await Axios.post('http://localhost:8081/faucets', {
    name: 'rinkeby-faucet',
    amount: utils.parseEther('0.005').toString(),
    chainRule: chainResponse.data.uuid,
    cooldown: '10s',
    creditorAccount: process.env.FAUCET_ACCOUNT,
    maxBalance: utils.parseEther('0.1').toString()
  })

  console.log('New faucet registered', faucetResponse.data)
}
