import store from '@/store'

const { body } = document
// 项目中规定，屏幕分辨率宽度 > 1024 算是桌面端设备，其余算是手机移动端
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          console.log('当前是移动端设备')
          store.dispatch('CloseSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}


// getBoundingClientRect()
//   这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
// var box=document.getElementById('box');         // 获取元素

// alert(box.getBoundingClientRect().top);         // 元素上边距离页面上边的距离

// alert(box.getBoundingClientRect().right);       // 元素右边距离页面左边的距离

// alert(box.getBoundingClientRect().bottom);      // 元素下边距离页面上边的距离

// alert(box.getBoundingClientRect().left);        // 元素左边距离页面左边的距离
