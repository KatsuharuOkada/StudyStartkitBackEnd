import * as fs from 'fs';
import * as _ from 'lodash';
async function readFile() {
  const file = fs
    .readFileSync('.env.example', {
      encoding: 'utf8'
    })
    .split('\n');
  const variables = file
    .map(x => {
      if (x.trim().charAt(0) === '#' || x.length === 0) {
        return x;
      }
      return x.split('=');
    })
    .map(v => {
      return typeof v === 'string' ? v : [v[0], v[1]] || process.env[v[0]];
    });
  console.log(variables);
  const streamWriter = fs.createWriteStream('.env.prod', {
    encoding: 'utf8'
  });
  _.forEach(variables, (v: any) => {
    if (Array.isArray(variables)) {
      const [key, val] = v;
      if (val === '') {
        console.warn(`Warning: ENV ${key} empty`);
      }
    }
    streamWriter.write(`${typeof v === 'string' ? v : v.join('=')}\n`);
  });
  console.log(variables);
  // console.log(process.env);
}

readFile();

function getUser(): { name: string } {
  return { name: '' };
}
