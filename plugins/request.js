import config from '@/plugins/config';
import auth from '@/plugins/auth';

var headres = {};
if(auth.get()) {
	headres.Authorization = "Bearer " + auth.get();
}

let request = function(options) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: config.Api + options.url,
			header: headres,
			method: options.method,
			data: options.data || {},
			timeout: 5000,
			success(result) {
				resolve(result.data);
			},
			fail(err) {
				reject(err);
			}
		})
	})
}

export default request