<template>
<v-container fluid>
    <div class="mb-3 d-flex align-center">
        <goback :main_title="true" :arrow="false" />
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadOrgfinancieros">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
    </div>
    <v-card>
        <v-card-title>
            <v-text-field clearable v-model="search" append-icon="mdi-magnify" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/orgfinancieros/create')">Nuevo Org. Financiero</v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="orgfinancieros" :search="search" :items-per-page="5" :footer-props="{'items-per-page-text':'Items por pagina',}" :loading="onLoading" loading-text="Cargando... Espere por favor">
                <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
                <template v-slot:[`item.nombre`]="{item}">
                    <strong> {{item.nombre}}</strong>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn @click="updateItem(item.idOrgfinanciero)" icon class="mr-2">
                        <v-icon>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn @click="deleteItem(item.idOrgfinanciero)" icon>
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card-text>
        <ConfirmDlg ref="confirm" />
        <v-snackbar v-model="snackbar.show" :right="true" :timeout="snackbar.timeout" transition="slide-y-reverse-transition">
            <pre class="snackText">{{snackbar.message}}</pre>
        </v-snackbar>
    </v-card>
</v-container>
</template>
<script>
import OrgfinancieroService from '../services/OrgfinancieroService'
import TableOrgfinancieroService from '../services/TableOrgfinancieroService'
export default {
    data() {
        return {
            onLoading: false,
            orgfinancieros: [],
            search: "",
            headers: [{
                    text: 'Nombre',
                    align: 'start',
                    value: 'nombre',
                },
                {
                    text: 'Descripcion',
                    value: 'descripcion'
                },
                {
                    text: 'Opciones',
                    value: 'actions',
                    sortable: false,
                    width: '15%'
                },
            ],
            snackbar: {
                show: false,
                message: "",
                color: 'light',
                timeout: 5000
            },
        }
    },
    created() {
        this.getServicios()
    },
    mounted() {},
    mixins: [
        OrgfinancieroService,
        TableOrgfinancieroService
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
