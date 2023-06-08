<template>
    <div class="spa-header">
        <div class="logo">
            <q-icon name="mdi-account-cowboy-hat-outline" size="lg" class="spa-text-light"/>
        </div>
        <div class="menu">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="menu-link">
                {{ item.name }}
            </router-link>
        </div>
        <div class="login-button">
            <button v-if="!loggedIn" @click="login" class="login-btn">Log In</button>
            <button v-else @click="logout" class="logout-btn">Log Out</button>
        </div>
    </div>
</template>

<script lang="ts">

import { RouteConfig } from 'vue-router';
import {userMenuItems} from 'layouts/menu/user';

export default {
    data() {
        return {
            menuItems: userMenuItems as RouteConfig[],
        }
    },

    methods: {
    }
}
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
    color: #FDFFFC;
    text-decoration: none;
    transition: color 0.3s ease;
}

.menu-link:hover {
    color: #2EC4B6;
}

.menu-link::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #2EC4B6;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.menu-link:hover::after {
    transform: scaleX(1);
}


.menu {
    display: flex;
    gap: 2rem;
}

.login-button {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
}

.login-btn,
.logout-btn {
    padding: 0.5rem 1rem;
    background-color: #2EC4B6;
    color: #FDFFFC;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}


</style>
