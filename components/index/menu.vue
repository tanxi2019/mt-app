<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave"
    >
      <dt>全部分类</dt>
      <dd
        v-for="(item,idx) in $store.state.home.menu"
        :key="idx"
        @mouseenter="enter"
      >
        <!--suppress CheckEmptyScriptTag -->
        <i :class="item.type" />
        {{ item.name }}
        <!--suppress CheckEmptyScriptTag -->
        <span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout"
    >
      <template
        v-for="(item,idx) in curdetail.child"
      >
        <h4 :key="idx">
          {{ item.title }}
        </h4>
        <span
          v-for="v in item.child"
          :key="v"
        >
          {{ v }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      kind: '',
      menu: [
        // {
        //   type: ' food',
        //   name: ' 美食',
        //   child: [
        //     {
        //       title: '美食',
        //       child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        //     }
        //   ]
        // },
        // {
        //   type: 'takeout',
        //   name: '外卖',
        //   child: [
        //     {
        //       title: '外卖',
        //       child: ['美团外卖']
        //     }
        //   ]
        // },
        // {
        //   type: 'hotel',
        //   name: '酒店',
        //   child: [{
        //     title: '酒店星级',
        //     child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
        //   }
        //   ]
        // },
        // {
        //   type: ' food',
        //   name: ' 美食',
        //   child: [{
        //     title: '美食',
        //     child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        //   }]
        // }
      ]
    }
  },
  computed: {
    // eslint-disable-next-line
    curdetail: function () {
      // eslint-disable-next-line no-console
      // console.log(this.menu.filter(item => item.type === this.kind)[0])
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    // eslint-disable-next-line
    mouseleave:function () {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    // eslint-disable-next-line
    enter:function (e) {
      this.kind = e.target.querySelector('i').className
      // eslint-disable-next-line no-console
      // console.log(this.kind)
    },
    // eslint-disable-next-line
    sover:function(){
      clearTimeout(this._timer)
    },
    // eslint-disable-next-line
    sout:function(){
      this.kind = ''
    }
  }
}
</script>

<style scoped>

</style>
