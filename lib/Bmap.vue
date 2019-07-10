<template>
  <ele-form-bmap
    :class="desc.class"
    :style="desc.style"
    @input="handleChange"
    v-bind="attrs"
    v-model="newValue"
    v-on="desc.on"
  />
</template>

<script>
import EleFormBmap from './EleFormBmap'
import formMixin from 'vue-ele-form/lib/mixins/formMixin'

export default {
  name: 'bmap',
  mixins: [formMixin],
  components: {
    EleFormBmap
  }
}
</script>
