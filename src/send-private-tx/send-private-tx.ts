import { ProtocolType, TransactionClient } from 'pegasys-orchestrate'
import * as uuid from 'uuid'

export const sendTx = async () => {
  const txClient = new TransactionClient(process.env.TX_SCHEDULER_HOST!)
  const idempotencyKey = uuid.v4()
  const authToken = process.env.AUTH_TOKEN ? `Bearer ${process.env.AUTH_TOKEN}` : undefined

  const txResponse = await txClient.deployContract(
    {
      chain: process.env.CHAIN!,
      params: {
        contractName: 'Counter',
        from: process.env.FROM_ACCOUNT!,
        protocol: ProtocolType.Orion,
        privateFor: ['k2zXEin4Ip/qBGlRkJejnGWdP9cjkK+DAvKNW31L2C8='], // Orion node 3 public key
        privateFrom: 'Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs=' // Orion node 2 public key (the registered chain)
      }
    },
    idempotencyKey,
    authToken
  )

  console.log('Transaction request sent successfully', txResponse)
}
