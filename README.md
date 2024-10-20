# Description
   - This project consists of:
    - **FrontEnd**: Built with Angular
    - **BackEnd**: Implemented using AWS Lambda (serverless architecture)
    - **Database**: Powered by DynamoDB
   - The main goal of this project is to deploy the application using the architecture described above on AWS.


# Design 
![alt text](/BackEnd/Ass2.png)

# Steps

1. Create two roles for CloudFormation
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

* Note: if CodePipeline shows an Error in Source stage (unable to reach to github repository not found).
    1. Fork this project to your account.
    2. In Pipelines page in CodePipeline, click Edit
    3. In Source Stage, click edit stage
    4. In build_action box, click on edit icon
    5. Click on connect to Github
    








This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
