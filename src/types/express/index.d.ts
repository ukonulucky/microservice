
import 'express';


// this type decleration will be included to all request in the express
declare module 'express' {
  export interface Request {
    timeStamp?: string;
  }
}
