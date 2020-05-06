import { Consumer, EventType, ResponseMessage } from 'pegasys-orchestrate'

const STOP_MSG =
  '\n\n---------------------------------------------\nStop consumer by pressing ctrl+c at the end of the quickstart.\n---------------------------------------------\n'

export const consume = async () => {
  const consumer = new Consumer(['localhost:9092'])
  await consumer.connect()
  console.error(STOP_MSG)

  consumer.on(EventType.Response, async (responseMessage: ResponseMessage) => {
    const { value } = responseMessage.content()
    if (value.errors && value.errors.length > 0) {
      console.error('Transaction failed with error: ', value.errors)
      return
    } else {
      await responseMessage.commit()
      console.log('Transaction ID:', value.id)
      console.log('Transaction receipt: ', value.receipt)
    }
    console.error(STOP_MSG)
  })

  await consumer.consume()
}
