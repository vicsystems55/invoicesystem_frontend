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
        <div class="form-inline my-2 my-lg-0">

          <button class="btn btn-outline-secondary my-2 my-sm-0" @click="logout()">LOGOUT</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <img alt="Vue logo" style="height: 50px;" src="../assets/logo.png">
      <HelloWorld msg="Vicsystems Invoice Application" />

      <h6 class="py-3">Market Place</h6>

      <hr>
      <div v-if="products.length != 0" class="row">
            
            <div v-for="product in products" :key="product.id" class="col-lg-3 col-md-4  mx-auto">
                <div class="card m-3 shadow" style="min-width: 16rem; height: 350px;">
                    <img :src="product.img_url" style="height: 230px; object-fit: cover; object-position: top center; " class="card-img-top" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">{{ product.name }}</h6>
                       
                    </div>
                    <div class="card-footer">
                        
                        <button @click="addProduct(product.id)" class="btn btn-primary btn-sm">+ Add Product</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="co py-5">
            <h6 class="text-center py-5">Loading market place...</h6>

        </div>

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
  },

  data() {
    return {
    products: [],
      
    }
  },
  mounted(){
    this.getProducts()
  },
  methods: {

        getProducts() {

            this.loading = true


            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/products',
                method: 'get',
               
            }).then((response) => {
                this.products = response.data

                console.log(response)

                this.getInvoiceDetails()
           
            }).catch((error) => {

                this.loading = false
                console.log(error)
            })

        },
    logout(){
            localStorage.removeItem('invoice_code')
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_role')

            return this.$router.push('/login');



        },

        addProduct(){
          this.$router.push('/login');
        }
  },
}
</script>
