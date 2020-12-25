import { EventModel } from './../models/event';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const eventModel = new EventModel();
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  let hospcode: string = req.decoded.hospcode;
  let db = req.db;
  try {
    const rs: any = await eventModel.getEvent(db, hospcode);
    res.send({ ok: true, rows: rs });
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
    const rs: any = await eventModel.checkEvent(db, hospcode, eventCode);
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