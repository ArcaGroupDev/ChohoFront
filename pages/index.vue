<template>
</template>

<script>
export default {
  middleware: [
    function ({ redirect }) {
      redirect('/login')
      /*NUevo Index*/
    },
  ],
}
</script>