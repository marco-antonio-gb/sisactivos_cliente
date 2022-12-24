<template>
<v-container fluid>
    <goback class="mb-3"/>
    <ConfirmDlg ref="confirm" />
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
    <ResponsableForm />
</v-container>
</template>

<script>
import ResponsableService from '../services/ResponsableService'
export default {
    data() {
        return {
            onSave: false,
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
        ResponsableService
    ],
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
        ResponsableForm: () => import("../components/FormResponsables.vue")
    },
    methods: {},
    watch: {},
    computed: {}
}
</script>

<style>
</style>
 
