import { Producer } from 'pegasys-orchestrate'

export const sendTx = async () => {
  const producer = new Producer([process.env.KAFKA_HOST!])
  await producer.connect()

  const requestId = await producer.sendTransaction({
    chain: process.env.CHAIN!,
    contractName: 'Counter',
    methodSignature: 'increment(uint256)',
    args: [1],
    to: process.env.TO_ACCOUNT,
    from: process.env.FROM_ACCOUNT!
  })

  console.log('Transaction request sent with id', requestId)

  await producer.disconnect()
}
