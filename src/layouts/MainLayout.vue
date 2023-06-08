<template>
    <q-layout>
        <SpaHeader />

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>

</template>

<script lang="ts">

import {defineComponent} from 'vue';
import SpaHeader from "components/SpaHeader.vue";

export default defineComponent({
    name: 'MainLayout',
    components: {SpaHeader},
    setup() {

    }
});

</script>
