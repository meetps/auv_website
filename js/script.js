(function() {

	"use strict";

	/* Site Nav */
	jQuery("#site-nav ul li").hover(function(){
		jQuery(this).find('ul:first').parent('li').find('a:first').addClass("dropdown-active");
		jQuery(this).find('ul:first').css({ visibility:"visible", display:"none"}).fadeIn(300);
	},function(){
		jQuery(this).find('ul:first').css({ visibility: "hidden" });
		jQuery(this).find('ul:first').parent('li').find('a:first').removeClass("dropdown-active");
	});


	/* Site Header -> On scroll */
	jQuery(window).scroll(function() {
		if(jQuery(window).width() > 640) {
			if(jQuery(window).scrollTop() > jQuery(window).height() - 100) {
				jQuery('body').addClass('smaller-header');
			} else {
				jQuery('body').removeClass('smaller-header');
			}
		}
	});
	
	/* Site Nav -> Tablet and Mobile */
	jQuery('.toggle-site-nav').click(function() {
		if(jQuery(this).hasClass('toggle-site-nav-active')) {
			jQuery('.panel').show();
			jQuery('#site-nav').hide();
		} else {
			if(jQuery(window).width() < 640) { jQuery('.panel').hide(); }
			jQuery('#site-nav').css({"maxHeight":jQuery(window).height() - jQuery('#site-header').height() + "px", "overflow":"auto", "scrollTop":"0px", "display":"block"});
		}
		if(jQuery(window).width() < 721) {
			jQuery('#site-nav').css({ "minWidth":jQuery(window).width(), "marginLeft": 0 - (jQuery(window).width()/2) });
		} else {
			jQuery('#site-nav').css({ "minWidth":'0px', "marginLeft": 0 });
		}
		jQuery(this).toggleClass('toggle-site-nav-active');
		return false;
	});
	jQuery('#site-nav a').click(function() {
		if(jQuery(window).width() < 640) {
			jQuery('.panel').toggle();
			jQuery('#site-nav').hide();
			jQuery('.toggle-site-nav').toggleClass('toggle-site-nav-active');
		}
	});
	
	
	/* Page Nav */
	var page_nav = '';
	jQuery('a').click(function() {
		page_nav = jQuery(this).attr('href');
		if(page_nav.search('#') >= 0 && page_nav.length > 2) {
			jQuery('html,body').animate({"scrollTop" : jQuery(''+page_nav).offset().top - 60 }, 600);
			if(jQuery('html').hasClass('lt-ie9')) { jQuery('body').hasClass('no-history'); } else {
				window.history.pushState("", "", page_nav);
			}
			return false;
		}
	});
	var page_scroll_window_scrolltop = 0;
	var page_scroll_panel = '';
	var page_scroll_link = '';
	function page_scroll_section() {
		page_scroll_window_scrolltop = jQuery(window).scrollTop();
		jQuery('#site-nav a').each(function() {
			page_scroll_link = jQuery(this);
			page_scroll_panel = jQuery(this).attr('href');
			page_scroll_panel = page_scroll_panel.replace('#', '');
			jQuery('.panel').each(function() {
				if(page_scroll_window_scrolltop > (jQuery(this).offset().top - 100) && page_scroll_window_scrolltop < (jQuery(this).offset().top + jQuery(this).outerHeight())) {
					if(jQuery(this).attr('id') === page_scroll_panel) {
						page_scroll_link.addClass('active');
					} else {
						page_scroll_link.removeClass('active');					
					}
				}
			});
		});
	}
	jQuery(window).resize(function() { page_scroll_section(); });
	jQuery(window).scroll(function() { page_scroll_section(); });

	
	/* Parallax Panel */
	var window_scrolltop = 0;
	jQuery(window).scroll(function() {
		if(jQuery(window).width() > 640) {
			window_scrolltop = jQuery(window).scrollTop();
			jQuery('.panel .parallax').each(function() {
				var section_panel = jQuery(this);
				if(jQuery(this).height() > jQuery(window).height()) {
					section_panel.css({"backgroundPosition": "left -" + ((window_scrolltop - jQuery(this).offset().top)*0.5) +"px"});
				} else {
					section_panel.css({"backgroundPosition": "left -" + ((window_scrolltop - jQuery(this).offset().top + jQuery(this).height())*0.5) +"px"});
				}
			});
		}
	});
		
	
	/* Banner */
	if(jQuery('#banner').size() > 0) {
		
		/* Variables */
		var banner_slide_to_show = 0;
		var banner_moving = 0;
		var banner_delay = 8000; /* Set as 0 to disable automatic changing, otherwise set as milliseconds (eg, 5 seconds = 5000); */
		var banner_pause = 0;
		var banner_margin_top = 100;
		
		/* Set banner height */
		var set_banner_height = function() {
			if(jQuery(window).width() < 980) { banner_margin_top = 100; }
			if((jQuery(window).height() - jQuery('#site-header').height()) < 430) {
				jQuery('#banner, #banner ul.banner-slides li').height(430);	
				jQuery('body').css({"paddingTop": 430 + banner_margin_top + "px"});
			} else {
				jQuery('#banner, #banner ul.banner-slides li').height(jQuery(window).height() - jQuery('#site-header').height());
				jQuery('body').css({"paddingTop":jQuery(window).height() - jQuery('#site-header').height() + banner_margin_top});
			}
			jQuery('#banner').css({"top":banner_margin_top});
		};
		set_banner_height();
		jQuery(window).resize(function() { set_banner_height(); });
		
		/* Add overlays */
		jQuery('#banner ul.banner-slides li').each(function() {
			jQuery(this).append('<span class="overlay"></span><span class="overlay-gradient"></span>');
		});
		
		/* Parallax scroll */
		jQuery(window).load(function() {
			jQuery(window).scroll(function() {
				window_scrolltop = jQuery(window).scrollTop();
				if(jQuery(window).width() > 720) {
					if(banner_moving !== 1) {
						jQuery('#banner ul.banner-slides li').css({ top: 0 - (window_scrolltop*0.3) });
						jQuery('#banner ul.banner-slides li .slide-content').css({ opacity: 1 - ((window_scrolltop/3)/100) });
					}
				}
				if(window_scrolltop > jQuery('#banner').outerHeight()) {
					jQuery('#banner').css({"opacity":"0"});
				} else {
					jQuery('#banner').css({"opacity":"1"});
				}
				if(jQuery(window).scrollTop() > jQuery(window).height() - 100) {
					banner_pause = 1;
				} else {
					banner_pause = 0;
				}
			});
		});
		
		/* Add slides nav */
		if(jQuery('#banner ul.banner-slides li').size() > 1) {
			jQuery('#banner').append('<ul class="banner-nav"></ul>');
			jQuery('#banner ul.banner-slides li').each(function() {
				jQuery('#banner ul.banner-nav').append('<li></li>');
			});
			jQuery('#banner ul.banner-nav li:first').addClass('active');
		}
		
		/* Change slide */
		var change_banner_slide = function() {
			banner_moving = 1;
			jQuery('#banner ul.banner-slides li').not(banner_slide_to_show).stop(true,true).fadeOut(1000);
			jQuery('#banner ul.banner-slides li').eq(banner_slide_to_show).stop(true,true).fadeIn(1000, function() { banner_moving = 0; });
			jQuery('#banner ul.banner-nav li').not(banner_slide_to_show).removeClass('active');
			jQuery('#banner ul.banner-nav li').eq(banner_slide_to_show).addClass('active');
		};
		change_banner_slide();
		
		/* Initialize changing of slide */
		jQuery('#banner ul.banner-nav li').click(function() {
			banner_pause = 1;
			banner_slide_to_show = jQuery('#banner ul.banner-nav li').index(jQuery(this));
			if(jQuery('#banner ul.banner-slides li').eq(banner_slide_to_show).not(':visible')) {
				change_banner_slide();
			}
		});
		
		/* Automatically change slides every x seconds */
		if(banner_delay > 0 && jQuery(window).width() > 640) {
			setInterval(function() {
				if(banner_pause === 0) {
					banner_slide_to_show++;
					if(banner_slide_to_show >= jQuery('#banner ul.banner-slides li').size()) {
						banner_slide_to_show = 0;
					}
					change_banner_slide();
				}
			}, banner_delay);
		}
		
	}
	
	
	/* Panel Heading */
	var panel_heading_text = '';
	jQuery('.panel-heading h1, .panel-heading h2').each(function() {
		panel_heading_text = jQuery(this).html();
		jQuery(this).html('<span class="dot">&middot;</span>'+panel_heading_text+'<span class="dot dot-right">&middot;</span>');
	});
		
		
	/* Toggle & Accordions */
	jQuery('.toggle').each(function() {
		if(jQuery(this).hasClass('toggle-active')) {
			jQuery(this).find('.toggle-content').show();
		}
	});
	jQuery('.toggle h3.toggle-heading').click(function() {
		var toggle = jQuery(this).parent('.toggle');
		if(jQuery(this).parent('.toggle').parent('div').hasClass('accordion')) {
			toggle.parent('div').find('.toggle').find('.toggle-content:visible').slideUp();
			toggle.parent('div').find('.toggle-active').removeClass('toggle-active');
			toggle.toggleClass('toggle-active');
			toggle.find('.toggle-content').slideToggle(500);
		} else {
			toggle.toggleClass('toggle-active');
			toggle.find('.toggle-content').slideToggle(500);
		}
	});
	

	/* Tabs */
	var tab_to_show = 0;
	jQuery('.tab-buttons a').click(function() {
		tab_to_show = jQuery(this).parent('.tab-buttons').find('a').index(jQuery(this));
		var tabs = jQuery(this).parent('.tab-buttons').parent('.tabs');
		tabs.find('.tabpane').hide();
		tabs.find('.tabpane').eq(tab_to_show).show();
		tabs.find('.tab-buttons a').removeClass('active');
		tabs.find('.tab-buttons a').eq(tab_to_show).addClass('active');
		return false;
	});


	/* Gallery */
	if(jQuery('.gallery').size() > 0) {
		
		/* Hover over item */
		jQuery('.gallery li').hover(function() {
			jQuery(this).addClass('hover');
			jQuery(this).find('.item-overlay').stop(true,true).fadeIn();
			jQuery(this).find('.item-permalink').stop(true,true).fadeIn();
			jQuery(this).find('.item-zoom').stop(true,true).fadeIn();
			jQuery(this).find('.item-content').css({"bottom":"-4px", "opacity":"0", "display":"block"}).stop(true,true).animate({"bottom":"30px", "opacity":"1"});
		}, function() {
			jQuery(this).removeClass('hover');
			jQuery(this).find('.item-overlay').stop(true,true).fadeOut();
			jQuery(this).find('.item-content').stop(true,true).animate({"opacity":"0"});
			jQuery(this).find('.item-permalink').stop(true,true).fadeOut();
			jQuery(this).find('.item-zoom').stop(true,true).fadeOut();
		});
		
		/* Isotope */
		jQuery(window).load(function() {
			var isotope_container = jQuery('ul.gallery');
			isotope_container.isotope({
				animationOptions: { duration: 200, queue: false },
				layoutMode: 'fitRows'
			});
			jQuery('.gallery-filter a').click(function(){
				var isotope_selector = jQuery(this).attr('data-filter');
				isotope_container.isotope({
					filter: isotope_selector
				});
				jQuery('.gallery-filter li').removeClass('active');
				jQuery(this).parent('li').addClass('active');
				jQuery('.gallery li a').removeAttr('rel');
				jQuery('.gallery li'+isotope_selector).attr({"rel":"prettyPhoto[gallery]"});
				return false;
			});
			jQuery(window).resize(function() { isotope_container.isotope('reLayout'); });
		});
		
		/* Show gallery filter */
		jQuery('.toggle-gallery-filter').click(function() {
			jQuery('.gallery-filter').slideToggle();
			jQuery(this).toggleClass('toggle-gallery-filter-active');
			return false;
		});
		
		/* PrettyPhoto */
		jQuery('.gallery li a.item-preview').each(function() {
			jQuery(this).attr({"rel":"prettyPhoto[gallery]"});
		});
		jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			theme: 'light_square',
			overlay_gallery: false, 
			deeplinking: false,
			social_tools: ''
		});
		
	}
	
	
	/* Team Profile */
	jQuery('.team-profile').hover(function() {
		jQuery(this).find('.hidden').slideDown();
		jQuery(this).find('.team-profile-overlay').animate({"opacity":0.8});
	}, function() {
		jQuery(this).find('.hidden').slideUp();
		jQuery(this).find('.team-profile-overlay').animate({"opacity":0.2});
	});
	
	
	/* Blog Post */
	if(jQuery(window).width() > 640) {
		jQuery('.blog-post').hover(function() {
			jQuery(this).find('.hidden').slideDown();
		}, function() {
			jQuery(this).find('.hidden').slideUp();
		});
	}


	/* Testimonials */
	if(jQuery('.testimonials').size() > 0) {
		
		/* Add testimonials nav */
		if(jQuery('.testimonials ul.testimonial-quotes li').size() > 1) {
			jQuery('.testimonials').append('<ul class="testimonial-nav"></ul>');
			jQuery('.testimonials ul.testimonial-quotes li').each(function() {
				jQuery('.testimonial-nav').append('<li></li>');
			});
			jQuery('.testimonial-nav li:first').addClass('active');
			jQuery('.testimonial-nav').css({
				"width" : jQuery('.testimonials ul.testimonial-nav li').size() * 20,
				"marginLeft" : 0 - jQuery('.testimonials ul.testimonial-nav').width() / 2 + "px"
			});
		}
			
		/* Show first testimonial */
		jQuery('.testimonials ul.testimonial-quotes li:first').show();
			
		/* Change testimonial */
		var testimonial_to_show = 0;
		jQuery('.testimonials ul.testimonial-nav li').click(function() {
			testimonial_to_show = jQuery('.testimonials ul.testimonial-nav li').index(jQuery(this));
			jQuery('.testimonials ul.testimonial-quotes li').not(testimonial_to_show).hide();
			jQuery('.testimonials ul.testimonial-quotes li').eq(testimonial_to_show).fadeIn();
			jQuery('.testimonials ul.testimonial-nav li').not(testimonial_to_show).removeClass('active');
			jQuery('.testimonials ul.testimonial-nav li').eq(testimonial_to_show).addClass('active');
		});

	}


	/* Client Logos */
	jQuery(window).load(function() {
		if(jQuery('.client-logos').size() > 0) {
			
			/* Make boxes the same height */
			var client_box_height = 0;
			jQuery('.client-logos img').each(function() {
				if(jQuery(this).height() > client_box_height) { client_box_height = jQuery(this).height(); }
				jQuery('.client-logos li a').height(client_box_height);
			});
			jQuery('.client-logos img').each(function() {
				jQuery(this).css({ "marginTop" : (jQuery(this).parent('a').height() - jQuery(this).height())/2 });
			});
			
			/* Hover Clients */
			if(jQuery(window).width() > 640) {
				var client_hovered = 0;
				jQuery('.client-logos li a').hover(function() {
					client_hovered = jQuery('.client-logos li').index(jQuery(this).parent('li'));
					jQuery('.client-logos li').not(client_hovered).addClass('blur').removeClass('hover');
					jQuery('.client-logos li').eq(client_hovered).removeClass('blur').addClass('hover');
				}, function() {
					jQuery('.client-logos li').removeClass('blur').removeClass('hover');				
				});
			}
		
		}
	});
	
	
	/* Show Map */
	jQuery('.map-holder .open-map').click(function() {
		jQuery('.map-holder .map-overlay').fadeOut();
		jQuery('.map-holder .open-map').fadeOut();
		jQuery('.map-holder').animate({"height":jQuery('.map-holder .map').height()});
		return false;
	});
		
	
	/* Contact Form */
	if(jQuery('.contact-form').size() > 0) {
	
		jQuery('.contact-form input[type="submit"]').after('<input type="button" class="contact_submit" name="contact_submit" value="'+jQuery('.contact-form input[type="submit"]').val()+'" />');
		jQuery('.contact-form input[type="submit"]').remove();
		
		jQuery('.contact-form .contact_submit').click(function() {
				
			jQuery.ajax({
				type: "POST",
				url: jQuery('.contact-form form').attr('action'),
				data: {
					contact_name: jQuery('#contact_name').val(),
					contact_email: jQuery('#contact_email').val(),
					contact_subject: jQuery('#contact_subject').val(),
					contact_message: jQuery('#contact_message').val(),
					contact_are_you_human: jQuery('#contact_are_you_human').val(),
					contact_submit : 1
				}
			}).done(function( msg ) {
				jQuery('.contact-form .response').html(msg);
				jQuery('.map').height(jQuery('.contact-overlay').outerHeight());
			});
			return false;
		
		});
	
	}


	/* Empty fields */
	jQuery('input[type="text"], input[type="email"]').each(function() { jQuery(this).attr({"defaultvalue":jQuery(this).val()}); });
	jQuery('textarea').each(function() { jQuery(this).attr({"defaultvalue":jQuery(this).text()}); });
	
	jQuery('input[type="text"], input[type="email"], textarea').focus(function() {
		if(jQuery(this).val() === jQuery(this).attr("defaultvalue")) { jQuery(this).val(''); }
	});
	jQuery('input[type="text"], input[type="email"], textarea').blur(function() {
		if(jQuery(this).val() === "") { jQuery(this).val(jQuery(this).attr("defaultvalue")); }
	});
	
	
	/* Go to anchor on page load */
	jQuery(window).load(function() {
		var web_address = location.href;
		if(web_address.search('#') > 0) {
			web_address = web_address.split('#');
			page_nav = web_address[1];
			jQuery('html,body').animate({"scrollTop" : jQuery('#'+page_nav).offset().top - 60 }, 600);
		}
	});


})(jQuery);