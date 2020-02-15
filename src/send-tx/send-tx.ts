import { config } from 'dotenv'
import { Producer } from 'pegasys-orchestrate'

// Load ENV variables
config()

export const sendTx = async () => {
  const producer = new Producer(['localhost:9092'])
  await producer.connect()

  await producer.sendTransaction({
    chainName: 'rinkeby',
    contractName: 'Counter',
    methodSignature: 'increment(uint256)',
    args: [1],
    to: process.env.COUNTER_CONTRACT_ADDRESS,
    from: process.env.ETH_ACCOUNT!
  })

  await producer.disconnect()
}
