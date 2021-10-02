<template>
    <v-container>
        <div>404 This page is not available</div>
        <router-link v-if="checkLocation()" to="/admin">Admin page</router-link>
        <router-link v-else to="/">Home page</router-link>
    </v-container>
</template>

<script>
export default {
    methods: {
        checkLocation() {
            if (window.location.pathname.includes("/admin")) {
                return true;
            }
            return false;
        },
    },
};
</script>
