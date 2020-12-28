import * as Knex from 'knex';
const request = require('request');
export class EventModel {


  checkEvent(db: Knex, hospcode: string, eventCode: string) {
    return db('events')
      .where('hospcode', hospcode)
      .where('code', eventCode)
      .where('is_actived', 'Y')
      .limit(1);
  }

  getEvent(db: Knex, hospcode) {
    return db('events')
      .where('hospcode', hospcode)
      .orderBy('id', 'DESC')
  }

  getEventInfo(db: Knex, id) {
    return db('events as e')
      .select('e.*', 'p.name_th as province_name', 'd.name_th as district_name', 's.name_th as subdistrict_name')
      .join('province as p', 'p.code', 'e.province_code')
      .joinRaw(`JOIN district as d ON d.code = e.district_code and d.province_code = e.province_code`)
      .joinRaw(`JOIN subdistrict as s ON s.code = e.subdistrict_code and s.ampur_code = e.district_code and s.province_code = e.province_code`)
      .where('e.id', id)
  }

  checkCodeDup(db: Knex, code) {
    return db('events')
      .where('code', code)
  }
  saveEvent(db: Knex, data) {
    return db('events')
      .insert(data);
  }
  updateEvent(db: Knex, id, data) {
    return db('events')
      .update(data)
      .where('id', id)
  }
}