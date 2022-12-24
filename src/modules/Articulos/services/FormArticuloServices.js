export default {
	methods:{
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
		async getCategorias() {
			this.loading_cat = true;
			let categorias = await this.axios.get("/categorias");
			if (categorias.data.success) {
				this.categorias = categorias.data.data;
			}
			this.loading_cat = false;
		},
		async getOrganismos() {
			this.loading_org = true;
			let orgs = await this.axios.get("/orgfinanciero");
			if (orgs.data.success) {
				this.organismos = orgs.data.data;
			}
			this.loading_org = false;
		},
	}
}