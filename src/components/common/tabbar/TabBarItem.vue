<template>
  <div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActive" class="item-icon"><slot name="item-icon"></slot></div>
    <div v-else class="item-active-icon"><slot name="item-active-icon"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return{}
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)!==-1
        },
         activeStyle() {
				return this.isActive ? {'color': this.activeColor} : {}
      }
    },
    methods:{
        itemClick(){
          this.$router.push(this.path)
        }
    }
}
</script>

<style scoped>
 .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }
 .tab-bar-item .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }
</style>