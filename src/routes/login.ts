/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { Login } from '../models/login';

import { Jwt } from '../models/jwt';

const loginModel = new Login();
const jwt = new Jwt();

const router: Router = Router();

router.post('/staff', async (req: Request, res: Response) => {
  let telephone: string = req.body.telephone;
  let db = req.db;
  try {
    const rs: any = await loginModel.loginStaff(db, telephone);
    if (rs.length) {
      const rsp = await loginModel.sendOTP(telephone);
      res.send(rsp);
    } else {
      res.send({ ok: false, error: 'ไม่พบบัญชีผู้ใช้' });
    }
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  const telephone: string = req.body.telephone;
  const otp: string = req.body.otp;
  const transactionId: string = req.body.transactionId;
  const vendor: string = req.body.vendor;
  try {
    let rs: any = await loginModel.verifyOTP(telephone, otp, transactionId, vendor);
    if (rs.ok) {
      const re: any = await loginModel.loginStaff(req.db, telephone);
      if (re.length) {
        const payload = {
          id: re[0].id,
          first_name: re[0].first_name,
          last_name: re[0].last_name,
          telephone: re[0].telephone,
          hospcode: re[0].hospcode
        }
        const token = await jwt.sign(payload);
        res.send({ ok: true, token: token });
      } else {
        res.send({ ok: false, error: 'ไม่พบข้อมูล' })
      }
    } else {
      res.send(rs);
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
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