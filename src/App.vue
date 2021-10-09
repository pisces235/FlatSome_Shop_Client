<template>
    <v-app>
        <Header class="header" id="header" />
        <div id="fb-root"></div>
        <v-main style="margin-top: 90px">
            <router-view></router-view>
        </v-main>

        <footer id="footer">
            <Footer />
        </footer>
    </v-app>
</template>

<script>
import Header from "./components/Header/PublicHeader.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",

    data() {
        return {};
    },
    components: {
        Header,
        Footer,
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    text-decoration: none !important;
    list-style-type: none;
    font-family: Lato, sans-serif;
}
.header {
    width: 100%;
    float: left;
    opacity: 0.9;
}
.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    max-height: 70px !important;
}
.sticky + .v-main {
    margin-top: 60px !important;
}
.v-main {
    width: 100%;
    float: left;
}
footer {
    width: 100%;
    float: left;
    background-color: #777777 !important;
}
</style>
