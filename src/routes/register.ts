import { RegisterModel } from '../models/register';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const registerModel = new RegisterModel();
const router: Router = Router();

router.get('/pre', async (req: Request, res: Response) => {
  let telephone: string = req.query.telephone;
  let db = req.db;
  try {
    const rs: any = await registerModel.getPreRegister(db, telephone);
    if(rs.length){
      res.send({ ok: true, rows: rs[0] });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

export default router;