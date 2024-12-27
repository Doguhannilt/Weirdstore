import fs from 'fs'
import winston from 'winston'


const logFilePath = process.env.LOGGER_PATH; 
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); 

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.Stream({ stream: logStream }), 
  ],
});


export default logger
