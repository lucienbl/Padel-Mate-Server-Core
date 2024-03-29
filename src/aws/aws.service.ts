import { Injectable } from '@nestjs/common';
import { Endpoint, S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly _s3: S3;

  constructor() {
    this._s3 = new S3({
      endpoint: new Endpoint(process.env.SPACES_ENDPOINT),
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
    });
  }

  get s3(): S3 {
    return this._s3;
  }
}
