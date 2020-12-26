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

router.post('/', async (req: Request, res: Response) => {
  let db = req.db;
  let hospcode: string = req.decoded.hospcode;
  const createdBy: string = req.decoded.id;
  const placeDetail: string = req.body.placeDetail;
  const districtCode: string = req.body.districtCode;
  const subdistrictCode: string = req.body.subdistrictCode;
  const provinceCode: string = req.body.provinceCode;
  const zipcode: string = req.body.zipcode;
  const isActived: string = req.body.isActived;
  const startDate: string = req.body.startDate;
  const endDate: string = req.body.endDate;
  try {

    if (districtCode && subdistrictCode && provinceCode && startDate) {
      let code = randomNumber(4);
      while ((await eventModel.checkCodeDup(db, code)).length > 0) {
        code = randomNumber(4);
      }
      const data: any = {
        code,
        place_detail: placeDetail,
        district_code: districtCode,
        subdistrict_code: subdistrictCode,
        province_code: provinceCode,
        zipcode,
        is_actived: isActived,
        start_date: startDate,
        end_date: endDate,
        created_by: createdBy,
        hospcode
      }
      const rs: any = await eventModel.saveEvent(db, data);
      res.send({ ok: true, rows: data });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.put('/', async (req: Request, res: Response) => {
  let db = req.db;
  let hospcode: string = req.decoded.hospcode;
  const updatedBy: string = req.decoded.id;
  const eventId: string = req.body.eventId;

  const placeDetail: string = req.body.placeDetail;
  const districtCode: string = req.body.districtCode;
  const subdistrictCode: string = req.body.subdistrictCode;
  const provinceCode: string = req.body.provinceCode;
  const zipcode: string = req.body.zipcode;
  const isActived: string = req.body.isActived;
  const startDate: string = req.body.startDate;
  const endDate: string = req.body.endDate;
  try {

    if (eventId) {

      const data: any = {};
      if (placeDetail) {
        data.place_detail = placeDetail;
      }
      if (districtCode) {
        data.district_code = districtCode;
      }
      if (subdistrictCode) {
        data.subdistrict_code = subdistrictCode;
      }
      if (provinceCode) {
        data.province_code = provinceCode;
      }
      if (provinceCode) {
        data.placeDetail = placeDetail;
      }
      if (zipcode) {
        data.zipcode = zipcode;
      }
      if (isActived) {
        data.is_actived = isActived;
      }
      if (startDate) {
        data.start_date = startDate;
      }
      if (endDate) {
        data.end_date = endDate;
      }
      data.updated_by = updatedBy;

      const rs: any = await eventModel.updateEvent(db, eventId, data);
      res.send({ ok: true, rows: data });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/check-event', async (req: Request, res: Response) => {
  let eventCode: string = req.query.eventCode;
  let hospcode: string = req.decoded.hospcode;
  let db = req.db;
  try {
    console.log();
    
    const rs: any = await eventModel.checkEvent(db, hospcode, eventCode);
    if (rs.length) {
      res.send({ ok: true, rows: rs });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});


function randomString(digitLength: number) {
  var _digitLength = digitLength || 10;
  var strRandom = '';
  var random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < _digitLength; i++) { strRandom += random.charAt(Math.floor(Math.random() * random.length)); }
  return strRandom;
}

function randomNumber(digit = 6) {
  var strRandom = '';
  var random = '0123456789';
  for (var i = 0; i < digit; i++) { strRandom += random.charAt(Math.floor(Math.random() * random.length)); }
  return strRandom;
}
export default router;