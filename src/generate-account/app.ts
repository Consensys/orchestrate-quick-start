// tslint:disable: no-console
import { AccountGenerator } from 'pegasys-orchestrate'

export const start = async () => {
  try {
    const accountGenerator = new AccountGenerator([process.env.KAFKA_URL!])

    await accountGenerator.connect()
    const address = await accountGenerator.generateAccount()
    await accountGenerator.disconnect()

    console.log(address)
  } catch (error) {
    console.error(error)
  }
}
