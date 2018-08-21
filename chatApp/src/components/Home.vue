<template>
  <div class="home">
    <mu-appbar color="primary">
      <mu-button icon slot="left" small @click="openDrawer">
        <mu-icon value="menu" size="22"></mu-icon>
      </mu-button>
      <mu-avatar size="30" slot="left">
        <img src="http://placehold.it/36x36">
      </mu-avatar>
      <mu-menu slot="right">
        <mu-button flat small>MENU</mu-button>
        <mu-list slot="content" class="list" dense>
          <mu-list-item button class="list-item">
            <mu-icon value="add" size="22"></mu-icon>
            <mu-list-item-content>
              <mu-list-item-title>新建会话</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button class="list-item">
            <mu-icon value="delete" size="22"></mu-icon>
            <mu-list-item-content>
              <mu-list-item-title>删除会话</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    
    <!-- 抽屉 -->
    <Drawer ref="drawer" />


    <!-- <session-card></session-card> -->
    <router-view class="router-view mu-paper-background" />

    <!-- 底部导航 -->
    <mu-bottom-nav :append="false" shift class="bottom-nav mu-primary-color" :value.sync="navItem">
      <mu-bottom-nav-item tag='div' to="/home/messages" value="messages" title="消息" icon="ondemand_video"></mu-bottom-nav-item>
      <mu-bottom-nav-item tag='div' to="/home/friends" value="friends" title="好友" icon="music_note"></mu-bottom-nav-item>
      <mu-bottom-nav-item tag='div' to="/home/groups" value="groups" title="群组" icon="books"></mu-bottom-nav-item>
    </mu-bottom-nav>

  </div>  

</template>

<script>
import Drawer from './Drawer.vue'
import SessionCard from './SessionCard.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home',
      isOpened:false,
      item:'1',
      navItem:'messages'
    }
  },
  components:{
    Drawer:Drawer,
    SessionCard:SessionCard
  },
  mounted(){
    
  },
  methods:{
    openDrawer(){
      this.$refs.drawer.toggleDrawer()
    }
  },
  computed:{
    username(){
      return this.$store.state.user
    }
  },
  watch:{
    navItem(n){
      console.log(n)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  height:100vh;
  width:100vw;
  overflow:hidden;
}
.bottom-nav{
  position:relative;
  width:100%;
  bottom:0;
  left:0;
}
.router-view{
  height:calc(100% - 106px);
  overflow-y:scroll; 
}
</style>


