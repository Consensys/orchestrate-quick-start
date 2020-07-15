import { ProtocolType, TransactionClient } from 'pegasys-orchestrate'
import * as uuid from 'uuid'

export const sendPrivateTx = async () => {
  const txClient = new TransactionClient(process.env.TX_SCHEDULER_HOST!)
  const idempotencyKey = uuid.v4()
  const authToken = process.env.AUTH_TOKEN ? `Bearer ${process.env.AUTH_TOKEN}` : undefined

  // Deploy a new Counter contract and returns the ID of the request
  const txResponse = await txClient.deployContract(
    {
      chain: process.env.CHAIN!,
      params: {
        contractName: 'Counter',
        from: process.env.FROM_ACCOUNT!,
        protocol: ProtocolType.Orion,
        privateFor: ['A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo='],
        privateFrom: 'Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs='
      }
    },
    idempotencyKey,
    authToken
  )

  console.log('Transaction request sent successfully', txResponse)
}
