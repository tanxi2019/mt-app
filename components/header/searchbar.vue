<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <!--suppress CheckEmptyScriptTag -->
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <!--suppress CheckEmptyScriptTag -->
          <el-button
            class="el-button el-button--primary"
            icon="el-icon-search"
          />
          <dl
            v-if="isHotPlace"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd
              v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
              :key="idx"
            >
              {{ item.name }}
            </dd>
          </dl>
          <dl
            v-if="isSearchList"
            class="searchList"
          >
            <dd
              v-for="(item,idx) in searchList"
              :key="idx"
            >
              {{ item.name }}
            </dd>
          </dl>
        </div>
        <div class="suggset">
          <a
            v-for="(item,idx) in $store.state.home.hotPlace.slice(0,6)"
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)"
          >{{ item.name }}</a>
        </div>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout"
            >
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie"
            >
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel"
            >
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment"
            >
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business"
            >
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <!--suppress CheckEmptyScriptTag -->
            <i class="refund" />
            <p class="txt">
              随时退
            </p>
          </li>
          <li>
            <!--suppress CheckEmptyScriptTag -->
            <i class="single" />
            <p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <!--suppress CheckEmptyScriptTag -->
            <i class="overdue" />
            <p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Searchbar',
  data () {
    return {
      search: '', // 输入框的值
      isFocus: false, // 判断显隐
      hotPlace: [],
      searchList: []
    }
  },
  computed: {
    // eslint-disable-next-line
    isHotPlace () { // 聚焦状态1，值为空
      return this.isFocus && !this.search
    },
    // eslint-disable-next-line
    isSearchList:function () { // 聚焦状态2，值不为空
      return this.isFocus && this.search
    }
  },
  methods: {
    // eslint-disable-next-line
    focus:function () { //搜索框获取焦点时，显示isHotPlace的内容
      this.isFocus = true
    },
    // eslint-disable-next-line
    blur:function () { // 搜索框输入值时，显示searchList的内容
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    // eslint-disable-next-line
    input:_.debounce(async function(){
      const self = this
      const city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = []
      // eslint-disable-next-line no-unused-vars
      const { status, data: { top } } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      self.searchList = top.slice(0, 10)
    }, 300)
  }
}
</script>

<style lang="css">
 .suggset a{
    margin-right: 10px;
    margin-bottom: 3px;
    display: inline-block;
  }
</style>
