<template>
  <div
      v-if="isOpenState"
      class="just-modal fade"
      :class="[{'open' : isOpenState, 'in' : isShowAnimate}, modalClass]">
    <div class="just-modal__wrapper">
      <div class="just-modal__overlay" @click="closeModal"></div>
      <div class="just-modal__container">
        <div class="just-modal__body">
          <div v-if="isModalHeaderVisibility" class="modal-search__header">
            <div class="just-modal__header-box">
              <slot name="header"></slot>
              </div>
          </div><!--end modal-search__header -->
          <div v-if="isModalContentUp" class="just-modal__content">
            <div class="just-modal__content-wrap">
              <slot name="contentUp"></slot>
            </div>
          </div>
          <component
              v-if="modalComponentState !== ''"
              :class="modalComponentClass"
              :is="modalComponentState"
              :componentParams='componentParamsState'
          ></component>
          <div v-if="isModalContentDown" class="just-modal__content">
            <div class="just-modal__content-wrap">
              <slot name="contentDown"></slot>
            </div>
          </div>
          <button type="button" class="just-modal__close" @click="closeModal">
            <img src="@/assets/icons/cross-simple.svg"/>
          </button>
        </div><!--end just-modal__container -->
      </div><!--end just-modal__body -->
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

// Dynamic components которые можно использовать в попапах, у всех есть componentParams

import FormDynamic from "@/components/forms/FormDynamic";


export default {
  name: 'JustModal',
  components: {
    FormDynamic,
  },
  props: {
    modalTypeClass: {
      type: String,
      default: null
    },
    modalSlots: {
      type: Boolean,
      required: false,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [Array, Object],
      required: false
    },
    isLoader: {
      type: Boolean,
      default: false
    },
    isLegend:{
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShowAnimate: false,
      isLoaded: false,
    }
  },
  computed: {
    ...mapState('modals', [
      'isOpenState',
      'modalClass',
      'modalComponentClass',
      'modalComponentState',
      'componentParamsState',
      'options',
      'isModalHeaderVisibility',
      'isModalContentDown',
      'isModalContentUp',
    ]),
    
  },
  watch: {
    isOpenState(value) {
      if (value) {
        document.body.classList.add('lock');
        setTimeout(() => this.isShowAnimate = true, 300);
      }
    }
  },
  methods: {
    ...mapActions("modals", ["toggleModal"]),
    closeModal(){
      document.body.classList.remove('lock');
      this.isShowAnimate = false;
      setTimeout(() => this.toggleModal(false), 200);
    }
  }
}
</script>

<style>
/*
//@import "./src/assets/scss/common";

.just-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  display: none;
  text-align: center;
  background: rgba(0,0,0,0);
  backdrop-filter: blur(12px);
  padding: 0;
  font-size: 16px;
  overflow: auto;
  &.modal-form-normal {
    .just-modal {
      &__body {
        width: 395px;
      }
    }
  }
  
  &.open {
    display: block !important;
    opacity: 1;
    background: rgba(0,0,0,0.6);
    animation: show-over .3s linear 0s 1;
    .just-modal {
      &__overlay {
        
        opacity: 1;
      }
      &__wrapper {
      
      }
    }
  }
  &.in {
    .just-modal {
      &__wrapper {
        opacity: 1;
        top: 0;
        animation: show-wrapper .3s linear 0s 1;
      }
    }
  }
  &.mobile-modal-bottom {
    media(max-width:1023px){
      padding: 16px 0 0;
      align-items: flex-end;
      .just-modal {
        &__wrapper {
          width: 100%;
          max-width: 600px;
          top: auto;
          padding: 0;
          margin: 12px 0 0;
          align-items: flex-end;
          
          &:before {
            display: none;
          }
        }
        &__body {
          width: 100%;
          border-radius: 12px 12px 0 0;
        }
      }
    }
  }
  &.in {
    .just-modal {
      &__wrapper {
        media(max-width:1023px){
          opacity: 1;
          bottom: 0;
          top: auto;
          animation: show-wrapper-bottom-top .3s linear 0s 1;
        }
      }
    }
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: rgba(0,0,0,0);
    opacity: 0;
    transition: all 0.3s ease;
  }
  &__wrapper {
    max-width: 100vw;
    text-align: left;
    // max-height: 100vh;
    min-height: calc(100% - 3.5rem);
    padding: 0 20px;
    // width: 100%;
    // overflow-y: auto;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    margin: 0 auto;
    top: -100vh;
    opacity: 0;
    &:before {
      display: block;
      content: "";
      height: calc(100vh - 3.5rem);
      height: -webkit-min-content;
      height: -moz-min-content;
      height: min-content;
    }
  }
  &__body {
    min-width: 300px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 24px 36px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    position: relative;
  }
  &__container {
  }
  &__close {
    position: absolute;
    top: 24px;
    right: 24px;
    svg {
      fill: rgba(0, 0, 39, 0.38)
    }
    &:hover {
      svg {
        fill: #3478F6
      }
    }
  }
}
@keyframes show-over{
  0%{
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@keyframes show-wrapper{
  0%{
    top: -100vh;
  }
  100% {
    top: 0;
  }
}
@keyframes show-wrapper-bottom-top{
  0%{
    bottom: -100vh;
  }
  100% {
    bottom: 0;
  }
}

 */
</style>
