/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.YTPlayer.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 28/05/14 0.10
 *  *****************************************************************************
 */
function onYouTubePlayerAPIReady() {
    if (ytp.YTAPIReady) return;
    ytp.YTAPIReady = true;
    jQuery(document).trigger("YTAPIReady")
}
if (typeof ytp != "object") ytp = {};
(function (jQuery, ytp) {
    ytp.isDevice = "ontouchstart" in window;
    if (!jQuery.browser) {
        jQuery.browser = {};
        jQuery.browser.mozilla = !1;
        jQuery.browser.webkit = !1;
        jQuery.browser.opera = !1;
        jQuery.browser.msie = !1;
        var nAgt = navigator.userAgent;
        jQuery.browser.ua = nAgt;
        jQuery.browser.name = navigator.appName;
        jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion);
        jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
        if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
        else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
        else if (-1 != nAgt.indexOf("Trident")) {
            jQuery.browser.msie = !0;
            jQuery.browser.name = "Microsoft Internet Explorer";
            var start = nAgt.indexOf("rv:") + 3,
                end = start + 4;
            jQuery.browser.fullVersion = nAgt.substring(start, end)
        } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
        jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10);
        isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10));
        jQuery.browser.version = jQuery.browser.majorVersion
    }
    jQuery.fn.CSSAnimate = function (e, t, n, r, i) {
        return this.each(function () {
            var s = jQuery(this);
            if (0 !== s.length && e) {
                "function" == typeof t && (i = t, t = jQuery.fx.speeds._default);
                "function" == typeof n && (i = n, n = 0);
                "function" == typeof r && (i = r, r = "cubic-bezier(0.65,0.03,0.36,0.72)");
                if ("string" == typeof t)
                    for (var o in jQuery.fx.speeds)
                        if (t == o) {
                            t = jQuery.fx.speeds[o];
                            break
                        } else t = null;
                if (jQuery.support.transition) {
                    var u = "",
                        c = "transitionEnd";
                    jQuery.browser.webkit ? (u = "-webkit-", c = "webkitTransitionEnd") : jQuery.browser.mozilla ? (u = "-moz-", c = "transitionend") : jQuery.browser.opera ? (u = "-o-", c = "otransitionend") : jQuery.browser.msie && (u = "-ms-", c = "msTransitionEnd");
                    o = [];
                    for (p in e) {
                        var h = p;
                        "transform" === h && (h = u + "transform", e[h] = e[p], delete e[p]);
                        "transform-origin" === h && (h = u + "transform-origin", e[h] = e[p], delete e[p]);
                        o.push(h);
                        s.css(h) || s.css(h, 0)
                    }
                    p = o.join(",");
                    s.css(u + "transition-property", p);
                    s.css(u + "transition-duration", t + "ms");
                    s.css(u + "transition-delay", n + "ms");
                    s.css(u + "transition-timing-function", r);
                    s.css(u + "backface-visibility", "hidden");
                    setTimeout(function () {
                        s.css(e)
                    }, 0);
                    setTimeout(function () {
                        s.called || !i ? s.called = !1 : i()
                    }, t + 20);
                    s.on(c, function (e) {
                        s.off(c);
                        s.css(u + "transition", "");
                        e.stopPropagation();
                        "function" == typeof i && (s.called = !0, i());
                        return !1
                    })
                } else {
                    for (var p in e) "transform" === p && delete e[p], "transform-origin" === p && delete e[p], "auto" === e[p] && delete e[p];
                    if (!i || "string" === typeof i) i = "linear";
                    s.animate(e, t, i)
                }
            }
        })
    };
    jQuery.fn.CSSAnimateStop = function () {
        var e = "",
            t = "transitionEnd";
        jQuery.browser.webkit ? (e = "-webkit-", t = "webkitTransitionEnd") : jQuery.browser.mozilla ? (e = "-moz-", t = "transitionend") : jQuery.browser.opera ? (e = "-o-", t = "otransitionend") : jQuery.browser.msie && (e = "-ms-", t = "msTransitionEnd");
        jQuery(this).css(e + "transition", "");
        jQuery(this).off(t)
    };
    jQuery.support.transition = function () {
        var e = (document.body || document.documentElement).style;
        return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
    }();
    (function (c) {
        c.extend({
            metadata: {
                defaults: {
                    type: "class",
                    name: "metadata",
                    cre: /({.*})/,
                    single: "metadata"
                },
                setType: function (e, t) {
                    this.defaults.type = e;
                    this.defaults.name = t
                },
                get: function (b, f) {
                    var d = c.extend({}, this.defaults, f);
                    d.single.length || (d.single = "metadata");
                    var a = c.data(b, d.single);
                    if (a) return a;
                    a = "{}";
                    if ("class" == d.type) {
                        var e = d.cre.exec(b.className);
                        e && (a = e[1])
                    } else if ("elem" == d.type) {
                        if (!b.getElementsByTagName) return;
                        e = b.getElementsByTagName(d.name);
                        e.length && (a = c.trim(e[0].innerHTML))
                    } else void 0 != b.getAttribute && (e = b.getAttribute(d.name)) && (a = e);
                    0 > a.indexOf("{") && (a = "{" + a + "}");
                    a = eval("(" + a + ")");
                    c.data(b, d.single, a);
                    return a
                }
            }
        });
        c.fn.metadata = function (e) {
            return c.metadata.get(this[0], e)
        }
    })(jQuery);
    var getYTPVideoID = function (e) {
        var t;
        if (e.substr(0, 16) == "http://youtu.be/") {
            t = e.replace("http://youtu.be/", "")
        } else if (e.indexOf("http") > -1) {
            t = e.match(/[\\?&]v=([^&#]*)/)[1]
        } else {
            t = e
        }
        return t
    };
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "2.6.0",
        author: "Matteo Bicocchi",
        defaults: {
            containment: "body",
            ratio: "16/9",
            showYTLogo: false,
            videoURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: true,
            vol: 100,
            addRaster: false,
            opacity: 1,
            quality: "default",
            mute: false,
            loop: true,
            showControls: true,
            showAnnotations: false,
            printUrl: true,
            stopMovieOnClick: false,
            realfullscreen: true,
            onReady: function (e) {},
            onStateChange: function (e) {},
            onPlaybackQualityChange: function (e) {},
            onError: function (e) {}
        },
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        rasterImg: "images/raster.png",
        rasterImgRetina: "images/raster@2x.png",
        locationProtocol: location.protocol != "file:" ? location.protocol : "http:",
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this;
                var $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0;
                YTPlayer.opt = {};
                var property = {};
                $YTPlayer.addClass("mb_YTVPlayer");
                if (jQuery.metadata) {
                    jQuery.metadata.setType("class");
                    property = $YTPlayer.metadata()
                }
                if (jQuery.isEmptyObject(property)) property = $YTPlayer.data("property") && typeof $YTPlayer.data("property") == "string" ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property);
                var canGoFullscreen = !(jQuery.browser.msie || jQuery.browser.opera || self.location.href != top.location.href);
                if (!canGoFullscreen) YTPlayer.opt.realfullscreen = false;
                if (!$YTPlayer.attr("id")) $YTPlayer.attr("id", "id_" + (new Date).getTime());
                YTPlayer.opt.id = YTPlayer.id;
                YTPlayer.isAlone = false;
                if (YTPlayer.opt.isBgndMovie) YTPlayer.opt.containment = "body";
                if (YTPlayer.opt.isBgndMovie && YTPlayer.opt.isBgndMovie.mute != undefined) YTPlayer.opt.mute = YTPlayer.opt.isBgndMovie.mute;
                if (!YTPlayer.opt.videoURL) YTPlayer.opt.videoURL = $YTPlayer.attr("href");
                var playerID = "mbYTP_" + YTPlayer.id;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL) : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")) : false;
                YTPlayer.videoID = videoID;
                YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = {
                    autoplay: 0,
                    modestbranding: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: true,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                var canPlayHTML5 = false;
                var v = document.createElement("video");
                if (v.canPlayType) {
                    canPlayHTML5 = true
                }
                if (canPlayHTML5) jQuery.extend(playerVars, {
                    html5: 1
                });
                if (jQuery.browser.msie && jQuery.browser.version < 9) {
                    this.opt.opacity = 1
                }
                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
                var overlay = jQuery("<div/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }).addClass("YTPOverlay");
                YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? jQuery(this) : jQuery(YTPlayer.opt.containment);
                YTPlayer.isBackground = YTPlayer.opt.containment.get(0).tagName.toLowerCase() == "body";
                if (ytp.isDevice && YTPlayer.isBackground) {
                    $YTPlayer.hide();
                    return
                }
                if (YTPlayer.opt.addRaster) {
                    var retina = window.retina || window.devicePixelRatio > 1;
                    overlay.addClass(retina ? "raster retina" : "raster")
                } else {
                    overlay.removeClass("raster retina")
                }
                var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                wrapper.css({
                    position: "absolute",
                    zIndex: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    opacity: 0
                });
                playerBox.css({
                    position: "absolute",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    opacity: this.opt.opacity
                });
                wrapper.append(playerBox);
                if (YTPlayer.isBackground && ytp.isInit) return;
                YTPlayer.opt.containment.children().each(function () {
                    if (jQuery(this).css("position") == "static") jQuery(this).css("position", "relative")
                });
                if (YTPlayer.isBackground) {
                    jQuery("body").css({
                        position: "relative",
                        minWidth: "100%",
                        minHeight: "100%",
                        zIndex: 1,
                        boxSizing: "border-box"
                    });
                    wrapper.css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 0
                    });
                    $YTPlayer.hide();
                    YTPlayer.opt.containment.prepend(wrapper)
                } else YTPlayer.opt.containment.prepend(wrapper);
                YTPlayer.wrapper = wrapper;
                playerBox.css({
                    opacity: 1
                });
                if (!ytp.isDevice) {
                    playerBox.after(overlay);
                    YTPlayer.overlay = overlay
                }
                if (!YTPlayer.isBackground) {
                    overlay.on("mouseenter", function () {
                        $YTPlayer.find(".mb_YTVPBar").addClass("visible")
                    }).on("mouseleave", function () {
                        $YTPlayer.find(".mb_YTVPBar").removeClass("visible")
                    })
                }
                if (!ytp.YTAPIReady) {
                    jQuery("#YTAPI").remove();
                    var tag = jQuery("<script></script>").attr({
                        src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/player_api?v=" + jQuery.mbYTPlayer.version,
                        id: "YTAPI"
                    });
                    jQuery("head title").after(tag)
                } else {
                    setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100)
                }
                jQuery(document).on("YTAPIReady", function () {
                    if (YTPlayer.isBackground && ytp.isInit || YTPlayer.opt.isInit) return;
                    if (YTPlayer.isBackground && YTPlayer.opt.stopMovieOnClick) jQuery(document).off("mousedown.ytplayer").on("mousedown,.ytplayer", function (e) {
                        var t = jQuery(e.target);
                        if (t.is("a") || t.parents().is("a")) {
                            $YTPlayer.pauseYTP()
                        }
                    });
                    if (YTPlayer.isBackground) ytp.isInit = true;
                    YTPlayer.opt.isInit = true;
                    YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;
                    jQuery.mbYTPlayer.getDataFromFeed(YTPlayer.videoID, YTPlayer);
                    jQuery(YTPlayer).on("getVideoInfo_" + YTPlayer.opt.id, function () {
                        if (ytp.isDevice && !YTPlayer.isBackground) {
                            new YT.Player(playerID, {
                                height: "100%",
                                width: "100%",
                                videoId: YTPlayer.videoID,
                                events: {
                                    onReady: function () {
                                        playerBox.css({
                                            opacity: 1
                                        });
                                        YTPlayer.wrapper.css({
                                            opacity: 1
                                        });
                                        $YTPlayer.optimizeDisplay()
                                    },
                                    onStateChange: function () {}
                                }
                            });
                            return
                        }
                        new YT.Player(playerID, {
                            videoId: YTPlayer.videoID.toString(),
                            playerVars: playerVars,
                            events: {
                                onReady: function (e) {
                                    YTPlayer.player = e.target;
                                    if (YTPlayer.isReady) return;
                                    YTPlayer.isReady = true;
                                    YTPlayer.playerEl = YTPlayer.player.getIframe();
                                    $YTPlayer.optimizeDisplay();
                                    YTPlayer.videoID = videoID;
                                    jQuery(window).on("resize.YTP", function () {
                                        $YTPlayer.optimizeDisplay()
                                    });
                                    if (YTPlayer.opt.showControls) jQuery(YTPlayer).buildYTPControls();
                                    YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
                                    if (YTPlayer.opt.startAt > 0) YTPlayer.player.seekTo(parseFloat(YTPlayer.opt.startAt), true);
                                    YTPlayer.player.setVolume(YTPlayer.opt.vol);
                                    if (!YTPlayer.opt.autoPlay) {
                                        YTPlayer.player.pauseVideo();
                                        YTPlayer.checkForStartAt = setInterval(function () {
                                            if (YTPlayer.player.getCurrentTime() >= YTPlayer.opt.startAt) {
                                                clearInterval(YTPlayer.checkForStartAt);
                                                if (YTPlayer.opt.mute) {
                                                    jQuery(YTPlayer).muteYTPVolume()
                                                } else {
                                                    jQuery(YTPlayer).unmuteYTPVolume()
                                                }
                                            }
                                        }, 1)
                                    } else {
                                        $YTPlayer.playYTP();
                                        if (YTPlayer.opt.mute) {
                                            jQuery(YTPlayer).muteYTPVolume()
                                        } else {
                                            jQuery(YTPlayer).unmuteYTPVolume()
                                        }
                                    } if (typeof YTPlayer.opt.onReady == "function") YTPlayer.opt.onReady($YTPlayer);
                                    clearInterval(YTPlayer.getState);
                                    jQuery.mbYTPlayer.checkForState(YTPlayer)
                                },
                                onStateChange: function (e) {
                                    if (typeof e.target.getPlayerState != "function") return;
                                    var t = e.target.getPlayerState();
                                    if (typeof YTPlayer.opt.onStateChange == "function") YTPlayer.opt.onStateChange($YTPlayer, t);
                                    var n = jQuery("#controlBar_" + YTPlayer.id);
                                    var r = YTPlayer.opt;
                                    if (t == 0) {
                                        if (YTPlayer.state == t) return;
                                        YTPlayer.state = t;
                                        YTPlayer.player.pauseVideo();
                                        var i = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
                                        if (r.loop) {
                                            YTPlayer.wrapper.css({
                                                opacity: 0
                                            });
                                            $YTPlayer.playYTP();
                                            YTPlayer.player.seekTo(i, true)
                                        } else if (!YTPlayer.isBackground) {
                                            YTPlayer.player.seekTo(i, true);
                                            $YTPlayer.playYTP();
                                            setTimeout(function () {
                                                $YTPlayer.pauseYTP()
                                            }, 10)
                                        }
                                        if (!r.loop && YTPlayer.isBackground) YTPlayer.wrapper.CSSAnimate({
                                            opacity: 0
                                        }, 2e3);
                                        else if (r.loop) {
                                            YTPlayer.wrapper.css({
                                                opacity: 0
                                            });
                                            YTPlayer.loop++
                                        }
                                        n.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                        jQuery(YTPlayer).trigger("YTPEnd")
                                    }
                                    if (t == 3) {
                                        if (YTPlayer.state == t) return;
                                        YTPlayer.state = t;
                                        YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
                                        n.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                        jQuery(YTPlayer).trigger("YTPBuffering")
                                    }
                                    if (t == -1) {
                                        if (YTPlayer.state == t) return;
                                        YTPlayer.state = t;
                                        YTPlayer.wrapper.css({
                                            opacity: 0
                                        });
                                        jQuery(YTPlayer).trigger("YTPUnstarted")
                                    }
                                    if (t == 1) {
                                        if (YTPlayer.state == t) return;
                                        YTPlayer.state = t;
                                        YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
                                        if (YTPlayer.opt.mute) {
                                            $YTPlayer.muteYTPVolume();
                                            YTPlayer.opt.mute = false
                                        }
                                        if (YTPlayer.opt.autoPlay && YTPlayer.loop == 0) {
                                            YTPlayer.wrapper.CSSAnimate({
                                                opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                                            }, 2e3)
                                        } else if (!YTPlayer.isBackground) {
                                            YTPlayer.wrapper.css({
                                                opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                                            });
                                            $YTPlayer.css({
                                                background: "rgba(0,0,0,0.5)"
                                            })
                                        } else {
                                            setTimeout(function () {
                                                jQuery(YTPlayer.playerEl).CSSAnimate({
                                                    opacity: 1
                                                }, 2e3);
                                                YTPlayer.wrapper.CSSAnimate({
                                                    opacity: YTPlayer.opt.opacity
                                                }, 2e3)
                                            }, 1e3)
                                        }
                                        n.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.pause);
                                        jQuery(YTPlayer).trigger("YTPStart");
                                        if (typeof _gaq != "undefined") _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.title || YTPlayer.videoID.toString()])
                                    }
                                    if (t == 2) {
                                        if (YTPlayer.state == t) return;
                                        YTPlayer.state = t;
                                        n.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                        jQuery(YTPlayer).trigger("YTPPause")
                                    }
                                },
                                onPlaybackQualityChange: function (e) {
                                    if (typeof YTPlayer.opt.onPlaybackQualityChange == "function") YTPlayer.opt.onPlaybackQualityChange($YTPlayer)
                                },
                                onError: function (e) {
                                    if (e.data == 2 && YTPlayer.isPlayList) jQuery(YTPlayer).playNext();
                                    if (typeof YTPlayer.opt.onError == "function") YTPlayer.opt.onError($YTPlayer, e)
                                }
                            }
                        })
                    })
                })
            })
        },
        getDataFromFeed: function (e, t) {
            t.videoID = e;
            if (!jQuery.browser.msie) {
                jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//gdata.youtube.com/feeds/api/videos/" + e + "?v=2&alt=jsonc", function (e, n, r) {
                    t.dataReceived = true;
                    var i = e.data;
                    t.title = i.title;
                    t.videoData = i;
                    if (t.opt.ratio == "auto")
                        if (i.aspectRatio && i.aspectRatio === "widescreen") t.opt.ratio = "16/9";
                        else t.opt.ratio = "4/3";
                    if (!t.hasData) {
                        t.hasData = true;
                        if (!t.isBackground) {
                            var s = t.videoData.thumbnail.hqDefault;
                            jQuery(t).css({
                                background: "rgba(0,0,0,0.5) url(" + s + ") center center",
                                backgroundSize: "cover"
                            })
                        }
                        jQuery(t).trigger("getVideoInfo_" + t.opt.id)
                    }
                    jQuery(t).trigger("YTPChanged")
                });
                setTimeout(function () {
                    if (!t.dataReceived && !t.hasData) {
                        t.hasData = true;
                        jQuery(t).trigger("getVideoInfo_" + t.opt.id)
                    }
                    jQuery(t).trigger("YTPChanged")
                }, 1500)
            } else {
                t.opt.ratio == "auto" ? t.opt.ratio = "16/9" : t.opt.ratio;
                if (!t.hasData) {
                    t.hasData = true;
                    setTimeout(function () {
                        jQuery(t).trigger("getVideoInfo_" + t.opt.id)
                    }, 100)
                }
                jQuery(t).trigger("YTPChanged")
            }
        },
        getVideoID: function () {
            var e = this.get(0);
            return e.videoID || false
        },
        setVideoQuality: function (e) {
            var t = this.get(0);
            t.player.setPlaybackQuality(e)
        },
        YTPlaylist: function (e, t, n) {
            var r = this.get(0);
            r.isPlayList = true;
            if (t) e = jQuery.shuffle(e);
            if (!r.videoID) {
                r.videos = e;
                r.videoCounter = 0;
                r.videoLength = e.length;
                jQuery(r).data("property", e[0]);
                jQuery(r).mb_YTPlayer()
            }
            if (typeof n == "function") jQuery(r).on("YTPChanged", function () {
                n(r)
            });
            jQuery(r).on("YTPEnd", function () {
                jQuery(r).playNext()
            })
        },
        playNext: function () {
            var e = this.get(0);
            e.videoCounter++;
            if (e.videoCounter >= e.videoLength) e.videoCounter = 0;
            jQuery(e.playerEl).css({
                opacity: 0
            });
            jQuery(e).changeMovie(e.videos[e.videoCounter])
        },
        playPrev: function () {
            var e = this.get(0);
            e.videoCounter--;
            if (e.videoCounter < 0) e.videoCounter = e.videoLength - 1;
            jQuery(e.playerEl).css({
                opacity: 0
            });
            jQuery(e).changeMovie(e.videos[e.videoCounter])
        },
        changeMovie: function (e) {
            var t = this.get(0);
            var n = t.opt;
            t.opt.startAt = 0;
            t.opt.stopAt = 0;
            if (e) {
                jQuery.extend(n, e)
            }
            t.videoID = getYTPVideoID(n.videoURL);
            jQuery(t).pauseYTP();
            var r = jQuery.browser.msie ? 1e3 : 0;
            jQuery(t.playerEl).CSSAnimate({
                opacity: 0
            }, r);
            setTimeout(function () {
                jQuery(t).getPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + t.videoID), t.opt.startAt, t.opt.quality);
                jQuery(t).playYTP();
                jQuery(t).one("YTPStart", function () {
                    jQuery(t.playerEl).CSSAnimate({
                        opacity: 1
                    }, r)
                })
            }, r);
            if (t.opt.mute) {
                jQuery(t).muteYTPVolume()
            } else {
                jQuery(t).unmuteYTPVolume()
            } if (t.opt.addRaster) {
                var i = window.retina || window.devicePixelRatio > 1;
                t.overlay.addClass(i ? "raster retina" : "raster")
            } else {
                t.overlay.removeClass("raster");
                t.overlay.removeClass("retina")
            }
            jQuery("#controlBar_" + t.id).remove();
            if (t.opt.showControls) jQuery(t).buildYTPControls();
            jQuery.mbYTPlayer.getDataFromFeed(t.videoID, t);
            jQuery(t).optimizeDisplay();
            clearInterval(t.getState);
            jQuery.mbYTPlayer.checkForState(t)
        },
        getPlayer: function () {
            return jQuery(this).get(0).player
        },
        playerDestroy: function () {
            var e = this.get(0);
            ytp.YTAPIReady = false;
            ytp.isInit = false;
            e.opt.isInit = false;
            e.videoID = null;
            var t = e.wrapper;
            t.remove();
            jQuery("#controlBar_" + e.id).remove()
        },
        fullscreen: function (e) {
            function o(e, t) {
                var n = ["webkit", "moz", "ms", "o", ""];
                var r = 0,
                    i, s;
                while (r < n.length && !e[i]) {
                    i = t;
                    if (n[r] == "") {
                        i = i.substr(0, 1).toLowerCase() + i.substr(1)
                    }
                    i = n[r] + i;
                    s = typeof e[i];
                    if (s != "undefined") {
                        n = [n[r]];
                        return s == "function" ? e[i]() : e[i]
                    }
                    r++
                }
            }

            function u(e) {
                o(e, "RequestFullScreen")
            }

            function a() {
                if (o(document, "FullScreen") || o(document, "IsFullScreen")) {
                    o(document, "CancelFullScreen")
                }
            }
            var t = this.get(0);
            var n = jQuery("#controlBar_" + t.id);
            var r = n.find(".mb_OnlyYT");
            var i = t.isBackground ? jQuery(t.wrapper) : jQuery(t);
            if (e) {
                var s = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(s).on(s, function () {
                    var e = o(document, "IsFullScreen") || o(document, "FullScreen");
                    if (!e) {
                        t.isAlone = false;
                        r.html(jQuery.mbYTPlayer.controls.onlyYT);
                        jQuery(t).setVideoQuality(t.opt.quality);
                        jQuery(t).removeClass("fullscreen");
                        if (t.isBackground) {
                            jQuery("body").after(n)
                        } else {
                            t.wrapper.before(n)
                        }
                        jQuery(window).resize()
                    } else {
                        jQuery(t).setVideoQuality("default")
                    }
                })
            }
            if (!t.isAlone) {
                if (t.player.getPlayerState() != 1 && t.player.getPlayerState() != 2) jQuery(t).playYTP();
                if (e) {
                    t.wrapper.append(n);
                    u(i.get(0));
                    jQuery(t).addClass("fullscreen")
                } else i.css({
                    zIndex: 1e4
                }).CSSAnimate({
                    opacity: 1
                }, 1e3, 0);
                jQuery(t).trigger("YTPFullScreenStart");
                r.html(jQuery.mbYTPlayer.controls.showSite);
                t.isAlone = true
            } else {
                if (e) {
                    a()
                } else {
                    i.CSSAnimate({
                        opacity: t.opt.opacity
                    }, 500);
                    i.css({
                        zIndex: 0
                    })
                }
                jQuery(t).trigger("YTPFullScreenEnd");
                r.html(jQuery.mbYTPlayer.controls.onlyYT);
                t.isAlone = false
            }
        },
        playYTP: function () {
            var e = this.get(0);
            if (typeof e.player === "undefined") return;
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPPlaypause");
            n.html(jQuery.mbYTPlayer.controls.pause);
            e.player.playVideo();
            e.wrapper.CSSAnimate({
                opacity: e.opt.opacity
            }, 2e3);
            jQuery(e).on("YTPStart", function () {
                jQuery(e).css("background", "none")
            })
        },
        toggleLoops: function () {
            var e = this.get(0);
            var t = e.opt;
            if (t.loop == 1) {
                t.loop = 0
            } else {
                if (t.startAt) {
                    e.player.seekTo(t.startAt)
                } else {
                    e.player.playVideo()
                }
                t.loop = 1
            }
        },
        stopYTP: function () {
            var e = this.get(0);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPPlaypause");
            n.html(jQuery.mbYTPlayer.controls.play);
            e.player.stopVideo()
        },
        pauseYTP: function () {
            var e = this.get(0);
            var t = e.opt;
            var n = jQuery("#controlBar_" + e.id);
            var r = n.find(".mb_YTVPPlaypause");
            r.html(jQuery.mbYTPlayer.controls.play);
            e.player.pauseVideo()
        },
        seekToYTP: function (e) {
            var t = this.get(0);
            t.player.seekTo(e, true)
        },
        setYTPVolume: function (e) {
            var t = this.get(0);
            if (!e && !t.opt.vol && player.getVolume() == 0) jQuery(t).unmuteYTPVolume();
            else if (!e && t.player.getVolume() > 0 || e && t.player.getVolume() == e) jQuery(t).muteYTPVolume();
            else t.opt.vol = e;
            t.player.setVolume(t.opt.vol)
        },
        muteYTPVolume: function () {
            var e = this.get(0);
            e.opt.vol = e.player.getVolume() || 50;
            e.player.mute();
            e.player.setVolume(0);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPMuteUnmute");
            n.html(jQuery.mbYTPlayer.controls.unmute)
        },
        unmuteYTPVolume: function () {
            var e = this.get(0);
            e.player.unMute();
            e.player.setVolume(e.opt.vol);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPMuteUnmute");
            n.html(jQuery.mbYTPlayer.controls.mute)
        },
        manageYTPProgress: function () {
            var e = this.get(0);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPProgress");
            var r = t.find(".mb_YTVPLoaded");
            var i = t.find(".mb_YTVTime");
            var s = n.outerWidth();
            var o = Math.floor(e.player.getCurrentTime());
            var u = Math.floor(e.player.getDuration());
            var a = o * s / u;
            var f = 0;
            var l = e.player.getVideoLoadedFraction() * 100;
            r.css({
                left: f,
                width: l + "%"
            });
            i.css({
                left: 0,
                width: a
            });
            return {
                totalTime: u,
                currentTime: o
            }
        },
        buildYTPControls: function () {
            var e = this.get(0);
            var t = e.opt;
            if (jQuery("#controlBar_" + e.id).length) return;
            var n = jQuery("<span/>").attr("id", "controlBar_" + e.id).addClass("mb_YTVPBar").css({
                whiteSpace: "noWrap",
                position: e.isBackground ? "fixed" : "absolute",
                zIndex: e.isBackground ? 1e4 : 1e3
            }).hide();
            var r = jQuery("<div/>").addClass("buttonBar");
            var i = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTVPPlaypause ytpicon").click(function () {
                if (e.player.getPlayerState() == 1) jQuery(e).pauseYTP();
                else jQuery(e).playYTP()
            });
            var s = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTVPMuteUnmute ytpicon").click(function () {
                if (e.player.getVolume() == 0) {
                    jQuery(e).unmuteYTPVolume()
                } else {
                    jQuery(e).muteYTPVolume()
                }
            });
            var o = jQuery("<span/>").addClass("mb_YTVPTime");
            var u = t.videoURL;
            if (u.indexOf("http") < 0) u = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + t.videoURL;
            var a = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTVPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                window.open(u, "viewOnYT")
            });
            var f = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                jQuery(e).fullscreen(t.realfullscreen)
            });
            var l = jQuery("<div/>").addClass("mb_YTVPProgress").css("position", "absolute").click(function (t) {
                h.css({
                    width: t.clientX - h.offset().left
                });
                e.timeW = t.clientX - h.offset().left;
                n.find(".mb_YTVPLoaded").css({
                    width: 0
                });
                var r = Math.floor(e.player.getDuration());
                e.goto = h.outerWidth() * r / l.outerWidth();
                e.player.seekTo(parseFloat(e.goto), true);
                n.find(".mb_YTVPLoaded").css({
                    width: 0
                })
            });
            var c = jQuery("<div/>").addClass("mb_YTVPLoaded").css("position", "absolute");
            var h = jQuery("<div/>").addClass("mb_YTVTime").css("position", "absolute");
            l.append(c).append(h);
            r.append(i).append(s).append(o);
            if (t.printUrl) {
                r.append(a)
            }
            if (e.isBackground || e.opt.realfullscreen && !e.isBackground) r.append(f);
            n.append(r).append(l);
            if (!e.isBackground) {
                n.addClass("inlinePlayer");
                e.wrapper.before(n)
            } else {
                jQuery("body").after(n)
            }
            n.fadeIn()
        },
        checkForState: function (e) {
            var t = jQuery("#controlBar_" + e.id);
            var n = e.opt;
            var r = e.opt.startAt ? e.opt.startAt : 1;
            var i = e.opt.stopAt > e.opt.startAt ? e.opt.stopAt : 0;
            i = i < e.player.getDuration() ? i : 0;
            e.getState = setInterval(function () {
                var s = jQuery(e).manageYTPProgress();
                t.find(".mb_YTVPTime").html(jQuery.mbYTPlayer.formatTime(s.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(s.totalTime));
                if (e.player.getPlayerState() == 1 && (parseFloat(e.player.getDuration() - 3) < e.player.getCurrentTime() || i > 0 && parseFloat(e.player.getCurrentTime()) > i)) {
                    if (!n.loop) {
                        e.player.pauseVideo();
                        e.wrapper.CSSAnimate({
                            opacity: 0
                        }, 2e3, function () {
                            e.player.seekTo(r, true);
                            if (!e.isBackground) {
                                var t = e.videoData.thumbnail.hqDefault;
                                jQuery(e).css({
                                    background: "rgba(0,0,0,0.5) url(" + t + ") center center",
                                    backgroundSize: "cover"
                                })
                            }
                        })
                    } else e.player.seekTo(r);
                    jQuery(e).trigger("YTPEnd")
                }
            }, 1)
        },
        formatTime: function (e) {
            var t = Math.floor(e / 60);
            var n = Math.floor(e - 60 * t);
            return (t < 9 ? "0" + t : t) + " : " + (n < 9 ? "0" + n : n)
        }
    };
    jQuery.fn.toggleVolume = function () {
        var e = this.get(0);
        if (!e) return;
        if (e.player.isMuted()) {
            jQuery(e).unmuteYTPVolume();
            return true
        } else {
            jQuery(e).muteYTPVolume();
            return false
        }
    };
    jQuery.fn.optimizeDisplay = function () {
        var e = this.get(0);
        var t = e.opt;
        var n = jQuery(e.playerEl);
        var r = {};
        var i = !e.isBackground ? t.containment : jQuery(window);
        r.width = i.width();
        r.height = i.height();
        var s = 24;
        var o = {};
        o.width = r.width + r.width * s / 100;
        o.height = t.ratio == "16/9" ? Math.ceil(9 * r.width / 16) : Math.ceil(3 * r.width / 4);
        o.marginTop = -((o.height - r.height) / 2);
        o.marginLeft = -(r.width * (s / 2) / 100);
        if (o.height < r.height) {
            o.height = r.height + r.height * s / 100;
            o.width = t.ratio == "16/9" ? Math.floor(16 * r.height / 9) : Math.floor(4 * r.height / 3);
            o.marginTop = -(r.height * (s / 2) / 100);
            o.marginLeft = -((o.width - r.width) / 2)
        }
        n.css({
            width: o.width,
            height: o.height,
            marginTop: o.marginTop,
            marginLeft: o.marginLeft
        })
    };
    jQuery.shuffle = function (e) {
        var t = e.slice();
        var n = t.length;
        var r = n;
        while (r--) {
            var i = parseInt(Math.random() * n);
            var s = t[r];
            t[r] = t[i];
            t[i] = s
        }
        return t
    };
    jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;
    jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.YTPlaylist;
    jQuery.fn.playNext = jQuery.mbYTPlayer.playNext;
    jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev;
    jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie;
    jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID;
    jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer;
    jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy;
    jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen;
    jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildYTPControls;
    jQuery.fn.playYTP = jQuery.mbYTPlayer.playYTP;
    jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops;
    jQuery.fn.stopYTP = jQuery.mbYTPlayer.stopYTP;
    jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pauseYTP;
    jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekToYTP;
    jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.muteYTPVolume;
    jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmuteYTPVolume;
    jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setYTPVolume;
    jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
    jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageYTPProgress
})(jQuery, ytp)