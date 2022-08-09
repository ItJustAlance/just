<template>
  <div class="just-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="just-select__dropdown" :class="{ 'just-select-hide': !open }">
      <ul class="just-select__list">
        <li
            class="just-select__list-item"
            :class="{active : i == selectIndex}"
            v-for="(option, i) of options"
            :key="i"
            @click="onSelect(option, i)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>



export default {
  name: 'justSelect',
  inheritAttrs: false,
  props: {
    inputId: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
   
  },
  data () {
    return {
      selectIndex: null,
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    }
  },
  mounted () {
    this.$emit("input", this.selected);
  },
  beforeDestroy () {
  
  },
  methods: {
   onSelect(option, index) {
     this.selected = option;
     this.selectIndex = index;
     this.open = false;
     this.$emit('input', option)
   },
  },
  computed: {
  
  }

}
</script>

<style>
/*
.just-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  &-hide {
    display: none;
  }
  &:hover {
    .selected {
      border-color: #3478F6;
    }
  }
  .selected {
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid rgba(0,0,39,0.2);
    color: rgba(0,0,0,0.6);
    padding-left: 16px;
    cursor: pointer;
    user-select: none;
    display: block;
    width: 100%;
    position: relative;
    &-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 10px;
    }
    &:after {
      position: absolute;
      content: "";
      top: 22px;
      right: 10px;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #3478F6 transparent transparent transparent;
    }
    &.open {
      border: 1px solid #3478F6;
      border-radius: 6px 6px 0 0;
    }
  }
  &__dropdown {
    color: rgba(0,0,0,0.87);
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    border-right: 1px solid rgba(0,0,39,0.2);
    border-left: 1px solid rgba(0,0,39,0.2);
    border-bottom: 1px solid rgba(0,0,39,0.2);
    position: absolute;
    background-color: #fff;
    left: 0;
    right: 0;
    z-index: 1;
    top: 100%;
  }
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: auto;
    max-height: 250px;
    &-item{
      padding: 2px 15px;
      cursor: pointer;
      user-select: none;
      font-size: 13px;
      &:hover, &.active {
        background-color: #3478F6;
        color: #fff;
        
      }
    }
  }
}
 */
</style>
