# Cron-job Component
- simple wrapper on nest cron-job module
- ability of support set/remove intervals
- ability of support set/remove cron-jobs
- ability of support set/remove custom cron-job for specific date


## component Structure - important !
- default port is 3000
- Swagger for check APIs http://localhost:3000/api
- Add response sample per API added on swagger 
- Overview of structure: 

![Structures overview](assets/read-md-cron-job.png)
## Description

- for now we only support HTTP calls for each cron-job/interval action,

## Installation

Use the package manager [YARN](https://yarnpkg.com/cli/node) to install dependencies.

## Getting started

- if you only need  small code-blocks and INTERNAL components, its up to you about configuration
- don't forget to import common module in every component that you used  

- Note: this project will not run in production, 
only purpose of run project is test in local and dev env 

- do not forget to run the migrations!

```bash
# run migrations to create tables
npm run migration:up

# for easy run project 
 yarn start:dev

```

## Usage
- check nest.js cron-job section for more details [Docs](https://docs.nestjs.com/techniques/task-scheduling#dynamic-intervals)

![Parameters](assets/job-one.png)

![Parameters](assets/job-two.png)


- Please read structure and how to use section before this part,
 Its really important to know in details about gadget 
- Based on your requirements need to find your target external or internal component
- In some cases based on your needs you can combine several internal components together and use them as new custom component
- you can create new merge-request if you made reusable external-component that other devs on s-pro can use it in future!
- its up to you to set envs based on requirements, 
- some tools need configuration in main.ts and root of project in nest.js , this part will not be covered in gadget

## Contributing

- All of node.js expertise can contribute by:

- Prepare merge request for bug fixes
- Rich gadget repositories and add more features
- Report issues and bugs , we will fix them as soon as possible
- Request for new features that you need

- For contribution on code you need to prepare merge request to develop and mention on of 
Core members of project
All new end-points should be covered by tests (unit, e2e)
Documents for both new internal and external components should be provided
Please follow clean-code rules during contribution

## Authors and acknowledgment

- Great thanks from S-pro node.js finTech development team for support this project

## Project status

- Gadget is under develop! we need to develop more pre-builded components as much as possible
this will help to increase quality of projects and facilitate development  
