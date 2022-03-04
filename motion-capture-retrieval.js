

// Ring API Setup section
import { RingApi } from 'ring-client-api'


async function fetchAllMotionEvents() {

  const { env } = process,
  ringApi = new RingApi({
    // Replace with your refresh token
    "refreshToken": "eyJhbGciOiJIUzUxMiIsImprdSI6Ii9vYXV0aC9pbnRlcm5hbC9qd2tzIiwia2lkIjoiYzEyODEwMGIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NDYzNzY5MjEsImlzcyI6IlJpbmdPYXV0aFNlcnZpY2UtcHJvZDp1cy1lYXN0LTE6NjAzZjIzNzgiLCJyZWZyZXNoX2NpZCI6InJpbmdfb2ZmaWNpYWxfYW5kcm9pZCIsInJlZnJlc2hfc2NvcGVzIjpbImNsaWVudCJdLCJyZWZyZXNoX3VzZXJfaWQiOjcwNzU1NTU4LCJybmQiOiJSSnBxcnNtX0dKNExqUSIsInNlc3Npb25faWQiOiI1MjUyMzdmZC01NmQ1LTRhZjgtYTgyMi1kNjFkMjJmMGU3YjQiLCJ0eXBlIjoicmVmcmVzaC10b2tlbiJ9.iGPCDOEPOlyODmZPpEDy1sin6vBgeg4ANhWYxrDfVPOQWcYSrI3qzw7Q5CIpfP1ZDSrXOfwMesesuAd-IbXBnA",
  }),
  locations = await ringApi.getLocations(),
  location = locations[0],
  cameras = await ringApi.getCameras(),
  camera = cameras[0]

// Locations API
location.onConnected.subscribe((connected) => {
  const state = connected ? 'Connected' : 'Connecting'
  console.log(`${state} to location ${location.name} - ${location.id}`)
})

}

fetchAllMotionEvents().catch();