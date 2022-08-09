<template>
  <div class="form-input">
    <just-textarea
        v-if="inputType === 'textarea'"
        :class="inputClass"
        :inputId="inputId"
        :label="inputLabel"
        :amask="inputAmask"
        v-bind="$attrs"
        :value="value"
        v-on:input="$emit('input', $event)"
    >
      <slot></slot>
    </just-textarea>
    <just-checkbox
        v-else-if="inputType === 'checkbox'"
        :class="inputClass"
        :inputId="inputId"
        :label="inputLabel"
        :inputValue="value"
        v-model="MySelectedValues"
        v-bind="$attrs"
        >
      <slot></slot>
    </just-checkbox>
    <just-radio
        v-else-if="inputType === 'radio'"
        :class="inputClass"
        :inputId="inputId"
        :label="inputLabel"
        :inputName="inputName"
        :value="value"
        :inputValue="value"
        v-model="selectRadioValue"
        v-bind="$attrs"
        @change="changeValue"
    >
      <slot></slot>
    </just-radio>
    <just-select
        v-else-if="inputType === 'select'"
        :options="selectOptions"
        :default="value"
        class="select"
        @input="isSelected"
    />
    <!-- just-select
        v-else-if="inputType === 'select'"
        :type="inputType"
        :class="inputClass"
        :inputId="inputId"
        :label="inputLabel"
        :amask="inputAmask"
        v-bind="$attrs"
        :value="value"
        v-on:input="$emit('input', $event)"
    >
      <slot></slot>
    </just-select -->
    <just-input
        v-else
        :type="inputType"
        :class="inputClass"
        :inputId="inputId"
        :label="inputLabel"
        :amask="inputAmask"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event)"
    >
      <slot></slot>
    </just-input>
  </div>
</template>

<script>
import JustInput from '@/components/forms/JustInput'
import JustTextarea from '@/components/forms/JustTextarea'
import JustCheckbox from '@/components/forms/JustCheckbox'
import JustRadio from '@/components/forms/JustRadio'
import JustSelect from '@/components/forms/JustSelect'

export default {
  name: 'form-input',
  //directives: { mask },
  inheritAttrs: false,
  components: {
    JustInput,
    JustTextarea,
    JustCheckbox,
    JustRadio,
    JustSelect
  },
  props: {
    indx: { // знать индекс в обьекте
      type: Number,
      default: null
    },
    value:{
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    inputClass: {
      type: String,
      default: ''
    },
    inputId: {
      type: String,
      default: ''
    },
    inputLabel: {
      type: String,
      default: ''
    },
    inputName: {
    
    },
    inputAmask: {
      type: String,
      default: ''
    },
    inputChecked: {
      type: Boolean,
      default: false
    },
    isRadioChecked: {
      type: Object,
      default: {}
    },
    selectOptions: {
      type: Array
    },
    
  },
  data () {
    return {
      MySelectedValues: [], // для чебоксов
      // selectRadioValue: this.isRadioChecked || null // для radio
    }
  },
  watch: {
    // checkbox button
    MySelectedValues: function (newVal, oldVal) {
      console.log('newVal', newVal);
      console.log('oldVal', oldVal);
      if(newVal == this.value){
        this.$emit("isChecked", this.value, this.indx);
      }else{
        this.$emit("isChecked", null, this.indx);
      }
    },
    // radio button
    selectRadioValue: function (newVal, oldVal) {
      // console.log('watch newValRadio', newVal);
      // console.log('watch oldValRadio', oldVal);
      // this.$emit("isRadio", newVal, this.indx, this.inputName, oldVal, this.oldIndx);
    },
  },
  computed: {
    
    selectRadioValue: {
      get() {
        // Проверяем обьект с отмеченными чебоксами из FormDynamic
        return this.isRadioChecked[`${this.inputName}`] //nameradio1
      },
      set(value) {
        console.log('selectRadioValue set value', value)
        // this.$emit("isRadio", value, this.indx);
        // передаем выше в FormDynamic значение и индекс из массива который в FormDynamic
        
      },
      
    }
  },
  mounted() {
    this.isChecked();
   // this.isRadioChecked();
  },
  beforeDestroy () {
  
  },
  methods: {
    // проверяем если галка стоит, то записываем в массив value(значение)
    isChecked() {
      if(this.inputChecked === true){
        this.MySelectedValues.push(this.value)
      }
    },
    
    // для <select>
    isSelected(value){
      console.log('sel event', value)
      this.$emit('isSelected', value, this.indx)
    },
    
    
    
    // берем из JustRadio значение
    changeValue(newValue, oldValue) {
      console.log('method changeValue', newValue)
      // this.selectRadioValue = newValue;
      if(newValue == this.value){
        console.log('radio val1')
        this.$emit("isRadio", newValue, this.indx, this.inputName);
      }
    }
  },
  
}
</script>

<style lang="scss">



</style>
