<template>
<v-container fluid>
    <div class="mb-3 d-flex align-center">
        <goback :main_title="true" :arrow="false" />
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadServicios">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
    </div>
    <v-card>
        <v-card-title>
            <v-text-field clearable v-model="search" append-icon="mdi-magnify" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/servicios/create')">Nuevo Servicio</v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="servicios" :search="search" :items-per-page="5" :footer-props="{'items-per-page-text':'Items por pagina',}" :loading="onLoading" loading-text="Cargando... Espere por favor">
                <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
                <template v-slot:[`item.name`]="{item}">
                    <strong> {{item.name}}</strong>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn @click="detailItem(item)" icon class="mr-2">
                        <v-icon>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn @click="deleteItem(item.idServicio)" icon>
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
import ServiciosService from '../services/ServicioService'
import TableServiciosService from '../services/TableServiciosService'
export default {
    data() {
        return {
            onLoading: false,
            servicios: [],
            search: "",
            headers: [{
                    text: 'Codigo',
                    align: 'start',
                    value: 'codigo',
                },
                {
                    text: 'Nombre',
                    value: 'nombre'
                },
                {
                    text: 'Observacion',
                    value: 'observacion'
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
        ServiciosService,
        TableServiciosService
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
