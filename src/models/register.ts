import * as Knex from 'knex';
const request = require('request');
export class RegisterModel {



  getPreRegister(db: Knex, telephone) {
    return db('registers')
      .where('telephone', telephone)
  }

  savePreRegister(db: Knex, data) {
    return db('registers')
      .insert(data,'id');
  }

  updatePreRegister(db:Knex,id,data){
    return db('registers')
    .update(data)
    .where('id',id);
  }

  saveRegister(db: Knex, data) {
    return db('registers')
      .insert(data,'id');
  }

  updateRegister(db:Knex,id,data){
    return db('registers')
    .update(data)
    .where('id',id);
  }
}