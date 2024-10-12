const amqp = require("amqplib");

let connection, channel;

async function connectRabbitMQ() {
  try {
    // Establish a connection and create a channel
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    // Declare the queue once, so we don't have to do it for every message
    const queue = "queueHello";
    await channel.assertQueue(queue, { durable: true });

    console.log("RabbitMQ connected and queue declared.");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}

async function consumeMessages() {
  const queue = "queueHello";

  try {
    console.log(`[*] Waiting for messages in ${queue}. To exit, press CTRL+C`);

    // Start consuming messages from the queue
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(`[x] Received: ${msg.content.toString()}`);
          // Manually acknowledge that the message was received and processed
          channel.ack(msg);
        }
      },
      { noAck: false }
    ); // `noAck: false` means the message must be acknowledged manually
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
}

async function closeConnection() {
  try {
    await channel.close();
    await connection.close();
    console.log("RabbitMQ connection closed.");
  } catch (error) {
    console.error("Error closing RabbitMQ connection:", error);
  }
}

async function init() {
  try {
    await connectRabbitMQ();

    await consumeMessages();

    // await closeConnection();
  } catch (e) {
    console.log("Some error ocurred in RabbitMQ operations");
  }
}

init();
