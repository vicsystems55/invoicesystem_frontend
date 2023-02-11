<template>
    <div>
        <div class="container">
            <img alt="Vue logo" style="height: 50px;" class="text-center" src="../assets/logo.png">

            <h3 class="py-5">Vicsystems Technologies Ltd.</h3>
        </div>

        <div class="container mt-5">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>

                        <th>Name</th>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th>QTY</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    //
                    <tr>
                        <td>1</td>
                        <td>UCC 828Liters Freezer</td>
                        <td>ULtra low temp. -86 Degrees</td>
                        <td>NGN 800,000.00</td>
                        <td>2</td>
                        <td>NGN 1, 600, 000</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            invoiceItems: []
        }
    },
}
</script>