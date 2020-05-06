import { config } from 'dotenv'
import { Producer } from 'pegasys-orchestrate'

// Load ENV variables
config()

export const sendTx = async () => {
  const producer = new Producer(['localhost:9092'])
  await producer.connect()

  const requestId = await producer.sendTransaction({
    chainName: process.env.CHAIN,
    contractName: 'Counter',
    methodSignature: 'increment(uint256)',
    args: [1],
    to: process.env.TO_ACCOUNT,
    from: process.env.FROM_ACCOUNT!
  })

  console.log('Transaction request sent with id', requestId)

  await producer.disconnect()
}
