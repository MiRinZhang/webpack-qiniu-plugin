const qiniu = require('qiniu');
const { join } = require('path');
const slash = require('slash');

export default class Qiniu {
	constructor(options) {
		if (!options.ACCESS_KEY || !options.SECRET_KEY) {
			throw new Error('ACCESS_KEY and SECRET_KEY must be provided');
		}
		this.opts = options;
	}

	uploader(fileName, filePath, hash) {
		const { ACCESS_KEY, SECRET_KEY, bucket } = this.opts;
		let { path } = this.opts;
		path = path.replace('[hash]', hash);
		const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
		const key = slash(join(path, fileName));
		const putPolicy = new qiniu.rs.PutPolicy({ scope: `${bucket}:${key}` });
		const uploadToken = putPolicy.uploadToken(mac);
		const config = new qiniu.conf.Config();
		const formUploader = new qiniu.form_up.FormUploader(config);
		const putExtra = new qiniu.form_up.PutExtra();

		console.log(`[QINIU]: upload ${fileName}`);

		return new Promise((rs, rj) => formUploader.putFile(uploadToken, key, filePath, putExtra, (err, result) => !err ? rs(result) : rj(err)));
	}

	apply(compiler) {
		compiler.plugin('after-emit', (compilation, callback) => {
			const { assets, hash } = compilation;
			console.log(`[BUILD HASH]: ${hash}`);
			const promise = Object.keys(assets).map((fileName) => this.uploader(fileName, assets[fileName].existsAt, hash));

			Promise.all(promise).then(_ => {
				console.log('[QINIU]: upload files complete');
				callback && callback();
			}).catch(err => {
				callback && callback();
			})
		});
	}
}
