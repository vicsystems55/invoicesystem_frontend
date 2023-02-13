<template>

    <div style="max-width: 330px;" class=" mx-auto mt-5">
        <div class="text-center">
            <img alt="Vue logo" style="height: 50px;" class="text-center" src="../assets/logo.png">
        </div>
        <h3 class="text-center py-5">Login</h3>
        <div class="card">
            <div class="card-body">
                <div v-show="error" class="c">

                    <div class="alert alert-danger" role="alert">
                        {{ error_msg }}
                    </div>

                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Enter email" v-model="email">
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                </div>

                <div class="form-group">
                    <button @click="login()" class="btn btn-primary btn-block btn-sm">{{
                        loading?'Please wait...': 'Login'
                    }}</button>
                </div>

                <div class="form-group">
                    <h6  class="btn">
                        <router-link :to="'/register'">
                        Create an account
                    </router-link>
                    </h6>
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
            password: '',
            loading: false,
            error: false,

            error_msg: ''
        }
    },

    methods: {
        login() {

            this.loading = true


            this.axios({
                url: process.env.VUE_APP_URL + '/api/v1/login',
                method: 'post',
                data: {


                    email: this.email,
                    password: this.password

                }
            }).then((response) => {
                this.loading = false
                localStorage.setItem('user_role', response.data.user_data.role);
                localStorage.setItem('user_token', response.data.access_token);
                localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
                console.log(response)
                return this.$router.push('/products')

            }).catch((error) => {

                this.error = true

                this.error_msg = error.response.data.message

                console.log(error.response)

            })

        }
    },

}
</script>