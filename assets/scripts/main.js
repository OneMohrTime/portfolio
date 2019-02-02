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
				// Declare javascript, basically
				var doc = document.documentElement;
				
				doc.className = doc.className.replace('no-js', 'has-js');
				doc.setAttribute('data-useragent', navigator.userAgent);
				doc.setAttribute('data-platform', navigator.platform );
				//
				
				///////////////
				// FUNCTIONS //
				///////////////
				
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
				
				// END FUNCTIONS
				
				//////////////////
				// START JQUERY //
				//////////////////
				
				// Multilevel links
//				$('.multilevel-link').on('click touchstart', function() {
//					$(this).next('ul').animate({
//						width : 'toggle'
//					}, 200);
//				});
				
				// find wordpress galleries
				var wpGallery = document.querySelector('.entry__content .gallery');
				// add .get-faded class
				$(wpGallery).addClass('get-faded');
				
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
				
				// Fancybox
				$('[data-fancybox], .fancybox, .gallery-item a').fancybox({
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
				
				// END JQUERY

				/////////////////////
				// BEGIN GREENSOCK //
				/////////////////////
				
				// Init ScrollMagic
				var controller = new ScrollMagic.Controller({
					globalSceneOptions : {
						triggerHook : 0.8
					},
//					addIndicators : true
				});
				
				// Viewport in log
				var viewportWidth  = window.innerWidth,
					viewportHeight = window.innerHeight;
				console.log( 'Current viewport: ' +  viewportWidth + 'w × ' + viewportHeight + 'h' );
				
				// Mobile menu
				var mobileToggle    = $('#menu_toggle'),
					navbar          = $('#masthead'),
					mobileMenu      = $('#desktop_menu'),
					desktopMenu     = $('#primary_nav'),
					menuItems       = $('#desktop_menu').children(),
					menuDuration    = 0.3,
					menuBetween     = 0.05,
					mobileTimeline  = new TimelineMax({ paused : true, delay : 1 }),
					desktopTimeline = new TimelineMax(),
					$this           = $(this);
				
				if (viewportWidth < 601) {

					mobileTimeline.to(navbar, menuDuration, {
						height: '100%',
						opacity : 1,
						ease : Power2.easeOut
					}, 0).to(mobileMenu, menuDuration, {
						top : 0,
						autoAlpha : 1,
						ease : Power2.easeOut
					}, 0).staggerFrom(menuItems, menuDuration, {
						y       : 20,
						opacity : 0,
						ease    : Back.easeOut
					}, menuBetween)

					navbar.on('click', '#menu_toggle', function() {
						if (mobileTimeline.time() > 0) {
							mobileTimeline.reverse();
						} else {
							mobileTimeline.play(0);
						}
						// change MENU to EXIT
						mobileToggle.toggleClass('open');
						changeLetters(mobileToggle);
						// Add padding to navbar area
						$('#page').toggleClass('padded');
						// Move filters down on Featured Work page
//						if (window.matchMedia("(min-width: 600px)").matches) {
							if (typeof mixitup == 'function') {
								$('.gallery__filter').toggleClass('with-sticky')
							}
//						}
					});
				} else {
					desktopTimeline.to(desktopMenu, menuDuration, {
						y : -100
					}, 0)
					
					navbar.on('click', '#menu_toggle', function() {
						if (desktopTimeline.time() > 0) {
							desktopTimeline.reverse();
						} else {
							desktopTimeline.play(0);
						}
						mobileToggle.toggleClass('open')
						// change MENU to EXIT
						changeLetters(mobileToggle);
						// Invert logo color
						$('#logo').toggleClass('inverted');
						// Add padding to navbar area
						$('#page').toggleClass('padded');
					});
				}
				
				// Parallax images
				$('.parallax').each(function() {
					var parallaxParent = this,
						parallaxChild  = $(this).children('.parallax__image');
					
					if (viewportWidth >= 840) {
						
						var tweenParallax = new TimelineMax()
							.to(parallaxChild, 1, {
								y    : '80%',
								ease : Linear.easeNone,
							})
						
						var parallaxScene = new ScrollMagic.Scene({
							triggerElement : parallaxParent,
							duration       : '200%'
						})
							.setTween(tweenParallax)
							.setClassToggle(this, 'parallax--scrolling')
							.addTo(controller);
					}
				});
				
				// Fade in content blocks
				$('.get-faded').each(function() {
					var fadeParent   = this,
						fadeChild    = $(this).children(),
						fadeDuration = 0.3,
						fadeBetween  = 0.3;
					
					var tweenFade = new TimelineMax()
						.staggerTo(fadeChild, fadeDuration, {
							y         : 0,
							autoAlpha : 1
						}, fadeBetween)
					
					var fadeScene  = new ScrollMagic.Scene({
						triggerElement : fadeParent,
						triggerHook    : 1,
						reverse        : false
					})
						.setTween(tweenFade)
						.setClassToggle(fadeChild, 'got-faded')
						.addTo(controller);
				});
				
				// END GREENSOCK
				
				////////////////
				// BEGIN APIS //
				////////////////
				
				// load google fonts with webfont loader
				WebFontConfig = {
					google : {
						families : ['Barlow Semi Condensed:400,700','Barlow:400,700','Abril Fatface']
					},
					timeout : 2000
				};
				(function(d) {
					var wf = d.createElement('script'), s = d.scripts[0];
					wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
					wf.async = true;
					s.parentNode.insertBefore(wf, s);
				})(document);
				
				// END APIS
				
			},
			finalize: function () {
				// JavaScript to be fired on all pages, after page specific JS is fired
				
			}
		},
		// Home page
		'home': {
			init: function () {
				// JavaScript to be fired on the home page
				
				var title = $('#home_title'),
					line  = title.children();
				
				line.each( function() {
					var $this = $(this),
						chars = $this.lettering('words'),
						words = chars.children('span');
					
					var titleTimeline = new TimelineMax(),
						titleChar     = words,
						titleDuration = 1;
					
					titleTimeline.staggerFromTo(
						titleChar,
						titleDuration,
						{
							opacity : 0,
							y       : 80
						},
						{
							opacity : 1,
							y       : 0
						},
						0.15 );
					titleTimeline.staggerTo(
						'.line',
						1,
						{
							width : 100
						});
				
				});
				
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
				
				// Links are stripped out of wysiwyg editor, manually add them in
				var link_to_mighty = $('#title_1').children('.word3'),
					link_to_work   = $('#title_2').children('.word4');
				
				link_to_mighty.wrapInner('<a href="//mightyinthemidwest.com/"></a>');
				link_to_work.wrapInner('<a href="/design/"></a>');
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
//					animation : {
//						effectsIn  : 'fade',
//						effectsOut : 'fade',
//						easing     : 'linear'
//					},
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
