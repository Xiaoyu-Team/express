"use strict";var img=new Image,Chat=function(){function t(){this.socket=null,this.init()}function e(t){k.text(t.size),t.flag?y('<div class="user-in">\n\t\t\t\t欢迎\n\t\t\t\t<img class="user-img '+I+'" alt="'+(t.nickname===j?S:t.nickname)+'" src="images/face.jpeg" />\n\t\t\t\t<strong class="user-name">'+t.nickname+"</strong> \n\t\t\t\t加入群聊！\n\t\t\t</div>"):i("system","用户 "+t.nickname+" 已经离开群聊")}function n(t,e,n,i){n=n?"me-":"";var s='<div class="'+n+'chat-info">\n\t\t\t<img class="user-normal-img '+I+'" alt="'+t+'" src="images/face.jpeg" />\n\t\t\t<span class="time">\n\t\t\t\t<strong class="user-name">'+t+"</strong> \n\t\t\t\t"+h()+'\n\t\t\t</span>\n\t\t\t<span class="'+n+'message">\n\t\t\t\t'+e+"\n\t\t\t</span>\n\t\t</div>";y(s,i)}function i(t,e,i){n(t,e,!1,i)}function s(t,e){n(S,t,!0,e)}function a(t){return'<img src="'+t+'" class="msg-img" />'}function c(){var t=L(".active");N=L(".show"),v=L(".info"),k=L("#peopel"),w=L("#msg-area").get(0),C=L("#nickname"),b=L("#users"),x[H]={user:t,ele:N},o(H),N.show(),Object.defineProperty(T,"ele",{get:function(){return t.data("id")},set:function(e){var n=e.data("id");if(t.removeClass("active"),e.addClass("active"),N.removeClass("show"),x[n])N=x[n].ele,N.addClass("show"),x[n].num=0;else{var i=r(n);w.appendChild(i.get(0)),N=i,x[n]={user:e,ele:N},o(n)}N.get(0).scrollTop=N.get(0).scrollHeight,t=e}}),C.get(0).focus(),g(),u(),y=d(x[H].ele),this.initSend(),this.initImg()}function o(t){var e=0,n=x[t].user.find(".count");Object.defineProperty(x[t],"num",{get:function(){return e},set:function(i){T.ele!==t&&(0===i?n.css({visibility:"hidden"}):1===i&&n.css({visibility:"visible"}),e=i,n.text(e))}})}function r(t,e){var n=L('<div class="msg'+(e?"":" show")+'" data-id='+t+'>\n\t\t\t\t<p class="attention">与'+t+"私聊中</p>\n\t\t\t</div>");return w.appendChild(n.get(0)),n}function l(t){return L('<li class="user" data-id="'+t+'">\n\t\t\t\t<img class="user-img-style", src="images/face.jpeg" />\n\t\t\t\t'+t+'\n\t\t\t\t<span class="count">0</span>\n\t\t\t\t<span class="close">╳</span>\n\t\t\t</li>')}function u(){L("#group").click(function(t){var e=t.target;if(~e.className.indexOf(I)&&"我"!==e.alt){var n=e.alt;if(!x[n]){var i=l(n);b.get(0).appendChild(i.get(0)),T.ele=i}T.ele=x[n].user}})}function g(){b.click(function(t){var e=t.target;if("close"===e.className)return void f(e);for(;"LI"!==e.tagName;)e=e.parentNode;T.ele=L(e)})}function f(t){t=t.parentNode,x.del(t.getAttribute("data-id"))}function m(t){return O.innerHTML=t,O.childNodes[0]}function d(t){var e=t.get(0);return function(t,n){var i=n||e;i.appendChild(m(t)),i.scrollTop=i.scrollHeight}}function h(){var t=new Date;return t.getFullYear()+"/"+t.getMonth()+"/"+t.getDate()+"  "+t.getHours()+":"+p(t.getMinutes())+":"+p(t.getSeconds())}function p(t){return String(t).length<2?"0"+t:t}var v,k,w,C,y,b,j,N,x={del:function(t){T.ele===t&&(T.ele=x.group.user),b.get(0).removeChild(x[t].user.get(0)),w.removeChild(x[t].ele.get(0)),delete x[t]}},S="我",H="group",I="to-private",D=/^image\//,M=t.prototype,O=document.createElement("div"),T={},A=!1;return M.init=function(){var t=this;this.socket=io.connect(),this.socket.on("connect",function(){L(".loading").hide(),L(".enter-name").show(),c.call(t),t.login(),t.register()})},M.register=function(){this.socket.on("loginSuccess",function(){A=!0,L("#mask").hide()}),this.socket.on("repeat",function(){v.text("your nickname is token, please use another")}),this.socket.on("pcmsg",function(t){var e=t.source,n=null;x[e]||(x[e]={user:l(e),ele:r(e,!0)},o(e),b.get(0).appendChild(x[e].user.get(0))),x[e].num+=1,n=x[e].ele,i(e,t.msg,n.get(0))}),this.socket.on("nouser",function(t){y('<p class="attention">'+t+"</p>",N.get(0))}),this.socket.on("newmsg",function(t,e){x[H].num+=1,i(t,e)}),this.socket.on("system",function(t){A&&e(t)})},M.login=function(){var t=this;L("#send-name").click(function(){j=C.val(),j.trim()?t.socket.emit("login",j):v.text("your nickname can't be blank or just spaces")})},M.initSend=function(){var t=this;L("#send").click(function(){var e=L("#msg-input"),n=e.val();if(n.trim()){var i=T.ele;e.val(""),t.message(i,n)}e.get(0).focus()})},M.message=function(t,e){s(e,N.get(0)),t===H?this.socket.emit("postmsg",e):this.socket.emit("pc",{target:t,msg:e})},M.initImg=function(){var t=L("#file"),e=this;L("#image").click(function(){t.get(0).click()}),t.change(function(){var t=this;if(0!==this.files.length){var n=this.files[0];if(D.test(n.type)){var i=new FileReader;i.onload=function(n){t.value="",e.message(T.ele,a(n.target.result))},i.readAsDataURL(n)}}})},t}();L(window).load(function(){new Chat,img.src="images/face.jpeg",img.onerror=function(){this.src="images/logo.png"}});