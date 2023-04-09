<template>
    <header>
      <h1>{{ title }}</h1>
      <Button 
        @btn-click="$emit('toggle-description')"
        :text="showDescription ? 'Hide Description' : 'Show Description'"
        :color="showDescription ? 'black' : ''"
      />
    </header>
</template>

<script>
import Button from "./Button.vue";

export default {
name: "Header",
components: {
    Button,
  },
props: {
    title: String,
    showDescription: Boolean
},
};
</script>

<style>
header {
  display: flex;
  justify-content:space-around;
  align-items: center;
  margin-bottom: 20px;
}
</style>
