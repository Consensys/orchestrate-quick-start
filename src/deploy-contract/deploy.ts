import { TransactionClient } from 'pegasys-orchestrate'
import * as uuid from 'uuid'

export const deploy = async () => {
  const txClient = new TransactionClient(process.env.TX_SCHEDULER_HOST!)

  // Deploy a new Counter contract and return the Transaction
  const txResponse = await txClient.deployContract(
    {
      chain: process.env.CHAIN!,
      params: {
        contractName: 'Counter',
        contractTag: 'latest',
        from: process.env.FROM_ACCOUNT!
      }
    },
    uuid.v4()
  )

  console.log('Transaction request sent successfully', txResponse)
  console.log(txResponse.schedule.jobs)
}
