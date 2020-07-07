// tslint:disable: no-console

import { ContractRegistry } from 'pegasys-orchestrate'

export const start = async () => {
  try {
    const contractRegistry = new ContractRegistry(process.env.CONTRACT_REGISTRY_HOST!)

    console.log(await contractRegistry.getCatalog())
  } catch (error) {
    console.error(error)
  }
}
