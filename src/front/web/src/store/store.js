/* 
* @Author: Marte
* @Date:   2017-12-17 14:46:08
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-01 17:41:28
*/
import Vue from 'vue';
import Vuex from 'vuex';
import classifyChild from '../components/classifyMain/classifyMain';
import mycenter from '../components/mycenter/mycenter.vue';
import shoppingCart from '../components/shoppingCart/shoppingCartComponent';
import orders from '../components/orderComponent/orderComponent';
import address from '../components/addressComponent/addressComponent';
import cretAdres from '../components/addressComponent/createAddressComponent/createAddressComponent';
import collect from '../components/collectComponent/collectComponent.js';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mycenter,
        classifyChild,
        shoppingCart,
        orders,
        address,
        cretAdres,
        collect
    }
})