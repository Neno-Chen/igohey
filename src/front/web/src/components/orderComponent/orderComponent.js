import http from '../../utils/requestAjax';
const state = {
    orderList: [],
    pendList: [],
    outList: [],
    paidList: [],
    loading: true
}

const mutations = {
    getOrders(data, params){
        let orders = {
            orderList: [],
            pendList: [],
            outList: [],
            paidList: [] 
        }
        var len = params.length;
        var total;
        for (var i = 0; i < len; i++) {
            total = params[i].saleprice ? params[i].saleprice * params[i].qty : params[i].price * params[i].qty;
            let singorder = [params[i]];
            for (var j = i + 1; j < len; j++) {
                if (params[i].orderno == params[j].orderno) {
                    total += params[j].saleprice ? params[j].saleprice * params[j].qty : params[j].price * params[j].qty;
                    singorder.push(params[j]);
                } 
            }
            if(!/\.[\d]{2}$/.test(total)){
                total += '.00'; 
            }
            singorder[0].total = total;
            orders.orderList.push(singorder);
        }
        delSame(orders.orderList);
        function delSame(order){
            for(var i = 0;i < order.length;i++){
                for(var j = i+1 ;j < order.length;j++){
                    if(order[i][0].orderno == order[j][0].orderno){
                        order.splice(j,1);
                        delSame(order);
                    }
                }
            }
        }
        orders.orderList.forEach((item)=>{
            if(item[0].status == "1"){
                orders.paidList.push(item);
            } else if (item[0].status == "2"){
                orders.pendList.push(item);
            } else if (item[0].status == "3") {
                orders.outList.push(item);
            }
        })
        return orders;
    },
    selectOrder(data,params){
        if(params !== "fail"){
            let datas = mutations.getOrders(data, params);
            state.orderList = datas.orderList;
            state.pendList = datas.pendList;
            state.outList = datas.outList;
            state.paidList = datas.paidList;
        }
        state.loading = false;
    }
}

const actions = {
    selectOrder(event,params){
        http.post(params).then((res) => {
            let data = res.data;
            event.commit('selectOrder',data);
        })
    },
    delOrder(event,params){
        state.loading = true;
        http.post(params).then((res) => {
            if(res.data){
                event.commit('selectOrder', res.data);
            }
        })
    }
}
export default {
    state,
    mutations,
    actions
}