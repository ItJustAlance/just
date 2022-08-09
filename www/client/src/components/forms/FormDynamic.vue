<template>
  <div class="just-form">
    <div class="just-form__header">
      <div class="just-form__header-title" v-html="formTitle"></div>
    </div>
    <div class="just-form__body">
      <div class="just-form-text" v-html="formText"></div>
      <form v-if="formInputs.length > 0" @submit.prevent="onSubmit">
        <div class="just-form-groups">
          <!-- pre>{{ formInputsResult }}</pre -->
          <div  class="just-form-group" v-for="(list, index) in formInputs">
            <form-input
              :indx="index"
              :input-type="list.type"
              :input-class="errors.has(`${list.name}`) ?  'has-error' : ''"
              :input-id="`name-${index}`"
              :input-label="list.placeholder"
              :input-name="list.name"
              :select-options="list.options"
              :name="list.name"
              v-validate.disable="list.validate"
              :input-amask="list.mask"
              :input-checked="list.checked"
              v-model="list.value"
              :data-vv-as="list.name"
              @isChecked="isChecked"
              :isRadioChecked="isRadioChecked"
              @isRadio="isRadio"
              @isSelected="isSelected"
            >
              <div v-if="errors.has(`${list.name}`) && onErrMessage(errors.firstRule(`${list.name}`), index) !== false" class="just-form-group__error-message">
                <svg class="w_16 help-24">
                  <use xlink:href="#help-24"/>
                </svg>
                <span>{{ onErrMessage(errors.firstRule(`${list.name}`), index) }}</span>
              </div>
            </form-input>
          </div>
        </div><!--end just-form-groups -->
        <div class="mb_20 msc_clr" v-if="error" v-html="error"></div>
        <button type="submit" class="just-form-btn">{{ formSubmitText }}</button>
      </form>
    </div>
    <div class="just-form__footer">
      <div class="just-form__footer-small-text" v-html="formSmallText">
      </div>
    </div>
  </div>
  
</template>
<script>
/*
 Универсальная форма,
 валидация с поддержкой параметров компонента vee-validate
 
 
 formInputs: {
        formId: this.itemData._id,
        userId: userId,
        fp: fp,
        formUrl: '/api/default/send-phone',
        formTitle: 'Узнать о появлении квартир',
        formText: 'Мы свяжемся с вами, чтобы вы первыми узнали о появлении в продаже квартир в данном ЖК или сможем вам предложить похожие варианты.',
        formInputs: [
          {
            name: 'name-pass',
            value: '',
            placeholder: 'пароль',
          },
          {
            name: 'name-phone',
            value: '',
            type: 'phone',
            mask: '+7 (###) ###-##-##',
            validate: {
              required: true,
              regex: this.phoneRegex,
            },
            errorMessage: {
              required: 'Обязательное поле для заполнения',
              regex: 'Неправильный формат телефона',
            },
            placeholder: 'Ваш телефон'
          },
          {
            name: 'name-email',
            value: '',
            placeholder: 'Электронная почта',
            validate: 'email',
            errorMessage: {
              email: 'Неправильный формат почты',
            },
          },
          
          
          {
            name: 'nameradio1',
            inputName: 'nameradio1',
            type: 'radio',
            checked: false,
            value: 'radio1',
            inputValue: 'radio1',
            placeholder: 'radio1',
            inputId: 'radio1',
            // validate: {
            //   required: true,
            // },
          },
          {
            name: 'name-textarea',
            type: 'textarea',
            value: '',
            placeholder: 'Textarea поле',
            validate: 'email',
            errorMessage: {
              email: 'Неправильный textarea',
            },
          },
          {
            name: 'nameradio1',
            inputName: 'nameradio1',
            type: 'radio',
            checked: false,
            value: 'radio2',
            inputValue: 'radio2',
            placeholder: 'radio2',
            inputId: 'radio2',
            // validate: {
            //   required: true,
            // },
          },
          {
            name: 'nameradio1',
            inputName: 'nameradio1',
            type: 'radio',
            checked: true,
            value: 'radio3',
            inputValue: 'radio3',
            placeholder: 'radio3',
            inputId: 'radio3',
            // validate: {
            //   required: true,
            // },
          },
          {
            name: 'nameradio2',
            inputName: 'nameradio2',
            type: 'radio',
            checked: true,
            value: 'radio21',
            inputValue: 'radio21',
            placeholder: 'radio21',
            inputId: 'radio21',
            // validate: {
            //   required: true,
            // },
          },
          {
            name: 'select5',
            type: 'select',
            value: 'по дефолт----',
            options: ['--1', '---t2', '---3', '----54', '---5', '----6']
          },
          {
            name: 'nameradio2',
            inputName: 'nameradio2',
            type: 'radio',
            checked: false,
            value: 'radio22',
            inputValue: 'radio22',
            placeholder: 'radio22',
            inputId: 'radio22',
            // validate: {
            //   required: true,
            // },
          },
          
          {
            name: 'nameCk[]',
            type: 'checkbox',
            checked: true,
            value: 'c3',
            placeholder: 'ck3',
            inputId: 'ck3',
          },
          {
            name: 'select2',
            type: 'select',
            value: '5555',
            options: ['t1', '3333pt2', 'o4444t3', 'op55554', 'o7775', 'op88886']
          },
          {
            name: 'nameCk[]',
            type: 'checkbox',
            checked: true,
            value: 'c4',
            placeholder: 'ck4',
            inputId: 'ck4',
          },
          {
            name: 'name-select',
            type: 'select',
            value: 'по дефолт',
            options: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6']
          },
          {
            name: 'nameCk1',
            type: 'checkbox',
            checked: false,
            value: 'c1',
            placeholder: 'ck1',
            inputId: 'ck1',
            
          },
        ],
        formSubmitText: 'Отправить заявку',
        formSmallText: 'Нажимая на кнопку, вы соглашаетесь на обработку персональных данных в соответствии с <a href="#">политикой конфиденциальности</a>'
      }
 */
