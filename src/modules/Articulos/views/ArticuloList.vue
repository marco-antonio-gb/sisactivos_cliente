<template>
<div>
    <div class="mb-3 d-flex align-center">
        <h1>{{$route.meta.title}}</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadEmpresas">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" :loading="onDownload">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list nav dense>
                <v-subheader>Exportat articulos</v-subheader>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-file-excel-outline</v-icon> Microsoft Excel (.xlsx)
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-file-excel-outline</v-icon> Microsoft Excel (.cvs)
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-file-excel-outline</v-icon> Microsoft Excel 97-2003 (.xls)
                    </v-list-item-title>
                </v-list-item>
                <!-- <v-subheader>Importar desde Excel</v-subheader>
                <v-list-item link @click="openDialogImport">
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-upload</v-icon> Importar articulos
                    </v-list-item-title>
                </v-list-item> -->
                <v-subheader>Seleccionar columnas</v-subheader>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-download</v-icon> Exportar columnas
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- <v-spacer></v-spacer> -->
    </div>
    <v-card  >
        <v-card-title>
            <v-text-field clear-icon="mdi-close-circle" clearable v-model="search" @click:clear="search=''" append-icon="mdi-magnify" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/articulos/create')" depressed>Crear articulo</v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="articulos" :search="search" :items-per-page="10" :footer-props="{
           'items-per-page-text':'Items por pagina','show-first-last-page':true}" :loading="onLoading" loading-text="Cargando... Espere por favor">
            <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
            <template v-slot:[`item.nombre`]="{item}">
                <v-list-item class="pa-0" :ripple="false" link @click="$router.push({ name: 'articuloDetail', params: { idArticulo: item.idArticulo }})">
                    <v-list-item-avatar size="50" tile>
                        <v-menu open-on-hover allow-overflow :nudge-width="200" offset-x top transition="slide-y-transition" v-if="item.imagen">
                            <template v-slot:activator="{ on, attrs }">
                                <v-img v-bind="attrs" v-on="on" @error="item.imagen=null" :src="url+item.imagen" alt="Foto usuario"></v-img>
                            </template>
                            <v-img max-width="350" @error="item.imagen=null" :src="url+item.imagen" alt="Foto usuario" v-if="item.imagen"></v-img>
                        </v-menu>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class=" font-weight-medium" v-html="item.nombre"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.cargo"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-slot:[`item.codigo`]="{ item }">
                <strong>{{item.codigo}}</strong>
            </template>
            <template v-slot:[`item.celular`]="{ item }">
                <a href="javascript:void(0)" class="text-decoration-none" @click="sendWhatsapp(item.celular, message_wasap)">{{item.celular}}</a>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-menu bottom left min-width="150">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" :loading="onDownload">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list nav dense>
                        <v-list-item link @click="$router.push({path:'/articulos/detail/'+item.idPersona})">
                            <v-list-item-title>
                                <v-icon dense class="mr-1">mdi-eye</v-icon> Detalle
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="$router.push({path:'/articulos/update/'+item.idPersona})">
                            <v-list-item-title>
                                <v-icon dense class="mr-1">mdi-pencil</v-icon> Editar
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="delRecord(item.idPersona)">
                            <v-list-item-title>
                                <v-icon dense class="mr-1">mdi-delete</v-icon> Eliminar
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-data-table>
    </v-card>
    <ConfirmDlg ref="confirm" />
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
            url: process.env.VUE_APP_URL_MEDIA + '/articulos/',
            onDownload: false,
            onLoading: false,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
            articulos: [],
            search: '',
            headers: [{
                    text: 'Articulo',
                    align: 'start',
                    value: 'nombre',
                },
                {
                    text: 'Codigo',
                    value: 'codigo'
                },
                {
                    text: 'Categoria',
                    value: 'categoria_id'
                },
                {
                    text: 'Org. Financiero',
                    value: 'orgfinanciero_id'
                },
                {
                    text: 'Registrado',
                    value: 'created_at'
                },
                {
                    value: 'actions',
                    sortable: false,
                    width: '15%',
                    align: 'end'
                },
            ],
        }
    },
    mounted() {
        this.getArticulos();
    },
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    mixins: [
        ArticuloService
    ],
    methods: {
        reloadEmpresas() {
            this.articulos = []
            this.getArticulos()
        },
    }
}
</script>
<style>
</style>
