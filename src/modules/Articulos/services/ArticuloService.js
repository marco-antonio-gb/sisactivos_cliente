const URL = "/articulos";
export default {
	methods: {
		/**
		 * Get all records
		 */
		async getArticulos() {
			try {
				this.onLoading = true;
				const { data } = await this.axios.get(URL);
				this.articulos = data.data;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.onLoading = false;
			}
		},
		/**
		 * Create  Usuario
		 */
		async created() {
			try {
				if (this.$refs.formCreateArticulo.validate()) {
					this.onSave = true;
					let formData = new FormData();
					formData.append("imagen", this.finalImage);
					formData.append("data", JSON.stringify(this.articuloForm));
					let response = await this.axios.post(URL, formData);
					if (response.data.success) {
						this.showSnackbar(
							response.data.message,
							true,
							"success"
						);
						setTimeout(() => {
							this.$router.go(-1);
						}, 500);
					} else {
						this.showSnackbar(response.data.errors, true, "error");
					}
					this.onSave = false;
				} else {
					this.showSnackbar(
						"Complete la informacion requerida",
						true,
						"error"
					);
				}
			} catch (error) {
				this.onSave = false;
				this.showSnackbar(
					error.name + ": " + error.message,
					true,
					"error"
				);
			}
		},
		async show(ID) {
			this.onLoading = true;
			try {
				const { data } = await this.axios.get(URL + "/" + ID);
				this.persona = data.data;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onLoading = false;
		},
		async update(ID) {
			this.onSave = true;
			try {
				const { data } = await this.axios.put(
					URL + "/" + ID,
					this.persona
				);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					setTimeout(() => {
						this.$router.go(-1);
					}, 500);
				} else {
					this.showSnackbar(data.validator, true, "success");
				}
				this.onSave = false;
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onSave = false;
		},
		async delete(ID) {
			this.onSave = true;
			try {
				let response = await this.axios.delete(URL + "/" + ID);
				console.log(response.data)
				if (response.data.success) {
					this.showSnackbar(response.data.message, true, "success");
					this.$refs.confirm.cancel()
					// this.$nextTick(() => {
					// 	const index = this.articulos.findIndex(
					// 		(post) => post.idArticulo === ID
					// 	);
					// 	if (~index) this.articulos.splice(index, 1);
					// });
					this.getArticulos()
				} else {
					this.$refs.confirm.cancel()
					this.showSnackbar(response.data.validator, true, "success");
				}
				this.onSave = false;
			} catch (error) {
				this.$refs.confirm.cancel()
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}
			this.onSave = false;
		},
		async delRecord(ID) {
            if (
                await this.$refs.confirm.open(
                    "Confirmacion para eliminar item",
                    "Esta seguro que quiere eliminar este Articulo?"
                )
            ) {
                this.delete(ID);
            }
        },
	},
};
