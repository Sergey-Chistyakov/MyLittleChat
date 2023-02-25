import {Connection} from "mysql2";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const redisClient = global.clientRedis;
const mysqlConnection = global.connectionMySQL;

function _checkPassword(login: string, password: string, onSuccess: (id: number) => void, onFailure: () => void): void {

    mysqlConnection.query(`SELECT * FROM users WHERE login = "${login}" LIMIT 1`, function (error, results, fields) {
        if (error) throw error;
        if (!results[0]?.password || !bcrypt.compareSync(password, results[0]?.password)) {
            onFailure();
            return;
        }
        onSuccess(results[0].id);
        return;
    });
}

function _createAuthToken(tokenBodyObj: { userid: number }): string {
    const lifetime = global.cookieLifetime.toString() + 'ms';
    const jwtSalt = global.jwtSalt;
    return jwt.sign(tokenBodyObj, jwtSalt, {expiresIn: lifetime});
}

//todo
function _addNewUser(login: string, password: string, onSuccess: (id: number) => void, onFailure: () => void): void {
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
}

async function _checkVacantLogin(login: string): Promise<boolean> {
     return !await redisClient.sIsMember('logins', login).catch(err => {
         throw new Error(err);
     });
 }

function _transferDataToRedis(): Promise<any> {
    type ObjWithLoginProp = { login: string };

    return new Promise((resolve, reject) => {
        mysqlConnection.query(`SELECT login FROM users`, function (error, loginCollection, fields) {
            if (error || !loginCollection?.[0]) reject(error);
            const multi = redisClient.multi();
            multi.del('logins');
            for (let login of loginCollection as ObjWithLoginProp[]) multi.sAdd('logins', login.login);
            resolve(multi.exec());
        });
    });
}

module.exports = {
    checkPassword: _checkPassword,
    createAuthToken: _createAuthToken,
    addNewUser: _addNewUser,
    transferDataToRedis: _transferDataToRedis,
    checkVacantLogin: _checkVacantLogin,
};