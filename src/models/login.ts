import * as Knex from 'knex';
const request = require('request');
export class Login {
  loginStaff(db: Knex, telephone: string) {
    return db('users')
      .where('telephone', telephone)
      .limit(1);
  }

  sendOTP(tel) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: 'http://otp.dev.moph.go.th/otp',
        headers: { 'content-type': 'application/json' },
        body: { tel: tel, appId: process.env.OTP_APP_ID },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }

  verifyOTP(tel, otp, transactionId, vendor) {
    console.log(tel, otp, transactionId, vendor);

    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: 'http://otp.dev.moph.go.th/otp/verify',
        headers: { 'content-type': 'application/json' },
        body: {
          tel: tel,
          otp: otp,
          transactionId: transactionId,
          vendor: vendor,
          appId: process.env.OTP_APP_ID
        },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }

  checkEvent(db: Knex, hospcode: string, eventCode: string) {
    return db('events')
      .where('hospcode', hospcode)
      .where('code', eventCode)
      .limit(1);
  }
}