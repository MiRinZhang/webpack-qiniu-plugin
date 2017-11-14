# webpack-qiniu-plugin
Webpack plugin for Qiniu cloud storage (qiniu@^7.1.1)

### Usage

#### Install
> npm install -D webpack-qiniu-plugin

#### Config

`webpack.config.js`

* import

```javascript
const qiniuPlugin = require('webpack-qiniu-plugin');
```

* config

```javascript
const publicPath = 'https://cdn.com/[hash]/'

...
// config publicPath
output: {
  path: config.build.assetsRoot,
  filename: utils.assetsPath('js/[name].[hash].js'),
  chunkFilename: utils.assetsPath('js/[name].[hash].js'),
  publicPath
},
...
// config plugins
plugins: [
  new qiniuPlugin({
	  ACCESS_KEY: 'qiniu access_key',
	  SECRET_KEY: 'qiniu secrect_key',
	  bucket: 'storage bucket',
	  path: '[hash]' // path
  });
]
...
```
