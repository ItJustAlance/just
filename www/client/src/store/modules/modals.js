import Vue from 'vue';
// const vm = new Vue();

const TOGGLE_MODAL = "TOGGLE_MODAL"
const SET_MODAL_COMPONENT = "SET_MODAL_COMPONENT"
const SET_CURRENT_MODAL_PARAMS = "SET_CURRENT_MODAL_PARAMS"
const SET_CURRENT_MODAL_OPTIONS = "SET_CURRENT_MODAL_OPTIONS"
const SET_MODAL_COMPONENT_CLASS = "SET_MODAL_COMPONENT_CLASS"
const SET_MODAL_CLASS = "SET_MODAL_CLASS"
const SET_MODAL_HEADER_VISIBILITY = "SET_MODAL_HEADER_VISIBILITY"
const SET_MODAL_CONTENT_UP_VISIBILITY = "SET_MODAL_CONTENT_UP_VISIBILITY"
const SET_MODAL_CONTENT_DOWN_VISIBILITY = "SET_MODAL_CONTENT_DOWN_VISIBILITY"

const state = {
    isOpenState: false,
    modalComponentState: null,
    componentParamsState: null,
    options: null,
    modalClass: '', // класс для компонента в модальном окне
    modalComponentClass: '', // класс для компонента в модальном окне
    isModalHeaderVisibility: true,
    isModalContentUp: true,
    isModalContentDown: false,
}

const mutations = {
    [TOGGLE_MODAL]: (state, isOpen) => {
        state.isOpenState = isOpen;
    },
    [SET_MODAL_COMPONENT]: (state, component) => {
        state.modalComponentState = component;
    },
    [SET_CURRENT_MODAL_PARAMS]: (state, params) => {
        state.componentParamsState = params;
    },
    [SET_CURRENT_MODAL_OPTIONS]: (state, options) => {
        state.options = options;
    },
    [SET_MODAL_HEADER_VISIBILITY](state, value) {
        state.isModalHeaderVisibility = value;
    },
    [SET_MODAL_CONTENT_UP_VISIBILITY](state, value) {
        state.isModalContentUp = value;
    },
    [SET_MODAL_CONTENT_DOWN_VISIBILITY](state, value) {
        state.isModalContentDown = value;
    },
    [SET_MODAL_COMPONENT_CLASS](state, value) {
        state.modalComponentClass = value;
    },
    [SET_MODAL_CLASS](state, value) {
        state.modalClass = value;
    },
}

const actions = {
    startModal: ({ commit }, data) => {
        // vm.$modal.show('allmodals', data);
    },
    toggleModal: ({ commit }, isOpen) => {
        commit(TOGGLE_MODAL, isOpen)
    },
    makeModal: ({ commit }, {component, options}) => {
        // debugger
        commit(SET_MODAL_COMPONENT, component);
        if (options) {
            commit(SET_CURRENT_MODAL_OPTIONS, options);
        }
        commit(TOGGLE_MODAL, true);
    },
    setModalComponentClass: ({ commit }, compClass) => {
        commit(SET_MODAL_COMPONENT_CLASS, compClass)
    },
    setModalClass: ({ commit }, modalClass) => {
        commit(SET_MODAL_CLASS, modalClass)
    },
    setModalComponent: ({ commit }, component) => {
        commit(SET_MODAL_COMPONENT, component)
    },
    setCurrentModalParams: ({ commit }, params) => {
        commit(SET_CURRENT_MODAL_PARAMS, params)
    },
    setCurrentModalOptions: ({ commit }, options) => {
        commit(SET_CURRENT_MODAL_OPTIONS, options)
    },
    resetModal: ({ commit }, options) => {
        //console.log('action (resetModal) close')
        
        // vm.$modal.hide('allmodals');
        commit(TOGGLE_MODAL, false);
        commit(SET_MODAL_COMPONENT, null);
        commit(SET_CURRENT_MODAL_PARAMS, null);
        commit(SET_CURRENT_MODAL_OPTIONS, null);
    },
}


const getters = {

}



export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
