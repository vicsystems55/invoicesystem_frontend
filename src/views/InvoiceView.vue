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
                    <h6 class="px-2 btn" @click="viewCart()"> CART ({{ cartCount }}) </h6>

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
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>

                                    <th>Name</th>
                                  
                                    <th>Unit Price</th>
                                    <th>QTY</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr v-for="invoiceLine, key in invoiceData.invoice_items" :key="invoiceLine.id">
                                    <td>{{ key + 1 }}</td>
                                    <td>{{ invoiceLine.products.name }}<br>
                                        <i>{{ invoiceLine.products.description }}</i>
                                    
                                    </td>
                                    
                                    <td style="width: 120px;">N {{ format(invoiceLine.products.price) }}</td>
                                    <td>
                                        <div class="d-flex justify-content-around">
                                            <div class="c ">

                                                <button @click="updateInvoiceLine(invoiceLine.id, 'newQty'+invoiceLine.id, 'decrement')" class="btn btn-sm btn-primary rounded-circl border "
                                                    style="width: 40px;" :id="'btnQty'+invoiceLine.id">-</button>
                                            </div>
                                            <div class="" style="width: 50px;">

                                                <input type="text" :id="'newQty'+invoiceLine.id" class="form-control form-control-sm text-center"
                                                    :value="invoiceLine.qty">
                                            </div>
                                            <div class="c ">

                                                <button @click="updateInvoiceLine(invoiceLine.id, 'newQty'+invoiceLine.id, 'increment')" class="btn btn-sm btn-primary rounded-circl border "
                                                    style="width: 40px;">+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="width: 120px;">N {{ format(invoiceLine.total_amount) }}</td>
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

                                    <td>Total: </td>

                                    <th>N {{ format(invoiceData.total_amount) }}</th>
                                    <!-- <th></th> -->

                                </tr>

                            </thead>



                        </table>

                        <hr>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Fullname:</label>
                                <input type="text" class="form-control" placeholder="Fullname">
                            </div>
                            <div class="form-group">
                                <label for="">Phone number</label>
                                <input type="text" class="form-control" placeholder="Phone">
                            </div>
                            <div class="form-group">
                                <label for="">Address:</label>
                                <textarea name="" id="" cols="30" rows="5" class="form-control"
                                    placeholder="Address"></textarea>
                            </div>
                    

                            <paystack buttonClass="btn btn-success " buttonText="Proceed to payments"

                                :publicKey="publicKey" :email="email" :amount="amount" :reference="reference"
                                :onSuccess="onSuccessfulPayment" :onCanel="onCancelledPayment"></paystack>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script >
import { onUpdated } from 'vue'
import paystack from "vue3-paystack";
import { nanoid } from "nanoid"; //if using nanoid


export default {

    data() {
        return {
            invoiceData: '',
            cartCount: 0,
            qty: 1,
            value: 1,

        

            publicKey: 'pk_test_81d0ea622e4cb15731a72ac7025af87867e6495a',
            amount: 1000, //Expressed in lowest demonitation, so 1000kobo is equivalent to 10Naira
            email: 'somteacodes@gmail.com',
            firstname: 'Somtea', //optional field remember to pass as a prop of firstname if needed
            lastname: 'Codes' //optional field remember to pass as a prop of lastname if needed

        }
    },

    setup() {

        onUpdated(() => {

            console.log('qty')
        // this.invoiceData.invoice_items.forEach(element => {

        //     console.log(element)
            
        // });

      
        
    })
        
    },

    components: {
        paystack,
    },



    mounted() {
        this.getInvoiceDetails()
    },

    updated() {
        console.log(this.qty)
          this.invoiceData.invoice_items.forEach(element => {

            if (document.getElementById('newQty'+element.id).value == 1) {
                return document.getElementById('btnQty'+element.id).disabled = true
            }else{
                return document.getElementById('btnQty'+element.id).disabled = false
            }

            // console.log(document.getElementById('newQty'+element.id))
            
        });
    },

 

    computed: {
        reference: function () {
            // if using nanoid to generate randomRef
            // comment this out if not using nano id
            return nanoid(15);

            //   you can use plain JS to generate random ref ID, just uncomment this section if you
            /*
                let randomRef = "";
                let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
                for( let i=0; i < 15; i++ )
                  text += characters.charAt(Math.floor(Math.random() * characters.length));
        
                return randomRef;
        
                */
        },
    },

    methods: {

    

        format(value){
            var numeral = require('numeral');

            return numeral(value).format('0,0.00')
        },

        onSuccessfulPayment: function (response) {
            console.log(response);
        },
        onCancelledPayment: function () {
            console.log("Payment cancelled by user");
        },
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
                    this.amount = this.invoiceData.total_amount * 100


                    console.log(response)




                }).catch((error) => {

                    this.loading = false
                    console.log(error)
                })

            } else {

                this.$router.push('/products')







            }

        },
        viewCart() {
            this.$router.push('/invoice');
        },

        logout() {
            localStorage.removeItem('invoice_code')
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_role')

            return this.$router.push('/login');



        },

        updateInvoiceLine(id, qty, type){

          

            // if(this.newQty == 0){
            //     this.newQty = qty 

            // }

            // this.newQty += 1

            var newQty = parseInt(document.getElementById(qty).value)

            if (type == 'decrement') {

                newQty -= 1;
                
            }
            if(type == 'increment'){

                newQty += 1;

            }

           



            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/invoice-lines/'+id,
                method: 'put',
                headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                    },
                data: {
                    qty: newQty,
                    invoiceId: this.invoiceData.id
                }

            })
            .then((response)=>{
                console.log(response.data)

                this.invoiceData = response.data.invoiceData
                    this.amount = this.invoiceData.total_amount * 100


            })
            .catch((err)=>{
                console.log(err)

            })
        },

    },

 

 
}
</script>