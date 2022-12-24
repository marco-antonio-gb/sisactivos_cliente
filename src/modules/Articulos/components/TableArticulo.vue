<template>
<v-card>
    <v-card-title>
        <v-text-field clear-icon="mdi-close-circle" clearable v-model="search" @click:clear="search=''" append-icon="mdi-magnify" label="Buscar..." hide-details="true"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$router.push('/articulos/create')">Crear articulo</v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="articulos" :search="search" :items-per-page="10" :footer-props="{
           'items-per-page-text':'Items por pagina','show-first-last-page':true}" :loading="loadTable" loading-text="Cargando... Espere por favor">
        <v-progress-linear v-show="loadTable" slot="progress" color="primary" indeterminate></v-progress-linear>
        <template v-slot:[`item.nombre`]="{item}">
            <div class="d-flex align-center my-2">
                <v-avatar size="50" tile class="mr-3">
                    <v-menu open-on-hover allow-overflow :nudge-width="200" offset-x top transition="slide-y-transition" v-if="item.imagen">
                        <template v-slot:activator="{ on, attrs }">
                            <v-img v-bind="attrs" v-on="on" @error="item.imagen=null" :src="url+item.imagen" alt="Foto artículo"></v-img>
                        </template>
                        <v-img   @error="item.imagen=null" :src="url+item.imagen" alt="Foto artículo" v-if="item.imagen"></v-img>
                    </v-menu>
                </v-avatar>
                <span @click="$router.push({ name: 'articuloDetail', params: { idArticulo: item.idArticulo } })" class="custom-link">
                    {{item.nombre}}
                </span>
            </div>

        </template>
        <template v-slot:[`item.codigo`]="{ item }">
            <span>{{item.codigo}}</span>
        </template>
        <template v-slot:[`item.celular`]="{ item }">
            <a href="javascript:void(0)" class="text-decoration-none" @click="sendWhatsapp(item.celular, message_wasap)">{{item.celular}}</a>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-3" @click="$router.push({path:'/articulos/detail/'+item.idArticulo})">mdi-eye</v-icon>
            <v-icon class="mr-3" @click="$router.push({path:'/articulos/update/'+item.idArticulo})">mdi-pencil</v-icon>
            <v-icon @click="delRecord(item.idArticulo)">mdi-delete</v-icon>
        </template>
    </v-data-table>
    <ConfirmDlg ref="confirm" />
	<v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack" transition="slide-y-reverse-transition">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-card>
</template>

<script>
import ArticuloService from '../services/ArticuloService'
export default {
    data() {
        return {
            url: process.env.VUE_APP_URL_MEDIA + '/home/articulos/fotos/',
            search: "",
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
                    value: 'categoria.nombre'
                },
                {
                    text: 'Org. Financiero',
                    value: 'orgfinanciero.nombre'
                },
                {
                    text: 'Fecha registro',
                    value: 'created_at'
                },
                {
                    value: 'actions',
                    sortable: false,
                    width: '15%',
                    align: 'end'
                },
            ],
			snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 3000
            },
        }
    },
	components:{
		ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
	},
	mixins:[
		ArticuloService
	],
    props: {
        articulos: {
            type: Array,
            default: () => []
        },
        loadTable: {
            default: false
        }
    }
}
</script>

<style>
</style>
