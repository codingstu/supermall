<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">女装街</div></navbar>
    <HomeSwiper :banner="banner"></HomeSwiper>
    <Recommend :recommend="recommend"></Recommend>
    <feature></feature>
    <TabControl
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabControl="tabControl"
    ></TabControl>
    <GoodList :goods="goods[currenType].list" />
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import HomeSwiper from './ChildComps/HomeSwiper.vue'
import Recommend from './ChildComps/Recommend.vue'
import feature from './ChildComps/Feature.vue'
import TabControl from 'components/content/TabControl'
import GoodList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenType: 'pop',
    }
  },
  components: {
    navbar,
    HomeSwiper,
    Recommend,
    feature,
    TabControl,
    GoodList,
  },
  created() {
    getHomeMultidata().then((res) => {
      console.log(res)
      ;(this.banner = res.data.banner.list),
        (this.recommend = res.data.recommend.list)
    }),
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
  },
  methods: {
    tabControl(index) {
      switch (index) {
        case 0:
          this.currenType = 'pop'
          break
        case 1:
          this.currenType = 'new'
          break
        case 2:
          this.currenType = 'sell'
          break
      }
    },
    getGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // console.log(res)

        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  
}
.home-nav {
  background-color: #e942bf;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
   z-index: 9;
}
</style>
