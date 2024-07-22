const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = dynamoDB