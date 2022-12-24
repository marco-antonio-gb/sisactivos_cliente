<template>
<v-form ref="formCreateArticulo" @submit.prevent="created">
    <v-card>
        <v-card-text>
            <v-row align-content="center" justify="center">
                <v-col cols="12" sm="4">
                    <div class="text-center ">
                            <v-img :src="finalImage?finalImage:imageDefault" alt="Fotografía" contain></v-img>
                    </div>
                    <div class="text-center my-4">
                        <v-tooltip bottom transition="none">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab small class="mx-2" v-bind="attrs" v-on="on" @click="cropImage" :disabled="!finalImage">
                                    <v-icon>mdi-crop</v-icon>
                                </v-btn>
                            </template>
                            <span>Recortar</span>
                        </v-tooltip>
                        <v-tooltip bottom transition="none">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab small class="mx-2" v-bind="attrs" v-on="on" @click="resetFinalImage" :disabled="!finalImage">
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar</span>
                        </v-tooltip>
                    </div>
                    <v-file-input :disabled="onSave || record_enabled" dense @change="setImage" v-model="files" color="deep-purple accent-4" counter label="Seleccionar imagen..." placeholder="Cargar imagen" prepend-icon="mdi-paperclip" outlined :show-size="1000" accept="image/*" ref="inputImg" class="px-6">
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                {{ text }}
                            </v-chip>
                            <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                                +{{ files.length - 2 }} File(s)
                            </span>
                        </template>
                    </v-file-input>
                </v-col>
                <v-col cols="12" sm="8">
                    <v-row>
                        <v-col cols="12" sm="3">
                            <v-text-field label="Codigo (*)" hide-details="auto" @focus="$event.target.select()" v-model="articuloForm.codigo" :rules="codigoRule" validate-on-blur> </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field label="Unidad" hide-details="auto" @focus="$event.target.select()" v-model="articuloForm.unidad"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Nombre (*)" hide-details="auto" @focus="$event.target.select()" v-model="articuloForm.nombre" :rules="nombreRule" validate-on-blur></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Descripcion" hide-details="auto" @focus="$event.target.select()" v-model="articuloForm.descripcion"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Costo (*)" hide-details="auto" @focus="$event.target.select()" v-model="articuloForm.costo" :rules="costoRule" validate-on-blur></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-select hide-details="auto" @focus="$event.target.select()" v-model="articuloForm.estado" item-value="value" item-text="text" :items="situacion_options" :menu-props="{ bottom: true, offsetY: true }" attach label="Situacion (*)" required :rules="estadoRule" validate-on-blur></v-select>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-select hide-details="auto" @focus="$event.target.select()" :loading="loading_cat" v-model="articuloForm.categoria_id" item-value="idCategoria" item-text="nombre" :items="categorias" label="Categoria (*)" :menu-props="{ bottom: true, offsetY: true }" attach required :rules="categoriaRule" validate-on-blur></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select hide-details="auto" @focus="$event.target.select()" :loading="loading_org" v-model="articuloForm.orgfinanciero_id" item-value="idOrgfinanciero" item-text="nombre" :items="organismos" :menu-props="{ bottom: true, offsetY: true }" attach label="Organismo financiero (*)" required :rules="orgfinancieroRule" validate-on-blur></v-select>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            
        </v-card-text>
        <v-card-actions>
			<span class="caption">(*) Campos obligatorios</span>
			<v-spacer></v-spacer>
            <v-btn @click="cancelarCreateArticulo" text class="mr-2">
                Cancelar
            </v-btn>
            <v-btn :loading="onSave" :disabled="onSave" color="primary" type="submit">
                Crear Articulo
            </v-btn>
        </v-card-actions>
    </v-card>
    <CropImage :crop_dialog.sync="crop_dialog" :currentImage.sync="inputImage" @cropImageResult="cropImageResult" />
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack" transition="slide-y-reverse-transition">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-form>
</template>

<script>
import ArticuloService from '../services/ArticuloService'
import FormArticuloService from '../services/FormArticuloServices'
import {
    codigoRule,
    nombreRule,
    categoriaRule,
    orgfinancieroRule,
    estadoRule,
    costoRule
} from '../services/ArticuloRules'
export default {
    data() {
        return {
            onSave: false,
            articuloForm: {
                codigo: this.articulo ?.codigo || "",
                unidad: this.articulo ?.unidad || "",
                nombre: this.articulo ?.nombre || "",
                descripcion: this.articulo ?.descripcion || "",
                archivos: this.articulo ?.archivos || [],
                costo: this.articulo ?.costo || 0,
                condicion: this.articulo ?.condicion || "",
                fecha_registro: this.articulo ?.fecha_registro || "",
                categoria_id: this.articulo ?.categoria_id || "",
                orgfinanciero_id: this.articulo ?.orgfinanciero_id || "",
            },
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 3000,
            },
            situacion_options: [{
                    text: "Bueno",
                    value: "Bueno"
                },
                {
                    text: "Regular",
                    value: "Regular"
                },
                {
                    text: "Malo",
                    value: "Malo"
                }
            ],
            onButton: false,
            loadingCi: false,
            errorsCi: [],
            crop_dialog: false,
            finalImage: null,
            inputImage: null,
            files: [],
            imageDefault: require('@/assets/images/image_icon.svg'),
            imageUpload: null,
            record_enabled: false,
            loading_cat: false,
            categorias: [],
            loading_org: false,
            organismos: [],
            
            /**
             * Rules 
             */
            codigoRule: codigoRule,
            nombreRule: nombreRule,
            categoriaRule: categoriaRule,
            orgfinancieroRule: orgfinancieroRule,
            estadoRule: estadoRule,
            costoRule: costoRule,

        }
    },
    mixins: [
        ArticuloService,
        FormArticuloService
    ],
    props: {},
    mounted() {
        this.getCategorias();
        this.getOrganismos()
    },
    components: {
        CropImage: () => import('../components/CropImage.vue')
    },
    watch: {
        inputImage(value) {
            if (!value) {
                this.files = []
                this.$refs.inputImg.blur()
            }
        }
    }
}
</script>
