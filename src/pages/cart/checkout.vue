<template>
    <div class="container">
        <div class="contain-left">
            <select name="calc_shipping_provinces" required="">
                <option value="">Tỉnh / Thành phố</option>
            </select>
            <select name="calc_shipping_district" required="">
                <option value="">Quận / Huyện</option>
            </select>
            <input class="billing_address_1" name="" type="hidden" value="" />
            <input class="billing_address_2" name="" type="hidden" value="" />
        </div>
        <div class="contain-right"></div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
    width: 72%;
    margin: 0 14%;
    padding: 0;
    .contain-left {
        width: 55%;
    }
}
</style>
