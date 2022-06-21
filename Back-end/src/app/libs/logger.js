import observer from '@thinknet/observer'

// สำหรับ log ข้อมูลที่เป็น json
const analyzer = {
  info: (msg) => observer.analyzer.info(msg),
  error: (msg) => observer.analyzer.error(msg),
}

// สำหรับ log ข้อมูลที่เป็น string
const log = {
  log: (msg) => observer.logger.log(msg),
  info: (msg) => observer.logger.info(msg),
  debug: (msg) => observer.logger.debug(msg),
  warn: (msg) => observer.logger.warn(msg),
  error: (msg) => observer.logger.error(msg),
}

export {
  analyzer,
  log,
}
