<template>
<div>

   
    <div v-show="isCameraOpen && isLoading">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
    </div>
    <v-card   v-if="isCameraOpen" v-show="!isLoading">
        <video ref="camera" autoplay class="pa-0 ma-0"></video>
        <canvas hidden id="photoTaken" ref="canvas" :width="640" :height="480"></canvas>
    </v-card>
     <div class="d-flex justify-space-between align-center">
        <v-switch :disabled="record_disable" v-model="activateCam" dense inset @click="toggleCamera"></v-switch>
        <v-btn @click="takePhoto"  color="success" :disabled="!isCameraOpen" small rounded>
           Tomar foto
        </v-btn>
    </div>
    

</div>
</template>

<script>
export default {
    props: {
        record_disable: {
            default: false
        }
    },
    data() {
        return {
            activateCam: false,
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            link: '#'
        }
    },
   
    methods: {
        toggleCamera() {
            if (this.isCameraOpen) {
                this.isCameraOpen = false;
                this.isPhotoTaken = false;
                this.isShotPhoto = false;
                this.activateCam = false
                this.stopCameraStream();
            } else {
                this.isCameraOpen = true;
                this.createCameraElement();
            }
        },
        createCameraElement() {
            this.isLoading = true;
            const constraints = (window.constraints = {
                audio: false,
                video: true
            });
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false;
                    alert("May the browser didn't support or there is some errors.");
                });
        },
        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();
            tracks.forEach(track => {
                track.stop();
            });
        },
        takePhoto() {
            if (!this.isPhotoTaken) {
                this.isShotPhoto = true;
                const FLASH_TIMEOUT = 50;
                setTimeout(() => {
                    this.isShotPhoto = false;
                }, FLASH_TIMEOUT);
            }
            this.isPhotoTaken = !this.isPhotoTaken;
            const context = this.$refs.canvas.getContext('2d');
            context.drawImage(this.$refs.camera, 0, 0, 640, 480);
            var data = this.$refs.canvas.toDataURL("image/jpeg");
            this.$emit('captureImage', data)
            this.toggleCamera()
        },
    }
}
</script>

<style scoped>
video {
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
</style>
