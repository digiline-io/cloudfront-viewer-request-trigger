'use strict';

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    var referer = "";


    if (headers && headers['referer'] && headers['referer'][0]) {
        console.log("Found A Referer in Headers")
        var referer = headers['referer'][0].value;
        console.log(referer)

    }

    if (headers && headers['referer'] && headers['referer'][0] && referer.includes('digiline-subscribed-website.s3-website-us-east-1.amazonaws.com')) {
        console.log("Found Valid Referer")

        callback(null, request);
        return;
    }

    if (headers && headers['x-letmein']) {
        console.log("found letmein")

        callback(null, request);
        return;
    }

    const forbiddenResponse = {
        status: '403',
        statusDescription: 'Forbidden'
    };

    console.log("No Valid Referer, Forbidden")

    callback(null, forbiddenResponse);
};
