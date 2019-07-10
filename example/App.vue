<template>
  <el-card
    header="ele-form-bmap 演示"
    shadow="never"
    style="max-width: 1250px;margin: 20px auto;min-height: 1600px"
  >
    <ele-form
      :form-data="formData"
      :form-desc="formDesc"
      :request-fn="handleRequest"
      @request-success="handleSuccess"
    />
  </el-card>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
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
            ak: 'LDeyoWgKV2mO1b3MRkTlyzGcNjFUycLL',
            mapHeight: 300
          }
        }
      }
    }
  },
  methods: {
    handleRequest (data) {
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess () {
      this.$message.success('提交成功')
    }
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>
