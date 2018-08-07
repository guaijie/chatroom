<template>
  <ul class="list" @click="toggleItem">
    <li class="list-item" :class="item==1?'itemClass':''" >1</li>
    <li class="list-item" :class="item==2?'itemClass':''" >2</li>
    <li class="list-item" :class="item==3?'itemClass':''" >3</li>
    <li class="list-item" :class="item==4?'itemClass':''" >4</li>
    <li class="list-item" :class="item==5?'itemClass':''" >5</li>
  </ul>

</template>
<script>
  export default{
    name:'test',
    data(){
      return {
      }
    },
    props:{
      item:String,
      default:'111'
    },
    model:{
      prop:'item',
      event:'click'
    },
    methods:{
      toggleItem($e){
        if($e.target.tagName==='LI'){
          console.log($e.target.tagName)
          this.$emit('click',$e.target.innerHTML)
        }
        
      }
    }
  }
</script>

<style>
  
  .itemClass{
    color:red;
  }
</style>