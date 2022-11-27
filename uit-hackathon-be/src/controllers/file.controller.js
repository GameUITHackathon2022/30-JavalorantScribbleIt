const status = require("http-status");

const fileService = require("../services/file.service");

class FileController {
  async uploadImage(req, res) {
    const { type, imageExtension } = req.body;
    const message = await fileService.uploadImage(
      type,
      imageExtension,
      req.file.buffer,
      req.user._id
    );

    res.status(status.OK).json({
      message,
    });
  }

  async getImage(req, res) {
    const { id } = req.params;
    const image = await fileService.getImage(id);

    res.set("Content-Type", "image/" + image.imageExtension);
    res.status(status.OK).send(image.image.data);
  }
}

module.exports = new FileController();
