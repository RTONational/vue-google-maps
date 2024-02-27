/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

<template>
  <div>
    <div ref="flyaway"> <!-- so named because it will fly away to another component -->
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
import Implementation from '../components-implementation/info-window'
export default Implementation
// export default ((x) => x.default || x)(require('../components-implementation/info-window'))
</script>
