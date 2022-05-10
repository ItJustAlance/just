<template lang="pug">
.home
  SvgIcon(name="arrow" title="Название")
  SvgIcon(name="arrow10" title="Название")
  // <img src="@/assets/slider__img--main-page-1.jpg">
    //img(src="./assets/copy_icon.png")
  router-link(to="/home") route Home
  router-link(to="/modals-page") route Modals
  router-link(to="/pagination-page") route Pagination
  router-view

</template>

<script>
// import {mapGetters, mapActions} from 'vuex';
// импортирует компонент
import SvgIcon from "@/components/SvgIcon";

export default {
  components: { SvgIcon },
  async mounted() {
    // this.fetchPosts();
  }
};
</script>
