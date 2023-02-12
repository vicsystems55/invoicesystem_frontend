<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Invoice System</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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


<div class="container pt-3">
    <div class="frr">
            <h6>Welcome, </h6>
        </div>
</div>


    <div class="container mt-3">
      
        <div v-if="products.length != 0" class="row">
            
            <div v-for="product in products" :key="product.id" class="col-lg-4 col-md-3 mx-auto">
                <div class="card m-3 shadow" style="width: 16rem; height: 350px;">
                    <img :src="product.img_url" style="height: 230px; object-fit: cover; object-position: top center; " class="card-img-top" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">{{ product.name }}</h6>
                       
                    </div>
                    <div class="card-footer">
                        
                        <button href="#" class="btn btn-primary btn-sm">+ Add Product</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="co py-5">
            <h6 class="text-center py-5">No products in store...</h6>

        </div>
    </div>



</template>

<script>
export default {
    data() {
        return {
            products: []
        }
    },

    mounted() {
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
           
            }).catch((error) => {

                this.loading = false
                console.log(error)
            })

        }
    },


}
</script>