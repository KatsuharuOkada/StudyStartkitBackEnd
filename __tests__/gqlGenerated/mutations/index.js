const fs = require('fs');
const path = require('path');

module.exports.createCategory = fs.readFileSync(path.join(__dirname, 'createCategory.gql'), 'utf8');
module.exports.createUser = fs.readFileSync(path.join(__dirname, 'createUser.gql'), 'utf8');
