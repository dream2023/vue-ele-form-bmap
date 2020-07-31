<template>
  <div>
    <el-autocomplete
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      @select="handleChange"
      style="width:100%"
      v-model="searchValue"
    >
      <template slot-scope="{ item }">
        <div style="line-height: 20px;display:flex;align-items:center;">
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            style="font-size:20px;margin-right:10px;"
          ></i>
          <span class="ele-form-search-keywords">{{ item.value }}&nbsp;&nbsp;</span>
          <span class="ele-form-search-location">{{ item.address }}</span>
        </div>
      </template>
    </el-autocomplete>
    <baidu-map
      :ak="ak"
      :center="center"
      :scroll-wheel-zoom="isScrollWheelZoom"
      :style="{height: mapHeight + 'px'}"
      :zoom="zoom"
      @click="handleChange"
      @load="handleMapLoaded"
      class="ele-form-bmap"
    >
      <bm-geolocation
        :autoLocation="true"
        :showAddressBar="true"
        @locationSuccess="handleChange"
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        v-if="isShowGeolocation"
      ></bm-geolocation>
      <bm-navigation
        anchor="BMAP_ANCHOR_TOP_LEFT"
        v-if="isShowNavigation"
      ></bm-navigation>
      <bm-local-search
        :auto-viewport="false"
        :keyword="searchValue"
        :pageCapacity="10"
        :panel="false"
        @searchcomplete="handleSearchEnd"
        v-if="isSearching"
      ></bm-local-search>
      <bm-marker
        :dragging="true"
        :position="center"
        @dragend="handleChange"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
      <bm-view
        :style="{height: mapHeight + 'px'}"
        style="width:100%"
      ></bm-view>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'

export default {
  name: 'ele-form-bmap',
  props: {
    // 值
    value: {
      type: [String, Object]
    },
    // 密钥
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
  },
  components: {
    BaiduMap,
    BmView,
    BmNavigation,
    BmLocalSearch,
    BmGeolocation,
    BmMarker
  },
  data () {
    return {
      center: '北京',
      isSearching: false,
      searchList: [],
      searchValue: ''
    }
  },
  methods: {
    // 地图加载成功
    handleMapLoaded () {
      if (this.value) {
        this.center = this.value
        if (typeof this.value === 'string') {
          this.searchValue = this.value
        } else if (typeof this.value === 'object' && this.value.address) {
          this.searchValue = this.value.address
        }
      }
    },
    // 发起请求
    querySearch (queryString, cb) {
      if (queryString) {
        this.isSearching = true
        this.cb = cb
      }
    },
    // 搜索结束
    handleSearchEnd (res) {
      if (res && res.Ir && this.cb) {
        const list = res.Ir.map((pos) => {
          return {
            address: pos.address,
            point: pos.point,
            value: pos.title
          }
        })
        this.cb(list)
        this.cb = null
        this.isSearching = false
      }
    },
    // 位置改变
    handleChange (res) {
      if (res && res.point) {
        this.center = res.point
        this.$emit('input', {
          address: this.searchValue,
          lat: res.point.lat,
          lng: res.point.lng
        })
      }
    }
  }
}
</script>

<style>
.ele-form-bmap {
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
}

.ele-form-search-keywords {
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ele-form-search-location {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .ele-form-search-location {
  color: #ddd;
}
</style>
