import { RegisterModel } from '../models/register';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import * as path from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import * as fse from 'fs-extra';
import * as multer from 'multer';

const registerModel = new RegisterModel();
const router: Router = Router();

const uploadDir = process.env.UPLOAD_DIR || '../uploads';

fse.ensureDirSync(uploadDir);

var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    let _ext = path.extname(file.originalname);
    cb(null, Date.now() + _ext)
  }
});
let upload = multer({ storage: storage });

// upload file
router.post('/pre/upload-profile/:id', upload.any(), async (req: Request, res: Response) => {
  try {
    const db: any = req.db;
    const id = req.params.id;

    var filePath = '';
    var mimeType = '';
    var fileName = '';

    if (req.files.length && id) {
      fileName = req.files[0].filename || null;
      filePath = req.files[0].path || null;
      mimeType = req.files[0].mimetype || null;
      const data = {
        picture_name: fileName,
        picture_path: filePath,
        picture_mime: mimeType
      }
      await registerModel.updatePreRegister(db, id, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ไม่พบไฟล์ หรือ id' })
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

router.post('/pre/upload-document/:id/:type', upload.any(), async (req: Request, res: Response) => {
  try {
    const db: any = req.db;
    const id = req.params.id;
    const type = req.params.type;

    var filePath = '';
    var mimeType = '';
    var fileName = '';

    if (req.files.length && id) {
      fileName = req.files[0].filename || null;
      filePath = req.files[0].path || null;
      mimeType = req.files[0].mimetype || null;
      const data = {
        document_name: fileName,
        document_path: filePath,
        document_mime: mimeType,
        document_type: type
      }
      await registerModel.updatePreRegister(db, id, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ไม่พบไฟล์ หรือ id' })
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

router.post('/upload-profile/:id', upload.any(), async (req: Request, res: Response) => {
  try {
    const db: any = req.db;
    const id = req.params.id;

    var filePath = '';
    var mimeType = '';
    var fileName = '';

    if (req.files.length && id) {
      fileName = req.files[0].filename || null;
      filePath = req.files[0].path || null;
      mimeType = req.files[0].mimetype || null;
      const data = {
        picture_name: fileName,
        picture_path: filePath,
        picture_mime: mimeType
      }
      await registerModel.updateRegister(db, id, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ไม่พบไฟล์ หรือ id' })
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

router.post('/upload-document/:id/:type', upload.any(), async (req: Request, res: Response) => {
  try {
    const db: any = req.db;
    const id = req.params.id;
    const type = req.params.type;

    var filePath = '';
    var mimeType = '';
    var fileName = '';

    if (req.files.length && id) {
      fileName = req.files[0].filename || null;
      filePath = req.files[0].path || null;
      mimeType = req.files[0].mimetype || null;
      const data = {
        document_name: fileName,
        document_path: filePath,
        document_mime: mimeType,
        document_type: type
      }
      await registerModel.updateRegister(db, id, data);
      res.send({ ok: true });
    } else {
      res.send({ ok: false, error: 'ไม่พบไฟล์ หรือ id' })
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

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
  let cid: string = req.body.cid;
  let patientType: string = req.body.patientType;
  let passport: string = req.body.passport;
  let nationTypeId: string = req.body.nationTypeId;
  let gender: string = req.body.gender;
  let telephoneBoss: string = req.body.telephoneBoss;


  let db = req.db;
  try {
    if (nationTypeId && patientType && gender) {
      const data: any = {
        first_name: firstName,
        last_name: lastName,
        title_name: titleName,
        birth_date: birthDate,
        telephone_boss: telephoneBoss,
        telephone,
        cid,
        passport
      }
      const id = await registerModel.savePreRegister(db, data);
      res.send({ ok: true, rows: id });
    } else {
      res.send({ ok: false, error: 'Parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.post('/', async (req: Request, res: Response) => {
  let firstName: string = req.body.firstName;
  let lastName: string = req.body.lastName;
  let titleName: string = req.body.titleName;
  let birthDate: string = req.body.birthDate;
  let telephone: string = req.body.telephone;
  let cid: string = req.body.cid;
  let patientType: string = req.body.patientType;
  let passport: string = req.body.passport;
  let nationTypeId: string = req.body.nationTypeId;
  let gender: string = req.body.gender;
  let telephoneBoss: string = req.body.telephoneBoss;


  let db = req.db;
  try {
    if (nationTypeId && patientType && gender) {
      const data: any = {
        first_name: firstName,
        last_name: lastName,
        title_name: titleName,
        birth_date: birthDate,
        telephone_boss: telephoneBoss,
        telephone,
        cid,
        passport
      }
      const id = await registerModel.saveRegister(db, data);
      res.send({ ok: true, rows: id });
    } else {
      res.send({ ok: false, error: 'Parameter ไม่ครบ' });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});
export default router;