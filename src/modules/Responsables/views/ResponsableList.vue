<template>
<v-container fluid>
    <div class="mb-3 d-flex align-center">
        <goback :main_title="true" :arrow="false" />
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadResponsables">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
    </div>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" color="dark" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/responsables/create')">Nuevo responsable</v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="responsables" :search="search" :items-per-page="5" :footer-props="{'items-per-page-text':'Items por pagina',}" :loading="onLoading" loading-text="Cargando... Espere por favor">
                <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
                <template v-slot:[`item.usuario.nombre_completo`]="{item}">
                    <strong> {{item.usuario.nombre_completo}}</strong>
                    <v-tooltip bottom  transition="none">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="primary" class="ml-1" dark v-bind="attrs" v-on="on" small>
                               mdi-information-outline
                            </v-icon>
                        </template>
                        <span>Registrado: {{item.asignado}}</span>
                    </v-tooltip>
                </template>
                <template v-slot:[`item.estado`]="{item}">
                    <v-chip :color="item.estado?'success':'error'" small label>{{item.estado?'Activo':'Desactivado'}}</v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon @click="updateItem(item)" class="mr-1">
                        <v-icon>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn icon class="mr-1" @click="bajaItem(item)">
                        <v-icon>
                            {{item.estado?'mdi-account-lock':'mdi-account-lock-open'}}
                        </v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteItem(item.responsable_id)">
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack" transition="slide-y-reverse-transition">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
    <ConfirmDlg ref="confirm" />
</v-container>
</template>

<script>
import ResponsableServices from '../services/ResponsableService'
import TableResponsableService from '../services/TableResponsableService'
export default {
    data() {
        return {
            search: "",
            headers: [{
                    text: 'Nombre',
                    align: 'start',
                    value: 'usuario.nombre_completo',
                },
                {
                    text: 'Cargo',
                    value: 'usuario.cargo'
                },
                {
                    text: 'CI',
                    value: 'usuario.cedula'
                },
                {
                    text: 'Servicio',
                    value: 'servicio.nombre'
                },
                {
                    text: 'Estado',
                    value: 'estado'
                },
                {
                    text: 'Opciones',
                    value: 'actions',
                    sortable: false,
                    width: '15%'
                },
            ],
            onLoading: false,
            responsables: [],
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 3000
            },
        }
    },
    created() {
        this.getResponsables()
    },
    mounted() {},
    mixins: [
        ResponsableServices,
        TableResponsableService
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
