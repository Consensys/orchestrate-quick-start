import { config } from 'dotenv'
import { Contract, getDefaultProvider } from 'ethers'

import { Counter } from '../../build/contracts/Counter'

// Load ENV variables
config()

const provider = getDefaultProvider('rinkeby')
provider.resetEventsBlock(0)
const contract = new Contract(process.env.COUNTER_CONTRACT_ADDRESS!, Counter.abi, provider)

const filter = contract.filters.Incremented(null, null)

contract.on(filter, console.log)
