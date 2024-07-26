

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv|avi|mkv|flv|m4v)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });


    return config;
  },
// next.config.js
};





export default config;
