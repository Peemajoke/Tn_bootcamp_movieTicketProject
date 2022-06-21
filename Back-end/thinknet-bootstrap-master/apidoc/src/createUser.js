// ตัวอย่าง APIDOC จะไม่ตรงกับ API ที่ทำเป็นตัวอย่างไว้ เนื่องจากต้องการให้เห็นภาพการใช้งาน APIDOC มากขึ้น
// Document: https://apidocjs.com/

/**
 * @api {get} /v1/users/:id Update User
 * @apiName CreateUser
 * @apiDescription สำหรับแก้ไขข้อมูล user
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission none
 *
 * @apiParam  {Number}      id                    id ของ user
 * @apiQuery  {Boolean}     isPass                สถานะการตรวจสอบข้อมูล
 *
 * @apiBody   {Number}      resumeCode            id ที่ใช้อ้างอิงกับข้อมูล resume
 * @apiBody   {String}      updatedBy             ชื่อผู้แก้ไขข้อมูล
 *
 * @apiSuccess (Success 201) {Number}     id            id ของ user
 * @apiSuccess (Success 201) {String}     resumeCode    id ที่ใช้อ้างอิงกับข้อมูล resume
 * @apiSuccess (Success 201) {Boolean}    isPass        สถานะการตรวจสอบข้อมูล
 * @apiSuccess (Success 201) {Date}       createdAt     วันที่ - เวลา ที่สร้างข้อมูล
 * @apiSuccess (Success 201) {Date}       updatedAt     วันที่ - เวลา ที่แก้ไขล่าสุด
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 OK
 * {
 *   "id": 5,
 *   "resumeCode": "234343",
 *   "isPass": true,
 *   "createdAt": "2022-02-22T04:04:30.675Z",
 *   "updatedAt": "2022-02-22T04:04:30.675Z"
 * }
 *
 * @apiError (4xx) UserNotFound <code>id</code> นี้ไม่มีในระบบ
 * @apiError (5xx) InternalServerError เกิดข้อผิดพลาด
 *
 * @apiErrorExample {json} 404 UserNotFound
* HTTP/1.1 404 Not Found
 * {
 *     "error": {
 *         "httpStatus": 404,
 *         "serviceCode": "GET_USER_BY_ID_NOT_FOUND",
 *         "description": "Not found.",
 *         "payload": { "id": 1 }
 *     }
 * }
 * @apiErrorExample {json} 500 InternalServerError
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "error": {
 *         "httpStatus": 500,
 *         "serviceCode": "CREATE_USER_ERROR",
 *         "description": "Server Error",
 *         "errorStack": "ResponseError: Server Error\n    at catchResponse (/usr/src/app/src/app/libs/catchResponse.js:36:9)\n    at createNote (/usr/src/app/src/app/controllers/createNote.js:44:12)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)\n    at /usr/src/app/src/app/libs/withSession.js:11:14",
 *         "payload": { "id": 1 }
 *     }
 * }
 */
