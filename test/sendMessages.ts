/*
  This sample demonstrates how the send() function can be used to send messages to Service Bus
  Queue/Topic.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions
  to learn about Queues, Topics and Subscriptions.
*/

import { Namespace, SendableMessageInfo } from "../lib";

// Define connection string and related Service Bus entity names here
const connectionString = "Endpoint=sb://nfieldpurpleserbus.servicebus.windows.net/;SharedAccessKeyName=TestKey;SharedAccessKey=ccE6iwGXegyMXlcJ+M8MCpy4MWMeb7mv6RN/ccJNvMk=";
const queueName = "testamqp";

async function main(): Promise<void> {
  const ns = Namespace.createFromConnectionString(connectionString);

  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);

  try {
      const message: SendableMessageInfo = {
        body: `Test Succeeded`,
        label: "AMQP Test"
      };

      console.log(`Sending message: ${message.body} - ${message.label}`);
      await client.send(message);

    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});


