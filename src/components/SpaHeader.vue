<template>
    <div class="spa-header">
        <div class="menu">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="menu-link">
                {{ item.name }}
            </router-link>
        </div>
        <div class="login-button">
            <q-btn v-if="!isLogin" @click="onLogIn" class="login-btn">Log In</q-btn>
            <q-btn v-else @click="onLogOut" class="logout-btn">Log Out</q-btn>
        </div>
    </div>
</template>

<script lang="ts">

import { RouteConfig } from 'vue-router';
import {userMenuItems} from 'layouts/menu/user';
import { mapGetters, mapActions } from 'vuex';
import Vue, {defineComponent} from "vue";

export default defineComponent({
    computed: {
        ...mapGetters(['isLogin']),
    },

    data() {
        return {
            menuItems: userMenuItems as RouteConfig[],
        }
    },

    methods: {
        ...mapActions(['setLogout']),
        onLogOut() {
            this.setLogout()
            this.$router.push('/');
            Vue.prototype.$q.notify({
                color: 'green',
                textColor: 'white',
                message: 'Log out successful!',
                position: 'bottom-right'
            });
        },

        onLogIn() {
            this.$router.push("/log-in")
        }

    }
})
</script>


<style scoped>

.spa-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #011627;
    font-size: 20px;
}

.menu-link {
    position: relative;
    color: #fdfffc;
    text-decoration: none;
    transition: color 0.3s ease;
}

.menu-link:hover {
    color: #2ec4b6;
}

.menu-link::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #2ec4b6;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.menu-link:hover::after {
    transform: scaleX(1);
}

.menu {
    display: flex;
    gap: 2rem;
    flex: 1;
}


.login-btn,
.logout-btn {
    padding: 0.5rem 1rem;
    background-color: #2ec4b6;
    color: #fdfffc;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
}


</style>
