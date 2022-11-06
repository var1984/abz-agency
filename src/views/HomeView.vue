<template>
  <div>
    <header class="header container">
      <div class="header__logo">
        <img src="../assets/images/logo.svg" alt="" />
      </div>
      <div class="header__register-btn">
        <button
          @click="getUsers"
          :class="users.length > 0 ? 'btn-disabled' : 'btn'"
          :disabled="users.length > 0"
        >
          Users
        </button>
        <button
          @click="goToForm('form')"
          v-if="!responseSuccess"
          :class="responseSuccess ? 'btn-disabled' : 'btn'"
        >
          Sign up
        </button>
      </div>
    </header>
    <div class="wrap">
      <main class="container main" v-if="!loader">
        <div class="main__intro">
          <div class="main__intro-text">
            <h1>Test assignment for front-end developer</h1>
            <p>
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <button
              @click="goToForm('form')"
              v-if="!responseSuccess"
              :class="responseSuccess ? 'btn-disabled' : 'btn'"
            >
              Sign up
            </button>
          </div>
        </div>

        <div class="main__users-block" v-if="users.length">
          <h2>Working with GET request</h2>
          <div class="main__users-wrap">
            <User :user="user" v-for="user of users" :key="user.id" />
          </div>
          <div class="main__show-more">
            <button
              class="btn"
              @click="addMoreUsers"
              v-if="users.length !== total"
            >
              Show more
            </button>
          </div>
        </div>
        <div class="main__form" v-if="!responseSuccess" ref="form">
          <h2>Working with POST request</h2>
          <Form />
        </div>
        <div class="main__success" v-else>
          <h2>User successfully registered</h2>
          <img src="../assets/images/success-image.png" alt="" />
        </div>
      </main>
      <Loader class="load" v-else />
    </div>
  </div>
</template>

<script>
import User from "../components/user/User";
import Form from "../components/form/Form";
import Loader from "../components/loader/loader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: { User, Form, Loader },
  methods: {
    ...mapActions({
      getApiUsers: "getApiUsers",
    }),

    getUsers() {
      this.getApiUsers();
    },

    addMoreUsers() {
      this.getApiUsers();
    },

    goToForm(refName) {
      const element = this.$refs[refName];
      const top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },

  computed: {
    ...mapGetters({
      users: "users",
      total: "total",
      responseSuccess: "responseSuccess",
      loader: "loader",
    }),
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 13px 0;
  align-items: center;

  &__register-btn {
    margin-left: auto;

    .btn,
    .btn-disabled {
      &:first-child {
        margin-right: 10px;
      }
    }
  }

  &__logo {
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 13px 60px;
  }

  @media (max-width: 768px) {
    padding: 13px 32px;
  }

  @media (max-width: 380px) {
    padding: 13px 16px;
  }
}

.main {
  padding-bottom: 100px;
  &__intro {
    background-image: url("../assets/images/sky.jpeg");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 650px;
    display: flex;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    }

    @media (max-width: 768px) {
      height: 500px;
    }
  }

  &__intro-text {
    max-width: 380px;
    margin: auto;
    text-align: center;
    color: #fff;
    z-index: 1;

    h1 {
      margin-bottom: 21px;
    }

    p {
      margin-bottom: 32px;
    }

    @media (max-width: 360px) {
      margin: 40px auto;
      padding: 0 16px;
    }
  }

  &__users-block {
    margin-top: 140px;

    @media (max-width: 360px) {
      padding: 0 16px;
    }
  }

  &__users-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 29px;
    margin-top: 50px;

    @media (max-width: 1024px) {
      padding: 0px 60px;
    }

    @media (max-width: 768px) {
      padding: 0px 32px;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 360px) {
      padding: 0 16px;
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  &__show-more {
    margin-top: 50px;
    text-align: center;
  }

  &__form {
    margin-top: 140px;

    @media (max-width: 360px) {
      padding: 0 16px;
    }
  }

  &__success {
    text-align: center;
    margin-top: 140px;

    h2 {
      margin-bottom: 50px;
    }
  }
}

.load {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
