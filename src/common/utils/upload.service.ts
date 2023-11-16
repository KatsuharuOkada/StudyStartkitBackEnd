/**
 * Upload
 * 4D naviwise backend
 * Created by ThanhLD on 2019/08/22
 * Copyright (c) 4D-Corp
 */

import * as AWS from 'aws-sdk';
import base64Img from 'base64-img';
import * as fs from 'fs';
// tslint:disable-next-line
require('dotenv').config();

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

class Upload {
  async base64ToImg(fileName, base64) {
    return await base64Img.imgSync(base64, 'upload', fileName);
  }

  async uploadImage(fileName, folder, image) {
    let source = folder + '/' + fileName + '.png';
    let filePath = await this.base64ToImg(fileName, image);
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: source,
      ACL: 'public-read',
      Body: fs.readFileSync(filePath),
    };
    await new Promise((resolve, reject) => {
      s3.putObject(params, (s3Err, data) => {
        if (s3Err) {
          throw s3Err;
        }
        console.log(`File uploaded successfully at ${data}`);
        fs.unlinkSync(filePath);
        filePath = data;
        resolve();
      });
    });
    return { fileName: source, filePath };
  }
}

export default new Upload();
