<template>
  <div class="user-card">
    <div class="user-card__image spacing">
      <img :src="user.photo" alt="photo" v-if="user.photo" />
      <img src="@/assets/images/no-photo.svg" alt="photo" v-else />
    </div>
    <div class="user-card__name spacing" v-b-tooltip.hover :title="user.name">
      <p>{{ user.name }}</p>
    </div>
    <div class="user-card__position">
      <p>{{ user.position }}</p>
    </div>
    <div class="user-card__email" v-b-tooltip.hover :title="user.email">
      <p>{{ user.email }}</p>
    </div>
    <div class="user-card__phone">
      <p>{{ user.phone }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",

  props: {
    user: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped lang="scss">
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 370px;
  max-height: 254px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;

  &__image {
    max-width: 70px;
    max-height: 70px;

    img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 50%;
    }
  }

  p {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .spacing {
    margin-bottom: 20px;
  }

  div {
    width: 100%;
    overflow: hidden;
  }
}

.b-tooltip {
  background-color: rgba(0, 0, 0, 0.87);
  color: #fff;
  padding: 3px 16px;
  border-radius: 4px;
}
</style>
