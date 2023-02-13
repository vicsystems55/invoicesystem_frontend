<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
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
                    <h6 class="px-2 btn" @click="viewCart()"> CART ({{cartCount}}) </h6>

                </span>
                <form class="form-inline my-2 my-lg-0">

                    <button class="btn btn-outline-secondary my-2 my-sm-0" @click="logout()">LOGOUT</button>
                </form>
            </div>
        </nav>
        <div class="p-3"></div>
      <div class="container mt-5">
        <div class="card">
        <div class="card-body">
            <div class="container-fluid">
            <img alt="Vue logo" style="height: 50px;" class="text-center" src="../assets/logo.png">

            <h3 class="py-5">Vicsystems Technologies Ltd.</h3>
        </div>

        <div class="container-fluid mt-5 table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>

                        <th>Name</th>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th>QTY</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="invoiceLine, key in invoiceData.invoice_items" :key="invoiceLine.id">
                        <td>{{ key + 1 }}</td>
                        <td>{{ invoiceLine.products.name }}</td>
                        <td>{{ invoiceLine.products.description }}</td>
                        <td>NGN {{ invoiceLine.products.price }}</td>
                        <td>
                            <input type="number" class="form-control form-control-sm" :value="invoiceLine.qty">
                        </td>
                        <td>NGN {{ invoiceLine.total_amount }}</td>
                        <!-- <td>
                            <button class="btn btn-primary btn-sm">update</button>
                        </td> -->
                    </tr>
                </tbody>

                <thead>

                    <tr>
                        <td></td>
                        <td></td>

                        <td></td>

                        <td></td>

                        <td>Total: </td>

                        <th>NGN {{ invoiceData.total_amount }}</th>
                        <!-- <th></th> -->

                    </tr>

                </thead>
                    
                    
               
            </table>
        </div>
        </div>
       </div>
      </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            invoiceData: '',
            cartCount: 0
        }
    },
    mounted() {
        this.getInvoiceDetails()
    },

    methods: {
        getInvoiceDetails() {


            if (localStorage.getItem('invoice_code')) {

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

            } else {

                this.$router.push('/products')







            }

        },
        viewCart(){
            this.$router.push('/invoice');
        },

        logout(){
            localStorage.removeItem('invoice_code')
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_role')

            return this.$route.push('/login');



        }
    },
}
</script>