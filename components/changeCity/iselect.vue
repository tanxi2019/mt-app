<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <!--suppress CheckEmptyScriptTag -->
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
    >
      <!--suppress CheckEmptyScriptTag -->
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!--suppress CheckEmptyScriptTag -->
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>

import _ from 'lodash'
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue (newPvalue) {
      const self = this
      const { status, data: { city } } = await self.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        self.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  async mounted () {
    const self = this
    const { status, data: { province } } = await self.$axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      const self = this
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.includes(query)))
      } else {
        const { status, data: { city } } = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cb(self.cities.filter(item => item.value.includes(query)))
        } else {
          // eslint-disable-next-line standard/no-callback-literal
          cb([])
        }
      }
    }, 200),
    handleSelect (item) {
      // eslint-disable-next-line no-console
      console.log(item.value)
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/css/changeCity/iselect.scss";
</style>
