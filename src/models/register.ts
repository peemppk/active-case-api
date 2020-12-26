import * as Knex from 'knex';
const request = require('request');
export class RegisterModel {



  getPreRegister(db: Knex, telephone) {
    return db('pre_registers')
      .where('telephone', telephone)
  }

  savePreRigister(db: Knex, data) {
    return db('pre_registers')
      .insert(data);
  }
}