<template>
    <div class="container-fluid">
        <p class="contain-info">
            The following addresses will be used on the checkout page by
            default.
        </p>
        <div class="contain-left">
            <p class="title">Billing Address</p>
            <a class="" href="/my-account/add-address/billing" v-if="user.address.length == 0">Add</a>
            <a class="" href="/my-account/edit-address/billing" v-else>Edit</a>
            <div class="contain-address" v-if="user.address.length > 0">
                <p>{{user.name}}</p>
                <p>
                    {{user.address[0].left_address}}, {{user.address[0].ward}}
                    , {{user.address[0].district}}, {{user.address[0].province}}
                </p>
                <p>{{user.phoneNumber}}</p>
            </div>
            <div class="contain-address" v-else>
                <p><i>You have not set up this type of address yet.</i></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Addresses",
    mounted() {
        this.localUser = JSON.parse(window.localStorage.currentUser);

        this.$store.dispatch("loadUserById", this.localUser.id);
    },
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped>
.container-fluid {
    .contain-info {
        font-size: 16px;
        font-weight: 400;
        color: #777;
        width: 100%;
        float: left;
    }
    .contain-left,
    .contain-right {
        width: 100%;
        float: left;
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #555;
        }
        a {
            color: #111;
        }
        .contain-address {
            font-size: 16px;
            font-weight: 400;
            color: #777;
        }
    }
}
</style>
