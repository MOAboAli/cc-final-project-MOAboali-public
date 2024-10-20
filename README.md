# Description
   - This application is consists of:
      - **FrontEnd**: Built with Angular
        1. LoginPage
        2. SignUp Page
        3. Edit Profile Page
        4. Home Page
      - **BackEnd**: Implemented using AWS Lambda (serverless architecture)
        1. Signup/Edit Profile
        2. Login
      - **Database**: Powered by DynamoDB
        1. user table

   - The main goal of this project is to deploy the application using the architecture described below on AWS.


# Design 
![alt text](/BackEnd/Ass2.png)

# Steps

1. Create two IAM roles for CloudFormation
     * First Role, including the following policies:
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
    * Second Role, including the following policies:
        * AmazonS3FullAccess
        * AWSCodeBuildAdminAccess
        * AWSCodeBuildDeveloperAccess
        * AWSCodePipeline_FullAccess
        * CloudWatchEventsFullAccess
        * IAMFullAccess



2. Go to CloudFormation, create new stack using  /ymlFiles/cc-finalproject.yml file, and the First Role
3. In CloudFormation, create new stack using   /ymlFiles/cc-finalproject-CICD.yml file, and the second Role
4. Your are up and runing !!!!!!!!

* Note: 
    if CodePipeline shows an Error in Source stage (unable to reach to github repository not found).
    1. Fork this project to your account.
    2. In Pipelines page in CodePipeline, click Edit
    3. In Source Stage, click edit stage
    4. In build_action box, click on edit icon
    5. Click on connect to Github
    





