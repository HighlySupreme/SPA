<template>
    <div class="spa-header">
        <div class="spa-main-menu">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="spa-menu-link">
                {{ item.name }}
            </router-link>
        </div>
        <div class="login-button">
            <q-btn v-if="!isLoggedIn" @click="onLogIn" class="login-btn">Log In</q-btn>
            <q-btn v-else @click="onLogOut" class="logout-btn">Log Out</q-btn>
        </div>
    </div>
</template>

<script lang="ts">

import { RouteConfig } from 'vue-router';
import {userMenuItems} from 'layouts/menu/user';
import { mapGetters, mapActions } from 'vuex';
import Vue, {defineComponent} from "vue";
import { Notify } from 'quasar';

export default defineComponent({
    data() {
        return {
            menuItems: userMenuItems as RouteConfig[],
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },

    methods: {
        ...mapActions(['logOut']),
        onLogOut() {
            this.logOut();
            this.$router.push('/').catch(err => {
                // ignore the vuex err regarding duplicate navigation
                if (err.name !== 'NavigationDuplicated') {
                    throw err;
                }
            });
            Notify.create({
                color: 'secondary',
                textColor: 'white',
                message: 'Log out successful!',
                position: 'bottom-right'
            });
            this.isLoggedIn = false
        },

        onLogIn() {
            this.$router.push("/log-in")
        },

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

.spa-menu-link {
    position: relative;
    color: #fdfffc;
    text-decoration: none;
    transition: color 0.3s ease;
}

.spa-menu-link:hover {
    color: #2ec4b6;
}

.spa-menu-link::after {
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

.spa-menu-link:hover::after {
    transform: scaleX(1);
}

.spa-main-menu {
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
