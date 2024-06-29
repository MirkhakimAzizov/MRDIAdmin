<template>
  <select 
    style="width: 75px" 
    class="form-select" 
    aria-label="Default select example" 
    :value="modelValue" 
    @change="updateValue($event.target.value)"
  >
    <option value="en">EN</option>
    <option value="uz">UZ</option>
    <option value="ru">RU</option>
  </select>
</template>

<script>
export default {
  name: "Lang",
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value);
      location.reload();
    }
  }
};
</script>

<style scoped>
</style>
