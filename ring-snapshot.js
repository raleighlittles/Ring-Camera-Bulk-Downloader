const { RingApi } = require('ring-client-api');
const { format } = require('date-fns');
const AWS = require('aws-sdk');

// Initialize S3
AWS.config.update({
    "region": process.env.s3Region
});
const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

exports.handler = async (event) => {
    const ringApi = new RingApi({
        refreshToken: process.env.ringApiToken,
    });

    console.log("Getting list of cameras from Ring...");
    const cameras = await ringApi.getCameras();

    if (cameras.length <= 0) {
        console.warn('No cameras found');
        return;
    } else {
        console.log(`Found ${cameras.length} cameras.`);
    }

    const cameraAllowList = event.cameraAllowList;
    const cameraPromises = cameras.filter(camera => cameraAllowList.includes(camera.initialData.description))
    .map(async (camera) => retrieveAndUploadSnapshots(camera));

    await Promise.all(cameraPromises);
}

async function retrieveAndUploadSnapshots(camera) {
    let cameraName = camera.initialData.description;

    console.log(`Getting snapshot for camera ${cameraName}...`);
    try {
        const snapshot = await camera.getSnapshot();

        let key = getS3Key(cameraName, snapshot.responseTimestamp);
        console.log(`Retrieved snapshot for camera ${cameraName}. Uploading to S3 bucket ${process.env.s3Bucket} as ${key}.`);

        return s3.putObject({
            "Bucket": process.env.s3Bucket,
            "Key": key,
            "Body": snapshot
        }).promise();
    } catch (err) {
        console.error(err);
    }
}

function getS3Key(cameraName, epochTimestamp) {
    return `${cameraName}/${format(new Date(epochTimestamp), "yyyy/MM/dd/yyyyMMdd-HHmmss")}.jpg`;
}