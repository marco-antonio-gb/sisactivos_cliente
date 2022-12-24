<template>
<v-container fluid>
    <div class="mb-3 d-flex align-center">
        <goback :main_title="true" :arrow="false" />

        <v-spacer></v-spacer>
        <v-btn icon @click="reloadAsignaciones">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
    </div>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify"   dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/asignaciones/create')">Nueva asignacion</v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="asignaciones" :search="search" :items-per-page="5" :footer-props="{'items-per-page-text':'Items por pagina',}" :loading="onLoading" loading-text="Cargando... Espere por favor">
                <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
                <template v-slot:[`item.name`]="{item}">
                    <strong> {{item.name}}</strong>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon dense class="mr-3" @click="$router.push({path:'/asignaciones/detail/'+item.id})">
                        mdi-eye
                    </v-icon>
                    <v-icon dense class="mr-3" @click="$router.push({path:'/asignaciones/update/'+item.id})">
                        mdi-pencil
                    </v-icon>
                    <v-icon dense @click="delRol(item.id)">
                        mdi-delete
                    </v-icon>
                    <td></td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
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
import AsignacionService from '../services/AsignacionService'
import TableService from '../services/TableService'
export default {
    data() {
        return {
            search: "",
            headers: [{
                    text: 'Rol',
                    align: 'start',
                    value: 'name',
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
            onLoading: false,
            asignaciones: [],
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    created() {
        this.getAsignaciones()
    },
    mounted() {},
    mixins: [
        AsignacionService,
        TableService
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
