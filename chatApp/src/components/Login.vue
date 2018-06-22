<template>
  <div class="login">
    <mu-flex justify-content="center" align-items="center" class="flex-wrapper">
      
      <mu-form ref="form" :model="validateForm" class="form" label-position="top">
        <mu-form-item label="用户名" help-text="必填" prop="username" :rules="usernameRules">
          <mu-text-field v-model.trim="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" help-text="必填" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model.trim="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-flex justify-content="center">
          <mu-form-item>
            <mu-button small color="primary" @click="submit">确定</mu-button>
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
  methods: {
    submit () {

      _fetch('http://localhost:3000/users/UserLogin',this.validateForm)
      if(this.$refs.form.validate()){

      }
    },
    reset () {
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
  }
</style>

