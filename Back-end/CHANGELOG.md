# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2022-06-20
### Changed
- Healthcheck API from /healthy to /readyz 
- Healthcheck API from /healthz to /livez

### Added
- Add healthcheck API /startz

## [0.3.0] - 2022-02-22

### Changed
- Use NodeJS version 16.14.
- Update Jest Configs.
- Upgrade MongoDB to 5.0.
- Upgrade all dependencies.
- Use @thinknet/observer instead of auto-operation.
- Add release-notes and dev-release-notes folders.
- Add database (mongodb) connection model.
- Use docker-compose version 3.
- Update Project Structure (สามารถดูรายละเอียดได้ที่ README.md)


## [0.2.0] - 2021-01-20

### Changed
- Use Jest testing framework instead of Mocha.
- Add [@godaddy/terminus](https://github.com/godaddy/terminus)'s graceful shutdown libary.
- Add [liveness(/healthz) and readiness(/healthy)](https://developer.ibm.com/languages/node-js/tutorials/health-checking-kubernetes-nodejs-application/) health check.
- Upgrade MongoDB to 4.4.
- Use dotenv to takeup .env file on js runtime.
- Upgrade all dependencies.
- Add an example code.
- Add `yarn apidoc:postman` to generate HTML api doc from postman collection.


## [0.1.0] - 2020-03-09

### Changed
- Start node after mongodb.
- Use envionment variables from .env
- Upgrade all dependencies.
- Upgrade Node to 12.7 and MongoDB to 4.0.
- Fix incorrect start server command in Dockerfile.
- Fix incorrect MongoDB connection variables.
- Uppercase env variables.
- Use gitignore from [gitignore.io](http://gitignore.io).
- Update README.md.

### Removed
- Remove Jaeger from Docker-compose.
- Remove example files of .dockerignore, .npmrc, .gitignore. 
