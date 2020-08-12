Page({
  data: {
    activeIndex: 0,
    tabList: [
      {
        text: "首页",
        path: "pages/home/home",
        icon: "/static/icon/home.png",
        selectedIcon: "/static/icon/home_.png"
      },
      {
        text: "订单",
        path: "pages/order/order",
        icon: "/static/icon/order.png",
        selectedIcon: "/static/icon/order_.png"
      },
      {
        text: "我的",
        path: "pages/user/user",
        icon: "/static/icon/user.png",
        selectedIcon: "/static/icon/user_.png"
      }
    ]
  },

  /**
   * tabbar
   */
  tabbarNav(e) {
    const {index} = e.currentTarget.dataset;
    this.data.activeIndex = index;
    console.log(index, this.data.activeIndex)
  }
})