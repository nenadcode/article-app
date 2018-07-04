<template>
  <div>
    <v-alert dismissible type="error" @input="onClose" :value="true">
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
