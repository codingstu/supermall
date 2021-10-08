<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'SupermallScroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },

  mounted() {
    ;(this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      probeType: this.probeType, //这个属性设置之后可以监听得到了
      mouseWheel: true,
      pullUpLoad: this.pullUpLoad,
    })),
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      }),
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
  },

  methods: {
    finishPullUp() {
      this.scroll.finishPullUp()
    },
  },
}
</script>

<style scoped>
</style>
