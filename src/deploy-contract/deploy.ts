import { Producer } from 'pegasys-orchestrate'

export const deploy = async () => {
  const producer = new Producer([process.env.KAFKA_HOST!])
  await producer.connect()

  // Deploy a new Counter contract and returns the ID of the request
  const requestId = await producer.sendTransaction({
    chain: process.env.CHAIN!,
    contractName: 'Counter',
    methodSignature: 'constructor()',
    from: process.env.FROM_ACCOUNT!,
    gas: 2000000,
    authToken: process.env.AUTH_TOKEN ? `Bearer ${process.env.AUTH_TOKEN}` : ''
  })

  console.log('Transaction request sent with id: ', requestId)

  await producer.disconnect()
}
