function c(t) {
	var e = 0;
	return function () {
		return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
	};
}
function t(t) {
	var e = "undefined" != typeof Symbol && Symbol.iterator && t[Symbol.iterator];
	return e ? e.call(t) : { next: c(t) };
}
function v(t) {
	t = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, t];
	for (var e = 0; e < t.length; ++e) {
		var n = t[e];
		if (n && n.Math == Math) return n;
	}
	return globalThis;
}
var w = globalThis,
	x = Object.defineProperty;
function y(t, e) {
	if (e) {
		for (var n = globalThis, r = t.split("."), i = 0; i < r.length - 1; i++) {
			var o = r[i];
			o in n || (n[o] = {}), (n = n[o]);
		}
		(o = e((i = n[(r = r[r.length - 1])]))) != i && null != o && x(n, r, { configurable: !0, writable: !0, value: o });
	}
}
function A() {
	(A = function () {}), w.Symbol || (w.Symbol = B);
}
function C(t, e) {
	(this.aa = t), x(this, "description", { configurable: !0, writable: !0, value: e });
}
y("Promise", function (e) {
	// E is just the promise object
	function n(t) {
		(this.v = 0), (this.I = void 0), (this.l = []);
		var e = this.F();
		try {
			t(e.resolve, e.reject);
		} catch (t) {
			e.reject(t);
		}
	}
	function r() {
		this.f = null;
	}
	function i(t) {
		return t instanceof n
			? t
			: new n(function (e) {
					e(t);
			  });
	}
	if (e) return e;
	r.prototype.L = function (t) {
		if (null == this.f) {
			this.f = [];
			var e = this;
			this.M(function () {
				e.ja();
			});
		}
		this.f.push(t);
	};
	var o = w.setTimeout;
	(r.prototype.M = function (t) {
		o(t, 0);
	}),
		(r.prototype.ja = function () {
			for (; this.f && this.f.length; ) {
				var t = this.f;
				this.f = [];
				for (var e = 0; e < t.length; ++e) {
					var n = t[e];
					t[e] = null;
					try {
						n();
					} catch (t) {
						this.da(t);
					}
				}
			}
			this.f = null;
		}),
		(r.prototype.da = function (t) {
			this.M(function () {
				throw t;
			});
		}),
		(n.prototype.F = function () {
			function t(t) {
				return function (r) {
					n || ((n = !0), t.call(e, r));
				};
			}
			var e = this,
				n = !1;
			return { resolve: t(this.ua), reject: t(this.H) };
		}),
		(n.prototype.ua = function (t) {
			if (t === this) this.H(new TypeError("A Promise cannot resolve to itself"));
			else if (t instanceof n) this.wa(t);
			else {
				t: switch (typeof t) {
					case "object":
						var e = null != t;
						break t;
					case "function":
						e = !0;
						break t;
					default:
						e = !1;
				}
				e ? this.ta(t) : this.P(t);
			}
		}),
		(n.prototype.ta = function (t) {
			var e = void 0;
			try {
				e = t.then;
			} catch (t) {
				return void this.H(t);
			}
			"function" == typeof e ? this.xa(e, t) : this.P(t);
		}),
		(n.prototype.H = function (t) {
			this.X(2, t);
		}),
		(n.prototype.P = function (t) {
			this.X(1, t);
		}),
		(n.prototype.X = function (t, e) {
			if (0 != this.v) throw Error("Cannot settle(" + t + ", " + e + "): Promise already settled in state" + this.v);
			(this.v = t), (this.I = e), this.ka();
		}),
		(n.prototype.ka = function () {
			if (null != this.l) {
				for (var t = 0; t < this.l.length; ++t) a.L(this.l[t]);
				this.l = null;
			}
		});
	var a = new r();
	return (
		(n.prototype.wa = function (t) {
			var e = this.F();
			t.B(e.resolve, e.reject);
		}),
		(n.prototype.xa = function (t, e) {
			var n = this.F();
			try {
				t.call(e, n.resolve, n.reject);
			} catch (t) {
				n.reject(t);
			}
		}),
		(n.prototype.then = function (t, e) {
			function r(t, e) {
				return "function" == typeof t
					? function (e) {
							try {
								i(t(e));
							} catch (t) {
								o(t);
							}
					  }
					: e;
			}
			var i,
				o,
				a = new n(function (t, e) {
					(i = t), (o = e);
				});
			return this.B(r(t, i), r(e, o)), a;
		}),
		(n.prototype.catch = function (t) {
			return this.then(void 0, t);
		}),
		(n.prototype.B = function (t, e) {
			function n() {
				switch (r.v) {
					case 1:
						t(r.I);
						break;
					case 2:
						e(r.I);
						break;
					default:
						throw Error("Unexpected state: " + r.v);
				}
			}
			var r = this;
			null == this.l ? a.L(n) : this.l.push(n);
		}),
		(n.resolve = i),
		(n.reject = function (t) {
			return new n(function (e, n) {
				n(t);
			});
		}),
		(n.race = function (e) {
			return new n(function (n, r) {
				for (var o = t(e), a = o.next(); !a.done; a = o.next()) i(a.value).B(n, r);
			});
		}),
		(n.all = function (e) {
			var r = t(e),
				o = r.next();
			return o.done
				? i([])
				: new n(function (t, e) {
						function n(e) {
							return function (n) {
								(a[e] = n), 0 == --c && t(a);
							};
						}
						var a = [],
							c = 0;
						do {
							a.push(void 0), c++, i(o.value).B(n(a.length - 1), e), (o = r.next());
						} while (!o.done);
				  });
		}),
		n
	);
}),
	(C.prototype.toString = function () {
		return this.aa;
	});
