const Orchestrate = require('pegasys-orchestrate');

const ropstenChainID = '3';
const ropstenAccount = '0x007dc4cc8c18868b0e7bdf34a0b246645f50038f';
const ropstenCounter = '0x22949b08ebf94f631f06039f1a0554d839ecc760';

const rinkebyChainID = '4';
const rinkebyAccount = '0xa80bb001e3b24b6f7455f07772e0a1433ae321d2';
const rinkebyCounter = '0x5b85937efa526ec3e779c4ab6d7b0c6509be42a2';

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
          method: 'incrementBonjour(uint256)',
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
    const orch = new Orchestrate();
    const broker = orch.broker('localhost:9092');

    consume(broker);
    produce(broker);
  } catch (e) {
    console.error(e);
  }
})();
