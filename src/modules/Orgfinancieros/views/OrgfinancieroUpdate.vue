<template>
<v-container fluid>
    <goback :main_title="false" :arrow="true" class="mb-3"/>
    <UpdateFormOrgFinanciero  :orgfinanciero="orgfinancieroData" :onLoading.sync="onLoading"   @on-submit="updateOrgfinanciero"/>
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
import OrgfinancieroService from '../services/OrgfinancieroService'
export default {
    data() {
        return {
            onLoading: false,
            orgfinancieroData: null,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    created() {
        },
    mounted() {

        this.showOrgFinanciero(this.$route.params.idOrgfinanciero)
    },
    mixins: [
        OrgfinancieroService
    ],
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
        UpdateFormOrgFinanciero: () => import("../components/UpdateFormOrgFinanciero.vue")

    },
    methods: {},
    watch: {},
    computed: {}
}
</script>
<style>
</style>
