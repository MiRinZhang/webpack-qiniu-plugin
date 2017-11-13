# webpack-qiniu-plugin
Webpack plugin for Qiniu cloud storage (qiniu@^7.1.1)

### Usage

#### Install
> npm install -D webpack-qiniu-plugin

#### Config

* import

```javascript
const qiniuPlugin = require('webpack-qiniu-plugin');
```

* config

```javascript
...
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
