<template>
  <div id="app">
    <!-- Home / -->
    <!-- AddTodo />
    <FilterTodos />
    <Todos / -->
    <just-modal></just-modal>
    <just-button-modal
        button-text="Нажми Кнопку"
        modal-local-component="FormDynamic"
        :comp-params="{
            modalClass: 'modal-form-normal mobile-modal-bottom',
            modalComponentClass: 'class-component2'
            }"
        :modal-local-component-params='{"formId":12345435,"userId":3123435534,"fp":32135345,"formUrl":"/api/default/send-phone","formTitle":"Уз2нать о появлении квартир","formText":"Мы свяжемся с вами, чтобы вы первыми узнали о появлении в продаже квартир в данном ЖК или сможем вам предложить похожие варианты.","formInputs":[{"name":"name-phone","value":"","type":"phone","mask":"+7 (###) ###-##-##","validate":{"required":true,"regex":"/^+7s(d{3})sd{3}-d{2}-d{2}$/"},"errorMessage":{"required":"Обязательное поле для заполнения","regex":"Неправильный формат телефона"},"placeholder":"Ваш телефон"},{"name":"name-pass","value":"","placeholder":"пароль"},{"name":"name-email","value":"","placeholder":"Электронная почта","validate":"email","errorMessage":{"email":"Неправильный формат почты"}}],"formSubmitText":"Отправить заявку","formSmallText":"Нажимая на кнопку, вы соглашаетесь на обработку персональных данных в соответствии с <a>политикой конфиденциальности</a>"}'
    ></just-button-modal>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import AddTodo from "@/components/AddTodo.vue";
// import Todos from "@/components/Todos.vue";
// import FilterTodos from "@/components/FilterTodos.vue";

import JustModal from "@/components/JustModal";
import JustButtonModal from "@/components/JustButtonModal";
export default {
  name: "App",
  components: {
    JustModal,
    JustButtonModal
    // HelloWorld
    // AddTodo,
    // Todos,
    // FilterTodos,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
