!function(e){var o={common:{init:function(){function o(o){var n=e(".toggle__menu span.m"),t=e(".toggle__menu span.e"),i=e(".toggle__menu span.n"),a=e(".toggle__menu span.u");t.toggleClass("toggle__close"),o.hasClass("open")?(n.text("E"),i.text("I"),a.text("T")):(n.text("M"),i.text("N"),a.text("U"))}function n(){var o=e(window).scrollTop();e("img.lazy").each(function(){var n=e(this);n.attr("src")||n.offset().top<e(window).height()+o&&n.attr("src",n.data("src"))})}function t(){if(e("#js-parallax-window").length>0){var o=e("#js-parallax-background"),n=e("#js-parallax-window"),t=e(n).offset().top,i=e(window).scrollTop(),a=t-i;e(o).offset().top,window.innerHeight;o.css("top",-.35*a+"px")}}e("#menu_toggle").on("click touchstart",function(n){n.preventDefault(),e("#desktop").toggleClass("is-visible"),e(this).toggleClass("open"),o(e(this)),e("#logo").toggleClass("inverted"),e("#page").toggleClass("padded")}),e(".fade-content > *").css({opacity:"0",transform:"translateY(36px)"}),e(window).on("scroll load",function(){e(".fade-content > *").each(function(o){var n=e(this).offset().top+e(this).outerHeight()/8;e(window).scrollTop()+e(window).height()>n?e(this).css({opacity:"1",transform:"translateY(0px)"}):e(this).css({opacity:"0",transform:"translateY(36px)"})})}),e('a[href^="#"]').on("click",function(o){o.preventDefault(),e("html,body").animate({scrollTop:e(this.hash).offset().top},1500)}),e('a[href^="#contact"]').on("click",function(){e("#contact").addClass("said-hi"),e("#mobile_menu").removeClass("is-visible"),e("body").removeClass("unscrollable")}),e(window).on("scroll",function(){e(window).scrollTop()<1e3&&e(".entry__header time").css("bottom",.15*e(window).scrollTop()-100+"%"),window.matchMedia("(min-width: 1024px)").matches&&(e("#background").css("top",0-.015*e(window).scrollTop()+"%"),e("#background").css("opacity",1-5e-4*e(window).scrollTop()))}),e("img.lazy").length>0&&e(window).scroll(function(){n()}),e(document).ready(function(){e("#js-parallax-window").length&&t()}),e(window).scroll(function(o){e("#js-parallax-window").length&&t()})},finalize:function(){}},home:{init:function(){if(e("#home_banner").length){var o=new Swiper("#home_frame_2",{slidesPerView:"auto",centeredSlides:!0,onlyExternal:!0,effect:"coverflow",direction:"vertical",speed:600,coverflowEffect:{slideShadows:!1}}),n=new Swiper("#home_frame_1",{slidesPerView:"auto",centeredSlides:!0,effect:"coverflow",speed:600,coverflowEffect:{slideShadows:!1}});new Swiper("#home_banner",{initialSlide:1,watchOverflow:!0,speed:600,keyboard:{enabled:!0},pagination:{el:"#home_banner .swiper-pagination",clickable:!0,dynamicBullets:!0},navigation:{nextEl:"#home_banner .swiper-button-next",prevEl:"#home_banner .swiper-button-prev"},controller:{control:[n,o],by:"container"},parallax:!0,a11y:!0})}},finalize:function(){}},about_us:{init:function(){}},design:{init:function(){e(".gallery__project--image").each(function(){function o(){var o=n.data("speed"),i=t.offset().top,a=e(this).scrollTop(),l=e(this).height(),s=t.innerHeight(),r=a+l;if(r>i&&a<i+s)var c=(r-i)*o,f=l+s,d=c/f*100+(50-50*o);n.css({top:d+"%",transform:"translate(-50%, -"+d+"%)"})}var n=e(this),t=e(this).parent();e(document).on({scroll:function(){o()},ready:function(){o()}})});mixitup("#gallery",{animation:{duration:300,nudge:!1,reverseOut:!0,effects:"fade"}});e(window).scroll(function(){e(window).scrollTop()+e(window).height()>=e(document).height()-500?e(".gallery__filter").fadeOut(300):e(".gallery__filter").fadeIn(300)})}}},n={fire:function(e,n,t){var i,a=o;n=void 0===n?"init":n,i=""!==e,i=i&&a[e],(i=i&&"function"==typeof a[e][n])&&a[e][n](t)},loadEvents:function(){n.fire("common"),e.each(document.body.className.replace(/-/g,"_").split(/\s+/),function(e,o){n.fire(o),n.fire(o,"finalize")}),n.fire("common","finalize")}};e(document).ready(n.loadEvents)}(jQuery);
//# sourceMappingURL=main.js.map
