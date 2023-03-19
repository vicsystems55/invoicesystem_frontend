<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
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
                    <h6 class="px-2 btn" @click="viewCart()"> CART ({{ cartCount }}) </h6>

                </span>
                <form class="form-inline my-2 my-lg-0">

                    <button class="btn btn-outline-secondary my-2 my-sm-0" @click="logout()">LOGOUT</button>
                </form>
            </div>
        </nav>
        <div class="p-3"></div>
        <div class="container-fluid mt-5">
            <div class="card">
                <div class="card-bod">
                    <div class="container-fluid">
                        <img alt="Vue logo" style="height: 50px;" class="text-center" src="../assets/logo.png">

                        <h3 class="py-2">Ednascorner Store</h3>
                        <h6 class="font-italic text-muted">powered by vicSystems Technologies Ltd.</h6>
                    </div>


                    <div class=" container-fluid mt-5 table-responsive">

                        <div class="c d-none d-md-block">

                            <table class=" table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
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
                                        <td>
                                            <span @click="removeItem(invoiceLine.id, invoiceData.id)"
                                                class="btn text-danger"> <i class="fa-solid fa-xmark"></i>
                                            </span>
                                        </td>
                                        <td>{{ key + 1 }}</td>
                                        <td>{{ invoiceLine.products.name }}<br>
                                            <i>{{ invoiceLine.products.description }}</i>

                                        </td>

                                        <td style="width: 120px;">N {{ format(invoiceLine.products.price) }}</td>
                                        <td>
                                            <div class="d-flex justify-content-around">
                                            <div class="c ">

                                                <button
                                                    @click="updateInvoiceLine(invoiceLine.id, 'newQty' + invoiceLine.id, 'decrement')"
                                                    class="btn btn-sm btn-primary rounded-circl border "
                                                    style="width: 40px;" :id="'btnQty' + invoiceLine.id">-</button>
                                            </div>
                                            <div class="" style="width: 50px;">

                                                <input type="text" :id="'newQty' + invoiceLine.id"
                                                    class="form-control form-control-sm text-center"
                                                    :value="invoiceLine.qty">
                                            </div>
                                            <div class="c ">

                                                <button
                                                    @click="updateInvoiceLine(invoiceLine.id, 'newQty' + invoiceLine.id, 'increment')"
                                                    class="btn btn-sm btn-primary rounded-circl border "
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



                                        <td></td>

                                        <td>Total: </td>

                                        <th>N {{ format(invoiceData.total_amount) }}</th>
                                        <!-- <th></th> -->

                                    </tr>

                                </thead>



                            </table>
                        </div>

                        <div v-for="invoiceLine in invoiceData.invoice_items" :key="invoiceLine.id"
                            class="card mb-2 shadow d-block d-md-none">
                            <div style="font-size: 85%;" class="card-bod p-2">
                                <div class="row">
                                    <div class="col-2">
                                        <span @click="removeItem(invoiceLine.id, invoiceData.id)" class="btn text-danger ">
                                            <i class="fa-solid fa-xmark"></i>
                                        </span>
                                    </div>
                                    <div class="col-5">
                                        <span class="font-weight-bold">{{ invoiceLine.products.name }}</span>
                                        <br>
                                        <i>{{ invoiceLine.products.description }}</i>
                                    </div>
                                    <div class="col-5">
                                        <div class="d-flex justify-content-around">
                                            <div class="c ">

                                                <button
                                                    @click="updateInvoiceLine(invoiceLine.id, 'newQty' + invoiceLine.id, 'decrement')"
                                                    class="btn btn-sm btn-primary rounded-circl border "
                                                    style="width: 30px;" :id="'btn2Qty' + invoiceLine.id">-</button>
                                            </div>
                                            <div class="" style="width: 60px;">

                                                <input style="font-size: 97%;" type="text" :id="'newQty' + invoiceLine.id"
                                                    class="form-control form-control-sm text-center"
                                                    :value="invoiceLine.qty">
                                            </div>
                                            <div class="c ">



                                                <button
                                                    @click="updateInvoiceLine(invoiceLine.id, 'newQty' + invoiceLine.id, 'increment')"
                                                    class="btn btn-sm btn-primary rounded-circl border "
                                                    style="width: 30px;">+</button>
                                            </div>
                                        </div>
                                        <h6 style="font-size: 98%;" class="mt-2 float-right"> N {{ format(invoiceLine.total_amount) }}</h6>

                                    </div>
                                </div>



                            </div>
                        </div>


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
                                <textarea v-model="address" id="" cols="30" rows="5" class="form-control"
                                    placeholder="Address"></textarea>
                            </div>


                            <paystack buttonClass="btn btn-success " buttonText="Proceed to payments" :publicKey="publicKey"
                              
                                :subaccount="'ACCT_en7dk3obxr7mi0y'"
                                :email="'collins@mail.com'" 
                            
                              
                                :amount="amount" 
                                :reference="reference" 
                                :onSuccess="onSuccessfulPayment"
                                :onCanel="onCancelledPayment"
                                ></paystack>
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
            address: '',
            split_code: 'SPL_UZcYSzM76j',
            metadata: {},

            userData: [],

            publicKey: 'pk_test_81d0ea622e4cb15731a72ac7025af87867e6495a',
            amount: 1000, //Expressed in lowest demonitation, so 1000kobo is equivalent to 10Naira
            email: '',
            firstname: '', //optional field remember to pass as a prop of firstname if needed
            lastname: '' //optional field remember to pass as a prop of lastname if needed

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
        this.getUserData()
       
    },



    updated() {
        console.log(this.qty)
        this.invoiceData.invoice_items.forEach(element => {

            if (document.getElementById('newQty' + element.id).value == 1) {
                document.getElementById('btnQty' + element.id).disabled = true
            } else {
                document.getElementById('btnQty' + element.id).disabled = false
            }

            if (document.getElementById('newQty' + element.id).value == 1) {
                document.getElementById('btn2Qty' + element.id).disabled = true
            } else {
                document.getElementById('btn2Qty' + element.id).disabled = false
            }

            this.userData = JSON.parse(localStorage.getItem('user_data'));

            this.firstname = this.userData.name.split(" ")[0];
            this.email = this.userData.email

          


            console.log(this.firstname)


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

        getUserData() {
           
            // this.userData = JSON.parse(localStorage.getItem('user_data'));

 
            // this.firstname= this.userData.name
            // this.email= this.userData

 
        },



        format(value) {
            var numeral = require('numeral');

            return numeral(value).format('0,0.00')
        },

        onSuccessfulPayment: function (response) {
            console.log(response);

            this.axios({
                url: process.env.VUE_APP_URL +'/api/v1/product-order',
                method: 'post',
                data:{
                    reference: response.reference,
                    invoiceCode: localStorage.getItem('invoice_code'),
                    trxref: response.reference,
                    address: this.address
                },
                headers:{
                    'Authorization': 'Bearer '+localStorage.getItem('user_token'),
                }
            })
            .then((response)=>{

                console.log(response)

            })
            .catch((response)=>{

                console.log(response)

            })

            localStorage.removeItem('invoice_code')


            return this.$router.push('/payment-successful');
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
            // localStorage.removeItem('invoice_code')
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_role')

            return this.$router.push('/login');



        },

        getJustInvoice() {

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
        },

        removeItem(invoiceItemId, invoiceId) {

            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/invoice-lines/' + invoiceItemId,
                method: 'delete',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                },
                data: {
                    invoiceId: invoiceId
                },
            })
                .then((response) => {
                    console.log(response)

                    return this.getJustInvoice()


                })
                .catch((response) => {
                    console.log(response)
                })

        },

        updateInvoiceLine(id, qty, type) {



            // if(this.newQty == 0){
            //     this.newQty = qty 

            // }

            // this.newQty += 1

            var newQty = parseInt(document.getElementById(qty).value)

            if (type == 'decrement') {

                newQty -= 1;

            }
            if (type == 'increment') {

                newQty += 1;

            }





            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/invoice-lines/' + id,
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
                .then((response) => {
                    console.log(response.data)

                    this.invoiceData = response.data.invoiceData
                    this.amount = this.invoiceData.total_amount * 100


                })
                .catch((err) => {
                    console.log(err)

                })
        },

    },




}
</script>