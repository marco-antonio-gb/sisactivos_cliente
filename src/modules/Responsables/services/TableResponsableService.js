export default {
	methods: {
		updateItem(item) {
			this.$router.push({
				path: "/responsables/update/" + item.responsable_id,
			});
		},
		async bajaItem(item) {
			let title = "Confirmación para desactivar cuenta";
				let message =
					"El usuario " +
					"<b>" +
					item.usuario.nombre_completo +
					" </b> " +
					" dejara de tener acceso al sistema. ¿Seguro que quieres continuar?";
				if (!item.estado) {
					message =
						"El usuario " +
						"<b>" +
						item.usuario.nombre_completo +
						" </b> " +
						"volvera a tener acceso al sistema. ¿Seguro que quieres continuar?";
					title = "Confirmación para activar cuenta";
				}
				if (await this.$refs.confirm.open(title, message)) {
					this.bajaResponsable(item.responsable_id);
				}
		},
		async bajaResponsable(item) {
			try {
				const { data } = await this.axios.get(
					"responsable-baja/" + item
				);
				if (data.success) {
					this.showSnackbar(data.message, true, "success");
					this.reloadResponsables()
				} else {
					this.showSnackbar(data.message, true, "error");
				}
			} catch (error) {
				this.showSnackbar(
					error.name + ": " + error.response.data.message,
					true,
					"error"
				);
			} finally {
				this.$refs.confirm.cancel();
			}
		},
		async deleteItem(item) {
			if (
				await this.$refs.confirm.open(
					"Confirmacion para eliminar Responsable",
					"Esta acción es irreversible ¿Segur@ que quieres continuar?"
				)
			) {
				this.delete(item);
			}
		},
		reloadResponsables() {
			this.getResponsables();
		},
	},
};
