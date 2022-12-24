<template>
<v-container fluid>
    <goback class="mb-3" />
    <v-alert dense outlined color="primary" dark v-if="company">
        Empresa: {{company.razon_social}}
    </v-alert>
    <ArticuloForm @on-submit="created" :onSave.sync="onSave" />
   
</v-container>
</template>
<script>
import ArticuloService from '../services/ArticuloService'
export default {
    data() {
        return {
            onSave: false,
            
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
