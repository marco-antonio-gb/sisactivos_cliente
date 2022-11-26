<template>
<v-form ref="formPersona" @submit.prevent="handleArticuloSubmit">
    <v-card  >
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="4">
                    <div class="text-center ">
                        <v-avatar  tile size="250" class="avatar-shadow rounded-lg">
                            <v-img :src="finalImage?finalImage:imageDefault" alt="Fotografía"></v-img>
                        </v-avatar>
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
                            <v-text-field label="Codigo"   hide-details="auto"   v-model="articuloForm.codigo"></v-text-field>
                        </v-col>
                          <v-col cols="12" sm="3">
                            <v-text-field label="Unidad"   hide-details="auto"   v-model="articuloForm.unidad"></v-text-field>
                        </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field label="Nombre"   hide-details="auto"   v-model="articuloForm.nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field label="Descripcion"   hide-details="auto"   v-model="articuloForm.descripcion"></v-text-field>
                        </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field label="Costo"   hide-details="auto"   v-model="articuloForm.costo"></v-text-field>
                        </v-col>
                           <v-col cols="12" sm="4">
                            <v-select   hide-details="auto"   v-model="articuloForm.estado" item-value="value" item-text="text" :items="situacion_options" :menu-props="{ bottom: true, offsetY: true }" attach label="Estado *" required  ></v-select>
                        </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field label="Condicion"   hide-details="auto"   v-model="articuloForm.condicion"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select   hide-details="auto"   :loading="loading_cat" v-model="articuloForm.categoria_id" item-value="idCategoria" item-text="nombre" :items="categorias" label="Categoria" :menu-props="{ bottom: true, offsetY: true }" attach required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select   hide-details="auto"   :loading="loading_org" v-model="articuloForm.orgfinanciero_id" item-value="idOrgfinanciero" item-text="nombre" :items="organismos" :menu-props="{ bottom: true, offsetY: true }" attach label="Organismo financiero *" required  ></v-select>
                        </v-col>
                        
                    </v-row>
                    
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end  " flat>
            <v-btn @click="cancelarCreateArticulo" text class="mr-2">
                Cancelar
            </v-btn>
            <v-btn depressed :loading="onSave" :disabled="onSave" color="primary" type="submit">
                Crear Articulo
            </v-btn>
        </v-card-actions>
    </v-card>
    <CropImage :crop_dialog.sync="crop_dialog" :currentImage.sync="inputImage" @cropImageResult="cropImageResult" />
     
</v-form>
</template>
<script>
 
import ArticuloService from '../services/ArticuloService'
export default {
    data() {
        return {
            articuloForm: {
                codigo: this.articulo ?.codigo || "",
                unidad: this.articulo ?.unidad || "",
                nombre: this.articulo ?.nombre || "",
                descripcion: this.articulo ?.descripcion || "",
                imagen: this.articulo ?.imagen || "",
                costo: this.articulo ?.costo || 0,
                estado: this.articulo ?.estado || "",
                condicion: this.articulo ?.condicion || "",
                fecha_registro: this.articulo ?.fecha_registro || "",
                categoria_id: this.articulo ?.categoria_id || "",
                orgfinanciero_id: this.articulo ?.orgfinanciero_id || "",
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
            loading_cat:false,
            categorias:[],
            loading_org:false,
            organismos:[]
        }
    },
    mixins:[
        ArticuloService
    ],
    props: {
        onSave: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        this.getCategorias();
        this.getOrganismos()
    },
    components: {
        CropImage: () => import('../components/CropImage.vue')
    },
    methods: {
        
        handleArticuloSubmit() {
            if (this.$refs.formPersona.validate()) {
                let data = {
                    form:this.articuloForm,
                    file:this.finalImage
                }
                this.$emit('on-submit', data);
            }
        },
        cancelarCreateArticulo() {
            this.$router.go(-1);
        },
        async getTipos() {
            let response = await this.axios.get('tipo-contacto');
            this.tipo_contacto = response.data.data;
        },
        cropImage() {
            this.crop_dialog = true
            this.inputImage = this.finalImage
        },
        cropImageResult(imageResult) {
            this.finalImage = imageResult
            if (this.inputImage) {
                this.files = []
                this.$refs.inputImg.blur()
            }
        },
        resetFinalImage() {
            this.finalImage = null
        },
        setImage() {
            if (this.files) {
                var reader = new FileReader()
                reader.readAsDataURL(this.files)
                reader.onload = () => {
                    // console.log(reader.result);
                    this.inputImage = reader.result
                    this.crop_dialog = true
                };
            } else {
                this.inputImage = null
            }
        },
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
<style>
</style>
