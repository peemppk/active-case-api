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
    }else {
      res.send({ok:false,error:'ไม่พบบัญชีผู้ใช้'});
    }
  } catch (error) {
    console.log(error);
    
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

export default router;