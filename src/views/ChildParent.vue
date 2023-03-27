<!-- ChildComponent.vue -->
<template>
    <div>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: 'Hello from child component!',
      };
    },
    methods: {
      childFunction() {
        this.message = 'Child component function was called!';
      },
    },
  };
  </script>
  