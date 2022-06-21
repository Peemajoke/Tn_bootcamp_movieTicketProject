# Encourage 🔥
 Let's try [thinknet-bootstrap-typescript](https://gitlab.thinknet.co.th/techforum/thinknet-bootstrap-typescript) instead of this JS repo 🧐 


# JS Service Starter

### Getting Started

1. Copy `.env`
```
cp .env.example .env
```

2. ตรวจสอบเงื่อนไขการทำ healthcheck in `src/healthcheck/index.js`
- Add your additional dependency connections.

3. check dependencies และ devDependencies ควรมีเฉพาะที่ service ใช้งานจริง เช่น axios, mongoose

4. ลบ Example file ที่อยู่ภายใต้ src และ test

5. Start development server
```
docker-compose up
```

### Liveness, Readiness
- Liveness  (`[GET] /healthz`) - ตรวจสอบว่า JS Thread ยังตอบสนองอยู่ไหม
- Readiness (`[GET] /healthy`) - ตรวจสอบว่า DB/Connection ต่างๆ ยังติดอยู่ไหม

การตั้งค่า route จะมาจากไฟล์ ​`src/server.js`
```js
  createTerminus(server, {
    signals: ['SIGTERM', 'SIGINT'],
    healthChecks: {
      '/healthy': () => readiness(),
      '/healthz': () => liveness(),
    },
    beforeShutdown,
    onShutdown: () => log.info('Graceful shutdown down has been finished.'),
    onSignal: cleanupComponentsForShutdown,
    timeout: K8S_TERMINATION_GRACE_PERIOD_MS,
    logger: log.info,
  })
```

### Project structure

```
.
├── ...
├── src
│   ├── app
│   │   ├── connections                      # จัดการการ connect database หรือ 3rd party เช่น rabbitMQ เป็นต้น
│   │   │   └── mongodb.js
│   │   ├── constants
│   │   │   ├── errorMessage.js
│   │   │   ├── infoMessage.js                  
│   │   │   ├── responseError.js
│   │   │   └── validateMessages.js
│   │   ├── controllers
│   │   ├── libs
│   │   │   ├── axios.js (optional)           # จัดการ format ของ axios response ถ้า service ไม่มีการใช้ axios สามารถลบออกได้
│   │   │   ├── catchResponse.js              # จัดการ error response ให้ตรงตาม standard 
│   │   │   ├── customValidator.js (optional) # 
│   │   │   └── logger.js                     # logger ที่มีการเรียกใช้ logger ของ @thinknet/observer
│   │   ├── middlewares
│   │   ├── models
│   │   │   ├──  schemas
│   │   │   │     └── {schema}.js
│   │   │   └── {model}.js
│   │   ├── requests                          # validate request
│   │   │   ├── {request}.js                  # กำหนด validate ของแต่ละ API
│   │   │   ├── executeValidator.js           # จัดการการ validate และจัด format validate response
│   │   │   └──  index.js                     # {request} จะถูกนำมาใช้งานผ่าน executeValidator ที่ index.js
│   │   └── routes.js
│   ├── config
│   │   ├── express.js
│   │   └── index.js                          # จัดการข้อมูล process.env
│   ├── healthcheck
│   │   ├── http.js                           
│   │   ├── index.js                          # file หลักในการจัดการ function ที่จะนำไปใช้กับ healthy, healthz
│   │   └── mongoose.js
│   ├── app.js
│   ├── server.js
├── test
│   ├── controllers
│   ├── libs
│   ├── models
│   └── requests
├── .env
└──  .env.example


```

### APIDOC
Document: https://apidocjs.com/
รายละเอียดควรต้องมี
- @api
- @apiName
- @apiDescription
- @apiGroup (Optional)
- @apiVersion 
- @apiPermission (Optional)
- @apiHeader (Optional)
- @apiHeaderExample (Optional)
- @apiParam 
- @apiQuery
- @apiBody
- @apiSuccess
- @apiSuccessExample
- @apiError
- @apiErrorExample
