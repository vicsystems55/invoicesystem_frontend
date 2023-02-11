<template>

    <div class="col-md-4 mx-auto mt-5">
       <dic class="text-center">
        <img alt="Vue logo" style="height: 50px;" class="text-center" src="../assets/logo.png">
       </dic>
        <h3 class="text-center py-5">Login</h3>
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Enter email" v-model="email">
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                </div>

                <div class="form-group">
                    <button  @click="login()" class="btn btn-primary">{{ loading?'Please wait...':'Login' }}</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {

    data() {
        return {
            email: '',
            password:'',
            loading: false
        }
    },

    methods: {
        login(){

            this.loading = true


            this.axios({
                url: process.env.VUE_APP_URL +'/api/v1/login',
                method: 'post',
                data: {

      
                    email: this.email,
                    password: this.password

                }
            }).then((response)=>{
                this.loading = false
                console.log(response)
            }).catch((error)=>{

                this.loading = false
                console.log(error)
            })

        }
    },
    
}
</script>