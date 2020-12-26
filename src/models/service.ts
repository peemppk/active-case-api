import * as Knex from 'knex';

export class ServiceModel {

  getService(db: Knex) {
    return db('services');
  }
  saveService(db: Knex,data) {
    return db('services')
    .insert(data,'id')
  }
}