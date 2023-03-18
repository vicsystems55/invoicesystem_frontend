<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Ednascorer Store</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto ">

        <li class="nav-item">
            <router-link class="nav-link" :to="'/products'">Shop</router-link>
          </li>
 
      
    </ul>
    <span class="navbar-text">
        <h6 class="px-2 btn" @click="viewCart()"> <i class="fa-solid fa-cart-shopping"></i> ({{cartCount}}) </h6>
     
    </span>
    <form class="form-inline my-2 my-lg-0">

      <button class="btn btn-outline-secondary my-2 my-sm-0" @click="logout()">LOGOUT</button>
    </form>
  </div>
</nav>

<div class="p-5"></div>

<div class="container pt-3">
    <div class="frr">
            <h6>Welcome, {{ userData.name }}</h6>
        </div>
</div>


    <div class="container mt-3">
      
        <div v-if="products.length != 0" class="row">
            
            <div v-for="product in products" :key="product.id" class="col-lg-3 col-md-4 col-sm-6  mx-auto">
                <div class="card m-3 shadow" style="min-width: 16rem; height: 370px;">
                    <img :src="product.img_url" style="height: 230px; object-fit: cover; object-position: top center; " class="card-img-top" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">{{ product.name }}</h6>
                        <p class="card-title text-success"><b>N {{format( product.price) }}</b></p>

                       
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



</template>

<script>
export default {
    data() {
        return {
            products: [],
            cartCount: 0,
            invoiceData: '',
            userData: []
        }
    },

    mounted() {
        this.getProducts()
        this.getUserData()
    },

    methods: {

        getUserData() {
            this.userData = JSON.parse(localStorage.getItem('user_data'));
        

        },
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

        getInvoiceDetails(){
     

            if(localStorage.getItem('invoice_code')){
                console.log('ye invoice')
                this.axios({
                    url: process.env.VUE_APP_URL + '/api/v1/invoices/' + localStorage.getItem('invoice_code'),
                    method: 'get',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                    },
                    data: {
                        invoice_code: localStorage.getItem('invoice_code')
                    }

                }).then((response) => {

                    this.invoiceData = response.data
                    this.cartCount = this.invoiceData.invoice_items.length


                    console.log(response)




                }).catch((error) => {

                    this.loading = false
                    console.log(error)
                })

            }else{

                localStorage.setItem('invoice_code', Date.now())

                this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/invoices',
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
                data:{
                    invoice_code: localStorage.getItem('invoice_code')
                }
               
            }).then((response) => {
              

                console.log(response)

                
           
            }).catch((error) => {

                this.loading = false
                console.log(error)
            })



              

            }

        },

        addProduct(product_id){


            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/invoice-lines',
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
                data:{
                    invoice_code: localStorage.getItem('invoice_code'),
                    product_id : product_id
                }
               
            }).then((response) => {
              alert('Product Added to cart!!')

              this.getInvoiceDetails()

                console.log(response)
           
            }).catch((error) => {

                this.loading = false
                console.log(error)
            })



        },

        viewCart(){
            this.$router.push('/invoice');
        },

        logout(){
            // localStorage.removeItem('invoice_code')
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_role')

            return this.$router.push('/login');



        },
        format(value){
            var numeral = require('numeral');

            return numeral(value).format('0,0.00')
        },

    },


}
</script>