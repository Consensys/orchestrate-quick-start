import { config } from 'dotenv'
import { Producer } from 'pegasys-orchestrate'

// Load ENV variables
config()

export const deploy = async () => {
  const producer = new Producer(['localhost:9092'])
  await producer.connect()

  // Deploy a new SimpleToken contract and returns the ID of the request
  const requestId = await producer.sendTransaction({
    chainName: 'rinkeby',
    contractName: 'Counter',
    methodSignature: 'constructor()',
    from: process.env.ETH_ACCOUNT!,
    gas: 2000000
  })

  console.log('Transaction request sent with id: ', requestId)

  await producer.disconnect()
}
