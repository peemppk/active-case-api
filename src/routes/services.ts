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

router.post('/map', async (req: Request, res: Response) => {
  let serialCode: string = req.body.serialCode;
  let eventId: string = req.body.eventId;
  let specimenCode: string = req.body.specimenCode;
  let db = req.db;
  try {
    const info: any = await serviceModel.findInfo(db, serialCode, eventId);
    if(info.length){
      const data: any = {
       service_id : info[0].od,
       specimen_code:specimenCode
      }
      const rs: any = await serviceModel.saveServiceDetail(db, data);
      res.send({ ok: true, rows: rs });

    } else {
      res.send({ok:false,error:'เลขอ้างอิงบุคคลยังไม่ได้ลงทะเบียน'});
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});


export default router;