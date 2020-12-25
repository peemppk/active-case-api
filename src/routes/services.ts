import { Login } from '../models/login';
import { BasicModel } from '../models/basic';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
const basicModel = new BasicModel();
const loginModel = new Login();
import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/check-event', async (req: Request, res: Response) => {
  let eventCode: string = req.body.eventCode;
  let hospcode: string = req.decoded.hospcode;
  let db = req.db;
  try {
    const rs: any = await loginModel.checkEvent(db, hospcode, eventCode);
    if(rs.length){
      res.send({ ok: true, rows: rs });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

export default router;