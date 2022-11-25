const fs = require("fs");
const path = require("path");

let pathDirectory = __dirname.split("\\");
pathDirectory.pop();
pathDirectory = pathDirectory.join("\\");

exports.getSingleImageOptions = (req, storePath) => {
  const uploadedFile = req.files.image;
  const extension =
    uploadedFile.name.split(".")[uploadedFile.name.split(".").length - 1];
  const fileName = `${new Date().valueOf()}_${Math.ceil(
    Math.random() * 10000
  )}.${extension}`;
  const uploadFilePath = `${pathDirectory}/uploads/${storePath}/${fileName}`;
  return {
    fileName,
    uploadFilePath,
    uploadedFile,
  };
};

exports.removeImage = (imagepath) => {
  console.log({ imagepath });
  fs.unlink(`${pathDirectory}/uploads/${imagepath}`, (err) => {});
};

exports.getMultipleImageOptions = (uploads) => {
  return new Promise((resolve, reject) => {
    const imgData = [];
    const uploadFilePath = `${pathDirectory}/uploads/Patients/`;
    console.log({ uploadFilePath });
    uploads.forEach(async (upload) => {
      const extensionName = path.extname(upload.name);
      const allowedExtension = [".png", ".jpg", ".jpeg"];
      if (!allowedExtension.includes(extensionName)) {
        reject("!Invalid image");
      } else {
        const name = await `${new Date().valueOf()}_${Math.ceil(
          Math.random() * 1000
        )}${path.parse(upload.name).ext}`;
        imgData.push(name);
        await upload.mv(`${uploadFilePath}/${name}`, async (err) => {
          if (err) {
            reject("Something wrong");
          }
        });
      }
    });

    resolve(imgData);
  });
};
