<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Invoice System</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ">

          <li class="nav-item">
            <router-link class="nav-link" :to="'/products'">Products</router-link>
          </li>


        </ul>
        <span class="navbar-text">
          <h6 class="px-2"> CART (0) </h6>

        </span>
        <form class="form-inline my-2 my-lg-0">

          <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">LOGOUT</button>
        </form>
      </div>
    </nav>
    <div class="container">
      <img alt="Vue logo" style="height: 50px;" src="../assets/logo.png">
      <HelloWorld msg="Vicsystems Invoice Application" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
