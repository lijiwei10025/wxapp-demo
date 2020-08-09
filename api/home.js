import request from '@/plugins/request';

var homeApi = {
	//轮播图
	swiper: function() {
		return request({
			url: '/api/cat/rotation',
			method: 'GET'
		})
	}
}

export default homeApi