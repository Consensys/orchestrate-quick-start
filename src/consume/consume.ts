import { Consumer, EventType, ResponseMessage } from 'pegasys-orchestrate'

export const consume = async () => {
  const consumer = new Consumer(['localhost:9092'])
  await consumer.connect()

  consumer.on(EventType.Response, async (responseMessage: ResponseMessage) => {
    const { value } = responseMessage.content()
    if (value.errors && value.errors.length > 0) {
      console.error('Transaction failed with error: ', value.errors)
      return
    } else {
      console.log('Transaction receipt: ', value.receipt)
    }

    await consumer.disconnect()
  })

  await consumer.consume()
}
