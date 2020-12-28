import * as Knex from 'knex';

export class ServiceModel {

  getService(db: Knex, eventId) {
    return db('services')
      .where('event_id', eventId)
  }

  getEditService(db: Knex, telephone) {
    return db('registers')
      .where('telephone', telephone)
  }

  saveService(db: Knex, data) {
    return db('services')
      .insert(data, 'id')
  }

  saveServiceDetail(db: Knex, data) {
    return db('service_details')
      .insert(data, 'id')
  }

  findInfo(db: Knex, serialNo, eventId) {
    return db('services')
      .where('serial_code', serialNo)
      .where('event_id', eventId)
  }
}