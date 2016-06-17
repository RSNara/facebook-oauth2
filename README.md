# Facebook OAUTH2

Using [passport](http://passportjs.org/), with the [facebook strategy](https://github.com/jaredhanson/passport-facebook), we authenticate users.

## Facebook Setup

1. Visit [facebook](https://developers.facebook.com/apps). Register a developer account with facebook and make an application.

2. In the project, create `server/constants/secrets.js`. Within that file, export two constants: `CLIENT_ID`, which is your app's **App ID**, and `CLIENT_SECRET`, which is your app's **App Secret**.

3. Add `local.me` to the **App Domains**. Then, add `127.0.0.1 local.me` to the bottom of `etc/hosts`. Remember to add `http://local.me:3000/` as a platform. After entering this information, hit `Save Changes` at the bottom right.

## Running Example
```BASH
> npm run dev
```

Open up a browser and visit `http://local.me:3000/login/facebook`. After you're authorized the application, you should see your `access_token` in the url. 