var B = (function () {
	var t = 0;
	return function e(n) {
		if (this instanceof e) throw new TypeError("Symbol is not a constructor");
		return new C("jscomp_symbol_" + (n || "") + "_" + t++, n);
	};
})();
function D() {
	A();
	var t = w.Symbol.iterator;
	t || (t = w.Symbol.iterator = w.Symbol("Symbol.iterator")),
		"function" != typeof Array.prototype[t] &&
			x(Array.prototype, t, {
				configurable: !0,
				writable: !0,
				value: function () {
					return E(c(this));
				},
			}),
		(D = function () {});
}
function E(t) {
	return (
		D(),
		((t = { next: t })[w.Symbol.iterator] = function () {
			return this;
		}),
		t
	);
}
function F() {
	(this.s = !1), (this.h = null), (this.A = void 0), (this.i = 1), (this.O = this.ea = 0), (this.m = null);
}
function G(t) {
	if (t.s) throw new TypeError("Generator is already running");
	t.s = !0;
}
function H(t, e, n) {
	return (t.i = n), { value: e };
}
function I(t) {
	(this.a = new F()), (this.sa = t);
}
function L(t, e) {
	G(t.a);
	var n = t.a.h;
	return n
		? J(
				t,
				"return" in n
					? n.return
					: function (t) {
							return { value: t, done: !0 };
					  },
				e,
				t.a.return
		  )
		: (t.a.return(e), K(t));
}
function J(t, e, n, r) {
	try {
		var i = e.call(t.a.h, n);
		if (!(i instanceof Object)) throw new TypeError("Iterator result " + i + " is not an object");
		if (!i.done) return (t.a.s = !1), i;
		var o = i.value;
	} catch (e) {
		return (t.a.h = null), t.a.w(e), K(t);
	}
	return (t.a.h = null), r.call(t.a, o), K(t);
}
function K(t) {
	for (; t.a.i; )
		try {
			var e = t.sa(t.a);
			if (e) return (t.a.s = !1), { value: e.value, done: !1 };
		} catch (e) {
			(t.a.A = void 0), t.a.w(e);
		}
	if (((t.a.s = !1), t.a.m)) {
		if (((e = t.a.m), (t.a.m = null), e.ma)) throw e.ia;
		return { value: e.return, done: !0 };
	}
	return { value: void 0, done: !0 };
}
function M(t) {
	(this.next = function (e) {
		return t.u(e);
	}),
		(this.throw = function (e) {
			return t.w(e);
		}),
		(this.return = function (e) {
			return L(t, e);
		}),
		D(),
		(this[Symbol.iterator] = function () {
			return this;
		});
}
function N(t) {
	function e(e) {
		return t.next(e);
	}
	function n(e) {
		return t.throw(e);
	}
	return new Promise(function (r, i) {
		!(function t(o) {
			o.done ? r(o.value) : Promise.resolve(o.value).then(e, n).then(t, i);
		})(t.next());
	});
}
(F.prototype.u = function (t) {
	this.A = t;
}),
	(F.prototype.w = function (t) {
		(this.m = { ia: t, ma: !0 }), (this.i = this.ea || this.O);
	}),
	(F.prototype.return = function (t) {
		(this.m = { return: t }), (this.i = this.O);
	}),
	(I.prototype.u = function (t) {
		return G(this.a), this.a.h ? J(this, this.a.h.next, t, this.a.u) : (this.a.u(t), K(this));
	}),
	(I.prototype.w = function (t) {
		return G(this.a), this.a.h ? J(this, this.a.h.throw, t, this.a.u) : (this.a.w(t), K(this));
	});
