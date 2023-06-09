<template>
    <q-page>
        <div class="spa-table">
            <q-table
                title="User list"
                :data="users"
                :columns="columns"
                row-key="id"
                class="user-table"
            >
                <template v-slot:body-cell-street="props">
                    <td>{{ props.row.address.street }}</td>

                </template>
                <template v-slot:body-cell-city="props">
                    <td>{{ props.row.address.city }}</td>
                </template>
                <template v-slot:body-cell-zipcode="props">
                    <td>{{ props.row.address.zipcode }}</td>
                </template>
                <template v-slot:body-cell-company="props">
                    <td>{{ props.row.company.name }}</td>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {RestService} from "src/services/rest.service";

const columns = [
    {
        name: 'username',
        required: true,
        label: 'Username',
        align: 'left',
        field: 'username',
        sortable: true,
    },
    {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: 'email',
        sortable: true,
    },
    {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        sortable: true,
    },
    {
        name: 'street',
        required: true,
        label: 'Street Address',
        align: 'left',
        field: 'address.street',
        sortable: true,
    },
    {
        name: 'city',
        required: true,
        label: 'City',
        align: 'left',
        field: 'address.city',
        sortable: true,
    },
    {
        name: 'zipcode',
        required: true,
        label: 'ZIP Code',
        align: 'left',
        field: 'address.zipcode',
        sortable: true,
    },
    {
        name: 'company',
        required: true,
        label: 'Company Name',
        align: 'left',
        field: 'company.name',
        sortable: true,
    }
]

export default defineComponent({
    data() {
        return {
            users: [] as User[],
            columns: columns,
        };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            this.$q.loading.show()
            try {
                this.users = await RestService.getUsers();
                this.$q.loading.hide()
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },
    },
});
</script>

<style scoped>

</style>
