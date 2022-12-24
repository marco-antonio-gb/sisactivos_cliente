<template>
<v-row justify="center">
    <v-dialog v-model="dialogUpload" persistent max-width="500">
        <v-card>
            <v-card-title >
                Subir imagensssssssss
            </v-card-title>
            <v-card-text class="pt-6">
                
                <v-file-input :disabled="onSave || record_enabled" dense @change="setImage" v-model="files" color="deep-purple accent-4" counter label="Seleccionar imagen..." placeholder="Cargar imagen" prepend-icon="mdi-paperclip" outlined :show-size="1000" accept="image/*" ref="inputImg">
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
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  text @click="closeDialog()">
                    Cancelar
                </v-btn>
                <v-btn color="primary" depressed @click="closeDialog()">
                    Aceptar
                </v-btn>
                <v-btn @click="opencrop">as</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
     <CropImage :crop_dialog.sync="crop_dialog" :currentImage.sync="inputImage" @cropImageResult="cropImageResult" ></CropImage>
</v-row>
</template>
<script>
export default {
    data() {
        return {
            onSaveParent: false,
            onLoading: false,
            onSave: false,
            show1: false,
            // Upload image
            
            finalImage: null,
          
            files: [],
            imageDefault: require('@/assets/images/image_icon.svg'),
            imageUpload: null,
            record_enabled: false,
             crop_dialog: false,
             inputImage: null
        }
    },
    props: {
        dialogUpload: {
            default: false
        },
        file: {
            default: null
        },
    },
    components: {
       
        CropImage:() =>import('./CropImage.vue')
    },
    mixins: [],
    methods: {
        closeDialog() {
            this.$emit('update:dialogUpload', false)
        },
        resetFinalImage() {
            this.finalImage = null
        },
        opencrop(){
                this.$emit('update:crop_dialog',true)

        },
         
        cropImage() {
            this.crop_dialog = true
            this.inputImage = this.finalImage
        },
        cropImageResult(imageResult) {
            this.finalImage = imageResult
            // if (this.inputImage) {
            //     this.files = []
            //     this.$refs.inputImg.blur()
            // }
        },
    
        setImage() {
            if (this.files) {
                console.log(this.files)
                var reader = new FileReader()
                reader.readAsDataURL(this.files)
                this.$emit('update:crop_dialog',true)
                reader.onload = () => {
                    // console.log(reader.result);
                    this.inputImage = reader.result
                    this.crop_dialog = true
                };
            } else {
                this.inputImage = null
            }
        },
    }
}
</script>
<style>
</style>
