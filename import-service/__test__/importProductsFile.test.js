import AWS from "aws-sdk";
import { importProductsFile } from '../functions/importProductsFile';
import { importFileParser } from "../functions/importFileParser";

const BUCKET = "yura703-task5";

describe('importProductsFile', () => {
  it('Upload file', async () => {
    const name = 'test.csv';

    const response = await importProductsFile({ queryStringParameters: { name } });
    const { receivedUrl } = JSON.parse(response.body);

    expect(receivedUrl).toBeDefined();

    const S3 = new AWS.S3({ region: "eu-west-1" });

    const s3Upload = await S3.upload({
      Bucket: BUCKET, Key: `uploaded/${name}`, Body: Buffer.from('testing response')
    }).promise();

    expect(s3Upload.ETag).toBeDefined();

    await s3Client.deleteObject({ Bucket: BUCKET, Key: `uploaded/${name}` }).promise();
  });

  it('Get signed URL and upload file without name', async() => {
    const response = await handler.importProducts({ queryStringParameters: {} });
    const { error } = JSON.parse(response.body);

    expect(error).toBe('Name is required');
  });
});
