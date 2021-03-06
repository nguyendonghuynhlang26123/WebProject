const sharp = require("sharp");
const path = require("path");

function resizeImage(path, filename, width) {
  sharp(path)
    .resize({ width: width, fit: sharp.fit.inside, withoutEnlargement: true })
    .toFile(`public/upload/${width}-${filename}`);
  return `/upload/${width}-${filename}`;
}

module.exports = resizeImage;
