require('dotenv').config();

const fsp = require('fs/promises');
const B2 = require('backblaze-b2');

const b2 = new B2({
  applicationKeyId: process.env.BACKBLAZEAPPLICATIONKEYID,
  applicationKey: process.env.BACKBLAZEAPPLICATIONKEY,
});

const unlinkAsync = fsp.unlink;

class FileController {
  async upload(req, res) {
    const { filename, path } = req.file;

    try {
      const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
        if (err) {
          throw err;
        }
        return data;
      });

      await b2.authorize();

      const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
        bucketId: process.env.BACKBLAZEBUCKETID,
      });

      const { data } = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: filename,
        data: file,
      });

      await unlinkAsync(path);

      return res.send({ url: `https://f005.backblazeb2.com/file/instadevcurso/${data.fileName}` });
    } catch (error) {
      return res.status(400).json({
        error: 'Faile to upload',
      });
    }
  }
}
module.exports = new FileController();
