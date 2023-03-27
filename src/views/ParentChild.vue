<!-- ParentComponent.vue -->
<template>
    <div>
      <button @click="childComponentFunction">Call child component function</button>
      <ChildComponent ref="childComponentRef" />
    </div>
  </template>
  
  <script>
  import ChildComponent from './ChildComponent.vue';
  
  export default {
    components: {
      ChildComponent,
    },
    methods: {
      childComponentFunction() {
        this.$refs.childComponentRef.childFunction();
      },
    },
  };
  </script>
  