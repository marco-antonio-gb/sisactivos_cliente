const URL = "/usuarios";
export default {
  methods: {
    /**
     * Get all records
     */
    async getUsuarios() {
      try {
        this.onLoading = true;
        const { data } = await this.axios.get(URL);
        this.usuarios = data.data;
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
     * Create new Usuario
     */
    async create() {
      this.onSave = true;
      try {
        if (this.$refs.createUsuarioForm.validate()) {
          const { data } = await this.axios.post(URL, this.usuario);
          if (data.success) {
            this.showSnackbar(data.message, true, "success");
            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          } else {
            this.showSnackbar(data.validator, true, "warning");
          }
          this.onSave = false;
        }
      } catch (error) {
        this.showSnackbar(
          error.name + ": " + error.response.data.message,
          true,
          "error"
        );
      }
      this.onSave = false;
    },
    async show(ID) {
      this.onLoading = true;
      try {
        const { data } = await this.axios.get(URL + "/" + ID);
        this.usuario = data.data;
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
        let response = await this.axios.put(URL + "/" + ID, this.usuario);
        console.log(response)
        if (response.data.success) {
          this.showSnackbar(response.data.message, true, "success");
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        } else {
          this.showSnackbar(response.data.errors, true, "warning");
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
        const { data } = await this.axios.delete(URL + "/" + ID);
        if (data.success) {
          this.showSnackbar(data.message, true, "success");
          this.$nextTick(() => {
            const index = this.usuarios.findIndex(
              (post) => post.idUsuario === ID
            );
            if (~index) this.usuarios.splice(index, 1);
          });
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
    /**
     * Others Methods --------------------------------------------------------------
     */
    getColor(estado) {
      if (!estado) return "red";
      else if (estado) return "green";
      else return "primary";
    },
    getLabel(estado) {
      if (estado) return "Activo";
      else if (!estado) return "Desactivado";
      else return "Error";
    },
    cancelUpdateUsuario() {
      this.$router.go(-1);
      this.$refs.updateUsuarioForm.reset();
    },
    cancelarCreateUsuario() {
      this.$router.go(-1);
      this.$refs.createUsuarioForm.reset();
    },
    async blockUserAccount(usuario_id, status) {
      let user = {
        usuario_id: usuario_id,
      };
      let url = status ? "/suspend-account" : "activate-account";
      try {
        let response = await this.axios.post(url, user);
        if (response.data.success) {
            this.$refs.confirm.cancel();
          this.showSnackbar(response.data.message, true, "success");
          setTimeout(() => {
            if (this.$route.path === "/usuarios") {
              this.$refs.confirm.cancel();
              this.getUsuarios();
            } else {
              this.show(usuario_id);
            }
          }, 500);
        } else {
            this.$refs.confirm.cancel();
          this.showSnackbar(response.data.message, true, "error");
        }
      } catch (error) {
        this.$refs.confirm.cancel();
        this.showSnackbar(
          error.name + ": " + error.response.data.message,
          true,
          "error"
        );
      }
    },
    async suspend(usuario) {
      if (this.$store.state.auth.user.data.usuario_id === usuario.usuario_id) {
        this.$router.push({
          name: "suspender-cuenta",
          params: { usuario_id: usuario.usuario_id},
        });
      } else {
        let title = "Confirmación para desactivar cuenta";
        let message =
          "El usuario " +
          "<b>" +
          usuario.nombre_completo +
          " </b> " +
          " dejara de tener acceso al sistema. ¿Seguro que quieres continuar?";
        if (!usuario.estado) {
          message =
            "El usuario " +
            "<b>" +
            usuario.nombre_completo +
            " </b> " +
            "volvera a tener acceso al sistema. ¿Seguro que quieres continuar?";
          title = "Confirmación para activar cuenta";
        }
        if (await this.$refs.confirm.open(title, message)) {
          this.blockUserAccount(usuario.usuario_id, usuario.estado);
        }
      }
    },
    generateUser() {
      //   let username = "";
      let unshuffled = [
        this.usuario.nombres,
        this.usuario.paterno,
        this.usuario.materno,
      ];

      let shuffled = unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      let randomitem = shuffled[Math.floor(Math.random() * shuffled.length)];
      let randomNumber = this.generateRandomIntegerInRange(1000, 9999);
      let userName = randomitem.replace(/\s/g, "") + randomNumber;
      this.usuario.username = userName.toLowerCase().trim();
    },
    generateRandomIntegerInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateRandomUser() {
      let username = "";

      username = this.randomPassword(10) + "@campoferial3dejulio.com";
      this.usuario.email = username;
    },
    randomPassword(length) {
      var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
      var pass = "";
      for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
      return pass;
    },
    generateName() {
      const var1 = this.usuario.paterno;
      const var2 = this.usuario.materno;
      const var3 = this.usuario.nombres;
      const var4 = this.usuario.ci;
      const var5 = this.usuario.ci_ext;
      const var6 = this.usuario.celular;
      let items = [var1, var2, var3, var4, var5, var6];
      let me = this;
      var newArr = items.map(function (item) {
        if (item === "" || item === null) {
          return (item = me.randomPassword(5));
        }
        return item;
      });
      let arr = items.filter(function (item) {
        return item !== "";
      });
      console.log(newArr);
      console.log(arr);
      let name1 = arr[Math.floor(Math.random() * arr.length)];
      let name2 = arr[Math.floor(Math.random() * arr.length)];
      // let name3 =this.convertToSlug(items[Math.floor(Math.random()*items.length)])
      let username = [name1, name2];
      console.log(username.join("-").toLowerCase());
      this.usuario.email = username.join("-");
    },
    async submitUsuarioCreate() {
      try {
        if (this.$refs.createUsuarioForm.validate()) {
          if (this.finalProfileImage) {
            this.onSave = true;
            let formData = new FormData();
            formData.append("foto", this.finalProfileImage);
            formData.append("data", JSON.stringify(this.usuario));
            let response = await this.axios.post(URL, formData);

            if (response.data.success) {
              this.showSnackbar(response.data.message, true, "success");
              this.cancelarCreateUsuario();
            } else {
              this.showSnackbar(response.data.errors, true, "error");
            }
            this.onSave = false;
          } else {
            this.showSnackbar("Seleccione una imagen", true, "warning");
          }
        }
      } catch (error) {
        this.onSave = false;
        this.showSnackbar(error.name + ": " + error.message, true, "error");
      }
    },
  },
};
