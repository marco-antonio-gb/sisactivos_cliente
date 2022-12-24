<template>
<v-container fluid>
    <div class="mb-3 d-flex align-center">
                <goback :main_title="true" :arrow="false" />

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
    <ArticulosTable :articulos.sync="articulos" :loadTable="onLoading" />
</v-container>
</template>
<script>
import ArticuloService from '../services/ArticuloService'
export default {
    data() {
        return {
            onDownload: false,
            onLoading: false,
            articulos: [],
            search: '',
        }
    },
    mounted() {
        this.getArticulos();
    },
    components: {
        ArticulosTable: () => import("../components/TableArticulo.vue")
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