import { mapState } from 'vuex';
import store from '@/store';
import { mask } from 'vue-the-mask'
import FormInput from '@/components/forms/FormInput'
import JustInput from '@/components/forms/JustInput'



export default {
  store,
  name: 'FormDynamic',
  components: {
    FormInput,
    JustInput
  },
  directives: { mask },
  props: {
    componentParams: {
      type: [Array, Object],
      required: false
    },
  },
  data(){
    return {
      formId: this.componentParams.formId || null, // ID Формы
      formTitle: this.componentParams.formTitle || 'Заголовок', // Заголовок формы
      formText: this.componentParams.formText || '', // Описание формы
      formInputs: this.componentParams.formInputs || [], // Список полей
      formInputsResult: [], // обработанный список
      formSubmitText: this.componentParams.formSubmitText || 'Отправить', // Название кнопки
      formSmallText: this.componentParams.formSmallText || '', // Html текст внизу формы
      formUrl: this.componentParams.formUrl || null, // Url куда отправить
      isRadioChecked: {}, // {nameradio2: 'radio21', nameradio1: 'radio3'},
      error: null,
    }
  },
  mounted() {
    this.firstIsRadioChecked();
  },
  computed: {
    ...mapState(
        'modals', ['isOpen', 'component', 'modalComponentClass', 'params']
    ),
  },
  methods: {
    // Прокидываем название ошибки валидации в наше поле
    onErrMessage(rule, index){
      if(rule !== undefined && this.formInputs[index].errorMessage !== undefined ){
        return this.formInputs[index].errorMessage[rule]
      }else {
        return false
      }
    },
    firstIsRadioChecked(){
      let radioResultObject = {};
      //this.formInputs;
      this.formInputs.forEach(function (item) {
          if(item.checked == true && item.type == 'radio') {
            radioResultObject[item.name] = item.value;
          }
      });
      this.isRadioChecked = radioResultObject;
      
      console.log('radioResultObject', radioResultObject)
      /*
      radioResultObject = this.formInputs.map(function(item) {
        if(item.checked == true && item.type == 'radio' ){
          radioResultObject[item.name] = item.value;
        }else {
         // return {name: item.name, value: item.value[0]} // `${item.name} : ${item.value[0]}}`;
        }
        
       
        
      });
      
       */
    },
    isRadio(valueChecked, index, inputName, oldVal, oldIndex){
      // проврка отмечен чебокс или нет
      
      // this.formInputs[index].checked = checked !== null;
      // надо сохранять предыдуший чебокс временно с флагом
      // старый радио
      
      if(valueChecked !== null && inputName !== undefined){
        console.log('isRadio FormDynamic  checked', valueChecked)
        console.log('isRadio FormDynamic  index', index)
        console.log('isRadio FormDynamic  inputName', inputName)
        console.log('isRadio FormDynamic  oldVal', oldVal)
        console.log('isRadio FormDynamic  oldIndex', oldIndex)
        
        
        console.log('isRadio FormDynamic if true checked', valueChecked)
        // меняем значение в локальном обьекте
        this.isRadioChecked[inputName] = null;
        this.isRadioChecked[inputName] = valueChecked;
        
        
        // убираем все значения checked true у которых InputName одинаковые в основном обьекте где потом считаются результаты
        this.formInputs.forEach(function (item, index) {
          if (item.inputName == inputName) {
            item.checked = false
          }
        });
        // После того как все обнулили, устанавливаем нужное значение в основном обьекте  где потом считаются результаты
        this.formInputs[index].checked = true

        // меняем в массиве с окончательным результатом
        this.formInputsResult.forEach(function (item, index) {
          if(item.name == inputName) {
            
            item.value = valueChecked;
          }
        });
        /* if(oldVal !== undefined){
          this.isRadioChecked[inputName] = valueChecked;
        } */
        
      }else {
        this.formInputs[index].checked = false
      }
    },
    
    /****** START обратока чебоксов ********/
    isChecked(checked, index){
      // проврка отмечен чебокс или нет
      this.formInputs[index].checked = checked !== null;
      this.formInputsResult = this.formInputs.filter(e => e.checked !== false)
      this.isCheckedGroup();
    },
    isCheckedGroup(){
      // обьединение нескольких чебоксов с одним именем
      // this.formInputsResult.map();
      let     grouped = [];
      this.formInputsResult.forEach(function (a) {
        if (!this[a.name]) {
          this[a.name] = { value: [], name: a.name };
          grouped.push(this[a.name]);
        }
        this[a.name].value.push(a.value);
      }, Object.create(null));
  

      // т.к. в результате у нас value имеет вложенность [], то если там одно значение, убираем вложенность P.S. сделано для checboxов
      let groupedResult = grouped.map(function(item) {
        if(item.value.length > 1){
          return item;
        }else {
          return {name: item.name, value: item.value[0]} // `${item.name} : ${item.value[0]}}`;
        }
      });
      this.formInputsResult = groupedResult;
      console.log('groupedResult', groupedResult);
    },
    /********* FINISH обработка чебоксов *********/
    isSelected(value, index){
      // берем данные из formInputs и добавляем в formInputsResult
      
      // берем уникальное имя в formInputs
      let nameSelect = this.formInputs[index].name
      this.formInputs[index].value = value
      console.log('FormDynamic index', index);
      this.formInputsResult.forEach(function (item, index) {
        if(item.name == nameSelect) {
          console.log('nameSelect:', item, index)
          item.value = value;
        }
      });
      /*
      let selectItem = this.formInputs[index]
      
      selectItem.value = value;
      this.formInputsResult.push(selectItem);
      
       */
    },
    onSubmit(){
      // формируем обьект с данными для отправки
      console.log('this.formInputs', this.formInputs);

      // проходимся по результату и группируем данные если есть одинаковые name
      this.isCheckedGroup();
     
      console.log('filter this.formInputs', this.formInputsResult);
  
      let dataParams = this.formInputsResult.reduce((acc, n) => (acc[n.name] = n.value, acc), {})
   
      
      this.$validator.validateAll().then(async result => {
        if (result && this.formUrl !== null) {
          dataParams = {
            ...dataParams,
          }
          console.log('dataParams', dataParams)
          axios({
            method: 'post',
            url: this.formUrl,
            data: dataParams
          })
              // при успешной отправке
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }else {
          console.log('Ошибка отправки', result)
        }
      })
      
      
    },
  }
}

