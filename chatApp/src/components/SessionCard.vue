<template>
  
  <mu-container>
    <mu-card class="card">
      <mu-flex>
        <mu-card-header class="card-header" title="Myron Avatar" sub-title="sub title">
          <mu-avatar slot="avatar">
            <img src="http://placehold.it/50x50">
          </mu-avatar>
        </mu-card-header>
        <mu-button icon>
          <mu-icon value="delete"></mu-icon>
        </mu-button>
      </mu-flex>
      <mu-flex justify-content="center" wrap="wrap">
        <mu-text-field class="text-field" placeholder="title" icon="title"></mu-text-field>
        <mu-text-field class="text-field" placeholder="description" icon="description"></mu-text-field>
      </mu-flex>
      <mu-card-actions class="card-actions">
        <mu-flex justify-content="end">
          <mu-button icon color="primary"><mu-icon value="add_circle"></mu-icon></mu-button>
          <mu-button icon color="success"><mu-icon value="check_circle" ></mu-icon></mu-button>
        </mu-flex>
      </mu-card-actions>
    </mu-card>
  </mu-container>

</template>
<script>
  export default{
    name:'sessionCard',
    data(){
      return {

      }
    },

  }

</script>
<style scoped>
.card{
  width:100%; 
  max-width:300px; 
  margin:0 auto;
}
.card-header{
  padding:10px;
}
.flex{
  width:100%;
}
.text-field{
  height:32px;
  padding-bottom:0px;
  min-height:0;
}
.card-actions{
  padding:0;
}
</style>