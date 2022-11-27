const imageSchema = require("../models/Image");

class FileService {
  async uploadImage(type, imageExtension, image, userId) {
    const time = Date.now().toString();
    const fileName = `${userId}-${time}-${type}`;

    const obj = {
      name: fileName,
      image: {
        data: image,
        contentType: "image/" + imageExtension,
      },
      type,
      imageExtension,
    };

    await imageSchema.create(obj);

    return "Success";
  }

  async getImage(id) {
    const image = await imageSchema.findById(id);

    return image;
  }
}

module.exports = new FileService();
