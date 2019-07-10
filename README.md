# vue-ele-form-bmap | vue-ele-form 的百度地图组件

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-form-bmap.svg)](https://www.npmjs.com/package/vue-ele-form-bmap)
[![download](https://img.shields.io/npm/dw/vue-ele-form-bmap.svg)](https://npmcharts.com/compare/vue-ele-form-bmap?minimal=true)

## 介绍

vue-ele-form-bmap 做为 [vue-ele-form](https://github.com/dream2023/vue-ele-form) 的第三方扩展, 通过对 [vue-baidu-map](https://github.com/Dafrok/vue-baidu-map) 的二次封装, 实现了地理位置的获取和定位

![image](https://raw.githubusercontent.com/dream2023/images/master/vue-ele-form-bmap.ty18r4ibm5p.gif)

## 安装

```bash
npm install vue-ele-form-bmap --save
```

## 使用

```js
import EleForm from 'vue-ele-form'
import EleFormBmap from 'vue-ele-form-bmap'
// 注册 vue-ele-form
Vue.use(EleForm, {
  // 可以为编辑器配置全局属性, 每个实例都共享这个属性
  bmap: {
    // 比如设置 ak 后, 所有的 bmap 编辑器上传图片都会采用这个属性值
    ak: 'YOUR_APP_KEY'
  }
})

// 注册 bmap 组件
Vue.component('bmap', EleFormBmap)
```

```js
formData: {
  // 这里注意, 请参考值的设置
  location: {
    address: '深圳市宝安区'
    lat: 22.54605355,
    lng: 114.02597366
  }
},
formDesc: {
  location: {
    label: 'xxx',
    type: 'bmap', // 只需要在这里指定为 bmap 即可
    // 组件属性, 具体参考下面 Props 部分
    attrs: {
      ak: 'YOUR_APP_KEY',
      zoom: 15
    }
  }
}
```

## bmap 类型字段的值

```js
// bmap类型的字段的四种情况

// 1.字符串
formData: {
  location: '深圳市'
}

// 2.经纬度
formData: {
  location: {
    lat: 22.54605355, // 这里key必须是 lat
    lng: 114.02597366  // 这里key必须是 lng
  }
}

// 3.混合
formData: {
  location: {
    address: '深圳市', // key必须是address
    lat: 22.54605355, // key必须是lat
    lng: 114.02597366 // key必须是lnt
  }
}

// 4.从服务器获取的key不符合的情况
// 可以利用valueFormatter 和 displayFormatter
// 假如从服务器获取的数据如下:
formData: { longitude: 114.02597366, latitude: 22.54605355, address: '深圳市' },

formDesc: {
  latitude: {
    type: 'hide', // 隐藏
    valueFormatter (val, data) {
      // 最终提交时, 获取值
      return data.address ? data.address.lat : null
    }
  },
  longitude: {
    type: 'hide', // 隐藏
    valueFormatter (val, data) {
      // 最终提交时, 获取值
      return data.address ? data.address.lng : null
    }
  },
  address: {
    label: '位置',
    type: 'bmap', // 设置为 bmap 类型
    displayFormatter: (address) => {
      // 设置显示的值
      if (typeof address === 'string') {
        return {
          address: address,
          lat: this.formData.latitude,
          lng: this.formData.longitude
        }
      } else {
        return address
      }
    },
    valueFormatter (val) {
      // 最终提交时
      return val && val.address ? val.address : null
    },
    attrs: {
      ak: 'LDeyoWgKV2mO1b3MRkTlyzGcNjFUycLL'
    }
  }
}
```

## Props

> 属性具体含义可以参考 vue-baidu-map https://github.com/Dafrok/vue-baidu-map

```js
props: {
  // 密钥(必填)
  ak: {
    type: String,
    required: true
  },
  // 缩放比
  zoom: {
    type: Number,
    default: 12
  },
  // 滚轮缩放大小
  isScrollWheelZoom: {
    type: Boolean,
    default: false
  },
  // 地图高度
  mapHeight: {
    type: Number,
    default: 400
  },
  // 是否显示缩略控件
  isShowNavigation: {
    type: Boolean,
    default: true
  },
  // 是否显示自动定位控件
  isShowGeolocation: {
    type: Boolean,
    default: true
  },
  // 搜索占位
  placeholder: {
    type: String,
    default: '请搜索位置'
  }
}
```

## 相关链接

- [vue-baidu-map](https://github.com/Dafrok/vue-baidu-map)
- [vue-ele-form](https://github.com/dream2023/vue-ele-form)
- [element-ui](http://element-cn.eleme.io)
