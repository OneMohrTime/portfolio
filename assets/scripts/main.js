/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($) {
	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var Sage = {
		// All pages
		'common': {
			init: function () {
				// JavaScript to be fired on all pages
				
				//
				$('html.no-js').removeClass('no-js');
				//
				
				// Change MENU to EXIT
				function changeLetters(btn) {
					var m = $('.toggle__menu span.m'),
						e = $('.toggle__menu span.e'),
						n = $('.toggle__menu span.n'),
						u = $('.toggle__menu span.u');
					
					e.toggleClass('toggle__close');
					
					if(btn.hasClass('open')) {
						m.text('E');
						n.text('I');
						u.text('T');
					} else {
						m.text('M');
						n.text('N');
						u.text('U');
					}
				}
				
				// Bourbon refills nav
				$('#menu_toggle').on('click touchstart', function(e) {
					e.preventDefault();	
					// Open nav menu
					$('#primary_nav').toggleClass('is-visible');
					// Add header hook
					$('#masthead').toggleClass('nav-is-open');
					// Switch menu toggle
					$(this).toggleClass('open');
					changeLetters($(this));
					// Invert logo color
					$('#logo').toggleClass('inverted');
					// Add padding to navbar area
					$('#page').toggleClass('padded');
					// Move filters down on Featured Work page
					if (window.matchMedia("(min-width: 600px)").matches) {
						if (typeof mixitup == 'function') {
							$('.gallery__filter').toggleClass('with-sticky')
						}
					}
				});
				
				// Multilevel links
//				$('.multilevel-link').on('click touchstart', function() {
//					$(this).next('ul').animate({
//						width : 'toggle'
//					}, 200);
//				});
				
				// find wordpress galleries
				var wpGallery = document.querySelector('.entry__content .gallery');
				// add .fade-content class
				$(wpGallery).addClass('fade-content');
				
				// fade in page titles
				function fadeInTitle() {
					var animDelay = 0.1;
					$('.title--animated').lettering();
					for(
						var x = 0;
						x < $('.title--animated').children().length; x++
					) {
						$('.char' + (x + 1).toString()).css('animation', 'fadeInTitle 400ms ' + (x * animDelay).toString() + 's 1 forwards');
					}
				}
				if ($('.title--animated').length) {
					fadeInTitle();
				}
				
				// Show an element
				var show = function (elem) {
					// Get the natural height of the element
					var getHeight = function () {
						elem.style.display = 'block'; // Make it visible
						var height = elem.scrollHeight + 'px'; // Get it's height
						elem.style.display = ''; //  Hide it again
						return height;
					};
					
					var height = getHeight(); // Get the natural height
					elem.classList.add('is-visible'); // Make the element visible
					elem.style.height = height; // Update the max-height
					
					// Once the transition is complete, remove the inline max-height so the content can scale responsively
					window.setTimeout(function () {
						elem.style.height = '';
					}, 350);
				};
				
				// Hide an element
				var hide = function (elem) {
					// Give the element a height to change from
					elem.style.height = elem.scrollHeight + 'px';
					
					// Set the height back to 0
					window.setTimeout(function () {
						elem.style.height = '0';
					}, 1);
					
					// When the transition is complete, hide it
					window.setTimeout(function () {
						elem.classList.remove('is-visible');
					}, 350);
				};
				
				// Toggle element visibility
				var toggle = function (elem, timing) {
					// If the element is visible, hide it
					if (elem.classList.contains('is-visible')) {
						hide(elem);
						return;
					}
					
					// Otherwise, show it
					show(elem);
					
				};
				
				// Listen for click events
				document.addEventListener('click', function (event) {
					// Make sure clicked element is our toggle
					if (!event.target.classList.contains('toggle')) return;
					
					// Prevent default link behavior
					event.preventDefault();
					
					// Get the content
					var content = document.querySelector(event.target.hash);
					if (!content) return;
					
					// Toggle the content
					toggle(content);
				}, false);
				
				// Slide nav menu up and down
				// Initial scroll position
				var scrollState = 0;
				// Store navbar classes
				var navClasses = document.getElementById('masthead').classList;
				// returns current scroll position
				var scrollTop = function() {
					return window.scrollY;
				};
				
				// Primary scroll event function
				var scrollDetect = function(home, down, up) {
					// Current scroll position
					var currentScroll = scrollTop();
					if (scrollTop() === 0) {
						home();
					} else if (currentScroll > scrollState) {
						down();
					} else {
						up();
					}
					// Set previous scroll position
					scrollState = scrollTop();
				};
				
				function homeAction() {
					console.log('home');
				}
				
				function downAction() {
					navClasses.remove('slide--down');
					navClasses.add('slide--up');
				}
				
				function upAction() {
					navClasses.remove('slide--up');
					navClasses.add('slide--down');
				}
				
				window.addEventListener('scroll', function() {
					scrollDetect(homeAction, downAction, upAction);
				});
				
//				// custom lazyload TODO
//				function lazyLoadImages() {
//					var st = $(window).scrollTop();
//					$('img.lazy').each(function () {
//						var img = $(this);
//						if (img.attr('src')) return;
//						if (img.offset().top < $(window).height() + st) {
//							img.attr('src', img.data('src'));
//						}
//					});
//				}
//				if ($('img.lazy').length > 0) {
//					$(window).scroll(function () {
//						lazyLoadImages();
//					});
//				}
				
				// Fade in content
				// Hide direct children of .fade-content element
				$('.fade-content > *').css({
					'opacity'   : '0',
					'transform' : 'translateY(' + 36 + 'px)'
				});
				// Trigger fade in as window scrolls
				$(window).on('scroll load', function(){
					$('.fade-content > *').each( function(i) {
						var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 8;
						var bottom_of_window = $(window).scrollTop() + $(window).height();
						if( bottom_of_window > bottom_of_object ) {
							$(this).css({
								'opacity'   :'1',
								'transform' : 'translateY(' + 0 + 'px)'
							});
						} else {
							$(this).css({
								'opacity'   :'0',
								'transform' : 'translateY(' + 36 + 'px)'
							});
						}
					});
				});
				
				// Add or remove scrolling navbar classes
				$(window).scroll(function() {
					if ($(document).scrollTop() > 50) {
						$('nav').addClass('transparent');
					} else {
						$('nav').removeClass('transparent');
					}
				});
				
				// click to smoothscroll
				$('a[href^="#"]').on('click', function(e) {
					e.preventDefault();
					$('html,body').animate({
						scrollTop : $(this.hash).offset().top
					}, 1500);
				});
				// add scrolling class to contact
				$('a[href^="#contact"]').on('click', function() {
					$('#contact').addClass('said-hi');
					$('#mobile_menu').removeClass('is-visible');
				});
				
				// Animated page header titles
//				$('.entry__header .title, .page__header .title').lettering();
				
				// Image parallax effect
				// TODO: check for missing data-speed
				$('.image--parallax').each(function () {
					var img       = $(this);
					var imgParent = $(this).parent();
					
					function parallaxImg() {
						var speed   = img.data('speed');
						var imgY    = imgParent.offset().top;
						var winY    = $(this).scrollTop();
						var winH    = $(this).height();
						var parentH = imgParent.innerHeight();
						
						// The next pixel to show on screen      
						var winBottom = winY + winH;
						
						// If block is shown on screen
						if (winBottom > imgY && winY < imgY + parentH) {
							// Number of pixels shown after block appear
							var imgBottom = ((winBottom - imgY) * speed);
							// Max number of pixels until block disappear
							var imgTop = winH + parentH;
							// Porcentage between start showing until disappearing
							var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
						}
						img.css({
							top: imgPercent + '%',
							transform: 'translateY(-' + imgPercent + '%)'
						});
					}
//					if ( !img.hasAttribute('data-speed') ) {
//						console.log(img + 'has no data-attr');
//					}
					$(document).on({
						scroll : function () {
							parallaxImg();
						},
						ready  : function () {
							parallaxImg();
						}
					});
				});
				
				// load google fonts with webfont loader
				WebFontConfig = {
					google : {
						families : ['Barlow Semi Condensed:400,700','Barlow:400,700','Abril Fatface']
					}
				};
				
				(function(d) {
					var wf = d.createElement('script'), s = d.scripts[0];
					wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
					wf.async = true;
					s.parentNode.insertBefore(wf, s);
				})(document);
				
				// Instagram API
				// https://rudrastyh.com/javascript/get-photos-from-instagram.html
				var token      = '3567722892.23a17ec.5d06e45c020048ccb85cc81744ee03b0',
					userid     = 3567722892,
					num_photos = 4;
					
				$.ajax({
					url : 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
//					url : 'https://api.instagram.com/v1/users/self/media/recent',
					dataType : 'jsonp',
					type : 'GET',
					data : {
						access_token : token,
						count        : num_photos
					},
					success : function(data) {
//						console.log(data);
						for( x in data.data ) {
							$('#latest_instagram').append('<figure class="widget__instagram--image"><img src="' + data.data[x].images.thumbnail.url + '" alt="' + data.data[x].caption.text + '" srcset="' + data.data[x].images.low_resolution.url + ' 306w, ' + data.data[x].images.standard_resolution.url + '" /><figcaption class="widget__instagram--caption"><p>' + data.data[x].caption.text + '</p><p class="widget__instagram--btn" target="_blank">View <i class="fa fa-external-link"></i></p></figcaption><a href="' + data.data[x].link +'" title="View on Instagram" target="_blank" class="widget__instagram--link"><span class="screen-reader-text">View on Instagram</span></a></figure>');
//							 data.data[x].images.thumbnail.url - URL of image 150х150
//							 data.data[x].images.low_resolution.url - URL of image 306x306
//							 data.data[x].images.standard_resolution.url - URL of image 612х612
//							 data.data[x].link - Instagram post URL 
						}
					},
					error : function(data) {
//						console.log(data);
					}
				});
				
				// Fancybox
				$('[data-fancybox]').fancybox({
					// Enable infinite gallery navigation
					loop : true,
					// What buttons should appear in the top right corner.
					// Buttons will be created using templates from `btnTpl` option
					// and they will be placed into toolbar (class="fancybox-toolbar"` element)
					buttons : [
						'zoom',
						'share',
						//'slideShow',
						'fullScreen',
						//'download',
						'thumbs',
						'close'
					],
					// Open/close animation type
					// Possible values:
					//   false            - disable
					//   "zoom"           - zoom images from/to thumbnail
					//   "fade"
					//   "zoom-in-out"
					animationEffect   : 'zoom',
					// Duration in ms for open/close animation
					animationDuration : 200,
					// Transition effect between slides
					//
					// Possible values:
					//   false            - disable
					//   'fade'
					//   'slide'
					//   'circular'
					//   'tube'
					//   'zoom-in-out'
					//   'rotate'
					//
					transitionEffect   : 'slide',
					// Duration in ms for transition animation
					transitionDuration : 400,
					// Customize or add new media types
					// Example:
					/*
						media : {
							youtube : {
								params : {
									autoplay : 0
								}
							}
						}
					*/
					media  : {},
					thumbs : {
						autoStart : true, // Display thumbnails on opening
					},
				});
				
			},
			finalize: function () {
				// JavaScript to be fired on all pages, after page specific JS is fired
				
			}
		},
		// Home page
		'home': {
			init: function () {
				// JavaScript to be fired on the home page
				
				// Swiper.js
				if ($('#home_banner').length) {
					var homeParallax = new Swiper('#home_parallax', {
						slidesPerView : 'auto',
						parallax      : true,
					});
					var homeFrame2 = new Swiper('#home_frame_2', {
						slidesPerView  : 'auto',
						centeredSlides : true,
						grabCursor     : true,
						effect         : 'flip',
						direction      : 'vertical',
						flipEffect     : {
							slideShadows : false
						}
					});
					var homeFrame1 = new Swiper('#home_frame_1', {
						slidesPerView   : 'auto',
						centeredSlides  : true,
						spaceBetween    : 500,
						effect          : 'coverflow',
						coverflowEffect : {
							slideShadows : false,
						}
					});
					var homeBanner = new Swiper('#home_banner', {
						initialSlide    : 1, // start in the middle (should be 0 - 2)
						slidesPerView   : 'auto',
						centeredSlides  : true,
						effect          : 'coverflow',
						speed           : 750,
						coverflowEffect : {
							slideShadows : false,
						},
						keyboard : {
							enabled : true,
						},
						pagination : {
							el           : '#home_banner .swiper-pagination',
							clickable    : true,
							renderBullet : function (index, className) {
								return '<span class="' + className + ' swiper-pagination-bullet--long"><span class="screen-reader-text">' + (index + 1) + '</span></span>';
							}
						},
						navigation : {
							nextEl : '#home_banner .swiper-button-next',
							prevEl : '#home_banner .swiper-button-prev',
						},
						controller : {
							control : [homeParallax, homeFrame1, homeFrame2],
							by      : 'container',
						},
						parallax : true,
						a11y     : true,
					});
				}
				
				// Dribbble galleries
				// Set the Access Token
				var accessToken   = '49a19ad15272251972056008d1f46e1be28cca04264a5ddf535cb735a2bf2ac6',
					numberOfShots = '6';
				// Call Dribble v2 API
				$.ajax({
					url      : 'https://api.dribbble.com/v2/user/shots?per_page=' + numberOfShots + '&access_token=' + accessToken,
					dataType : 'json',
					type     : 'GET',
					success  : function (data) {
						if (data.length > 0) {
							$.each(data.reverse(), function (i, val) {
								$('#dribbbles').prepend(
									'<figure id="shot_' + val.id + '" class="shot"><img src="' + val.images.teaser + '" alt="' + val.title + '" srcset="' + val.images.normal + ' 400w, ' + val.images.hidpi + ' 800w" class="shot__image" /><figcaption class="shot--hover">' + val.title + '<span class="shot__description">' + val.description + '</span><a class="shot__link" href="' + val.html_url + '" target="_blank" title="' + val.title + '"></a></figcaption></figure>'
								)
							})
						} else {
							$('#dribbbles').append('<code>Error loading shots. Try <a href="javascript:history.go(0);">reloading</a> the page?</code>');
						}
					}
				});
				
			},
			finalize: function () {
				// JavaScript to be fired on the home page, after the init JS
				
			}
		},
		// About us page, note the change from about-us to about_us.
		// 'about_us' : {
			// init : function () {
				// JavaScript to be fired on the about us page
			// }
		// },
		// Featured Projects
		'design' : {
			init : function () {
				// JavaScript to be fired on the featured projects page
				
				// Mixitup.js
				// https://github.com/patrickkunka/mixitup/tree/v2
				var containerEl = document.querySelector('#gallery');
				var mixer       = mixitup(containerEl, {
					animation : {
						effectsIn  : 'fade',
						effectsOut : 'fade',
						easing     : 'linear'
					},
					controls : {
						toggleLogic : 'and'
					}
				});
				
			}
		}
	};
	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function (func, funcname, args) {
			var fire;
			var namespace = Sage;
			funcname = (funcname === undefined) ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';
			
			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function () {
			// Fire common init JS
			UTIL.fire('common');
			
			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});
			
			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};
	// Load Events
	$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.