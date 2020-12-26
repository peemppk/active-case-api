import * as Knex from 'knex';

export class ServiceModel {

  getService(db: Knex) {
    return db('services');
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