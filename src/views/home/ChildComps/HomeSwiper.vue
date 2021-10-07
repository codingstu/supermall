<template>
  <div class="HomeSwiper">
       <swiper>
        <swiperItem v-for="item in banner" :key="item.id">
          <a :href="item.link">
             <img :src="item.image" alt="">
          </a>
        </swiperItem>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'HomeSwiper',
    props:{
        banner:{
            type:Array,
            default(){
                return {}
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style>

</style>