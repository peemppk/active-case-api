import * as Knex from 'knex';
const request = require('request');
export class EventModel {


  checkEvent(db: Knex, hospcode: string, eventCode: string) {
    return db('events')
      .where('hospcode', hospcode)
      .where('code', eventCode)
      .limit(1);
  }

  getEvent(db: Knex, hospcode) {
    return db('events')
      .where('hospcode', hospcode)
      .orderBy('id', 'DESC')
  }
}