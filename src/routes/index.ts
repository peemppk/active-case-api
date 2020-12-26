
import { BasicModel } from './../models/basic';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
const basicModel = new BasicModel();
import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/province', async (req: Request, res: Response) => {
  try {
    const rs: any = await basicModel.getProvince(req.db);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/district', async (req: Request, res: Response) => {
  try {
    const rs: any = await basicModel.getDistrict(req.db);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/subdistrict', async (req: Request, res: Response) => {
  try {
    const rs: any = await basicModel.getSubDistrict(req.db);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});


export default router;