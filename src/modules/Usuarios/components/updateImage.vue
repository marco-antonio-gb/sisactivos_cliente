<template>
<v-layout row justify-center>
    <v-dialog v-model="dialogImage" persistent max-width="400">
        <v-card>
            <loader :onLoading="onLoading"  color='primary'/>
            <v-card-title class="body-1">
                Cambiar imagen
            </v-card-title>
            <v-card-text class="text-center">
                <v-avatar size="200" class="my-4 avatar-shadow">
                    <v-img :src="finalImage" v-if="finalImage"></v-img>
                    <v-img :src="imageDefault" v-else></v-img>
                </v-avatar>
                <v-file-input :disabled="onSave " dense @change="setImage" v-model="files" color="deep-purple accent-4" counter label="Seleccionar imagen..." placeholder="Cargar imagen" prepend-icon="mdi-paperclip" outlined :show-size="1000" accept="image/*" ref="inputImg">
                    <template v-slot:selection="{ index, text }">
                        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                            {{ text }}
                        </v-chip>
                        <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                            +{{ files.length - 2 }} File(s)
                        </span>
                    </template>
                </v-file-input>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn @click="closedialogImage" text depressed>Cancelar</v-btn>
                <v-btn color="primary" depressed @click="uploadImage()" :loading="onLoading " :disabled="onLoading  ">
                    Cambiar imagen
                </v-btn>
            </v-card-actions>
        </v-card>
        <CropImage :crop_dialog.sync="crop_dialog" :currentImage.sync="inputImage" @cropImageResult="cropImageResult"></CropImage>
        <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
            <pre class="snackText">{{snackbar.message_snack}}</pre>
            <template v-slot:action="{ attrs }">
                <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-dialog>
</v-layout>
</template>

<script>
export default {
    data() {
        return {
            files: [],
            imageDefault: require('@/assets/images/logos/user_logo.svg'),
            finalImage: null,
            imageUpload: null,
            path: process.env.VUE_APP_URL_MEDIA,
            onLoading: false,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
            crop_dialog: false,
            inputImage: null,
            onSave: false,
        }
    },
    created(){
        this.finalImage=null
    },
    props: {
        dialogImage: {
            default: false
        },
        currentImage: {
            default: null
        }
    },
    components: {
        CropImage: () => import('./ImageUser/CropImage.vue')
    },
    mixins: [],
    methods: {
        cropImageResult(imageResult) {
            this.finalImage = imageResult
            if (this.inputImage) {
                this.files = []
                this.$refs.inputImg.blur()
            }
        },
        closedialogImage() {
            this.$emit('update:dialogImage', false)
            this.finalImage = null
        },
        loadImage(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUpload = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        updateParent() {
            this.closedialogImage()
            this.$emit('updateParentImage');
        },
        setImage() {
            if (this.files) {
                var reader = new FileReader()
                reader.readAsDataURL(this.files)
                this.$emit('update:crop_dialog', true)
                reader.onload = () => {
                    this.inputImage = reader.result
                    this.crop_dialog = true
                };
            } else {
                this.inputImage = null
            }
        },
        uploadImage() {
            this.onLoading = true;

          

                const form = new FormData();
                form.append("foto", this.finalImage);
                form.append("usuario_id", this.$route.params.idUsuario);
                this.axios
                    .post("/change-user-picture", form)
                    .then(response => {
                        if (response.data.success) {
                            this.onLoading = false;
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "success"
                            );
                            setTimeout(() => {
                                this.updateParent()
                            }, 600);
                        } else {
                            this.onLoading = false;
                            this.showSnackbar(
                                response.data.validator,
                                true,
                                "error"
                            );
                        }
                    })
                    .catch(error => {
                        this.onLoading = false;
                        if (error.response) {
                            this.showSnackbar(
                                error.response.data.message,
                                true,
                                "error"
                            );
                        } else if (error.request) {
                            this.showSnackbar(
                                "No se puede conectar con el servidor",
                                true,
                                "error"
                            );
                        } else {
                            this.showSnackbar(error.message, true, "error");
                        }
                    });
            
        },
    },
    watch: {
        dialogImage() {
            if (this.dialogImage && this.currentImage) {
                this.imageDefault = this.currentImage
            }
        }
    }
}
</script>

<style>
</style>
