<template>

    <div class="col-md-4 mx-auto mt-5">
        <img alt="Vue logo" style="height: 50px;" src="../assets/logo.png">
        <h3 class="text-center py-5">Login</h3>
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Enter email">
                </div>

                <div class="form-group">
                    <button class="btn btn-primary">Login</button>
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
        }
    },

    methods: {
        login(){

        }
    },
    
}
</script>