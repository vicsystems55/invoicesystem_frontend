<template>
    <div>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Ednascorner Store</a>
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
                    <h6 class="px-2 btn" @click="viewCart()"> <i class="fa-solid fa-cart-shopping"></i> ({{ cartCount }})
                    </h6>

                </span>
                <div class="form-inline my-2 my-lg-0">

                    <button class="btn btn-outline-secondary my-2 my-sm-0" @click="logout()">LOGOUT</button>
                </div>
            </div>
        </nav>

    </div>
</template>
<script>
export default {
    name: 'NavBar',
    data() {
        return {
            cartCount: 0,
        }
    },

    methods: {

        getInvoiceDetails() {

            


            if (localStorage.getItem('invoice_code')) {
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

                    console.log(response)
                    this.cartCount = response.data.invoice_items.length


                    console.log(response)




                }).catch((error) => {

        
                    console.log(error)

                })

            } else {

                localStorage.setItem('invoice_code', Date.now())

                this.axios({
                    url: process.env.VUE_APP_URL + '/api/v1/invoices',
                    method: 'post',
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


                    console.log(response)



                }).catch((error) => {

                    this.loading = false
                    console.log(error)
                })





            }

        },

    },

    mounted() {
        this.getInvoiceDetails()
    },
}
</script>