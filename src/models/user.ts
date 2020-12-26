import * as Knex from 'knex';
const request = require('request');
export class UserModel {


  getUser(db: Knex, hospcode) {
    const sql = db('users')
    if (hospcode) {
      sql.where('hospcode', hospcode)
    }
    sql.where('is_deleted', 'N')
      .orderBy('id', 'DESC')
    return sql;
  }

  saveUser(db: Knex, data) {
    return db('users')
      .insert(data, 'id');
  }
  
  updateUser(db: Knex, id, data) {
    return db('users')
      .update(data)
      .where('id', id)
  }

  removeUser(db: Knex, id) {
    return db('users')
      .update('is_deleted', 'Y')
      .where('id', id)
  }
}