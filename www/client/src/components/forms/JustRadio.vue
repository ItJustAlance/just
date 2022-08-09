<template>
  <div class="just-radio">
    <input
        :id="inputId"
        type="radio"
        class="just-radio__input"
        :checked="isChecked"
        :value="inputValue"
        :name="inputName"
        v-model="model"
        @change="$emit('change', $event.target.value)"
    >
    <label class="just-radio__label" :for="inputId">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script>



export default {
  name: 'just-radio',
  props: {
    modelValue: {
      default: ""
    },
    inputId: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: undefined
    },
    inputValue: {
      type: String,
      default: ''
    },
    inputName: {
      type: String,
      default: ''
    },
    /*
    inputChecked: { // список выделенных радио name: value
      type: Object,
      default: {}
    }
    
     */
  },
  data () {
    return {

    }
  },
  mounted () {
  
  },
  beforeDestroy () {
  
  },
  methods: {
  
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    isChecked(){
      // console.log('JUST RADIO this.inputChecked', this.inputChecked);
      return  this.modelValue == this.value // this.modelValue == this.value
    },
    /*
    isChecked: {
      get: function() {
        return this.value
      },
      set: function() {
        // Communicate the change to parent component so that selectedValue can be updated
        this.$emit("change", this.inputValue)
      }
    },
    
     */

  }
}
</script>

<style lang="scss">
.just-radio {
  &__input {
    position: absolute;
    top: 0;
    left: -999em;
    opacity: 0;
    
    &:checked + .just-radio__label:before {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  &__label {
    display: block;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    
    &:before {
      width: 7px;
      height: 7px;
      background: #3478F6;
      position: absolute;
      top: 5px;
      left: 3px;
      transform: scale(0);
      opacity: 0;
      transition: all 0.3s ease;
      content: "";
      display: block;
      border-radius: 50%;
    }
    
    &:after {
      width: 13px;
      height: 13px;
      content: "";
      border: 1px solid #3478F6;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 0;
    }
  }
}


</style>
