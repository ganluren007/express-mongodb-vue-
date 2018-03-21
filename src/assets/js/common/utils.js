/* 0 * @Author: wanguoshi
 * @Date:   2017-01-16 14:56:20
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-06-29 15:28:35
 */
import jquery from '../lib/jquery-1.11.1.js';


+function() {
	var utils = {};

	/**
	 * 修改页面title
	 * title：String
	 * 适配安卓系统和IOS系统
	 */
	utils.changeTitle = function(title) {
		//ANDROID
		document.title = title;
		//IOS
		if(/ip(hone|od|ad)/i.test(navigator.userAgent)) {
			var body = document.getElementsByTagName('body')[0];
			document.title = title;
			var iframe = document.createElement("iframe");
			iframe.style.display = 'none';
			iframe.setAttribute("src", "");

			var listener = function() {
				setTimeout(function() {
					iframe.removeEventListener('load', listener);
					document.body.removeChild(iframe);
				}, 0);
			}

			iframe.addEventListener('load', listener);
			document.body.appendChild(iframe);
		}
	}
	/**
	 * 获取url中的参数
	 * @param  {[String]} name [key]
	 * @return {[String]}      [value]
	 */
	utils.getQueryString = function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	}

	utils.my_ajax = function(opt) {
		/*var token_obj = utils.get_token();
		var data = $.extend(true, {
			"terminalType": "AJS_mobile",
			"appsId": opt.appsId
		}, opt.data);*/
		/*var headers = $.extend(true, {
			"terminalType": "AJS_mobile",
			"aopsid": opt.appsId,
			"version": opt.version,
			"token": token_obj.token,
			"timer": token_obj.timer
		}, opt.headers);*/
		/*if(opt.loading) {
			//			$.showPreloader();
			$(".load_img").css("display", "block")
			console.log($(".load_img"))
		}*/
		/*if(opt.new_kg) {
			var data = $.extend(true, {
				"terminalType": "AJS_mobile"
			}, opt.data);
			var headers = $.extend(true, {
				"terminalType": "AJS_mobile"				
			}, opt.headers);
		}*/
//	    debugger
		var userIfo=JSON.parse(localStorage.getItem("userIfo"))||{}
		
//		$.extend(true,settingOpt,opt);
		var data = $.extend(true, {
            username: userIfo.username,
            token:userIfo.token
        }, opt.data);
        var setting={
            type: opt.type || "get",
            timeout: 30000,
            url: opt.url,
            cache: opt.cache || false,
            data: data,
            success: function(data,status,xhr) {
                $(".load_img").css("display", "none")
                opt.sucesscallback(data,status,xhr);

            },
            error: function(xhr, type) {　
                $(".load_img").css("display", "none")
                alert("网络忙，请稍后再试");　　　
            }
        }
        if(opt.upload){
            $.extend(setting,{
                contentType: false,
                processData: false,
                dataType: "json",
//              mimeType: "multipart/form-data",
            })
        }
		$.ajax(setting)

	}

	utils.write_jd = function(J_circle) {
		console.log("dfdf")
		console.log(jquery)
		console.log(J_circle);

		J_circle.each(function() {
			var $svg = jquery(this);
			console.log("dfdf")
			var pre = $svg.data('pre');
			var $progress = $svg.find('.J_preC');
			if(!pre) {
				$progress.hide();
			}
			$progress.attr('stroke-dasharray', pre + ' 100');
			$progress.attr('stroke-opacity', '1');

			/*线末端点*/
			if($svg.find('.J_lineEnd').length && pre < 100) {
				var deg = 360 * pre / 100;
				var line = $svg.find('.J_lineEnd')[0];
				line.style.webkitTransform = "rotate(" + deg + "deg)";
				line.style.transform = "rotate(" + deg + "deg)";
			}
		});

	}

	utils.phoneType = function() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if(isAndroid) {
			return "Android"
		} else {
			return "iOS"
		}
	}

	utils.formatSearch = function(se) {
		if(typeof se !== "undefined") {
			se = se.substr(1);
			var arr = se.split("&"),
				obj = {},
				newarr = [];
			$.each(arr, function(i, v) {
				newarr = v.split("=");
				if(typeof obj[newarr[0]] === "undefined") {
					obj[newarr[0]] = newarr[1];
				}
			});
			for(var key in obj) {
				obj[key] = decodeURI(obj[key]);
			}
			return obj
		};
	}

	utils.tianyan = function(ele, appsId) {
		console.log("tianyan");
		var eveId = ele.attr("data-eveId");
		var label = ele.attr("data-label");

		//			console.log(SKAPP)
		//				if(!tag) return;
		if(typeof SKAPP != "undefined") {
			SKAPP.onEvent(eveId, label, {
				"DeviceId": utils.phoneType(),
				"appsId": appsId
			});
		}

	}
	utils.go_zj = function(router, zj_name, params) {
		router.push({
			"name": zj_name,
			"params": params
		})
	}

	utils.radom_num = function(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		var num = Min + Math.floor(Rand * Range); //舍去
		return num;
	}
	utils.get_token = function() {
		if(utils.phoneType() == "Android") {
			try {
				return JSON.parse(window.android.getToken());
			} catch(e) {
				return {
					"token": "",
					"timer": ""
				}
			}

		} else if(utils.phoneType() == "iOS") {
			try {
				return JSON.parse(OC.getToken());
			} catch(e) {
				return {
					"token": "",
					"timer": ""
				}
			}
		}
	}

	//  token的开关
	utils.token_kg = false;

	utils.btn_sl = function() {

		var btn = $(".btn_sl")
		console.log($(".btn_sl"))
		$(".btn_sl").click(function() {
			var width = $(this).width();
			var height = $(this).height();
			$(this).append("<div class='btn_yy'></div>")
			var chi = $(this).children(".btn_yy");
			chi.css({
				"width": width,
				"height": height
			});
			var timer = setTimeout(function() {
				chi.remove()
			}, 200)
		})
	}

	utils.encrypt = {
		rsa_jm: function(pub_key, content) {
			/*var encrypt = new JSEncrypt();
          	encrypt.setPublicKey(pub_key);
          	return encrypt.encrypt(content);*/
			console.log(new JSEncrypt())
		},

		aes_jm: function(key, content) {
			return Aes.AESEnc(key, content)
		},

		aes_res_jm: function(pub_key, content) {
			var aes_mw = this.rsa_jm(pub_key, Aes.getKey());
			var cont_mw = this.rsa_jm(pub_key, content);
			return {
				aes_mw: aes_mw,
				cont_mw: cont_mw
			}
		}

	}

	utils.yz_token = function(url,callback) {
		var userIfo = JSON.parse(localStorage.getItem("userIfo")) || "";
		if(userIfo) {
			utils.my_ajax({
				type: "post",
				url: url,
				data: {
					username: userIfo.username,
					token: userIfo.token
				},
				sucesscallback(res) {
					callback(res)
				}
			})
		}

	}

	window.utils = utils;

	//页面访问地址-公共路径
	if(PROCESS_ENV_PRODUCTION) {
		window.common_Url = "/icp_portal/icp-bbdrive/bibixingche/dist/";
	} else {
		window.common_Url = "/dist/";
	}
}();