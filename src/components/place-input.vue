<template>
    <label>
        <span v-text="label"></span>
        <input type="text" :placeholder="placeholder" :class="className"
          ref="input"/>
    </label>
</template>

<script>
export default ((x) => x.default || x)(require('../components-implementation/place-input.js'))
</script>
