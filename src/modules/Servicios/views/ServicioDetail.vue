<template>
<v-container fluid>
    <goback :main_title="true" :arrow="false" />
    <ConfirmDlg ref="confirm" />
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-container>
</template>
<script>
import ServiciosService from '../services/ServicioService'
export default {
    data() {
        return {
            onLoading: false,
            servicios: [],
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    created() {},
    mounted() {},
    mixin: [
        ServiciosService
    ],
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    methods: {},
    watch: {},
    computed: {}
}
</script>
<style>
</style>