</script>

<style>
/*

.just-form {
  color: rgba(0,0,0, 0.60);
  font-size: 14px;
  line-height: 1.3;
  a {
    color: #3478F6;
    &:hover {
      color: #2F6CE1
    }
  }
  &__header {
    padding-bottom: 12px;
    &-title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(0,0,0, 0.87);
      padding-bottom: 12px;
    }
  }
  &__body {
    margin-bottom: 12px;
  }
  &__footer {
    margin-top: 16px;
    &-small-text {
      color: rgba(0,0,0, 0.38);
      font-size: 12px;
    }
  }
  &-text {
    margin-bottom: 24px;
  }
  &-groups {
    margin-bottom: 8px;
  }
  &-group {
    margin-bottom: 16px;
    position: relative;
    &__error-message {
      margin-top: 5px;
      color: #FF2929;
      font-size: 12px;
      line-height: 1.3;
      svg {
        margin-right: 4px;
      }
      .help-24 {
        fill: #FF2929;
        position: relative;
        top: -2px;
      }
    }
    &__floating-label {
      position: absolute;
      pointer-events: none;
      left: 20px;
      top: 18px;
      font-size: 16px;
      color:  rgba(0,0,0, 0.38);
      line-height: 1.3;
      transition: 0.2s ease all;
    }
    &__inp-clear {
      position: absolute;
      background: rgba(0, 0, 39, 0.38);
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
  }
  &-control {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 39, 0.2);
    border-radius: 8px;
    padding: 12px 16px;
    color: rgba(0,0,0, 0.87);
    font-size: 16px;
    line-height: 1.3;
    font-family: 'Roboto', sans-serif;
    width: 100%;
    &::placeholder {
      color:  rgba(0,0,0, 0.38);
    }
    &:hover {
      border-color: #3478F6;
    }
    &:focus ~ .v-form-group__floating-label,
    &:valid ~ .v-form-group__floating-label
    {
      top: 8px;
      bottom: 10px;
      left: 20px;
      font-size: 11px;
      opacity: 1;
    }
  }
  
  &-btn {
    background: #3478F6;
    color: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 16px;
    line-height: 1.3;
    font-family: 'Roboto', sans-serif;
    border: 1px solid #3478F6;
    &:hover {
      background: #0000FF;
      border-color: #0000FF;
    }
  }
}

 */


