const CoreStackSDK = require('core-stack-sdk');

const ropstenChainID = '3';
const ropstenAccount = '';
const ropstenCounter = '';

const rinkebyChainID = '4';
const rinkebyAccount = '';
const rinkebyCounter = '';

// Count of transactions to send
const txCount = 20;

const produce = async broker => {
  const producer = await broker.producer();
  for (var i = 0; i < txCount; i++) {
    try {
      const tx = await producer.send({
        chainId: i % 2 ? ropstenChainID : rinkebyChainID,
        call: {
          contract: 'Counter',
          method: 'increment(uint256)',
          args: ['0x5'],
        },
        gas: 2000000,
        to: i % 2 ? ropstenCounter : rinkebyCounter,
        from: i % 2 ? ropstenAccount : rinkebyAccount,
      });
      console.log('Message sent: ', tx);
    } catch (e) {
      console.error(e);
    }
  }
};

const consume = async broker => {
  try {
    const consumer = await broker.consumer();

    const consume = consumer.consume();

    consume.on('message', message => {
      console.log('Message consumed: ', message);
    });
    
    consume.on('error', error => {
      console.error(error);
    });
    
    consume.on('offsetOutOfRange', error => {
      console.error(error);
    });
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  try {
    const CoreStack = new CoreStackSDK();
    const broker = CoreStack.broker('localhost:9092');

    consume(broker);
    produce(broker);
  } catch (e) {
    console.error(e);
  }
})();
