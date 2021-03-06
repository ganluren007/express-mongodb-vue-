(function(window) {
	/*var appid = "6E6989FD4E38B3B4944D161078CF0C92";
	var vn = "1.0.0";
	var vc = "1.0.0";*/
	var appid = window.pingan_sdk_appid;
	var vn = window.pingan_sdk_vn;
	var vc = window.pingan_sdk_vc;
	//var SKBaseUrl='https://dn-mailattachments.qbox.me/h5core001.js';

	var SKRequestUrl = 'https://padn-access.pingan.com.cn/access.php?m=msgpack&sdkv=1.0&os=h5&source=ty'; //生产的上报地址
	//var SKRequestUrl = 'https://test-padn-access.pingan.com.cn:3443/access.php?m=msgpack&sdkv=1.0&os=h5&source=ty';//测试的上报地址

	function createScriptSK(url) {
		var _head = document.getElementsByTagName('head')[0];
		var _script = document.createElement('script');
		_script.type = 'text/javascript';
		_script.src = url;
		_head.appendChild(_script)
	};
	
	//createScriptSK(SKBaseUrl);

	if (!window['JSON'] || typeof JSON !== 'object') { //如果window.JSon不存在或者JSON不是对象，检测不支持JSON的浏览器
		createScriptSK(SKBaseUrl + '/js/json2.js')
	};

	window["SKAPP"] = {};
	window["SKAPP"].onEvent = function(id, label, params) {
		if (arguments.length > 0) {
			try {
				var opts = {
					count: 1,
					start: new Date().getTime()
				};
				if (id != undefined) {
					opts["eventId"] = typeof id != "string" ? JSON.stringify(id) : id
				}
				if (label != undefined) {
					opts["label"] = typeof label != "string" ? JSON.stringify(label) : label
				} else {
					opts["label"] = ""
				}
				if (params != undefined) {
					var isJson = function(obj) {
						var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
						return isjson
					};
					if (isJson(params)) {
						opts["parameters"] = params
					} else {
						opts["parameters"] = {
							parameters: ""
						}
					}
				}
				var eventName = "__SK_SK-init-event";
				var ev = localStorage[eventName];
				if (ev) { //如果本地存在
					var ca = JSON.parse(ev);
					ca.push(opts); //存进本地，字符串转化成JSON对象
					localStorage.setItem(eventName, JSON.stringify(ca));
					return
				};
				localStorage.setItem(eventName, "[" + JSON.stringify(opts) + "]")
			} catch (e) {

			}
		}
	};
	/*
	 * fingerprintJS 0.5.4 - Fast browser fingerprint library
	 * https://github.com/Valve/fingerprintjs
	 * Copyright (c) 2013 Valentin Vasilyev (valentin.vasilyev@outlook.com)
	 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	function pageLogout(e) {
		if (!eventState) return;
		var t = (new Date).getTime();
		SKBASE.lealSet(t), SKBASE.addGenre({
			name: window.location.href,
			start: WebappStart,
			duration: parseInt((t - WebappStart) / 1e3),
			refer: document.referrer
		}, "pages"), eventState = !1
	}

	function trim(e) {
		return e
	}

	function UrlRequest() { //请求数据的对象的构造函数，基准的请求地址是SKRequestUrl
		this.url = SKRequestUrl, this.opts = {}, this.requestArray = new Array()
	}

	var $$ = function(window) {
			function triggerAndReturn(e, t, n) {
				return !0
			}

			function triggerGlobal(e, t, n, r) {
				if (e.global)
					return triggerAndReturn(t || document, n, r)
			}

			function ajaxStart(e) {
				e.global && ajax.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
			}

			function ajaxStop(e) {
				e.global && !--ajax.active && triggerGlobal(e, null, "ajaxStop")
			}

			function ajaxBeforeSend(e, t) {
				var n = t.context;
				if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
				triggerGlobal(t, n, "ajaxSend", [e, t])
			}

			function ajaxSuccess(e, t, n) {
				var r = n.context,
					i = "success";
				n.success.call(r, e, i, t), triggerGlobal(n, r, "ajaxSuccess", [t, n, e]), ajaxComplete(i, t, n)
			}

			function ajaxError(e, t, n, r) {
				var i = r.context;
				r.error.call(i, n, t, e), triggerGlobal(r, i, "ajaxError", [n, r, e]), ajaxComplete(t, n, r)
			}

			function ajaxComplete(e, t, n) {
				var r = n.context;
				n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
			}

			function empty() {}

			function mimeToDataType(e) {
				return e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
			}

			function appendQuery(e, t) {
				return (e + "&" + t).replace(/[&?]{1,2}/, "?")
			}

			function serializeData(e) {
				typeof e.data == "object" && (e.data = param(e.data)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data))
			}

			function serialize(e, t, n, r) {
				var i = typeof t == "array";
				for (var s in t) {
					var o = t[s];
					r && (s = n ? r : r + "[" + (i ? "" : s) + "]"), !r && i ? e.add(o.name, o.value) : (n ? typeof o == "array" : typeof o == "object") ? serialize(e, o, n, s) : e.add(s, o)
				}
			}

			function param(e, t) {
				var n = [];
				return n.add = function(e, t) {
					this.push(escape(e) + "=" + escape(t))
				}, serialize(n, e, t), n.join("&").replace("%20", "+")
			}

			function extend(e) { //完成复制的功能
				var t = Array.prototype.slice;
				return t.call(arguments, 1).forEach( //去除第一项
						function(t) {
							for (key in t)
								t[key] !== undefined && (e[key] = t[key]) //slice给e
						}), e //返回e的值
			}

			var jsonpID = 0,
				document = window.document,
				key,
				name,
				rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
				scriptTypeRE = /^(?:text|application)\/javascript/i,
				xmlTypeRE = /^(?:text|application)\/xml/i,
				jsonType = "application/json",
				htmlType = "text/html",
				blankRE = /^\s*$/,
				ajax = function(options) {
					var settings = extend({}, options || {});
					for (key in ajax.settings)
						settings[key] === undefined && (settings[key] = ajax.settings[key]);
					ajaxStart(settings),
						settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host);
					var dataType = settings.dataType,
						hasPlaceholder = /=\?/.test(settings.url);
					if (dataType == "jsonp" || hasPlaceholder)
						return hasPlaceholder || (settings.url = appendQuery(settings.url, "callback=?")),
							ajax.JSONP(settings);
					settings.url || (settings.url = window.location.toString()), serializeData(settings);
					var mime = settings.accepts[dataType],
						baseHeaders = {},
						protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
						xhr = ajax.settings.xhr(),
						abortTimeout;
					settings.crossDomain || (baseHeaders["X-Requested-With"] = "XMLHttpRequest"), mime && (baseHeaders.Accept = mime, mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime));
					if (settings.contentType || settings.data && settings.type.toUpperCase() != "GET")
						baseHeaders["Content-Type"] = settings.contentType || "application/x-www-form-urlencoded";
					settings.headers = extend(baseHeaders, settings.headers || {}), xhr.onreadystatechange = function() {
						if (xhr.readyState == 4) {
							clearTimeout(abortTimeout);
							var result, error = !1;
							if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
								dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type")), result = xhr.responseText;
								try {
									dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : JSON.parse(result))
								} catch (e) {
									error = e;
								}
								error ? ajaxError(error, "parsererror", xhr, settings) : ajaxSuccess(result, xhr, settings)
							} else ajaxError(null, "error", xhr, settings)
						}
					};
					var async = "async" in settings ? settings.async : !0;
					xhr.open(settings.type, settings.url, async);
					for (name in settings.headers)
						xhr.setRequestHeader(name, settings.headers[name]);
					return ajaxBeforeSend(xhr, settings) === !1 ? (xhr.abort(), !1) : (settings.timeout > 0 && (abortTimeout = setTimeout(function() {
						xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings)
					}, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr)
				};
			ajax.active = 0,
				ajax.JSONP = function(e) {
					if ("type" in e) {
						var t = "jsonp" + ++jsonpID,
							n = document.createElement("script"),
							r = function() {
								t in window && (window[t] = empty), ajaxComplete("abort", i, e)
							},
							i = {
								abort: r
							},
							s, o = document.getElementsByTagName("head")[0] || document.documentElement;
						return e.error && (n.onerror = function() {
							i.abort(), e.error()
						}), window[t] = function(n) {
							clearTimeout(s), delete window[t], ajaxSuccess(n, i, e)
						}, serializeData(e), n.src = e.url.replace(/=\?/, "=" + t), o.insertBefore(n, o.firstChild), e.timeout > 0 && (s = setTimeout(function() {
							i.abort(), ajaxComplete("timeout", i, e)
						}, e.timeout)), i
					}
					return ajax(e)
				},
				ajax.settings = {
					type: "GET",
					beforeSend: empty,
					success: empty,
					error: empty,
					complete: empty,
					context: null,
					global: !0,
					xhr: function() {
						return new window.XMLHttpRequest
					},
					accepts: {
						script: "text/javascript, application/javascript",
						json: jsonType,
						xml: "application/xml, text/xml",
						html: htmlType,
						text: "text/plain"
					},
					crossDomain: !1,
					timeout: 0
				},
				ajax.get = function(e, t) {
					return ajax({
						url: e,
						success: t
					})
				},
				ajax.post = function(e, t, n, r) {
					return typeof t == "function" && (r = r || n, n = t, t = null), ajax({
						type: "POST",
						url: e,
						data: t,
						success: n,
						dataType: r
					})
				},
				ajax.getJSON = function(e, t) {
					return ajax({
						url: e,
						success: t,
						dataType: "json"
					})
				};
			var escape = encodeURIComponent;
			return {
				ajax: ajax
			}
		}(window),

		DTGlobal = {
			deviceId: "",
			appkey: appid || "",
			appProfile: {
				versionName: vn || "",
				versionCode: vc || "",
				initTime: "",
				sdkVersion: "H5+APP+v1.0.1",
				partner: ""
			},
			deviceProfile: {
				pixel: "",
				language: navigator.language,
				timezone: (new Date).getTimezoneOffset() / 60 * -1
			},
			msgs: []
		},
		AppSession = {
			type: 2,
			data: {
				id: "",
				start: 0,
				duration: 0
			}
		},
		appPages = [],
		appEvents = [],
		TalkingData = {},
		WebappStart = (new Date).getTime(),
		eventState = !0,
		H5Event = {
			addEventListener: function(e, t, n) { //t是事件
				e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
			}
		};
	H5Event.addEventListener(window, "pagehide", pageLogout),
		H5Event.addEventListener(window, "beforeunload", pageLogout),
		function(e, t, n) {
			typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define("fingerprint", n) : t[e] = n()
		}("Fingerprint", TalkingData, function() {
			var e = function(e) {
				var t, n;
				t = Array.prototype.forEach,
					n = Array.prototype.map,
					this.each = function(e, n, r) {
						if (e === null) return;
						if (t && e.forEach === t) e.forEach(n, r);
						else if (e.length === +e.length) {
							for (var i = 0, s = e.length; i < s; i++)
								if (n.call(r, e[i], i, e) === {}) return
						} else
							for (var o in e)
								if (e.hasOwnProperty(o) && n.call(r, e[o], o, e) === {}) return
					},
					this.map = function(e, t, r) {
						var i = [];
						return e == null ? i : n && e.map === n ? e.map(t, r) : (this.each(e, function(e, n, s) {
							i[i.length] = t.call(r, e, n, s)
						}), i)
					}, typeof e == "object" ? (this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas, this.ie_activex = e.ie_activex) : typeof e == "function" && (this.hasher = e)
			};
			return e.prototype = {
				get: function() {
					var e = [];
					e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth);
					if (this.screen_resolution) {
						var t = this.getScreenResolution();
						typeof t != "undefined" && e.push(this.getScreenResolution().join("x"))
					}
					return e.push((new Date).getTimezoneOffset()), e.push(this.hasSessionStorage()), e.push(this.hasLocalStorage()), e.push(!!window.indexedDB), document.body ? e.push(typeof document.body.addBehavior) : e.push(typeof undefined), console.log(e), e.push(typeof window.openDatabase), e.push(navigator.cpuClass), e.push(navigator.platform), e.push(navigator.doNotTrack), e.push(this.getPluginsString()), this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()), this.hasher ? this.hasher(e.join("###"), 31) : this.murmurhash3_32_gc(e.join("###"), 31)
				},
				murmurhash3_32_gc: function(e, t) {
					var n, r, i, s, o, u, a, f;
					n = e.length & 3, r = e.length - n, i = t, o = 3432918353, u = 461845907, f = 0;
					while (f < r) a = e.charCodeAt(f) & 255 | (e.charCodeAt(++f) & 255) << 8 | (e.charCodeAt(++f) & 255) << 16 | (e.charCodeAt(++f) & 255) << 24, ++f, a = (a & 65535) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = (a & 65535) * u + (((a >>> 16) * u & 65535) << 16) & 4294967295, i ^= a, i = i << 13 | i >>> 19, s = (i & 65535) * 5 + (((i >>> 16) * 5 & 65535) << 16) & 4294967295, i = (s & 65535) + 27492 + (((s >>> 16) + 58964 & 65535) << 16);
					a = 0;
					switch (n) {
						case 3:
							a ^= (e.charCodeAt(f + 2) & 255) << 16;
						case 2:
							a ^= (e.charCodeAt(f + 1) & 255) << 8;
						case 1:
							a ^= e.charCodeAt(f) & 255, a = (a & 65535) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = (a & 65535) * u + (((a >>> 16) * u & 65535) << 16) & 4294967295, i ^= a
					}
					return i ^= e.length, i ^= i >>> 16, i = (i & 65535) * 2246822507 + (((i >>> 16) * 2246822507 & 65535) << 16) & 4294967295, i ^= i >>> 13, i = (i & 65535) * 3266489909 + (((i >>> 16) * 3266489909 & 65535) << 16) & 4294967295, i ^= i >>> 16, i >>> 0
				},
				hasLocalStorage: function() {
					try {
						return !!window.localStorage
					} catch (e) {
						return !0
					}
				},
				hasSessionStorage: function() {
					try {
						return !!window.sessionStorage
					} catch (e) {
						return !0
					}
				},
				isCanvasSupported: function() {
					var e = document.createElement("canvas");
					return !!e.getContext && !!e.getContext("2d")
				},
				isIE: function() {
					return navigator.appName === "Microsoft Internet Explorer" ? !0 : navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent) ? !0 : !1
				},
				getPluginsString: function() {
					return this.isIE() && this.ie_activex ? this.getIEPluginsString() : this.getRegularPluginsString()
				},
				getRegularPluginsString: function() {
					return this.map(navigator.plugins, function(e) {
						var t = this.map(e, function(e) {
							return [e.type, e.suffixes].join("~")
						}).join(",");
						return [e.name, e.description, t].join("::")
					}, this).join(";")
				},
				getIEPluginsString: function() {
					if (window.ActiveXObject) {
						var e = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
						return this.map(e, function(e) {
							try {
								return new ActiveXObject(e), e
							} catch (t) {
								return null
							}
						}).join(";")
					}
					return ""
				},
				getScreenResolution: function() {
					var e;
					return this.screen_orientation ? e = screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : e = [screen.height, screen.width], e
				},
				getCanvasFingerprint: function() {
					var e = document.createElement("canvas"),
						t = e.getContext("2d"),
						n = "https://www.talkingdata.com";
					return t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(n, 4, 17), e.toDataURL()
				}
			}, e
		});
	var cookie = function(e, t, n) {
		if (typeof t == "undefined") {
			var a = null;
			if (document.cookie && document.cookie != "") {
				var f = document.cookie.split(";");
				for (var l = 0; l < f.length; l++) {
					var c = trim(f[l]);
					if (c.substring(0, e.length + 1) == e + "=") {
						a = decodeURIComponent(c.substring(e.length + 1));
						break
					}
				}
			}
			return a
		}
		n = n || {}, t === null && (t = "", n.expires = -1);
		var r = "";
		if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
			var i;
			typeof n.expires == "number" ? (i = new Date, i.setTime(i.getTime() + n.expires * 24 * 60 * 60 * 1e3)) : i = n.expires, r = "; expires=" + i.toUTCString()
		}
		var s = n.path ? "; path=" + n.path : "",
			o = n.domain ? "; domain=" + n.domain : "",
			u = n.secure ? "; secure" : "";
		document.cookie = [e, "=", encodeURIComponent(t), r, s, o, u].join("")
	};
	TalkingData.localStorage = {
			add: function(e, t) {
				this.addLocalStorage(e, t), e != "sessionId" && this.addCookie(e, t)
			},
			get: function(e) {
				var t = this.getLocalStorage(e);
				return t ? t : this._getCookie(e)
			},
			create: function() {
				if (!!cookie("__SK_LOCAL")) return;
				this._addCookie("");
				if (!window.localStorage) return
			},
			addCookie: function(e, t) {
				if (window.localStorage) return;
				this.create();
				var n = this.cookieList();
				n[e] = t;
				var r = [];
				for (var i in n) r.push(i + "=" + n[i]);
				this._addCookie(r.join(";"))
			},
			_setCookie: function() {
				var e = this.cookieList();
				cookie("__SK_LOCAL", "", {
					expires: 1095,
					path: "/",
					domain: location.hostname
				})
			},
			_addCookie: function(e) {
				cookie("__SK_LOCAL", e, {
					expires: 1095,
					path: "/",
					domain: location.hostname
				})
			},
			_getCookie: function(e) {
				var t = this.cookieList();
				if (t && t[e]) return t[e]
			},
			delCookie: function(e) {},
			cookieList: function() {
				var e = cookie("__SK_LOCAL");
				return this.format(e)
			},
			addLocalStorage: function(e, t) {
				if (!window.localStorage) return;
				e == "sessionId" && window.sessionStorage ? sessionStorage.setItem("__SK_" + e, t) : localStorage["__SK_" + e] = t
			},
			delLocalStorage: function(e) {
				if (!window.localStorage) return;
				localStorage.removeItem("__SK_" + e)
			},
			getLocalStorage: function(e) {
				if (!window.localStorage) return;
				return e == "sessionId" && window.sessionStorage ? sessionStorage.getItem("__SK_" + e) : localStorage["__SK_" + e]
			},
			format: function(e) {
				var t = {};
				if (!e) return t;
				var n = e.split(";"),
					r = n.length;
				for (var i = 0; i < r; i++) {
					var s = n[i].split("=");
					if (s.length != 2) continue;
					t[s[0]] = s[1]
				}
				return t
			}
		},
		TalkingData.sessionStorage = {
			add: function(e, t) {
				if (!window.sessionStorage) return;
				sessionStorage.setItem("__SK_" + e, t)
			},
			get: function(e) {
				return sessionStorage.getItem("__SK_" + e)
			},
			remove: function(e) {
				sessionStorage.removeItem("__SK_" + e)
			}
		};
	var SKXHR, SKONOFF = !0,
		SKNUMBER = !1;
	UrlRequest.prototype = {
			getAjax: function(e, t, n, r, i) { //ajax对象
				var s = this,
					o = {
						invoke: function(s) {
							if (navigator.userAgent.indexOf("MSIE 9.0") > 0) { //如果是IE，IE支持跨域请求对象的建立
								var o = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
								if (o == "MSIE6.0" || o == "MSIE7.0") { //不支持IE6和IE7
									alert("no support IE6,IE7");
									return
								}
								if (window.XDomainRequest) { //如果支持跨域请求
									var u = new XDomainRequest;
									u ? (s.error && typeof s.error == "function" && (u.onerror = function() { //UrlRequest构造函数的方法给跨域请求对象的onerrors事件
										s.error()
									}), s.timeout && typeof s.timeout == "function" && (u.ontimeout = function() {
										s.timeout()
									}), s.success && typeof s.success == "function" && (u.onload = function() {
										s.dataType ? s.dataType.toLowerCase() == "json" && s.success(JSON.parse(u.responseText)) : s.success(u.responseText)
									}), u.open(s.type, s.url), u.send(s.param)) : alert("Failed to create XDomainRequest") / 发送数据到接收的地址
								}
							} else {
								if (!SKONOFF) { //如果SKONOFF为假
									SKNUMBER = !0;
									return
								}
								localData.add("SK-unique", "true"), SKONOFF = !1, SKXHR = $$.ajax({
									type: e,
									url: t,
									data: JSON.stringify(n),
									dataType: "text",
									success: r,
									error: i,
									complete: function() {
										SKXHR = undefined, SKONOFF = !0, SKNUMBER && (DTMgr.getAjax(), SKNUMBER = !1), localData.delLocalStorage("SK-unique")
									}
								})
							}
						}
					};
				o.invoke({
					url: this.url,
					type: "POST",
					param: JSON.stringify(n),
					success: r
				})
			},
			set: function(e, t, n) {
				this.opts = e, this.send(t, n)
			},
			send: function(e, t) {
				this.getAjax("post", this.url, this.opts, e, t)
			}
		},

		function(e) {
			e.SKBASE = e.SKBASE || {},
				SKBASE.cacheName = "cacheList",
				SKBASE.unique = function(e) {
					e.sort();
					var t = [e[0]];
					for (var n = 1; n < e.length; n++)
						e[n] !== t[t.length - 1] && t.push(e[n]); //去重
					return t
				},
				SKBASE.getArgs = function() { //得到地址问之后的参数部分
					var t = new Object,
						n = e.location.search.substring(1),
						r = n.split("&"); //返回地址的查询部分，即问号之后的部分
					for (var i = 0; i < r.length; i++) {
						var s = r[i].indexOf("=");
						if (s == -1) continue;
						var o = r[i].substring(0, s),
							u = r[i].substring(s + 1);
						u = decodeURIComponent(u), t[o] = u
					}
					return t
				},
				SKBASE.getCommon = function(e) {
					var t;
					localData.get("appkey") ? t = localData.get("appkey") : t = DTGlobal.appkey;
					var n = {
						deviceId: DTGlobal.deviceId,
						appkey: t,
						appProfile: DTGlobal.appProfile,
						deviceProfile: DTGlobal.deviceProfile,
						msgs: e.msg
					};
					return n
				},
				SKBASE.getCommonMsg = function(e, t, n, r, i) {
					var s = {
						type: 2,
						data: {
							id: e,
							start: t,
							status: n,
							duration: r || 0,
							pages: [],
							events: i || []
						}
					};
					return s
				},
				SKBASE.addSessionStart = function(e, t) {
					var n;
					localData.add("lastSession", JSON.stringify({
							id: AppSession.data.id,
							start: AppSession.data.start
						})),
						n = localData.get("SK-hold-event"), n && (n = JSON.parse(n));
					console.log("sadasd" + e)
					var r = SKBASE.getCommonMsg(AppSession.data.id, AppSession.data.start, t, e, n);
					SKBASE.addMsg(r), localData.delLocalStorage("SK-hold-event")
				},
				SKBASE.equal = function(e, t) { //判断是否完全相等e
					if (typeof e != typeof t)
						return !1;
					if (typeof e.length != typeof t.length)
						return !1;
					var n = !0,
						r = [],
						i = [];
					for (var s in e)
						s !== "count" && s !== "time" && r.push(s);
					for (var s in t)
						s !== "count" && s !== "time" && i.push(s);
					if (r.length != i.length)
						return !1;
					for (var s = 0, o = i.length; s < o; s++)
						r.push(i[s]);
					var u = SKBASE.unique(r);
					for (var s = 0, o = u.length; s < o; s++) {
						if (!(u[s] in e && u[s] in t))
							return !1;
						if (typeof e[u[s]] == "object" && typeof t[u[s]] == "object") n = SKBASE.equal(e[u[s]], t[u[s]]);
						else if (e[u[s]] !== t[u[s]]) return !1
					}
					return n
				},
				SKBASE.addGenre = function(e, t, n) {
					if (!!localData.get("sessionMsg")) { //强制转换类型
						n && n(e);
						var r = JSON.parse(localData.get("sessionMsg")),
							i = r.msg[r.msg.length - 1].data[t];
						if (t === "events") {
							if (i.length != 0) {
								var s = !1;
								for (var o = 0; o < i.length; o++)
									if (SKBASE.equal(i[o], e)) {
										s = !0, i[o].count += 1, i[o].start = e.start;
										break
									}
								s || i.push(e)
							} else
								i.push(e);
							localData.add("sessionMsg", JSON.stringify(r));
							return
						}
						i.push(e),
							localData.add("sessionMsg", JSON.stringify(r)) //存入sessionMsg
					}
				},
				SKBASE.lealSet = function(e) {
					localData.add("leavetime", e);
					var t = parseInt((e - sessionData.get("SessionStart")) / 1e3);
					!!sessionData.get("SessionStart") && t <= 86400 ? localData.add("leaveSession", t) : localData.add("leaveSession", 0)
				},
				SKBASE.addMsg = function(e) { //添加信息
					if (!localData.get("sessionMsg"))
						localData.add("sessionMsg", JSON.stringify({
							msg: [e]
						}));
					else {
						var t = JSON.parse(localData.get("sessionMsg"));
						t.msg.push(e),
							localData.add("sessionMsg", JSON.stringify(t))
					}
				}
		}(window); //window.SKBASE

	var localData = TalkingData.localStorage,
		sessionData = TalkingData.sessionStorage,

		DTMgr = {
			timedif: undefined,
			state: 1,
			deviceId: 0,
			sessionId: 0,
			local: [],
			set: function() {
				try {
					this.setDeviceId(),
						this.setSession(),
						this.setSessionTime(),
						this.setInitTime(),
						this.setPartner(),
						this.setResolution(),
						this.addlastSession(),
						this.getAjax()
				} catch (e) {
					console.log(e);
				}
			},
			setDeviceId: function() {
				if (localData.get("deviceId")) {
					this.deviceId = localData.get("deviceId");
				} else {
					var e = new TalkingData.Fingerprint,
						t = new TalkingData.Fingerprint({
							screen_resolution: !0
						}),
						n = e.get() + "" + t.get();
					parseInt(n) == NaN ? this.deviceId = n : this.deviceId = parseInt(n).toString(16), this.deviceId = this.deviceId.replace(/\.|\+|\(|\)/g, ""), localData.add("deviceId", this.deviceId)

				}
				DTGlobal.deviceId = this.deviceId
			},
			setSession: function() {
				var e, t = this.deviceId,
					n = parseInt(t, 16),
					r = (new Date).getTime();
				if (this.deviceId.indexOf("-") > -1) {
					var i = this.deviceId.split("-");
					e = i[0] + r
				} else e = this.deviceId + r;
				sessionData.get("sessionId") ? e = sessionData.get("sessionId") : sessionData.add("sessionId", e);
				//			alert(e);
				if (32 - e.length > 0)
					for (var s = 0, o = 32 - e.length; s < o; s++) e += "0";

				32 - e.length < 0 && (e = e.substring(0, 32)),
					AppSession.data.id = this.sessionId = e
			},
			setSessionTime: function() {
				var e;
				e = (new Date).getTime(),
					sessionData.get("SessionStart") ? e = sessionData.get("SessionStart") : sessionData.add("SessionStart", e), AppSession.data.start = parseInt(e)
			},
			setInitTime: function() {
				localData.get("initTime") ? DTGlobal.appProfile.initTime = parseInt(localData.get("initTime")) : (DTGlobal.appProfile.initTime = WebappStart, localData.add("initTime", WebappStart))
			},
			setPartner: function() {
				var e = SKBASE.getArgs().SK_channelid;
				e != undefined && (DTGlobal.appProfile.partner = e)
			},
			setResolution: function() {
				var e = [window.screen.width, window.screen.height];
				window.devicePixelRatio && e.push(window.devicePixelRatio), DTGlobal.deviceProfile.pixel = e.join("*")
			},
			addlastSession: function() {
				var e = localData.get("lastSession");
				e === undefined && (localData.delLocalStorage("sessionMsg"), localData.delLocalStorage("lastSession"));
				if (!e)
					SKBASE.addSessionStart(0, 1);
				else {
					var t = JSON.parse(e);
					if (t.id != AppSession.data["id"]) {
						var n = SKBASE.getCommonMsg(t.id, t.start, 3, parseInt(localData.get("leaveSession")));
						SKBASE.addMsg(n), this.timedif = parseInt((AppSession.data.start - parseInt(localData.get("leavetime"))) / 1e3),
							localData.get("appkey") ? localData.get("appkey") == DTGlobal.appkey && SKBASE.addSessionStart(this.timedif, 1) : SKBASE.addSessionStart(this.timedif, 1);
						return
					}
				}
			},
			getAjax: function() {
				var e = this,
					t = new UrlRequest;
				localStorage.__SK_sessionMsg || SKBASE.addSessionStart(0, 2);
				var n = JSON.parse(localData.get("sessionMsg")),
					r = SKBASE.getCommon(n),
					i = localStorage["__SK_SK-init-event"];
				if (i) {
					var s = r.msgs[r.msgs.length - 1];
					if (s) {
						var o = s.data.events;
						s.data.events = o.concat(JSON.parse(i))
					}
				}
				localData.delLocalStorage("SK-init-event"),
					localData.get("appkey") ? localData.get("appkey") != DTGlobal.appkey ? t.set(r, function(t) {
						localData.delLocalStorage("sessionMsg"), SKBASE.addSessionStart(0, 1), e.getAjax()
					}, function(e) {
						console.log(e)
					}) : t.set(r, function(e) {
						localData.delLocalStorage("sessionMsg"), SKBASE.addSessionStart(0, 2)
					}, function(e) {
						console.log(e)
					}) : t.set(r, function(e) {
						localData.delLocalStorage("sessionMsg"), SKBASE.addSessionStart(0, 2)
					}, function(e) {
						console.log(e)
					}), localData.add("appkey", DTGlobal.appkey)
			}
		};
	DTMgr.set();

	var SDKEvent = {
		set: function(e, t, n) { //id,label,
			if (arguments.length > 0)
				try {
					var r = {
						count: 1,
						time: (new Date).getTime()
					};
					e != undefined && (r.eventId = typeof e != "string" ? JSON.stringify(e) : e), t != undefined ? r.label = typeof t != "string" ? JSON.stringify(t) : t : r.label = "";

					if (n != undefined) {
						var i = function(e) {
							var t = typeof e == "object" && Object.prototype.toString.call(e).toLowerCase() == "[object object]" && !e.length;
							return t
						};

						i(n) ? r.parameters = n : r.parameters = {
								parameters: ""
							} //如果满足以上条件(对象)，r.params = n
					}
					if (SKXHR) {

						SKBASE.addGenre(r, "events", function(e) {
							var t = localData.get("SK-hold-event"),
								n = [];
							n.push(e);
							if (!t) {
								localData.add("SK-hold-event", JSON.stringify(n));
								return
							}
							t = JSON.parse(t);
							for (var r = 0; r < t.length; r++)
								if (SKBASE.equal(t[r], e)) {
									t[r].count += 1, t[r].time = e.time;
									break
								}
							localData.add("SK-hold-event", JSON.stringify(t))
						});
						return
					}
					SKBASE.addGenre(r, "events"), setTimeout(function() {
						DTMgr.getAjax()
					}, 500)
				} catch (s) {}
		},
		unload: function() {
			try {
				DTMgr.getAjax()
			} catch (e) {}
		}
	};
	window.SKAPP = {}, window.SKAPP.onEvent = SDKEvent.set; //SKAPP.onEvent是对外的接口
})(window)