import { ServiceModel } from '../models/service';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
const serviceModel = new ServiceModel();
import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();

const router: Router = Router();



router.get('/', async (req: Request, res: Response) => {

  let db = req.db;
  try {
    const rs: any = await serviceModel.getService(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.post('/', async (req: Request, res: Response) => {
  let serialCode: string = req.body.serialCode;
  let labCode: string = req.body.labCode;
  let eventId: string = req.body.eventId;
  let db = req.db;
  try {
    const data: any = {

    }
    const rs: any = await serviceModel.saveService(db, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});


export default router;