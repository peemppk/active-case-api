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
    if (rs.length) {
      res.send({ ok: true, rows: rs[0] });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.post('/pre', async (req: Request, res: Response) => {
  let firstName: string = req.body.firstName;
  let lastName: string = req.body.lastName;
  let titleName: string = req.body.titleName;
  let birthDate: string = req.body.birthDate;
  let telephone: string = req.body.telephone;
  let pictureProfile: string = req.body.pictureProfile; //base64
  let documentFile: string = req.body.documentFile;
  let documentType: string = req.body.documentType;
  let cid: string = req.body.cid;
  let patientType: string = req.body.patientType;
  let passport: string = req.body.passport;
  let nationTypeId: string = req.body.nationTypeId;
  let gender: string = req.body.gender;
  let telephoneBoss: string = req.body.telephoneBoss;


  let db = req.db;
  try {
    res.send({ ok: true });
    // if()
    // const rs: any = await registerModel.savePreRigister(db, data);
    // if(rs.length){
    //   res.send({ ok: true, rows: rs[0] });
    // } else {
    //   res.send({ ok: false });
    // }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

export default router;