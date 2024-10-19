import json
import boto3
from botocore.exceptions import ClientError
from datetime import datetime

s3 = boto3.client('s3', region_name='us-east-1')
dynamodb = boto3.client('dynamodb', region_name='us-east-1')
DYNAMODB_TABLE_NAME = "cc-finalproject-users"
BUCKET_NAME = "cc-finalproject-img"

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body['email']
        password = body['password']
        name = body['name']
        filename = body['filename']
        content_type = body['contentType']
        bio = body['bio']

        upload_params = {
            'Bucket': BUCKET_NAME,
            'Key': filename,
            'ContentType': content_type,
        }

        upload_url = s3.generate_presigned_url('put_object',
                                                Params=upload_params,
                                                ExpiresIn=60)

        timestamp = datetime.utcnow().isoformat()

        item = {
            'email': {'S': email},
            'password': {'S': password},
            'bio': {'S': bio},
            'name': {'S': name},
            'imageUrl': {'S': f'https://{BUCKET_NAME}.s3.amazonaws.com/{filename}'},
            'datetime': {'S': timestamp},
        }

        dynamodb.put_item(TableName=DYNAMODB_TABLE_NAME, Item=item)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({'uploadURL': upload_url}),
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
