<template>
  
  <mu-drawer :open.sync="open" width="65%" :docked="false" class="drawer">
    <mu-appbar color="primary" class="appbar">
      <mu-avatar size="30" slot="left">
        <img src="http://placehold.it/36x36">
      </mu-avatar>
      姓名
      <mu-button icon slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>

    <mu-list toggle-nested :nested-indent="false" >
      <!-- 主页 -->
      <mu-list-item button to="/home" @click="open = false" >
        <mu-list-item-action class="list-item-action" >
          <mu-icon value="home"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title class="list-item-title" >主页</mu-list-item-title>
      </mu-list-item>

      <!-- 动态 -->
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="person"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>动态</mu-list-item-title>
      </mu-list-item>
      
      <!-- 当前会话 -->
      <mu-list-item button nested @toggle-nested="listItem=arguments[0]?'current':''" :open="listItem==='current'">
        <mu-list-item-action>
          <mu-icon value="chat"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>当前会话</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>
        <!-- 个人 -->
        <mu-sub-header slot="nested">个人</mu-sub-header>
        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Mike Li</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Maco Mai</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <!-- 群体 -->
        <mu-sub-header slot="nested">群体</mu-sub-header>
        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Alex Qin</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Allen Qun</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Myron Liu</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list-item>
      
      <!-- 历史会话 -->
      <mu-list-item button nested @toggle-nested="listItem=arguments[0]?'history':''" :open="listItem==='history'">

        <mu-list-item-action>
          <mu-icon value="history"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>历史会话</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>

        <!-- 个人 -->
        <mu-sub-header slot="nested">个人</mu-sub-header>
        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Gaia Zhou</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button :ripple="false" slot="nested">
          <mu-list-item-action>
            <mu-avatar size="35">
              <img src="http://placehold.it/30x30">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Miller Wang</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list-item>
      
      <!-- 聊天好友 -->
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="person"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>聊天好友</mu-list-item-title>
      </mu-list-item>

    </mu-list>

    <mu-bottom-nav class="bottom-nav" :value.sync="navItem">
      <mu-bottom-nav-item class="bottom-nav-item" tag="div" to="/login" value="movies" title="设置" icon="ondemand_video"></mu-bottom-nav-item>
      <mu-bottom-nav-item class="bottom-nav-item" tag="div" to="/login" value="music" title="主题" icon="music_note"></mu-bottom-nav-item>
      <mu-bottom-nav-item class="bottom-nav-item" tag="div" to="/login" value="books" title="夜间" icon="books"></mu-bottom-nav-item>
    </mu-bottom-nav>

  </mu-drawer>

</template>

<script>
  export default{
    name:'drawer',
    data(){
      return {
        open:false,
        navItem:'',
        listItem:''
      }
    },
    methods:{
      toggleDrawer(){
        this.open=true
      },
      toggleListItem(value){
        console.log(value)
      },
      toggleNavItem(value){
        console.log(value)
      }
    },
    watch:{
      navItem(n){
        console.log(n)
      },
      listItem(n){
        console.log(n)
      }
    }
  }

</script>
<style scoped>
.appbar{
  height:50px;
}
.bottom-nav{
  position:absolute;
  width:100%;
  bottom:0;
  left:0;
}
.bottom-nav-item{
  font-size:12px;
}
</style>
