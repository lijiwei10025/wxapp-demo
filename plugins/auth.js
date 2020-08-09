let token_key="user_token";

let auth = {
	get:function(){
		return wx.getStorageSync(token_key);
	},
	set:function(values){
		try {
		   return wx.setStorageSync(token_key, values);
		} catch (e) {
		    console.error("setStorageSync:" + token_key, e);
		}
	},
	clear:function(){
		try {
		   return wx.clearStorageSync(token_key);
		} catch (e) {
		    console.error("clearStorageSync:" + token_key, e);
		}
	}
}

export default auth