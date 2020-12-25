import * as Knex from 'knex';

export class BasicModel {

  getProvince(db: Knex) {
    return db('province');
  }

  getDistrict(db: Knex) {
    return db('district');
  }

  getSubDistrict(db: Knex) {
    return db('subdistrict');
  }
}