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
                        <input class="form-control" placeholder="Enter name of product">

                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input class="form-control" placeholder="Describe the product">

                    </div>

                    <div class="form-group">
                        <label>Product Category</label>
                        <select class="form-control">
                            <option>Textile</option>
                            <option>Footwears</option>

                        </select>

                    </div>

                    <div class="form-group">
                        <label>price</label>
                        <input class="form-control" type="number">

                    </div>

                    <div class="form-group">
                        <label>status</label>
                        <input class="form-control">

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
                        <button @click="uploadAvatar()" class="btn btn-block btn-primary ">Submit</button>
                    </div>
                </div>

            
            <div class="col-md-8">
                <h6 class="py-3">Products</h6>
                <div class="card card-body mb-2 shadow">



                </div>

                <div class="card card-body mb-2 shadow">



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
            cartCount: 0,

        }
    },
    mounted() {

    },
    methods: {
        getInvoiceDetails() {




        },

        previewFile4(event) {


            console.log(event)

            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);
                var preview = document.getElementById("previewImg");
                preview.src = src;
                // preview.style.display = "block";
            }

            this.file = this.$refs.file.files[0];

        },

        uploadAvatar() {
            let formData = new FormData();

            formData.append('avatar', this.file);
            formData.append('type', 'avatar');

            this.axios({
                url: process.env.VUE_APP_URL + '/api/profiles',
                method: 'post',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {

                    // toast.success('Profile picture Updated');

                    console.log(response)
                })
                .catch((response) => {

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
