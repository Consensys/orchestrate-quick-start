// tslint:disable: no-console

import { ContractRegistry } from 'pegasys-orchestrate'

import * as Counter from '../../build/contracts/Counter.json'

export const start = async () => {
  try {
    const contractRegistry = new ContractRegistry(process.env.CONTRACT_REGISTRY_HOST!)

    await contractRegistry.register({
      name: 'Counter',
      abi: Counter.abi,
      bytecode: Counter.bytecode,
      deployedBytecode: Counter.deployedBytecode
    })

    console.log(await contractRegistry.get('Counter'))
  } catch (error) {
    console.error(error)
  }
}
