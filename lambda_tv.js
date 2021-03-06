const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let statusCode = 0;
  let responseBody = '';
  
  const { name } = event.Records[0].s3.bucket;
  const { key } = event.Records[0].s3.object;
  
  const getObjectParams = {
    Bucket: name,
    Key: key
  };
  
  try {
    const s3Data = await s3.getObject(getObjectParams).promise();
    const usersStr = s3Data.Body.toString();
    const usersJSON = JSON.parse(usersStr);
    console.log(`Users ::: ${usersStr}`);
    
    await Promise.all(usersJSON.map(async user => {
      const { id, onOff, mode, channel, mute, volume } = user;
      
      const putParams = {
        TableName: "SmartHomeApp",
        Item: {
          id: id,
          onOff: onOff,
          mode: mode,
          channel: channel,
          mute: mute,
          volume: volume
        }
      };
      
      await documentClient.put(putParams).promise();
      
    }));
    
    responseBody = 'Succeeded adding users';
    statusCode = 201;
      
  } catch(err) {
      responseBody = 'Error adding users';
      statusCode = 403;
  }
  
  const response = {
    statusCode: statusCode,
    body: responseBody
  };
  
  return response;
};