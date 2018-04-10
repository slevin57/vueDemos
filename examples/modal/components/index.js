import Vue from 'vue';
import Modal from './index.vue';

Modal.born = () => {
    let ModalExtend = Vue.extend(Modal);
    let data = () => {
        return {
            visible: true
        }
    }
    let modal = new ModalExtend({ data }).$mount();
    document.querySelector('body').appendChild(modal.$el);
}
export default Modal;