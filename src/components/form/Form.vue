<template>
  <div>
    <form class="form">
      <InputComponent
        :name="'Your name'"
        class="form__input"
        :typeInput="'text'"
        @setInputValue="inputName"
      />
      <InputComponent
        :name="'Email'"
        :typeInput="'email'"
        class="form__input"
        @setInputValue="inputEmail"
      />
      <InputComponent
        :name="'Phone'"
        :typeInput="'tel'"
        @setInputValue="inputPhone"
      />
      <p>Select your position</p>
      <div v-for="position of positions" :key="position.id" class="form__radio">
        <label :for="`choice${position.id}`">
          <input
            type="radio"
            :id="`choice${position.id}`"
            name="contact"
            :checked="position.id === positionId"
            @change="setPositionId(position.id)"
          />
          {{ position.name }}
          <span></span>
        </label>
      </div>
      <div class="form__upload">
        <label for="file">
          <div
            class="form__upload-text-title"
            :class="validUploadInput ? 'error' : ''"
          >
            Upload
          </div>
          <span
            class="form__upload-text"
            :class="validUploadInput ? 'error' : ''"
            >{{ pathPhotoText ? pathPhotoText : "Upload your photo" }}</span
          >
          <input type="file" id="file" @change="getValue" ref="uploadFile" />
        </label>
        <span class="no-valid" v-if="validUploadInput">Error text</span>
      </div>
      <div class="form__auth">
        <button
          :class="validFormField ? 'btn' : 'btn-disabled'"
          @click.prevent="submit"
          :disabled="!validFormField"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InputComponent from "../inputComponent/inputComponent";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Form",
  components: { InputComponent },
  data() {
    return {
      pathPhotoText: "",
      formData: {
        name: {},
        email: {},
        phone: {},
        imageFile: null,
      },
      validUploadInput: false,
    };
  },

  mounted() {
    this.getPosition();
  },

  methods: {
    ...mapActions({
      getPosition: "getPosition",
      getApiUsers: "getApiUsers",
    }),

    getValue(e) {
      this.pathPhotoText = e.target.value;
      this.formData.imageFile = this.$refs.uploadFile.files[0];

      if (
        this.formData.imageFile.size > 5242880 ||
        this.formData.imageFile.type !== "image/jpeg" ||
        this.formData.imageFile.type === "image/png"
      ) {
        this.validUploadInput = true;
      } else {
        this.validUploadInput = false;
      }
    },

    inputName(name) {
      this.formData.name = name;
    },

    inputEmail(email) {
      this.formData.email = email;
    },

    inputPhone(phone) {
      this.formData.phone = phone;
    },

    setPositionId(id) {
      this.formData.postionId = id;
    },

    submit() {
      if (this.validFormField) {
        this.$store.dispatch("getSubmit", {
          ...this.formData,
          positionId: this.positionId,
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      positions: "positions",
      positionId: "positionId",
      users: "users",
      responseSuccess: "responseSuccess",
    }),

    validFormField() {
      return (
        this.formData.name.status &&
        this.formData.email.status &&
        this.formData.phone.status &&
        !this.validUploadInput &&
        this.formData.imageFile
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 380px;
  margin: 50px auto 0;

  &__input {
    margin-bottom: 50px;
  }

  p {
    margin: 25px 0 10px;
  }

  &__radio {
    margin-bottom: 5px;

    label {
      position: relative;
      padding-left: 32px;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      cursor: pointer;
    }

    input {
      display: none;
      &:checked ~ span::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    span {
      left: 0px;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #00bdd3;
      display: block;
      position: absolute;

      &::after {
        content: "";
        width: 10px;
        height: 10px;
        background-color: #00bdd3;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: 300ms ease-in-out 0s;
      }
    }
  }

  &__upload {
    position: relative;
    label {
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      display: flex;
      align-items: center;
      margin-top: 50px;
    }

    input {
      display: none;
    }

    &-text-title {
      border: 1px solid rgba(0, 0, 0, 0.87);
      border-radius: 4px 0px 0px 4px;
      padding: 14px 15px;
      display: block;
    }

    &-text {
      border: 1px solid #d0cfcf;
      border-radius: 0px 4px 4px 0px;
      padding: 14px 15px;
      color: #7e7e7e;
      width: 380px;
      display: block;
    }
  }

  &__auth {
    margin-top: 50px;
    text-align: center;
  }
}

.error {
  border: 1px solid #cb3d40;
}

.no-valid {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-top: 4px;
  color: #cb3d40;
  position: absolute;
  right: 0;
}
</style>
