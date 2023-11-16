const fs = require('fs');
const path = require('path');

module.exports.login = fs.readFileSync(path.join(__dirname, 'login.gql'), 'utf8');
module.exports.getCategory = fs.readFileSync(path.join(__dirname, 'getCategory.gql'), 'utf8');
module.exports.getUserInformation = fs.readFileSync(path.join(__dirname, 'getUserInformation.gql'), 'utf8');
