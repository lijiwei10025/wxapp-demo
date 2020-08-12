//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    black: '#2D3444',
    yellow: '#FFBE00',
    white: '#B9BABC',
    green: '#16C56E',
    blue: '#339DE9',
    token: null,
   /*  host: 'https://gxtc.byx-its.com' */
     host:'http://192.168.1.151:8084/share'
    /*  192.168.1.201: 8089 */
  },
  commenF(f) {
    console.log('123')
    let that = this;
    that.getStorage('user').then(d => {
      wx.request({
        url: `${that.globalData.host}/session/validate`,
        header: {
          'Authorization': `Bearer ${d.token}`
        },
        success: function (res101) {
          console.log(res101.data)
          if (res101.data.success) {
            if (!res101.data.refresh) {
              f
            } else {
              that.setStorage('user', res101.data.user)
              that.cacheToken(res101.data.user.token)
            }
          } else {
            wx.clearStorage()
            wx.redirectTo({
              url: '/pages/index/index',
            })

          }
        }
      })
    })

  },
  getStorage(key) {
    return new Promise(function (resolve, reject) {
      wx.getStorage({
        key: key,
        success: function (res) {
          if (res.data) {
            resolve(res.data)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  setStorage: function (key, value) {
    return new Promise(function (resolve, reject) {
      wx.setStorage({
        key: key,
        data: value,
        success: function (res) {
          if (res) {
            resolve(res.errMsg === 'setStorage:ok')
          }
        },
        fail(err) {
          wx.showToast({
            title: '程序故障,code=5',
          })
          reject(err)
        }
      })
    })
  },
  getRequest(url, data, header) {
    return this.requestAll(url, data, header, 'GET')
  },

  postRequest(url, data, header) {
    return this.requestAll(url, data, header, 'POST')
  },

  requestAll(url, data, header, method) {
    let cacheToken = this.globalData.token
    return new Promise((resolve, reject) => {
      let h = { 'content-type': 'application/json' }
      if (header) Object.assign(h, header)
      if (cacheToken) {
        Object.assign(h, { 'Authorization': 'Bearer ' + cacheToken })
        req()
      } else {
        wx.getStorage({
          key: 'user',
          success: function (res) {
            Object.assign(h, { 'Authorization': 'Bearer ' + res.data.token })
            req()
          },
          fail: function (e) {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        })
      }
      function req() {
        wx.request({
          url: url,
          data: data,
          header: h,
          method: method,
          success: (res => {
            if (res.statusCode === 200) {
              //200: 服务端业务处理正常结束
              resolve(res)
            } else {
              //其它错误，提示用户错误信息
              reject(res)
            }
          }),
          fail: (res => {
            reject(res)
          })
        })
      }
    })
  },
  cacheToken(token) {
    this.globalData.token = token
  },
  toAddress:function(itemAddress){
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        wx.openLocation({
          altitude: 'true',
          isHighAccuracy: true,
          latitude:  itemAddress.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: itemAddress.longitude , // 经度，范围为-180~180，负数表示西经
          scale: 18, // 缩放比例
          name:itemAddress.name,
          address: itemAddress.address
        })
      }
    })
  }
})