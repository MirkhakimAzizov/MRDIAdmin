<template>
  <nav class="navbar py-4 bg-body-secondary">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div
          class="text-dark link-underline link-underline-opacity-0 d-flex align-items-center gap-2"
        >
          <img width="60" src="../assets/logo.png" alt="MRDI Logo" />
          <span class="lh-sm d-none d-sm-block">{{
            title[selectedLanguage]
          }}</span>
          <span class="lh-sm d-sm-none d-block fw-bold">MRDI</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="ms-3">
            <Lang v-model="selectedLanguage" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Lang from "./Lang.vue";

export default {
  name: "Navbar",
  components: {
    Lang,
  },
  data() {
    return {
      selectedLanguage: localStorage.getItem("lang") || "en",
      title: {
        uz: "Kamoliddin Behzod nomidagi Milliy rassomlik va dizayn instituti",
        ru: "Национальный институт живописи и дизайна имени Камолиддина Бехзода",
        en: "National Institute of Painting and Design named after Kamoliddin Behzod",
      },
      application: {
        uz: "Ariza holati",
        ru: "Статус",
        en: "Status",
      }
    };
  },
  watch: {
    selectedLanguage(newValue) {
      localStorage.setItem("lang", newValue);
    },
  },
};
</script>

<style scoped>
</style>
