<template>
  <div class="hello">
    <h6 class="mt-2">Latest members <router-link :to="'/register'">Join today!!</router-link></h6>
    <hr>
<marquee behavior="" direction="">

  <div class="d-flex justify-content-start">
  

      <div v-for="user in users" :key="user.id"  class="">
        
        <div style="width: 320px;"  class="card card-body shadow m-2">
          <h6>
    
            {{user.name}}</h6>
          <p>
            {{ user.created_at }}
  
  
          </p>
        </div>
      </div>

  </div>
</marquee>
 


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      users: []
    }
  },
  props: {
    msg: String
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.axios({
        url: process.env.VUE_APP_URL + '/api/v1/users',
        method: 'get',

      }).then((response) => {
        this.users = response.data

        console.log(response)

      }).catch((error) => {

        this.loading = false
        console.log(error)
      })

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