</style>


<!-- script>
import { mapState } from 'vuex';
import store from '@/store';




export default {
  store,
  name: 'FormDynamic',
  components: {
  },
  props: {
    componentParams: {
      type: [Array, Object],
      required: false
    },
  },
  data(){
    return {
      formId: this.componentParams.formId || null,
      formTitle: this.componentParams.formTitle || 'Заголовок',
      formText: this.componentParams.formText || '',
      formInputs: this.componentParams.formInputs || [],
      formSubmit: this.componentParams.formSubmit || 'Отправить',
      formSmallText: this.componentParams.formSmallText || '',
    }
  },
  computed: {
    ...mapState(
        'modals', ['isOpen', 'component', 'modalComponentClass', 'params']
    ),
  },
  methods: {
    onSubmit(){

      console.log('formInputs', this.formInputs);
      // формируем обьект с данными для отправки
      let dataParams = this.formInputs.reduce((acc, n) => (acc[n.name] = n.value, acc), {})
      // Object.assign(dataForm, source1, source2);
      // console.log(dataForm); // {a: 1, b: 2, c: 3}
      console.log('dataTest', dataParams)
      
      
      axios({
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        url: '/api/exp',
        data: dataParams
      })
          // при успешной отправке
          .then(function (response) {
            // console.log(response);
        
          })
          .catch(function (error) {
            console.log(error);
          });
    
    },
  }
}

</script>

<style scoped lang="scss">
@import "./src/assets/scss/common";


</style -->
