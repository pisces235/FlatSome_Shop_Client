<template>
    <div class="container text-center">
        <hr>
        <h2>ORDER SUCCESS</h2>
        <h4>Our customer service staff will contact you once your order is confirmed.</h4>
        <h4>We will send an order tracking link to your email. You can also track your order by logging in and tracking your order on our website.</h4>
        <div class="contain-btn">
            <a href="/" class="btn btn-light">HOME PAGE</a>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
.container {
    width: 73%;
    margin: 0 13.5%;
    padding: 0;
    hr{
        margin: 0;
        padding: 0;
        height: 1px;
    }
    h2 {
        margin: 50px 0 30px 0;
    }
    h4 {
        margin: 50px 0 30px 0;
    }
    .contain-btn {
            a {
                color: white;
                font-weight: 600;
                font-size: 16px;
                background-color: black;
                text-align: center;
                padding: 8px 18px;
                margin-top: 20px;
                width: fit-content;
            }
        }
}
</style>
