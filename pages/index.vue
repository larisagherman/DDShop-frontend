<script setup>
const {sayHello}=useUtiles();
sayHello();

const isDark = useDark()

useTitle(() => isDark.value ? '🌙 Fancy a evening dessert?' : '☀️ Fancy a morning sweet treat?!');
</script>
<template>
<Alert/>
  <div> Main page</div>
</template>