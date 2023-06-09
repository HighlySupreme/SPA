<template>
    <q-page class="login-page">
        <div class="login-container">
            <form @submit="login" class="login-form">
                <div class="row">
                    <div class="col-12">
                        <q-input v-model="username" label="Username" color="secondary"/>
                    </div>
                    <div class="col-12">
                        <q-input type="password" v-model="password" label="Password" color="secondary"/>
                    </div>
                    <div class="col-12 login-button">
                        <q-btn flat type="submit" label="Login" class="login-button spa-text-light" />
                    </div>
                </div>
            </form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import store from 'src/store'
import * as LoginService from "src/services/login.service";
import Vue from "vue";
export default defineComponent({
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const result = await LoginService.login(this.username, this.password)
                if (result) {
                    store.commit('setIsLogin', true);
                    store.commit('setUsername', this.username);
                    Vue.prototype.$q.notify({
                        color: 'green',
                        textColor: 'white',
                        message: 'Login successful!',
                        position: 'bottom-right'
                    });
                    await this.$router.push('/');
                } else {
                    console.log("Wrong login credentials")
                    Vue.prototype.$q.notify({
                        color: 'red',
                        textColor: 'white',
                        message: 'Wrong credentials!',
                        position: 'bottom-right'
                    });
                }
            } catch (error) {
                throw new Error('Login failed');
            }
        }
    },
});
</script>

<style scoped>

.login-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.login-container {
    padding: 20px;
    border-radius: 8px;
    height: 200px;
    width: 350px;
}

.login-form {
    /* Your form styles here */
}

.login-button {
    margin-top: 10px;
    text-align: center;
}

</style>
