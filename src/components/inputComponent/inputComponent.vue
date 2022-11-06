<template>
  <div class="input-wrap">
    <label for="name" class="label" :class="validInputValue ? 'error' : 'label'">
      <input
        :type="typeInput"
        required
        v-model="inputValue"
        @input="setInputValue"
        @blur="checkBlurInput"
      />
      <span>{{ name }}</span>
    </label>
    <span class="no-valid" v-if="validInputValue">Error text</span>
    <div v-if="typeInput === 'tel'" class="placeholder">
      +38 (XXX) XXX - XX - XX
    </div>
  </div>
</template>
<script>
export default {
  name: "InputComponent",
  props: {
    name: {
      type: String,
      require: true,
    },
    typeInput: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      inputValue: this.typeInput === "tel" ? "+380" : "",
      validInputValue: false,
    };
  },

  methods: {
    setInputValue() {
      if (this.checkValid) {
        this.validInputValue = false;
         this.$emit("setInputValue", {value: this.inputValue, status: true});
      }else {
        this.validInputValue = true
        this.$emit("setInputValue", {value: '', status: false});
      }

     
    },

    checkValidName() {
      return this.inputValue.length >= 2 && this.inputValue.length <= 60;
    },

    checkValidEmail() {
      const filter =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
      return this.inputValue.match(filter);
    },

    checkValidPhone() {
      const filter = /^\+?380\d{9}$/;
       if(this.inputValue.match(filter)) {
        this.$emit("inputPhone", true);
      }
      return  this.inputValue.match(filter);
    },

    checkBlurInput() {
      if (!this.checkValid) {
        this.validInputValue = true;
      }
    },
  },

  computed: {
    checkValid() {
      return this.typeInput === "text"
        ? this.checkValidName()
        : this.typeInput === "email"
        ? this.checkValidEmail()
        : this.typeInput === "tel"
        ? this.checkValidPhone()
        : "";
    },
  },
};
</script>
<style lang="scss" scoped>
.input-wrap {
  position: relative;
}
.label {
  width: 100%;
  height: 54px;
  position: relative;
  border: 1px solid #d0cfcf;
  border-radius: 4px;
  display: block;

  input {
    width: 100%;
    padding: 14px 16px;
    border: none;
    outline: none;
    background: transparent;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #7e7e7e;
    position: absolute;
    bottom: 0;
    z-index: 1;

    &:focus + span,
    &:valid + span {
      top: -12px;
      left: 15px;
      background-color: $background-color;
      padding: 0 10px;
    }
  }

  span {
    color: $input-text;
    font-size: 16px;
    position: absolute;
    top: 14px;
    left: 16px;
    transition: 0.2s;
    z-index: 0;
    cursor: text;
  }
}

.placeholder {
  margin-top: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #7e7e7e;
  margin-left: 16px;
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
