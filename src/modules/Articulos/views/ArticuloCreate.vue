<template>
<div>
    <goback class="mb-3" />
    <v-alert dense outlined color="primary" dark v-if="company">
        Empresa: {{company.razon_social}}
    </v-alert>
    <ArticuloForm @on-submit="created" :onSave.sync="onSave" />
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>
<script>
import ArticuloService from '../services/ArticuloService'
export default {
    data() {
        return {
            onSave: false,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },
            articulo: null
        }
    },
    created() {},
    mixins: [
        ArticuloService,
    ],
    components: {
        ArticuloForm: () => import('../components/FormArticulo.vue')
    },
    methods: {
        cancelarCreateArticulo() {
            this.$router.go(-1);
        },
    },
    computed: {
        company() {
            let obj = this.$route.query
            return Object.keys(obj).length > 0 ? obj : null
        }
    },
}
</script>
