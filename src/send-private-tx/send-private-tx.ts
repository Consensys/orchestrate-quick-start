import { config } from 'dotenv'
import { Producer, ProtocolType } from 'pegasys-orchestrate'

// Load ENV variables
config()

export const sendPrivateTx = async () => {
  const producer = new Producer(['localhost:9092'])
  await producer.connect()

  // Deploy a new Counter contract and returns the ID of the request
  const requestId = await producer.sendTransaction({
    chain: process.env.CHAIN!,
    contractName: 'Counter',
    methodSignature: 'constructor()',
    from: process.env.FROM_ACCOUNT!,
    protocol: ProtocolType.BesuOrion,
    privateFor: ['A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo='],
    privateFrom: 'Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs='
  })

  console.log('Transaction request sent with id: ', requestId)

  await producer.disconnect()
}
