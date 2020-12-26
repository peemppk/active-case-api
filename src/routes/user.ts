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


router.put('/:id', async (req: Request, res: Response) => {
  let db = req.db;
  const id: number = req.params.id;
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
      await userModel.updateUser(db, id, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  let db = req.db;
  const id: number = req.params.id;
  
  try {
    if (id) {
      await userModel.removeUser(db, id);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});
export default router;