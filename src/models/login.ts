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
}