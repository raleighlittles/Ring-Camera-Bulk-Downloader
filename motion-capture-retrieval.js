import { RingApi } from 'ring-client-api'

let ringApi = new RingApi({
       // Replace with your refresh token
       "refreshToken": "eyJhbGciOiJIUzUxMiIsImprdSI6Ii9vYXV0aC9pbnRlcm5hbC9qd2tzIiwia2lkIjoiYzEyODEwMGIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NDY5NDkwMjIsImlzcyI6IlJpbmdPYXV0aFNlcnZpY2UtcHJvZDp1cy1lYXN0LTE6M2Q3ZDcxOWYiLCJyZWZyZXNoX2NpZCI6InJpbmdfb2ZmaWNpYWxfYW5kcm9pZCIsInJlZnJlc2hfc2NvcGVzIjpbImNsaWVudCJdLCJyZWZyZXNoX3VzZXJfaWQiOjcwNzU1NTU4LCJybmQiOiJUTm5vQmMtNkNuS2dYZyIsInNlc3Npb25faWQiOiIzNGE1MjA5MS0yZTUwLTQxM2EtODJkNi00YzU2MzQxOTJjN2UiLCJ0eXBlIjoicmVmcmVzaC10b2tlbiJ9.7i7TGO2CXDVX3Ey8_bp3GhDup5R0_aquPW--VEs63yOU4Yp7mwEAn3MhthRvngUhAZFmhW6Jvx01gF4KTTpyUA"
     });

let cameraEvents = ringApi.getLocations().then((value) => {
  return value[0].getCameraEvents();
}).then((value) => {
  console.log(value);
});

ringApi.disconnect()