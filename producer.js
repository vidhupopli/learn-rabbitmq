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

    console.log("RabbitMQ connected and queue created.");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}

async function sendMsg(msg) {
  const queue = "queueHello";

  try {
    // Send the message
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`[x] Sent ${msg}`);
  } catch (error) {
    console.error("Error sending message:", error);
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

    // Send multiple messages
    await sendMsg("Jai Gurudev");
    await sendMsg("Narayan Narayan Naryan");

    await closeConnection();
  } catch (e) {
    console.log("Some error ocurred in RabbitMQ operations");
  }
}

init();
