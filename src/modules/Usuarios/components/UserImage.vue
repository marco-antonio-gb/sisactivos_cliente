<template>
<div>
    <divide title="Imagen de perfil" class="mb-3"></divide>
    <div class="text-center ">
        <v-avatar size="280" class="avatar-shadow mb-3">
            <v-img :src="finalImage?finalImage:imageDefault" alt="Fotografía"></v-img>
        </v-avatar>
    </div>
    <div class="text-center   mb-6">
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
     
    <v-expansion-panels v-model="openedPanel">
        <v-expansion-panel>
            <v-expansion-panel-header>
                <span>
                    <v-icon>mdi-file-upload</v-icon> Subir del ordenador
                </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-file-input outlined :disabled="onSave || record_enabled" dense @change="setImage" v-model="files" color="deep-purple accent-4" label="Seleccionar imagen..." placeholder="Cargar imagen" accept="image/*" ref="inputImg">
                </v-file-input>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>
                <span>
                    <v-icon>mdi-camera</v-icon> Hacer una foto
                </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <WebCamCapture @captureImage="captureImage" :record_disable="record_enabled" ref="cameraRef" />
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    <CropImage :crop_dialog.sync="crop_dialog" :currentImage.sync="inputImage" @clearInputImage="clearInputImage" @cropImageResult="cropImageResult" />
</div>
</template>
<script>
export default {
    data() {
        return {
            openedPanel: null,
            onSave: false,
            show1: false,
            // Upload image
            crop_dialog: false,
            finalImage: null,
            inputImage: null,
            files: [],
            imageDefault: require('@/assets/images/image_icon.svg'),
            imageUpload: null,
            record_enabled: false,
        }
    },
    components: {
        CropImage: () => import('./ImageUser/CropImage.vue'),
        WebCamCapture: () => import('../components/WebCamCapture.vue'),
    },
    methods: {
        cropImage() {
            this.crop_dialog = true
            this.inputImage = this.finalImage
        },
        cropImageResult(imageResult) {
            this.finalImage = imageResult
            this.closeAllPanels()
            if (this.inputImage) {
                this.files = []
            }
            this.$emit('finalImageResult', imageResult)
        },
        clearInputImage() {
            this.files = []
        },
        resetFinalImage() {
            this.finalImage = null
        },
        openPanel(index) {
            this.openedPanel = index
        },
        closeAllPanels() {
            this.openedPanel = null
        },
        setImage() {
            if (this.files instanceof Blob) {
                var reader = new FileReader()
                reader.readAsDataURL(this.files)
                reader.onload = () => {
                    this.inputImage = reader.result
                    this.crop_dialog = true
                };
            } else {
                this.inputImage = null
                this.closeAllPanels()
            }
        },
        //video
        captureImage(ImageURL) {
            let byteString =
                ImageURL.split(',')[0].indexOf('base64') >= 0 ?
                atob(ImageURL.split(',')[1]) :
                unescape(ImageURL.split(',')[1])
            const mimeString = ImageURL
                .split(',')[0]
                .split(':')[1]
                .split(';')[0]
            let ia = new Uint8Array(byteString.length)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            var reader = new FileReader()
            reader.readAsDataURL(new Blob([ia], {
                type: mimeString
            }))
            reader.onload = () => {
                this.inputImage = reader.result
                this.crop_dialog = true
                this.closeAllPanels()
            };
        },
    }
}
</script>
<style>
</style>
