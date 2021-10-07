<template>
  <div id="category">
      <!-- <navbar class="category-left"><div slot="left">购物街</div></navbar> -->
       <!-- <navbar class="category-nav"><div slot="center">购物街</div></navbar> -->
      <navbar><div slot="left"> 返回 </div></navbar>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
export default {
    name:'category',
    components:{
        navbar
    }
}
</script>

<style>
  .category-left{
      background-color: #fff;
  }
</style>