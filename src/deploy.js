const Orchestrate = require('pegasys-orchestrate');

const produce = async broker => {
  const producer = await broker.producer();
  for (var i = 0; i < 2; i++) {
    try {
      const tx = await producer.send({
        chainId: i % 2 ? '3' : '4',
        call: {
          contract: {
            name: 'Counter',
            tag: 'v0.1.0',
          },
          method: 'constructor()',
        },
        // TODO: replace with <FAUCET_ADDRESS> with the same address set in .env
        from: '<FAUCET_ADDRESS>:q',
        gas: 2000000,
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
