import * as Knex from 'knex';

export class BasicModel {

  getProvince(db: Knex) {
    return db('province');
  }

  getDistrict(db: Knex, provinceCode = null) {
    const sql = db('district')
    if (provinceCode) {
      sql.where('province_code', provinceCode);
    }
    return sql;
  }

  getSubDistrict(db: Knex, provinceCode = null, ampurCode = null) {
    const sql = db('subdistrict')
    if (provinceCode) {
      sql.where('province_code', provinceCode);
    }
    if (ampurCode) {
      sql.where('ampur_code', ampurCode);
    }
    return sql;

  }
}