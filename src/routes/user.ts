import { UserModel } from './../models/user';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const userModel = new UserModel();
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  let hospcode: string = req.query.hospcode || null;
  let db = req.db;
  try {
    const rs: any = await userModel.getUser(db, hospcode);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.post('/', async (req: Request, res: Response) => {
  let db = req.db;
  const titleName: string = req.body.titleName;
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const telephone: string = req.body.telephone;
  const email: string = req.body.email;
  const hospcode: string = req.body.hospcode;
  try {
    if (firstName && lastName && telephone && hospcode) {
      const data: any = {
        title_name: titleName,
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
        email: email,
        hospcode: hospcode
      }
      const rs: any = await userModel.saveUser(db, data);
      res.send({ ok: true, rows: rs });
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
  const distinctCode: string = req.body.distinctCode;
  const subdistinceCode: string = req.body.subdistinceCode;
  const provinceCode: string = req.body.provinceCode;
  const zipccode: string = req.body.zipccode;
  const isActived: string = req.body.isActived;
  const startDate: string = req.body.startDate;
  const endDate: string = req.body.endDate;
  try {

    if (distinctCode && subdistinceCode && provinceCode && startDate) {
      let code = randomNumber(4);
      while ((await userModel.checkCodeDup(db, code)).length > 0) {
        code = randomNumber(4);
      }

      const data: any = {
        code,
        place_detail: placeDetail,
        distinct_code: distinctCode,
        subdistince_code: subdistinceCode,
        province_code: provinceCode,
        zipccode,
        is_actived: isActived,
        start_date: startDate,
        end_date: endDate,
        updated_by: updatedBy,
        hospcode
      }
      const rs: any = await userModel.updateEvent(db, eventId, data);
      res.send({ ok: true, rows: data });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

export default router;