/* 
 * @Author: wanguoshi
 * @Date:   2017-01-06 16:13:13
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-06-29 15:37:32
 * 公共的异步请求
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import * as variables from '../assets/js/common/variables.js';

Vue.use(VueResource)

const pendingRequests = {}; //请求头集合
//拦截器
//所有的请求处理加一个loading：请求发送前显示loading，接收响应后隐藏loading
//登录拦截,配合拦截池
Vue.http.interceptors.push((request, next) => {
    //去重
    let key = request.url;
    if (!pendingRequests[key]) {
        pendingRequests[key] = key; //request
    } else {
        console.log("重复请求,URL:" + key);
        //pendingRequests[key].abort();   // 放弃先触发的提交
        request.abort(); //放弃后触发的提交
    }
    //超时
    let timeout;
    if (request._timeout) {
        timeout = setTimeout(() => {
            next(request.respondWith(request.body, {
                status: 408,
                statusText: 'Request Timeout'
            }));
        }, request._timeout);
    }

    next((response) => {
        //响应请求状态值的解析
        clearTimeout(timeout);
        let msg = "";
        switch (response.status) {
            case 408:
                msg = "请求超时"
                break;
            case 404:
                msg = "找不到服务"
                break;
            case 500:
                msg = "请求服务报错"
                break;
            case 200:
                msg = ""
                break;
            default:
                msg = "请求出问题啦"
        }
        if (msg) console.error(msg + ";status:" + response.status);

        return response;
    })
})

// global http objec
export default function clientHttp(options) {
     $.showIndicator();
    //参数处理
    let url = variables[options.url];
    let method = options.type ? options.type.toLowerCase() : "get";
    if(variables.HTTP_JSON) {
        url = method.toLowerCase() === "get" ? "../../mock/"+url+".json" : "../../mock/OMMON_SUCCESS.json";
        Vue.http.get(url, defaultOptions).then(successCallback, errorCallback);
        return;
    }
    let flag = url.indexOf("?")>-1 ? "&" : "?";
    url = url + flag + "_="+new Date().getTime()
    let successfn = options.success || function() {}
    let errorfn = options.error || function() {}
    let params = options.data || {}
    let successCallback = function(response) {
//      debugger;
        let responseBody = response.body;
        successfn.call(Vue, responseBody);
        $.hideIndicator();
        /*let responseBody = response.body;
        console.info(responseBody);
        if (responseBody.resultCode && (responseBody.resultCode == "00" || responseBody.resultCode == "0")) {
            successfn.call(Vue, responseBody.result);
        } else {
            $.toast(responseBody.resultMsg);
            console.error("后台未成功返回数据,url:" + url + ";resultCode:" + responseBody.resultCode)
        }*/
    }
    let errorCallback = function(response) {
    	$.hideIndicator();
        if (errorfn && typeof(errorfn) == "function") {
            errorfn.call(Vue, response)
        } else {
            $.toast("网络忙，请稍后再试")
            console.error("请求数据错误,url:" + url);
        }
    }
    let appsId =  utils.getQueryString("appsId")||"";
    var token_obj=utils.get_token();
    let defaultOptions = {
        _timeout: 30000,
        headers: options.headers || {
            "terminalType": "AJS_mobile",
            "aopsid": appsId,
			"token":token_obj.token,
			"timer":token_obj.timer
            
        },
        emulateJSON: true,
        before: function(request) {

        },
        params: params
    }
//  debugger;
    switch (method) {
        case "get":
            Vue.http.get(url, defaultOptions).then(successCallback, errorCallback);
            break;
        case "post":
            delete defaultOptions.params;
            Vue.http.post(url, params, defaultOptions).then(successCallback, errorCallback);
            break;
        case "jsonp":
            defaultOptions.jsonp = "jsonpCallback";
            Vue.http.jsonp(url,defaultOptions).then(successCallback, errorCallback);
            break;
        default:
            console.error("缺少请求参数'");
    }
}
