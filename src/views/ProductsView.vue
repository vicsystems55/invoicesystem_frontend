<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Invoice System</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto ">
 
      
    </ul>
    <span class="navbar-text">
        <h6 class="px-2"> CART (0) </h6>
     
    </span>
    <form class="form-inline my-2 my-lg-0">

      <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">LOGOUT</button>
    </form>
  </div>
</nav>


<div class="container pt-3">
    <div class="frr">
            <h6>Welcome, </h6>
        </div>
</div>


    <div class="container mt-3">
      
        <div class="row">
            <div class="col-lg-4 col-md-3">
                <div class="card" style="width: 13rem;">
                    <img src="../assets/logo.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                       
                        <a href="#" class="btn btn-primary btn-sm">+ Add Product</a>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<script>
export default {
    data() {
        return {
            products: []
        }
    },
}
</script>