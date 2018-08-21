<template>
  <div class="login">
    <mu-flex justify-content="center" align-items="center" class="flex-wrapper">
      
      <mu-form ref="form" :model="validateForm" class="form" label-position="top">
        <mu-form-item label="用户名" help-text="必填" prop="username" :rules="usernameRules">
          <mu-text-field v-model.trim="validateForm.username" prop="username" text-color="white"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" help-text="必填" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model.trim="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-flex justify-content="center">
          <mu-form-item>
            <mu-button small color="primary" @click="submit">登入</mu-button>
            <mu-button small @click="reset">重置</mu-button>
          </mu-form-item>
        </mu-flex>
      </mu-form>
        
    </mu-flex>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted(){
    // this.$store.dispatch('print').then(()=>console.log(1))
  },
  methods: {
    submit(){

      this.$refs.form.validate().then((result)=>{
        if(result){
          this.$fetch('api/user/UserLogin',this.validateForm)
          .then((res)=>{
            let {success,userInfo}=res;
            if(success){
              let {sessionToken,_id}=userInfo;
              this.$cookies
              .set('sessionToken',sessionToken,'1d')
              .set('_id',_id,'1d');
              this.$store.commit('recordUser',userInfo);
              localStorage.setItem(_id+'userInfo',JSON.stringify(userInfo));
              this.$store.dispatch('wsCloseAsync')
              .then(()=>{
                this.$store.dispatch('wsOpenAsync',{_id,sessionToken})
                .then(socket=>{
                  if (!socket) return ;
                  this.$store.dispatch('onSocket');
                  this.$store.dispatch('fetchPrivateChatMsg');
                  this.$store.dispatch('fetchBroadcastMsg');
                  this.$store.dispatch('fetchGroupChatMsg');
                  this.$store.dispatch('fetchUserList');
                  this.$router.push('/');
                })
              })
            }else{
              this.$toast.message({
                message:res.msg,
                position:'top'
              });
            }
          })
          .catch(()=>{
            this.$toast.message({
              message:'服务器响应失败',
              position:'top'
            });

          })
        }
      })


    },
    reset(){
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    width:100vw;
    height:100vh;
    background-image:url(../assets/img/login1.jpg);
    background-size:cover;
  }
  .flex-wrapper{
    width:100%;
    height:100%;
  }
  .form{
    flex-basis:80%;
    color:white;
  }
</style>

