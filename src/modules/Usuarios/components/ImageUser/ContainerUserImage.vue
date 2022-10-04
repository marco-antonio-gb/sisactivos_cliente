<template>
<div>
    <div class="mb-3">
        <v-avatar size="200" class="avatar-shadow mt-3 mb-3">
            <v-img :src="imageDefault" alt="Fotografía"></v-img>
        </v-avatar>
    </div>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small v-bind="attrs" v-on="on">
                <v-icon class="mr-2">mdi-tray-arrow-up</v-icon> Agregar foto
            </v-btn>
        </template>
        <v-list nav dense>
            <v-list-item link @click="showFileUpload">
                <v-list-item-icon>
                    <v-icon>mdi-camera</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title> Desde camara</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="showFileUpload">
                <v-list-item-icon>
                    <v-icon>mdi-file-image</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title> Subir archivo</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
    
    <UploadImage :dialogUpload.sync="show_fileupload"></UploadImage>
    
</div>
</template>

<script>
import UserImage from '../../services/UserImage'
export default {
    data() {
        return {
            imageDefault: require('@/assets/images/profile_img.png'),
            finalImage: null,
            show_fileupload: false,
            
        }
    },
   
    mixins: [
        UserImage
    ],
    components: {
        UploadImage: () => import('./UploadImage.vue'),
       
    }
};
</script>

<style></style>
