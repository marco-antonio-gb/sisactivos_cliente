<template>
<v-container fluid>
   
    <div class="mb-3 d-flex align-center">
        <goback :main_title="true" :arrow="false" />
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadCategorias" title="Actualizar">
            <v-icon>mdi-autorenew</v-icon>
        </v-btn>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list dense nav>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
    <v-card>
        <v-card-title>
            <v-text-field outlined v-model="search" append-icon="mdi-magnify" dense label="Buscar..." hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/categorias/create')">Nueva categoria</v-btn>

        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="categorias" :search="search" :items-per-page="5" :footer-props="{'items-per-page-text':'Items por pagina',}" :loading="onLoading" loading-text="Cargando... Espere por favor">
                <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
                <template v-slot:[`item.nombre`]="{item}">
                    <strong> {{item.nombre}}</strong>
                </template>
                <template v-slot:[`item.condicion`]="{item}">
                    <v-chip :color="item.condicion?'success':'error'" small>{{item.condicion?'Activado':'Desactivado'}}</v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon class="mr-3" @click="$router.push({path:'/categorias/update/'+item.idCategoria})">
                        mdi-pencil
                    </v-icon>
                    <v-icon @click="deleteConfirm(item.idCategoria)">
                        mdi-delete
                    </v-icon>
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
import CategoriaServices from '../services/CategoriaServices'
export default {
    data() {
        return {
            onLoading: false,
            onLoadingPermiso: false,
            search: '',
            headers: [{
                    text: 'Nombre',
                    align: 'start',
                    value: 'nombre',
                },
                {
                    text: 'Vida util',
                    value: 'vida_util'
                },
                {
                    text: 'Descripcion',
                    value: 'descripcion'
                },
                {
                    text: 'Condicion',
                    value: 'condicion',
                    align: 'center'
                },
                {
                    text: 'Opciones',
                    value: 'actions',
                    sortable: false,
                    width: '15%'
                },
            ],
            categorias: [],
            permisos: [],
            dialogNewRol: false,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 3000
            },
        }
    },
    created() {
        this.getCategorias();
    },
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg")

    },
    mixins: [
        CategoriaServices
    ],
    methods: {}
}
</script>
