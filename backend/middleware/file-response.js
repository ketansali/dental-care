



exports.getSingleImageOptions = (req,storePath) => {
    let pathDirectory = __dirname.split("\\");
    pathDirectory.pop();
    pathDirectory = pathDirectory.join("\\");
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
  