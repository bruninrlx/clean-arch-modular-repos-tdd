import AWS, { SQS } from 'aws-sdk';
import Queue from "./Queue";

export default class SqsAdapter implements Queue {
  sqs: SQS;
  queueUrls: {[key: string]: string};

  constructor (queueUrls: {[key: string]: string}) {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: 'test',
      secretAccessKey: 'test',
    });

    this.sqs = new AWS.SQS();
    this.queueUrls = queueUrls;
  }

  async connect(): Promise<void> {
    // No explicit connect operation is needed as AWS SDK handles that.
    // If you need to perform any specific setup or checks, you can do it here.
  }

  async on(queueName: string, callback: Function): Promise<void> {
    const queueUrl = this.queueUrls[queueName];
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20
    };

    setInterval(async () => {
      const data = await this.sqs.receiveMessage(params).promise();
      
      if (data.Messages) {
        for (const message of data.Messages) {
          console.log(message)
          const input = JSON.parse(message.Body as string);
          try {
            await callback(input);
            const deleteParams = {
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle as string,
            };
            await this.sqs.deleteMessage(deleteParams).promise();
          } catch (e: any) {
            console.log(e);
          }
        }
      }
    }, 5000); // Check every 5 seconds
  }

  async publish(queueName: string, data: any): Promise<void> {
    const queueUrl = this.queueUrls[queueName];
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(data),
    };

    await this.sqs.sendMessage(params).promise();
  }
}
