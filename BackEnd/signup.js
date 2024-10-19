import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });
const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const DYNAMODB_TABLE_NAME = "cc-finalproject-users";
const bucketName = "cc-finalproject-img";


export const handler = async (event) => {
    try {
        const { email, password, name, filename, contentType, bio } = JSON.parse(event.body);



        // const responsecheck = await dynamoDB.send(new GetItemCommand({
        //     TableName: DYNAMODB_TABLE_NAME,
        //     Key: {
        //         "email": {
        //             "S": email
        //         }
        //     }
        // }));


        // if (responsecheck.Item) {
        //     throw new Error("This Email is already created before");
        // }




        const uploadParams = {
            Bucket: bucketName,
            Key: filename,
            ContentType: contentType,
        };
        const command = new PutObjectCommand(uploadParams);
        const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });

        const timestamp = new Date().toISOString();
        const item = {
            email: { S: email },
            password: { S: password },
            bio: { S: bio },
            name: { S: name },
            imageUrl: { S: `https://${bucketName}.s3.amazonaws.com/${filename}` },
            datetime: { S: timestamp },
        };




        await dynamoDB.send(new PutItemCommand({
            TableName: DYNAMODB_TABLE_NAME,
            Item: item,
        }));

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ uploadURL: uploadURL }),
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
