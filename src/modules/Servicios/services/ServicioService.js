const URL = "/servicios";
export default {
	methods: {
		async getServicios() {
			try {
				this.onLoading = true;
				const { data } = await this.axios.get(URL);
				this.servicios=data.data
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
		async created() {
			try {
				if (this.$refs.formCreateServicio.validate()) {
					this.onSave = true;
					let response = await this.axios.post(
						URL,
						this.servicioForm
					);
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
				this.servicio = data.data;
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
					this.servicio
				);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					this.$nextTick(() => {
						const index = this.servicios.findIndex(
							(post) => post.idServicio === ID
						);
						if (~index) this.servicios.splice(index, 1);
					});
					setTimeout(() => {
						this.$router.go(-1);
					}, 500);
					this.reloadServicios();
				} else {
					this.showSnackbar(data.validator, true, "success");
				}
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}finally{
				this.onSave = false;
			}
		},

		async delete(ID) {
			try {
				this.onSave = true;
				const { data } = await this.axios.delete(URL + "/" + ID);
				if (data.success) {
					this.$refs.confirm.cancel();
					this.showSnackbar(data.message, true, "success");
					this.$nextTick(() => {
						const index = this.servicios.findIndex(
							(post) => post.idServicio === ID
						);
						if (~index) this.servicios.splice(index, 1);
					});
					this.reloadServicios();
				}
			} catch (error) {
				this.$refs.confirm.cancel();
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			}finally{
				this.onSave = false;
			}
		},
		reloadServicios() {
			this.servicios=[]
			this.getServicios();
		},
		cancelarCreateServicio() {
			this.$router.go(-1);
		},
	},
};
