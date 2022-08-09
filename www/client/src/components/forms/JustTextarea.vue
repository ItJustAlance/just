<template>
  <div class="vfl-has-label" :class="classObject">
    <div class="vfl-has-label-wrapper">
      <textarea
          :id="inputId"
          class="vfl-input v-form-control"
          @focus="updateFocus(true)"
          @blur="updateFocus(false)"
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
      ></textarea>
      <label class="vfl-label" :for="inputId">
        {{ floatLabel }}
      </label>
      <button v-if="isActive" @click="inputClear" class="vfl-clear"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" tabindex="-1" class="svg"><path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg></button>
    </div>
    <slot></slot>
  </div>
</template>

<script>

// import { mask } from 'vue-the-mask'


export default {
  name: 'just-textarea',
  // directives: { mask },
  inheritAttrs: false,
  props: {
    inputId: {
      type: String,
      default: ''
    },
    on: {
      type: Boolean,
      default: true
    },
    amask: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    dispatch: {
      type: Boolean,
      default: true
    },
    for: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      formEl: undefined,
      labelEl: undefined,
      isActive: false,
      isFocused: false,
    }
  },
  mounted () {
    this.formEl = this.$el.querySelector('input, textarea, select')
    this.formEl.addEventListener('input', this.updateIsActive)
    this.formEl.addEventListener('input', this.updateIsFocused)
    this.formEl.addEventListener('blur', this.updateIsFocused)
    this.formEl.addEventListener('focus', this.updateIsFocused)
    if (!this.for) {
      this.labelEl = this.$el.querySelector('label')
      this.labelEl.addEventListener('click', this.focusFormEl)
    }
    console.log('this.formEl', this.formEl)
    this.dispatchInput()
  },
  beforeDestroy () {
    this.formEl.removeEventListener('input', this.updateIsActive)
    this.formEl.removeEventListener('input', this.updateIsFocused)
    this.formEl.removeEventListener('blur', this.updateIsFocused)
    this.formEl.removeEventListener('focus', this.updateIsFocused)
  },
  methods: {
    dispatchInput () {
      if (this.dispatch) {
        const event = document.createEvent('HTMLEvents')
        event.initEvent('input', true, false)
        this.formEl.dispatchEvent(event)
      }
    },
    focusFormEl () {
      console.log('хуйня')
      this.formEl.focus()
    },
    updateIsActive (e) {
      this.isActive = e.target.value.length > 0
    },
    updateIsFocused (e) {
      // this.isFocused = e.target === document.activeElement && this.isActive
    },
    updateFocus(focus){
      // this.isActive = focus
      // console.log('fofcc', focus)
      this.$emit('updateFocus', focus)
      this.isFocused = focus
    },
    inputClear (e){
      this.isActive = false;
      this.$emit('input', e.target.value = '')
      //console.log('e.target.value', e.target.value)
    },
  },
  computed: {
    classObject () {
      return {
        'vfl-label-on-input': this.on && (this.isActive || this.fixed),
        'vfl-label-on-focus': this.isFocused
      }
    },
    formElType () {
      return this.formEl ? this.formEl.tagName.toLowerCase() : ''
    },
    floatLabel () {
      if (this.label) return this.label
      switch (this.formElType) {
        case 'input':
        case 'textarea':
          return this.formEl.placeholder
        case 'select':
          return this.formEl.querySelector('option[disabled][selected]').innerHTML
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss">

.vfl-has-label {
  position: relative;
}
.vfl-label {
  position: absolute;
  pointer-events: none;
  left: 16px;
  top: 12px;
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 39, 0.38);
  line-height: 1.3;
  transition: 0.2s ease all;
  display: inline-block;
}
.vfl-input:focus ~ .vfl-label,
.vfl-label-on-input .vfl-label,
.vfl-label-on-focus .vfl-label{
  top: -7px;
  left: 12px;
  pointer-events: all;
  opacity: 1;
  background: #fff;
  font-size: 12px;
  padding: 0 4px;
  
}
.vfl-label-on-input .vfl-input {
  font-weight: 500;
  color: rgba(0, 0, 39, 0.74)
}
.vfl-label {
  color: rgba(0, 0, 39, 0.38);
}
.vfl-label-on-focus .vfl-label {
  color: #3478F6;
}
.vfl-label-on-focus .v-form-control,
.vfl-has-label input:focus,
.vfl-has-label textarea:focus{
  border-color: #3478F6;
  box-shadow: 0 0 0 1px #3478F6;
}
.vfl-label-on-focus .vfl-label,
.vfl-has-label input:focus  ~ .vfl-label,
.vfl-has-label textarea:focus  ~ .vfl-label {
  color: #3478F6
}
.vfl-has-label input:focus,
.vfl-has-label textarea:focus,
.vfl-has-label select:focus {
  outline: 0;
}
.has-error .vfl-input,
.vfl-label-on-input.has-error .vfl-input,
.vfl-label-on-focus.has-error .vfl-input,
{
  border-color: #FF2929;
  box-shadow: 0 0 1px  #FF2929;
}
.has-error .vfl-label,
.has-error input:focus  ~ .vfl-label,
.vfl-label-on-input.has-error .vfl-label,
.vfl-label-on-focus.has-error .vfl-label {
  color: #FF2929;
}

.vfl-clear {
  position: absolute;
  top: 15px;
  right: 12px;
  width: 13px;
  height: 13px;
  background: rgba(0, 0, 39, 0.38);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #FF2929;
  }
  svg {
    width: 14px;
    height: 14px;
    fill: #fff
  }
}



</style>
