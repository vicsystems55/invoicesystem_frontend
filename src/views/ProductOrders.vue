<template>
    <div>
        <nav-bar></nav-bar>

        <div class="container-fluid mt-5 col-xl-10 col-lg-12 table-responsive">

            <h2>My Orders</h2>

            <div class="py-3">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card m-1">
                            <div class="card-body">
                                <h6 class="text-muted">Total Customers</h6>
                                <p>{{customersCount}}</p>
                            <span class="text-muted">{{ timeStamp }}</span>

                            </div>
                        </div>

                    </div>
                    <div class="col-md-4">
                        <div class="card m-1">
                            <div class="card-body">
                                <h6 class="text-muted">Total Orders</h6>
                                <p>{{invoicesCount}}</p>
                            <span class="text-muted">{{ timeStamp }}</span>

                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-4">
                        <div class="card m-1">
                            <div class="card-body">
                                <h6 class="text-muted">Total Sales</h6>
                                <p>N {{ format(totalSalesAmount) }}</p>
                            <span class="text-muted">{{ timeStamp }}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <dv class="card p-2 mb-3 shadow-sm font-weight-bold">
                <div class="row">
                    <div class="col-2 d-none d-md-block">

                        Tracking Id

                    </div>
                    <div class="col-2 d-none d-sm-block">
                        Customer
                    </div>
                    <div class="col-5 col-lg-4 d-none d-sm-block">

                        Shipping Details
                        
                    </div>
                    <div class="col-12 d-block d-sm-none">
                        Details
                    </div>
                    <div class="col-2 d-none d-md-block">
                        Total Amount
                    </div>

                    <div class="col-1 d-none d-lg-block">

                        Status
                        
                    </div>
                </div>
            </dv>

            <div v-for="productOrder in productOrders" :key="productOrder.id" class="card p-2 mb-2 shadow-sm">
                <div class="row">
                    <div class="col-2 d-none d-md-block">

                        {{ productOrder.invoice.invoice_code }}

                    </div>
                    <div class="col-2 d-none d-sm-block">
                       {{productOrder.users.name}}
                    </div>
                    <div class="col-5 col-lg-4 d-none d-sm-block">

                        {{ productOrder.shipping_address }}
                        <div class="d-block d-lg-none ">

                            <span class="badge badge-success">delivered</span>
                        </div>



                        
                    </div>
                    <div class="col-12 d-block d-sm-none">

                        <span class="text-muted">{{ productOrder.invoice.invoice_code }}</span> <br>
                       <span class="font-weight-bold">{{productOrder.users.name}}</span> <br>
                        {{ productOrder.shipping_address }} <br>
                       N {{format(productOrder.invoice.total_amount)}}<br>


                        <span class="badge badge-success">delivered</span>

        



                    </div>
                    <div class="col-2  d-none d-md-block">
                        N {{format(productOrder.invoice.total_amount)}}
                    </div>
                    <div class="col-1   d-none d-lg-block">
                        <span class="badge badge-success">delivered</span>
                        
                    </div>
                </div>
            </div>
            
        </div>


        
    </div>
</template>
<script>
import NavBar from '@/components/NavBar'
export default {

    data() {
        return {
            productOrders: [],
            customersCount: 0,
            invoicesCount: 0,
            totalSalesAmount: 0,
            timeStamp: ''
        }
    },

    components: {
        NavBar
    },

    

    methods: {
        getProductOrders(){
            this.axios({
                url: process.env.VUE_APP_URL +'/api/v1/product-order',
                method: 'get',
                headers:{
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                }

            })
            .then((response)=>{
                console.log(response)

                this.productOrders = response.data.product_orders
                this.customersCount = response.data.total_customers
                this.invoicesCount = response.data.invoices
                this.totalSalesAmount = response.data.total_sales_amount
                this.timeStamp = response.data.timestamp



            })
            .catch((response)=>{
                console.log(response)
            })
        },
        format(value) {
      var numeral = require('numeral');

      return numeral(value).format('0,0.00')
    },
    },

    mounted() {
        this.getProductOrders()
    },
    
}
</script>