<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <form-fields-employee/>
    </v-layout>
  </v-container>
</template>

<script>

import FormFieldsEmployee from '../../../components/FormFieldsEmployee.vue'

export default {
  components: {
    FormFieldsEmployee
  }

}
</script>
