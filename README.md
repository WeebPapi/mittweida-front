# Mittweida frontend

## Aleksandre Kapanadze

React Vite Frontend built to consume the following backend: https://github.com/WeebPapi/mittweida-back

Frontend deployment: https://weebpapi.github.io/mittweida-front/

# Important Notes

As part of render's free plan, the backend will, on occasion spin down and shut off after 15 minutes of inactivity, you can either make a request, let it fail, give it a minute and try again so that the server is started again or you can try running the server and frontend locally on localhost, in which case, you will have to have both, localhost:3000 and localhost:5173 served with https.

to run the backend on https, follow the instructions from the "dev" branch of the mittweida-back repo and use that branch.

Also, you may look in the package.json and notice you have the option of running npm run dev and dev:network, dev will work on the computer you are hosting the frontend on, while dev:network will work on a phone or other device in your network, to configure and make sure these run smoothly, you must create env files with the following structures

## .env

VITE_GRAPHHOPPER_KEY="your-graphhopper-key"

## .env.development.local

VITE_API_BASE_URL=https://localhost:3000/api

## .env.development.network

VITE_API_BASE_URL=https://your-internal-ipv4-address:3000/api
