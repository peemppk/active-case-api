import * as Knex from 'knex';

export class ServiceModel {

  getService(db: Knex) {
    return db('services')
  }

  getEditService(db: Knex, telephone) {
    return db('registers')
      .where('telephone', telephone)
  }

  saveService(db: Knex, data) {
    return db('services')
      .insert(data, 'id')
  }

  saveServiceDetails(db: Knex, data) {
    return db('service_details')
      .insert(data)
  }
}