<template >
    <div class="bg-dange"  >

        
        <div style="height: 100vh;" class="d-flex justify-content-center align-items-center">

            <div class="d-block">
                <h6 style="font-size: 250%;" class="display-4 text-center">Thanks for your patronage</h6>
                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_47pyyfcf.json"
                                    background="transparent" speed="1" style="min-width: 300px; height: 300px;" loop
                                    autoplay></lottie-player> 
                                    <div class="text-center d-block">
                                        <p>

                                            <router-link class="btn btn-primary" :to="'/products'">Shop for more</router-link>
                                        </p>
                                        <button class="btn text-success font-weight-bold ">Track my order</button>
            </div>
                
            </div>
           
           
        </div>
      
     
        
    </div>
</template>