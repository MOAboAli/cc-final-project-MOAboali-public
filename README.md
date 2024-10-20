# Description
   - This project consists of:
      - **FrontEnd**: Built with Angular
      - **BackEnd**: Implemented using AWS Lambda (serverless architecture)
      - **Database**: Powered by DynamoDB
   - The main goal of this project is to deploy the application using the architecture described above on AWS.


# Design 
![alt text](/BackEnd/Ass2.png)

# Steps

1. Create two IAM roles for CloudFormation
     * First Role (ex. "cc-finalproject-role"), including the following policies:
        * AmazonAPIGatewayAdministrator
        * AmazonAPIGatewayInvokeFullAccess
        * AmazonDynamoDBFullAccess
        * AmazonS3FullAccess
        * AmazonS3ObjectLambdaExecutionRolePolicy
        * AWSCodePipeline_FullAccess
        * AWSLambda_FullAccess
        * AWSLambdaExecute
        * CloudFrontFullAccess
        * IAMFullAccess
    * Second Role (ex. cc-finalproject-role-CICD), including the following policies:
        * AmazonS3FullAccess
        * AWSCodeBuildAdminAccess
        * AWSCodeBuildDeveloperAccess
        * AWSCodePipeline_FullAccess
        * CloudWatchEventsFullAccess
        * IAMFullAccess



2. go to CloudFormation, create new with  /ymlFiles/cc-finalproject.yml file, using the First Role
3. in CloudFormation, create new with  /ymlFiles/cc-finalproject-CICD.yml file, using the First Role
4. Your are up and runing !!!!!!!!

* Note: 
    if CodePipeline shows an Error in Source stage (unable to reach to github repository not found).
    1. Fork this project to your account.
    2. In Pipelines page in CodePipeline, click Edit
    3. In Source Stage, click edit stage
    4. In build_action box, click on edit icon
    5. Click on connect to Github
    