var O = {
	Y: function (t) {
		console.trace(t);
		if (
			((O.retry = t.retry || 3),
			(O.ya = t.switch || !0),
			(O.c = t.player || "player"),
			(O.Ca = t.switchPlayer || "jwplayer"),
			(O.Aa = O.c + "-" + Math.floor(9999999 * Math.random())),
			(O.Ba = t.playerJs || "https://content.jwplatform.com/libraries/aG3IMhIy.js"),
			(O.ra = t.playerJsCustom || "https://iamcdn.net/players/jwplayer/jwplayer.v8.custom.min.js"),
			(O.ca = t.apiUrl || "https://multi.idocdn.com"),
			(O.j = t.apiParams || "vip"),
			(O.ba = t.apiMethod || "POST"),
			(O.credentials = t.credentials || "same-origin"),
			(O.dataType = ""),
			(O.key = t.key || ""),
			(O.type = t.type || ""),
			(O.value = t.value || ""),
			(O.J = !1),
			(O.T = !1),
			(O.b = t.adCustom || {}),
			(O.D = { status: t.adBlock || !1, delay: 3e4, image: "https://iamcdn.net/img/block.jpg" }),
			(O.Z = t.streamBackup || {}),
			(O.N = t.completeLink || ""),
			(O.g = {
				width: t.width || "100%",
				height: t.height || "100%",
				aspectratio: t.aspectratio || "",
				skin: t.skin || "",
				image: t.poster || "",
				mute: t.mute || !1,
				autostart: t.autostart || t.autoPlay || !1,
				advertising: t.advertising || {},
				plugins: t.plugins || {},
				sources: t.sources || [],
				tracks: t.tracks || {},
				captions: t.captions || {},
				logo: t.logo || {},
				title: t.title || "",
				description: t.description || "",
				hlslabels: t.hlslabels || { 1728: "360p", 2428: "480p", 4928: "720p", 9728: "1080p", 11728: "Origin" },
				events: {
					time: function () {
						var t = jwplayer().getPosition();
						void 0 !== O.$ && localStorage.setItem(window.location.href, parseInt(t, 0)), O.b.timeStart && t >= O.b.timeStart && !O.J && !O.T && ((O.T = !0), jwplayer().pause(), O.oa());
					},
					play: function () {},
					pause: function () {},
					seek: function () {},
					error: function () {
						O.S ? (jwplayer().remove(), (t.sources = []), O.Y(t)) : Object.keys(O.Z).length && (jwplayer().load(O.Z), jwplayer().seek(Seek), jwplayer().play());
					},
					adBlock: function () {
						O.D.status &&
							setTimeout(function () {
								try {
									jwplayer().remove();
								} catch (t) {
								} finally {
									$("#" + O.c)
										.css("cssText", "width:100%;height:100% !important;background: url(" + O.D.image + ") center center no-repeat;background-size:contain;position:absolute")
										.html("");
								}
							}, O.D.delay || 3e4);
					},
					complete: function () {
						O.N && (window.location.href = O.N);
					},
				},
				cast: { appid: "00000000" },
				playbackRateControls: t.playbackRate || !1,
			}),
			(O.protocol = location.protocol),
			(O.C = O.R("v")),
			(O.disable = O.R("disable")),
			(O.o = top.location != self.location),
			(O.V = navigator.userAgent.match(/UCBrowser/i)),
			O.ha(),
			O.ga(),
			(O.S = !1),
			(_value = O.value || O.C),
			O.g.sources.length)
		)
			return (O.S = !0), O.G();
		if (!((O.C && "guest" == O.j && O.o) || (O.key && O.type && O.value)))
			return "guest" == O.j
				? O.o || !O.C
					? $("#" + O.c).html("Please add a <strong>?v=slug</strong> parameter on <strong>the url</strong>")
					: O.o && O.V
					? (top.location = self.location)
					: (location.href = "/embed/?v=" + O.C)
				: $("#" + O.c).html("Please fully configure: <strong>Key</strong>, <strong>Type</strong>, <strong>Value</strong>");
		if (O.o && O.V)
			$("#" + O.c)
				.css("cssText", "width:100%;height:100% !important;background: url(https://iamcdn.net/img/play.jpg) center center no-repeat;background-size:contain;position:absolute")
				.html(""),
				$("#" + O.c).click(function () {
					return (top.location = self.location);
				});
		else {
			var linkhydrax = "//playhydrax.com/?v=" + O.value;
			if (HYDRAX_SUB) {
				linkhydrax = "//playhydrax.com/?v=" + O.value + "&sub=" + HYDRAX_SUB + "&sub-lang=" + HYDRAX_SUB_LANG;
			}
			if (O.key && O.type && O.value) return O.o ? (location.href = O.protocol + linkhydrax) : O.la();
			if (!O.na()) return O.la();
		}
	},
	la: function () {
		return new Promise(function (t) {
			var e, n, r, i;
			return N(
				new M(
					new I(function (o) {
						switch (o.i) {
							case 1:
								return O.U() && (O.dataType = "&dataType=m3u8"), H(o, O.W(), 2);
							case 2:
								if (null !== (n = (e = o.A) ? Object.keys(e) : null)) {
									if (e.isRedirect && O.o && "vip" == O.j && "slug" == O.type) return o.return((location.href = O.protocol + "//playhydrax.com/?v=" + O.value));
									if (!n.length || e.msg) return e.msg ? o.return(t($("#" + O.c).html(e.msg))) : o.return(t($("#" + O.c).html("The video doesn't exist")));
								}
								if (((O.g.image = O.g.image || e.thumbnail || ""), !O.U())) return (i = O.g), e.ping && (_url_ping = e.ping), H(o, O.qa(e, n), 7);
								if (!O.ya) {
									(O.g.file = e.link), (O.g.type = "hls"), (o.i = 4);
									break;
								}
								return (r = O.g), H(o, O.pa(e.link), 6);
							case 6:
								(r.sources = o.A), (o.i = 4);
								break;
							case 7:
								i.sources = o.A;
							case 4:
								return o.return(t(O.G()));
						}
					})
				)
			);
		});
	},
	G: function () {
		var t;
		return N(
			new M(
				new I(function (e) {
					return (
						(t = O),
						$.cachedScript(t.ra)
							.done(function () {
								var e = setInterval(function () {
									"undefined" != typeof jwplayer && jwplayer && (clearInterval(e), jwplayer(t.c).setup(t.g));
								}, 500);
							})
							.fail(function () {
								t.retry++, 10 > t.retry ? setTimeout(t.G(), 500) : $("#" + t.c).html("Jwplayer is not defined");
							}),
						e.return()
					);
				})
			)
		);
	},
	za: function () {
		if (((O.J = !0), void 0 === O.$)) {
			O.$ = !0;
			var t = localStorage.getItem(window.location.href);
			if (0 < t) {
				O.resize(), jwplayer().pause();
				var e = $("#" + jwplayer().id)[0];
				$("#" + jwplayer().id).append(
					"\n        <div id='overlay'></div>\n        <div id='hydrax-watching-messbox'>\n          <div id='hydrax-watching-messbox-header'>Notification</div>\n          <div id='hydrax-watching-messbox-body'>\n            You has been watched this video <strong>" +
						t +
						" seconds</strong>.<br>\n            <strong>Do you want to continue?</strong>\n          </div>\n          <div id='hydrax-watching-messbox-footer'>\n            <button id='hydrax-watching-messbox-ok'>Yes</button>\n            <button id='hydrax-watching-messbox-close'>Close</button>\n          </div>\n        </div>\n      "
				);
				var n = $("#hydrax-watching-messbox")[0];
				$("#hydrax-watching-messbox").css({ left: (e.offsetWidth - n.offsetWidth) / 2 + "px", top: (e.offsetHeight - n.offsetHeight) / 2 + "px" }),
					$("#hydrax-watching-messbox-ok").mouseup(function () {
						$("#hydrax-watching-messbox, #overlay").remove(), jwplayer().seek(t), jwplayer().play();
					}),
					$("#hydrax-watching-messbox-close").mouseup(function () {
						jwplayer().play(), $("#hydrax-watching-messbox, #overlay").remove();
					});
			}
		}
	},
	oa: function () {
		if (void 0 !== O.b.script) {
			O.resize();
			var t = O.b.timeSkip;
			$("#" + jwplayer().id).append(
				"\n      <div id='overlay'></div>\n      <div id='hydrax-watching-adbox'>\n        <div id='hydrax-watching-adbox-body'>\n          <div id='hydrax-watching-adbox-close'>" +
					(t || "X") +
					"</div>\n        </div>\n      </div>\n    "
			);
			var e = setInterval(function () {
				0 >= --t ? (clearInterval(e), $("#hydrax-watching-adbox-close").html("X")) : $("#hydrax-watching-adbox-close").html(t);
			}, 1e3);
			if (
				($("#hydrax-watching-adbox-body").css({ width: O.b.width + "px", height: O.b.height + "px" }),
				$("#hydrax-watching-adbox-close").mouseup(function () {
					0 < t || ($("#hydrax-watching-adbox, #overlay").remove(), jwplayer().play());
				}),
				0 <= O.b.script.search("<script"))
			) {
				var n = document.createElement("iframe");
				(n.width = O.b.width),
					(n.height = O.b.height),
					(n.scrolling = "no"),
					(n.frameBorder = "0"),
					document.getElementById("hydrax-watching-adbox-body").appendChild(n),
					(n = n.contentWindow.document).open(),
					n.write("<style>*{margin:0;padding:0;}</style>" + O.b.script),
					n.close();
			} else $("#hydrax-watching-adbox-body").append(O.b.script);
			n = $("#" + jwplayer().id)[0];
			var r = $("#hydrax-watching-adbox")[0];
			$("#hydrax-watching-adbox").css({ left: (n.offsetWidth - r.offsetWidth) / 2 + "px", top: (n.offsetHeight - r.offsetHeight) / 2 + "px" });
		}
	},
	W: function () {
		var t = "guest" == O.j ? "slug=" + O.C + O.dataType : "key=" + O.key + "&type=" + O.type + "&value=" + O.value + O.dataType;
		return new Promise(function (e) {
			fetch(O.ca + "/" + O.j, { method: O.ba, headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: t, credentials: O.credentials })
				.then(function (t) {
					return t.json();
				})
				.then(function (t) {
					return e(t);
				})
				.catch(function (t) {
					if ((O.retry--, !O.retry)) return $("#" + O.c).html(t), e({});
					setTimeout(function () {
						return e(O.W());
					}, 1e3);
				});
		});
	},
	qa: function (t, e) {
		var n = new TextEncoder("utf-8");
		return new Promise(function (r) {
			var i = e.indexOf("servers");
			-1 < i && e.splice(i, 1),
				-1 < (i = e.indexOf("expired")) && e.splice(i, 1),
				-1 < (i = e.indexOf("sig")) && e.splice(i, 1),
				-1 < (i = e.indexOf("thumbnail")) && e.splice(i, 1),
				-1 < (i = e.indexOf("hash")) && e.splice(i, 1),
				-1 < (i = e.indexOf("id")) && e.splice(i, 1),
				-1 < (i = e.indexOf("ids")) && e.splice(i, 1),
				-1 < (i = e.indexOf("ping")) && e.splice(i, 1),
				-1 < (i = e.indexOf("isVast")) && e.splice(i, 1),
				-1 < (i = e.indexOf("isRedirect")) && e.splice(i, 1),
				(i = "#EXTM3U\n#EXT-X-VERSION:3\n");
			for (var o = 0; o < e.length; o++)
				if ((void 0 === t[e[o]].type && (t[e[o]].type = 0), (i += O.va(e[o])), (i += O.fa(t[e[o]], t.servers)), o + 1 == e.length))
					return 1 == e.length && O.K(e[o]), r([{ file: URL.createObjectURL(new Blob([n.encode(i)], { type: "application/x-mpegURL" })), type: "hls" }]);
		});
	},
	pa: function (t) {
		var e = [];
		return new Promise(function (n) {
			fetch(t, { method: "GET", credentials: O.credentials })
				.then(function (t) {
					return t.text();
				})
				.then(function (r) {
					var i = r.match(/RESOLUTION=(.*)x(.*)/g);
					if (((r = r.match(/(.*)\.m3u8/g)), null !== i && null !== r))
						for (var o = 0; o < i.length; o++)
							if (void 0 !== r[o]) {
								var a = i[o].match(/RESOLUTION=(.*)x(.*)/),
									c = r[o].match(/(.*)\.m3u8/);
								e.push({ file: t.replace("playlist.m3u8", "" + c[0]), label: a[2], default: 360 == a[2], type: "hls" }), 1 == i.length && O.K(a[2]);
							}
					return n(e);
				})
				.catch(function () {
					return n(e);
				});
		});
	},
	fa: function (t, e) {
		var n = "#EXTM3U\n#EXT-X-VERSION:4\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXT-X-TARGETDURATION:" + t.duration + "\n#EXT-X-MEDIA-SEQUENCE:0\n";
		void 0 !== t.hash && t.hash && (n += "#EXT-X-HASH:" + t.hash + "\n");
		var r = 0,
			i = 0,
			o = t.id || null,
			a = t.ids || null,
			c = t.file || null,
			s = t.expired || t.sig || null,
			l = t.ranges || null,
			u = l ? l.length : 0;
		switch (t.type || null) {
			case 1:
				for (var h = 0; h < u; h++) {
					c = a[h];
					for (var f = 0; f < l[h].length; f++) {
						if ("object" == typeof e)
							if (r < e.length) {
								var d = e[r];
								r++;
							} else (r = 1), (d = e[0]);
						else d = e;
						(n += "#EXTINF:" + t.extinfs[h] + ",\n"), (n += O.protocol + "//" + d + "/stream/" + s + "/" + o + "/" + c + "/" + l[h][f] + "\n"), i++;
					}
					u == h + 1 && (n += "#EXT-X-ENDLIST");
				}
				break;
			case 2:
				for (a = 0; a < u; a++)
					(i = l[a + 1] ? l[a + 1] : l[0]),
						"object" == typeof e ? (r < e.length ? ((d = e[r]), r++) : ((r = 1), (d = e[0]))) : (d = e),
						(n += "#EXTINF:" + t.extinfs[a] + ",\n"),
						(n += "//" + d + "/proxy/" + s + "/" + o + "/" + c + "/" + l[a] + "/" + i + "\n"),
						a + 1 == u && (n += "#EXT-X-ENDLIST");
				break;
			case 3:
				for (a = 0; a < u; a++)
					(i = l[a + 1] ? l[a + 1] : l[0]),
						"object" == typeof e ? (r < e.length ? ((d = e[r]), r++) : ((r = 1), (d = e[0]))) : (d = e),
						(n += "#EXTINF:" + t.extinfs[a] + ",\n"),
						(n += "//" + d + "/storage/" + s + "/" + o + "/" + c + "/" + l[a] + "/" + t.region + "/" + i + "\n"),
						a + 1 == u && (n += "#EXT-X-ENDLIST");
				break;
			default:
				if (l)
					for (h = 0; h < u; h++) {
						for (c = a[h], f = 0; f < l[h].length; f++) {
							var p = u <= h + f + 1 ? (u <= f + 1 ? a[0] : a[f + 1]) : a[h + f + 1];
							"object" == typeof e.redirect
								? r < e.redirect.length
									? ((d = e.redirect[r]), r++)
									: ((r = 1), (d = e.redirect[0]))
								: e.redirect
								? (d = e.redirect)
								: "object" == typeof e
								? r < e.length
									? ((d = e[r]), r++)
									: ((r = 1), (d = e[0]))
								: (d = e),
								(n += "#EXTINF:" + t.extinfs[i] + ",\n"),
								1 < l[h].length && (n += "#EXT-X-BYTERANGE:" + l[h][f] + "\n"),
								(n += O.protocol + "//" + d + "/redirect/" + s + "/" + o + "/" + c + "/" + p + "\n"),
								i++;
						}
						u == h + 1 && (n += "#EXT-X-ENDLIST");
					}
				else
					for (h = 0; h < a.length; h++)
						(c = a[h]),
							(p = a.length <= h + 1 && a.length <= h + 1 ? a[0] : a[h + 1]),
							"object" == typeof e.redirect
								? r < e.redirect.length
									? ((d = e.redirect[r]), r++)
									: ((r = 1), (d = e.redirect[0]))
								: e.redirect
								? (d = e.redirect)
								: "object" == typeof e
								? r < e.length
									? ((d = e[r]), r++)
									: ((r = 1), (d = e[0]))
								: (d = e),
							(n += "#EXTINF:" + t.extinfs[i] + ",\n"),
							(n += O.protocol + "//" + d + "/redirect/" + s + "/" + o + "/" + c + "/" + p + "\n"),
							i++,
							a.length == h + 1 && (n += "#EXT-X-ENDLIST");
		}
		return (r = new TextEncoder("utf-8")), URL.createObjectURL(new Blob([r.encode(n)], { type: "application/x-mpegURL" })) + "#" + t.id + "\n";
	},
	va: function (t) {
		var e = "";
		switch (t) {
			case "sd":
				e = "#EXT-X-STREAM-INF:BANDWIDTH=1728000,RESOLUTION=480x360\n";
				break;
			case "mhd":
				e = "#EXT-X-STREAM-INF:BANDWIDTH=2428000,RESOLUTION=640x480\n";
				break;
			case "hd":
				e = "#EXT-X-STREAM-INF:BANDWIDTH=4928000,RESOLUTION=1280x720\n";
				break;
			case "fullhd":
				e = "#EXT-X-STREAM-INF:BANDWIDTH=9728000,RESOLUTION=1920x1080\n";
				break;
			case "origin":
				e = "#EXT-X-STREAM-INF:BANDWIDTH=11728000,RESOLUTION=9999x9999\n";
		}
		return e;
	},
	R: function (t) {
		for (var e = window.location.search.substring(1).split("&"), n = 0; n < e.length; n++) {
			var r = e[n].split("=");
			if (r[0] == t) return r[1];
		}
		return !1;
	},
	K: function (t) {
		var e = "Auto";
		360 == t || "sd" == t ? (e = "360p") : 720 == t || "hd" == t ? (e = "720p") : 1080 == t || "fullHd" == t ? (e = "1080p") : (9999 != t && "origin" != t) || (e = "Origin");
		var n = setInterval(function () {
			$(".hydrax-quality").length
				? clearInterval(n)
				: $(".jw-reset .jw-spacer").length &&
				  ($(
						'<div class="jw-icon jw-icon-inline jw-button-color jw-reset hydrax-quality" tabindex="0"><div class="jw-reset-text"><div class="jw-text" style="font-size: large;">' +
							e +
							"</div></div></div>"
				  ).insertAfter(".jw-reset .jw-spacer"),
				  clearInterval(n));
		}, 500);
	},
	U: function () {
		var t = navigator.userAgent,
			e = t.match(/Android/i),
			n = t.match(/BlackBerry/i),
			r = t.match(/iPhone|iPad|iPod|Mac OS/i),
			i = t.match(/Opera Mini/i),
			o = t.match(/IEMobile/i) || t.match(/WPDesktop/i),
			a = t.match(/Mac OS/i),
			c = t.indexOf("Chrome");
		return (t = t.indexOf("Firefox")), (!a || !(-1 < t || -1 < c)) && (e || n || r || i || o);
	},
	na: function () {
		if (window.parent === window) return !1;
		try {
			var t = window.frameElement;
		} catch (e) {
			t = null;
		}
		return null === t ? "" === document.domain && "data:" !== location.protocol : !!t.hasAttribute("sandbox");
	},
	resize: function () {
		function t() {
			var t = $("#" + jwplayer().id)[0],
				e = t.offsetWidth;
			if (
				((t = t.offsetHeight),
				0 < $("#hydrax-watching-adbox").length &&
					(e < O.b.width ? $("#hydrax-watching-adbox").css("display", "none") : $("#hydrax-watching-adbox").css("display", "block"),
					$("#hydrax-watching-adbox").css({ top: (t - O.b.height) / 2 + "px", left: (e - O.b.width) / 2 + "px" })),
				0 < $("#hydrax-watching-messbox").length)
			) {
				var n = $("#hydrax-watching-messbox")[0],
					r = n.offsetWidth;
				(n = n.offsetHeight),
					370 > t ? $("#hydrax-watching-messbox").css("display", "none") : $("#hydrax-watching-messbox").css("display", "block"),
					$("#hydrax-watching-messbox").css({ top: (t - n) / 2 + "px", left: (e - r) / 2 + "px" });
			}
		}
		t(), window.addEventListener("resize", t);
	},
	ha: function () {
		O.disable ||
			"vip" == O.j ||
			($(document).keydown(function (t) {
				if (123 == t.keyCode || t.ctrlKey || t.shiftKey) return !1;
			}),
			$(document).on("contextmenu", function (t) {
				t.preventDefault();
			}));
	},
	ga: function () {
		O.disable ||
			(function t() {
				try {
					!(function t(e) {
						1 !== ("" + e / e).length || e % 20 == 0, t(++e);
					})(0);
				} catch (e) {
					setTimeout(t, 1e3);
				}
			})();
	},
};
function Player(t) {
	return new O.Y(t);
}
Array.prototype.unique = function () {
	for (var t = this.concat(), e = 0; e < t.length; ++e) for (var n = e + 1; n < t.length; ++n) t[e] === t[n] && t.splice(n--, 1);
	return t;
};

jQuery.cachedScript = function (t, e) {
	return (e = $.extend(e || {}, { dataType: "script", cache: !0, url: t })), jQuery.ajax(e);
};
