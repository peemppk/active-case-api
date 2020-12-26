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

router.get('/edit', async (req: Request, res: Response) => {

  let db = req.db;
  let telephone = req.query.telephone;
  try {
    const rs: any = await serviceModel.getEditService(db, telephone);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.post('/', async (req: Request, res: Response) => {
  let labCode: string = req.body.labCode;
  let data: string = req.body.data;
  let db = req.db;
  try {
    console.log(labCode, data);
    const rs: any = await serviceModel.saveService(db, data);
    const serviceId = rs;
    if (labCode) {
      const dataDetails = {
        service_id: serviceId,
        specimen_code: labCode,
      }
      const rs: any = await serviceModel.saveServiceDetails(db, dataDetails);
    }
    console.log(rs);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});


export default router;