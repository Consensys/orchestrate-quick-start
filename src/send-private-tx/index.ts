import { sendTx } from './send-private-tx'

sendTx()
  .then(() => {
    process.exit()
  })
  .catch(console.error)
