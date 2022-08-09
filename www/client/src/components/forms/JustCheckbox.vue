<template>
  <div class="just-checkbox">
    <input
        :id="inputId"
        type="checkbox"
        class="just-checkbox__input"
        :value="inputValue"
        v-model="model"
    >
    <label class="just-checkbox__label" :for="inputId">
      {{ label }}
      <svg class="ic-checked">
        <use xlink:href="#singlecheck-24"></use>
      </svg>
    </label>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'justCheckbox',
// directives: { mask },
  inheritAttrs: false,

  props: {
    inputId: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: Array,
    inputValue: String,
  },
  data() {
    return {}
  },
  mounted() {
  },
  
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    }
  },
  /*
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }, */
  
}
</script>

<style>
/*
.just-checkbox {
  &__input {
    position: absolute;
    top: 0;
    left: -999em;
    opacity: 0;
    &:checked + .just-checkbox__label .ic-checked {
      transform: scale(1);
      opacity: 1;
    }
  }
  &__label {
    display: block;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    .ic-checked {
      width: 22px;
      height: 22px;
      fill: #3478F6;
      position: absolute;
      top: -4px;
      left: -2px;
      transform: scale(0);
      opacity: 0;
      transition: all 0.3s ease;
    }
    &:after {
      width: 12px;
      height: 12px;
      content: "";
      border: 1px solid #3478F6;
      border-radius: 3px;
      position: absolute;
      top: 2px;
      left: 0;
    }
  }
}

 */
</style>
