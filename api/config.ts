import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/gallery',
  google: {
    clientId: '815766087998-7tvsqbo0h0j7mc1t92qb3fh23fkcba3m.apps.googleusercontent.com',
  },
};

export default config;
