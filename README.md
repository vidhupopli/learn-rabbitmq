# How to set up RabbitMQ

## How to set up the RabbitMQ service in Docker Container

### Step 1

Pull the image

```
docker pull rabbitmq:management
```

### Step 2

Run RabbitMQ in Docker container

```
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

### Step 3 (optional)

Can manage the RabbitMQ using Management Console

```
http://localhost:15672
```

## How to work with RabbitMQ exampe using Producer and Consumer

1. Run the producer.js
2. Run the consumer.js
