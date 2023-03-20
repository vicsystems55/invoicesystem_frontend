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

        <div class="container pt-5 mt-5">


            <div class="row">

                <div class="col-md-4">

                    <h6 class="display-4" style="font-size: 200%;">Add Product</h6>

                    <div class="form-group">
                        <label>Name</label>
                        <input class="form-control" v-model="name" placeholder="Enter name of product">

                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input class="form-control" v-model="description" placeholder="Describe the product">

                    </div>

                    <div class="form-group">
                        <label>Product Category</label>
                        <select v-model="category" class="form-control">

                            <option v-for="productCategory in productCategories" :key="productCategory.index"
                                :value="productCategory.id">{{ productCategory.category_name }}</option>


                        </select>

                    </div>

                    <div class="form-group">
                        <label>price</label>
                        <input v-model="price" class="form-control" type="number">

                    </div>

                    <div class="form-group">
                        <label>status</label>
                        <select v-model="status" class="form-control" id="">
                            <option :value="'active'">Publish</option>
                            <option :value="'draft'">Draft</option>

                        </select>

                    </div>

                    <div class="form-group ">


                        <img onclick="document.getElementById('customFile').click()" id="previewImg"
                            style="height: 200px; width: 100%; object-fit: cover; " class="shadow"
                            :src="'https://www.lifewire.com/thmb/8MhWKwi4GEGiYRT6P56TBvyrkYA=/1326x1326/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg'">

                    </div>
                    <div class="text-center d-none">
                        <input @change="previewFile4" ref="file" type="file" id="customFile">

                    </div>



                    <div class="form-group text-center py-2">
                        <button @click="createProduct()" class="btn btn-block btn-primary ">{{creatingProduct?'Creating...':'Submit'}}</button>
                    </div>
                </div>


                <div class="col-md-8">
                    <h6 class="py-3">Products</h6>
                    <div v-for="product in products" :key="product.idex" class="card p-1 mb-2 shadow">

                        <div class="row d-flex align-items-center">
                            <div class="col-2" style="width: 80px;">
                                <img :src="product.img_url" style="height: 45px; width: 45px; object-fit: cover;" alt="">
                            </div>
                            <div class="col-10">
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="">
                                            {{ product.name }}
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div style="font-size: 98%;" class="font-weight-bold">
                                            N {{ format(product.price) }}
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" :id="'switch'+product.id">
                                            <label class="custom-control-label" :for="'switch'+product.id">live</label>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>



                    </div>


                </div>

            </div>

        </div>


    </div>
</template>
<script>
// @ is an alias to /src
export default {
    name: 'HomeView',


    data() {
        return {
            products: [],
            productCategories: [],
            cartCount: 0,
            productImage: '',
            name: '',
            description: '',
            img_url: '',
            price: '',
            creatingProduct: false,

        }
    },
    mounted() {

        this.getProducts()
        this.getProductCategories()


    },
    methods: {
        getProducts() {

            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/products',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                }
            })
                .then((response) => {
                    console.log(response)
                    this.products = response.data
                })
                .catch((response) => {
                    console.log(response)
                })




        },

        getProductCategories() {

            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/product-category',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                }
            })
                .then((response) => {
                    console.log(response)
                    this.productCategories = response.data
                })
                .catch((response) => {
                    console.log(response)
                })


        },



        previewFile4(event) {


            console.log(event.target.files[0])

            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);
                var preview = document.getElementById("previewImg");
                preview.src = src;
                // preview.style.display = "block";
            }

            this.productImage = event.target.files[0];

        },

        createProduct() {
            this.creatingProduct = true
            let formData = new FormData();

            formData.append('product_image', this.productImage);

            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('img_url', this.img_url);
            formData.append('price', this.price);
            formData.append('user_id', JSON.parse(localStorage.getItem('user_data')).id);



            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/products',
                method: 'post',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {

                this.$notify("Product Added!");

                this.creatingProduct = false

                    console.log(response)
                })
                .catch((response) => {

                this.creatingProduct = false


                    console.log(response)
                })


        },


        logout() {
            // localStorage.removeItem('invoice_code')
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_role')

            return this.$router.push('/login');



        },

        format(value) {
            var numeral = require('numeral');

            return numeral(value).format('0,0.00')
        },
    },
}
</script>
