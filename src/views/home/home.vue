<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">女装街</div></navbar>

    <scroll
      class="content"
      ref="content"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banner="banner"></HomeSwiper>
      <Recommend :recommend="recommend"></Recommend>
      <feature></feature>
      <TabControl
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @tabControl="tabControl"
      ></TabControl>

      <GoodList :goods="goods[currenType].list" />
    </scroll>
    <backTop class="backTop" @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import HomeSwiper from './ChildComps/HomeSwiper.vue'
import Recommend from './ChildComps/Recommend.vue'
import feature from './ChildComps/Feature.vue'
import TabControl from 'components/content/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import backTop from 'components/content/backTop/backTop'
import Scroll from 'components/common/scroll/Scroll'

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
      isShowBackTop: false,
    }
  },
  components: {
    navbar,
    HomeSwiper,
    Recommend,
    feature,
    TabControl,
    GoodList,
    backTop,
    Scroll,
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
        this.$refs.content.finishPullUp()
      })
    },
    backClick() {
      this.$refs.content.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // console.log(position)
      this.isShowBackTop = -position.y > 1000
    },
    loadMore() {
      this.getGoods(this.currenType)
      console.log('------------到底了---------------')
      this.$refs.content.scroll.refresh()
    },
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
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

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}
</style>
