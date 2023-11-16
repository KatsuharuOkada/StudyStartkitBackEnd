const fs = require('fs');

class FileUtil {
  readFile(path) {
    return fs.readFileSync(path);
  }

  async writeFile(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  existPath(path) {
    return fs.existsSync(path);
  }

  createFolder(path) {
    if (!this.existPath(path)) {
      fs.mkdirSync(path);
    }
  }
}

module.exports = new FileUtil();
