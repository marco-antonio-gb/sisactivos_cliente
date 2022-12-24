const URL = "/asignaciones";
export default {
	methods: {
		async getAsignaciones() {
			try {
				this.onLoading = true;
				const { data } = await this.axios.get(URL);
				this.asignaciones=data.data
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
				if (this.$refs.formCreateAsignacion.validate()) {
					this.onSave = true;
					let response = await this.axios.post(
						URL,
						this.responsableForm
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
			}finally{
				this.onLoading = false;
			}
		},
		async update(ID) {
			this.onSave = true;
			try {
				const { data } = await this.axios.put(
					URL + "/" + ID,
					this.responsableForm
				);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					setTimeout(() => {
						this.$router.go(-1);
					}, 500);
				} else {
					this.showSnackbar(data.message, true, "error");
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
						const index = this.asignaciones.findIndex(
							(data) => data.responsable_id === ID
						);
						if (~index) this.asignaciones.splice(index, 1);
					});
					this.reloadAsignaciones();
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
		
		
	},
};
