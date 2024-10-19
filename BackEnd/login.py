import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB client
dynamodb = boto3.client('dynamodb', region_name='us-east-1')
DYNAMODB_TABLE_NAME = "cc-finalproject-users"

def lambda_handler(event, context):
  try:
      # Parse the incoming event body
      body = json.loads(event['body'])
      email = body['email']
      password = body['password']

      # Retrieve the item from DynamoDB
      response = dynamodb.get_item(
          TableName=DYNAMODB_TABLE_NAME,
          Key={
              'email': {'S': email}
          }
      )

      # Check if the item exists
      if 'Item' not in response:
          raise Exception("This Email is not found.")

      # Check if the password matches
      if response['Item']['password']['S'] != password:
          raise Exception("This password does not match.")

      # Return the response with the item
      return {
          'statusCode': 200,
          'headers': {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type',
          },
          'body': json.dumps({'Item': response['Item']}),
      }

  except ClientError as e:
    print("Error:", e)
    return {
        'statusCode': 500,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': json.dumps({'error': str(e)}),
    }
  except Exception as e:
    print("Error:", e)
    return {
        'statusCode': 500,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': json.dumps({'error': str(e)}),
    }
