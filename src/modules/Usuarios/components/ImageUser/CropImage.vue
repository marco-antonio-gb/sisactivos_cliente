<template>
<v-dialog v-model="crop_dialog" persistent width="440" scrollable>
    <v-card outlined>
        <v-card-title class="body-1">
            Recorta tu nueva foto de perfil
            <v-spacer></v-spacer>
            <v-btn @click="reset" icon small>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text class="d-flex align-center justify-center" style="min-height:200px">
            <div v-if="onLoading" class="text-center">
                <v-progress-circular indeterminate width="3" size="20"></v-progress-circular>
                <p class="text--secondary mt-2 caption">Cargando imagen...</p>
            </div>
            <cropper v-else :src="cropImage" ref="cropper" class="cropper" stencil-component="circle-stencil" :canvas="{
                minHeight: 0,
                minWidth: 0,
                maxHeight: 500,
                maxWidth: 500,
                }" :stencil-props="{
                    aspectRatio: 1
                    }" />
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block small color="primary" depressed @click="crop">
                Establecer foto de perfil
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import {
    Cropper
} from 'vue-advanced-cropper'
export default {
    data() {
        return {
            onLoading: false,
            toggle_none: null,

            cropImage: null,
        }
    },
    components: {
        Cropper
    },
    props: {
        crop_dialog: {
            default: false
        },
        currentImage: {
            default: null,
            required: true
        },
    },
    computed: {
        show: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        closeDialog() {
            this.$emit('update:crop_dialog', false)
            this.$emit('clearInputImage')

        },
        crop() {
            const {
                coordinates,
                canvas,
            } = this.$refs.cropper.getResult();
            this.coordinates = coordinates;
            this.$emit('cropImageResult', canvas.toDataURL())
            this.reset()
        },
        reset() {
            this.$emit('update:currentImage', null)
            this.closeDialog()
        },
    },
    watch: {
        crop_dialog: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(val) {
                if (val) {
                    this.onLoading = true
                    setTimeout(() => {
                        this.cropImage = this.currentImage
                        this.onLoading = false
                    }, 100);
                }
            }
        }
    }
}
</script>

<style>
</style>
