(function ($, Drupal) {

    "use strict";

    /**
     * Animate transition to anchor.
     */
    Drupal.behaviors.btw_themeBaseAnimateAnchors = {
        attach: function(context) {
            $('.smooth-scroll', context).click(function() {
                var id = $(this).attr('scrollto-id');
                if (typeof id == 'undefined') {
                    alert ('no scrollto-id defined');
                }
                var offset = $(this).attr('scrollto-offset');
                if (typeof offset == 'undefined') {
                    offset = "0";
                }
                var speed = $(this).attr('scrollto-speed');
                if (typeof speed == 'undefined') {
                    speed = "1500";
                }
                if (!(typeof id == 'undefined')) {
                    $('html, body').animate(
                        {
                            scrollTop: $('#' + id).offset().top + parseInt(offset)
                        }, parseInt(speed)
                    );
                }
                return false;
            });
        }
    };

    /**
     * Mobile slide-down functionality, kill top level.
     */
    Drupal.behaviors.btw_themeBaseKillProdCatLink = {
        attach: function (context) {
            $('.nav-kill', context).click(function(e) {
                e.preventDefault();
                return false;
            });
        }
    };

    /**
     * Slide down js.
     */
    Drupal.behaviors.btw_themeBaseMobileSlidedown = {
        attach: function (context) {
            $('.slide-down-menu .expanded a.main-nav', context).click(function(e) {
                var targ = $(this).next('ul').first();
                targ.slideToggle();
                return false;
            });
            //toggle mobile nav classes that show/hide menu links
            $('#mobile-nav-open-btn', context).bind('click', function(e) {
                $('html', context).toggleClass('js-nav');
                e.preventDefault();
                return false;
            });
            $('#mobile-nav-close-btn,#mobile-fade', context).bind('click', function(e) {
                $('html').removeClass('js-nav');
                e.preventDefault();
                return false;
            });
        }
    };

    Drupal.behaviors.btw_themeLazyLoadBG = {
      attach: function(context) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({nullTargetWarn:false});
        // bg-image lazy load.
        gsap.utils.toArray('.lazy-load-bg-image').forEach(function(item) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top-=100 bottom',
            end: 'top bottom',
            markers: false,
            once: true,
            onEnter: function() {
              item.classList.add('bg-image');
            }
          });
        });
      }
    }

    Drupal.behaviors.btw_themeParallaxImages = {
      attach: function(context) {
        // Parallax.
        const parallaxPercent = 50;
        let tl = gsap.timeline();
        const doParallax = (tl, element, selector, options) => {
          let image = element.querySelector(selector);
          if (image) {
            gsap.set(image, options);
            tl.to(image, {
              y: parallaxPercent + '%',
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                scrub: true,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play none reverse none'
              }
            });

          }
        };
        gsap.utils.toArray('.has-parallax').forEach(function (section) {
          let pxImage;
          let options;
          let fullBg = section.querySelector('.parallax-item');
          let halfBg = section.querySelector('.side-parallax');
          let scale = 1 + Math.abs(parallaxPercent) / 100;

          if (fullBg) {
            options = {scaleY: scale, scaleX: scale, top: -parallaxPercent / 2 + '%'};
            pxImage = '.parallax-item';
          }
          else if (halfBg) {
            options = {
              scaleY: scale,
              scaleX: scale,
              top: -parallaxPercent / 2 + '%',
              height: '100%',
              width: '100%'
            };
            let right = section.querySelector('.group-right');
            let left = section.querySelector('.group-left');
            if (right) {
              pxImage = '.side-parallax';
            }
            else if (left) {
              pxImage = '.side-parallax';
            }
          }
          doParallax(tl, section, pxImage, options);
        });

        tl.getChildren().forEach(function(tween) {
          // Add an event listener to fix parallax animations with embeds.
          document.addEventListener('section-loaded', function() {
            tween.scrollTrigger.refresh();
          });
        });
      }
    }

    Drupal.behaviors.btw_themeScrollandSwipe = {
      attach: function(context) {
        new SmoothScroll('a[href*="#section-"]',{
          // Speed & Duration
          speed: 1000,
          speedAsDuration: false, // If true, use speed as the total duration of the scroll animation
          // easing
          easing: 'easeInOutCubic', // Easing pattern to use
          // offset
          offset: 0,
          // History
          updateURL: true, // Update the URL on scroll
          popstate: true, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)
          // selectors
          header: '.navbar' // Selector for fixed headers (must be a valid CSS selector)
        });
        new Swiper('.swiper-container', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        });
      }
    }
})(jQuery, Drupal);
