<template>

    <div class="col-md-4 mx-auto mt-5">
        <img alt="Vue logo" style="height: 50px;" class="text-center" src="../assets/logo.png">
        <h3 class="text-center py-5">Register</h3>
        <div class="card">
            <div class="card-body">

                <div v-show="error" class="c">

                    <div v-for="error in errors" :key="error.id" class="alert alert-danger" role="alert">
                        {{error.toString()}}
                        </div>

                </div>


                <div class="form-group">
                    <label for="name">Fullname:</label>
                    <input type="text" id="name" class="form-control" placeholder="Enter fullname" v-model="name">
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" class="form-control" placeholder="Enter email" v-model="email">
                </div>

                <div class="form-group">
                    <label for="name">Password:</label>
                    <input type="password" class="form-control" placeholder="Create password" v-model="password">
                </div>

                <div class="form-group">
                    <button  @click="register()" class="btn btn-primary">{{ loading?'Please wait...':'Register' }}</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {

    data() {
        return {
            name: '',
            email: '',
            password:'',
            loading: false,

            error: false,

            errors: []
        }
    },

    methods: {
        register(){

            this.loading = true


            this.axios({
                url: process.env.VUE_APP_URL +'/api/v1/register',
                method: 'post',
                data: {

                    name: this.name,
                    email: this.email,
                    password: this.password

                }
            }).then((response)=>{
                this.loading = false
                console.log(response)

                
            }).catch((error)=>{
                

                this.loading = false
                this.error = true

                this.errors = error.response.data.errors
            
                console.log(this.errors)
            })



        }
    },
    
}
</script>