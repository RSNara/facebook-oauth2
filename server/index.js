import express from 'express';
import passport from 'passport';
import { Strategy as FBStrategy } from 'passport-facebook';
import * as Secrets from './constants/secrets';
import morgan from 'morgan';
import * as BP from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

const PORT = 3000;
const HOST = 'local.me';

passport.use(new FBStrategy({
  clientID: Secrets.CLIENT_ID,
  clientSecret: Secrets.CLIENT_SECRET,
  callbackURL: `http://${HOST}:${PORT}/login/facebook/return`,
},
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, Object.assign(profile, {token: accessToken}));
  }
));

const app = express();

app.use(morgan('dev'));
app.use(BP.urlencoded({ extended: true, json: true }));

app.use(passport.initialize());

const HOME_PAGE = path.join(__dirname, '../client/index.html');
const LOGIN_PAGE = path.join(__dirname, '../client/login.html');

app.get('/', (request, response) => {
  fs.createReadStream(HOME_PAGE).pipe(response);
});

app.get('/login', (request, response) => {
  fs.createReadStream(LOGIN_PAGE).pipe(response);
});

app.get('/login/facebook', (...args) => {
  passport.authenticate('facebook')(...args);
});


app.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (request, response) => {
    response.redirect('/?access_token=' + request.user.token);
  }
);

app.listen(PORT, () => {
  console.log('STARTED SERVER');
});
