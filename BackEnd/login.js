import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const DYNAMODB_TABLE_NAME = "cc-finalproject-users";

export const handler = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);
        const responsecheck = await dynamoDB.send(new GetItemCommand({
            TableName: DYNAMODB_TABLE_NAME,
            Key: {
                "email": {
                    "S": email
                }
            }
        }));


        if (!responsecheck.Item) {
            throw new Error("This Email is not found.");
        }

        if (responsecheck.Item.password != password) {
            throw new Error("This password is not match.");
        }


        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ Item: responsecheck.Item }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
