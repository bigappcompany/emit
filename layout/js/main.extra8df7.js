/*global $*/

var News = {

    items: {
        $News: $('.js-news'),
        $indicator: $('.js-news-indicator'),
        news: [],
        history: []
    },

    setLocalStorageData: function () {

        localStorage.setItem('cms-news', JSON.stringify(News.items.news));

        this.run();

    },

    getLocalStorageData: function () {

        News.items.history = JSON.parse(localStorage.getItem('cms-news'));

        if (News.items.history === null)
            News.items.history = [];

    },

    getNewsData: function () {

        var recentNews = [];

		News.items.$News.each(function () {

            recentNews.push($(this).data('newsid'));

		});

        News.items.news = recentNews;

	},

    checkDifference: function () {

        if (News.items.history.length === 0) {

            News.updateUI(News.items.news.length);

        }
        else {

            var match = 0;

            $.each(News.items.news, function (i) {

				$.each(News.items.history, function (x) {

					if (News.items.news[i] === News.items.history[x])
						match++;

				});

            });


            News.updateUI(News.items.news.length - match);

        }

    },

    updateUI: function (amount) {

        if (amount > 0) {
            News.items.$indicator.find('span').text(amount);
            News.items.$indicator.removeClass('hidden');
        }
        else {
            News.items.$indicator.addClass('hidden');
        }

    },

    run: function () {

        this.getNewsData();
        this.getLocalStorageData();

        this.checkDifference();

    },

    init: function () {

        this.run();

        $(".js-utility-bar-item").on('click', function () {

            News.setLocalStorageData();

        });

    }

}


var jsForm = {

	items: {
		$form: $(".js-form")
	},

	init: function () {

		jsForm.items.$form.on('submit', function (e) {

			e.preventDefault();

			var formData = {};

			$.each(jsForm.items.$form.find('input'), function (index, node) {

				formData[$(this).attr('name')] = $(this).val();

			});

			formData[jsForm.items.$form.find('textarea').attr('name')] = jsForm.items.$form.find('textarea').val();

			$.ajax({
				url: jsForm.items.$form.attr('action'),
				method: "POST",
				data: formData,
				success: function (response) {
					console.log("Success");
				},
				error: function (response) {
					console.log("Error");
				}
			});

		});

	}

}

var newsletterForm = {
    
    sendForm: function ($form) {
        
        //newsletterForm.animateLoading($form);
        
        var formData = {};

        $.each($form.find('input'), function (index, node) {

            formData[$(this).attr('name')] = $(this).val();

        });
        
        $.ajax({
            url: $form.attr('action'),
            method: "POST",
            data: formData,
            success: function (response) {
                
                console.log("success");
                
                newsletterForm.animateReady($form);
            },
            error: function (response) {
                console.log("Error");
            }
        });
        
        newsletterForm.animateReady($form);
        
        
    },
    
    animateLoading: function ($form) {
        
        $form.velocity('fadeOut', function () {
        
            $form.parent().next().find('.js-newsletter-loading').velocity('fadeIn', 250);
        
        }, 250);
        
    },
    
    animateReady: function ($form) {
   
   
        setTimeout(function () {
            $form.parent().next().find('.js-newsletter-sent').velocity('fadeIn', 400);
        }, 500);
       
       
        setTimeout(function () {
            $form.parent().next().find('.js-newsletter-sent').velocity('fadeOut', 400);
        }, 3000);
        
        
    },
    
    init: function () {
        
        $('.js-newsletter-form').on('submit', function (e) {
            
            e.preventDefault();
            
            if ($(this).find('input[type="email"]').val() === "")
				return false;
            
            newsletterForm.sendForm($(this));
            
        });
        
    }
    
}



var popup = {

    items: {
        $overlay: $(".js-overlay"),
        $toggle: $(".js-popup-toggle")
    },

    open: function (data) {

        if ($('.js-frontpage-hero-video').length)
            $('.js-frontpage-hero-video').get(0).pause();
        
        popup.items.$overlay.html(data).velocity('fadeIn', function () {
		
			popup.items.$overlay.find('.hidden').velocity('fadeIn', {'display': 'inline-block'});	
			
		}, 350).addClass('open');

    },

    close: function () {
        
        if ($('.js-frontpage-hero-video').length)
            $('.js-frontpage-hero-video').get(0).play();

        popup.items.$overlay.velocity('fadeOut', function () {
        
			popup.items.$overlay.html('');
            
        }, 350).removeClass('open');
    

    },

    init: function () {

        popup.items.$toggle.on('click', function () {

            popup.open($(this).find('.js-popup-data').clone());

        });

        popup.items.$overlay.on('click', function (e) {

            if ($(e.target).hasClass('js-overlay') || $(e.target).hasClass('js-popup-close'))
                popup.close();

        });

    }

}




var longDropdown = function ($dropdown) {

	var maxHeight = 400,
		multiplier = $dropdown.find(".js-dropdown-ul").height() * 1.1 / maxHeight,
		$container = $dropdown.find(".js-dropdown-container"),
		$limiter = $dropdown.find(".js-dropdown-indicator-limiter"),
		$ul = $dropdown.find(".js-dropdown-ul"),
		$indicator = $dropdown.find(".js-dropdown-indicator"),
        self = this; // 0 = mobile, 1 = dekstop 


	if (multiplier < 1) {
		$container.addClass('not--long');
		return false;
	}
	
	this.indicatorHeight = function () {
		
		var multiplier = $ul.height() / maxHeight,
			indiHeight = maxHeight / multiplier;
		
		$indicator.height(indiHeight);
		
		$limiter.css({
			height: 100 - (indiHeight / maxHeight * 100) + "%"
		});
		
		
	}

	
	this.init = function () {
		
		$ul.css('top', 0);
		
		self.indicatorHeight();
		
		$container.css({
			height: maxHeight,
            width: $container.parent().width() + 15,
			overflowY: "scroll"
		}).on('scroll', function () {
			
			var procent,
				difference = $ul.height() - $container.height();
			
			// Calculate offset difference
			
			procent = ($container.offset().top - ($ul.offset().top)) / difference * 100;
			
			$indicator.css('top', procent + "%");
			
		});
		
		
        
	}
	
	
	this.init();

	
	$(window).on('resize', function () {

		self.indicatorHeight();
        
        $container.css('width', $container.parent().width() + 15);
    
	});
	
	

}







var mapApp = {

    items: {
        $maps: $(".js-map-container")
    },

    appendScript: function () {

        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&region=en&language=en&libraries=geometry,places&sensor=false&callback=mapApp.init';

        document.body.appendChild(script);

    },

    init: function () {

        var mapOptions = {
            zoom: 14,
            zoomControl: true,
            scrollwheel: true,
            draggable : true
        },
        companyLogo = new google.maps.MarkerImage('/media/layout/img/map-marker.png');

        $.each(mapApp.items.$maps, function () {

            var map,
                marker,
                infowindow,
                coordinates = $(this).data('latlng').split(','),
                ltnlng = new google.maps.LatLng(coordinates[0], coordinates[1]);

            if (coordinates.length < 2)
                return false;

            mapOptions.center = ltnlng;

            map = new google.maps.Map(document.getElementById($(this).attr('id')), mapOptions);

            marker = new google.maps.Marker({
                icon: companyLogo,
                position: ltnlng,
                map: map,
                title: $(this).data('name')
            });

            infowindow = new google.maps.InfoWindow({
                content: "<p>" + $(this).data('name') + "</>"
            });

            google.maps.event.addListener(marker, 'click', function () {

                infowindow.open(map, marker);

            });

        });

    }

}



/*
 * Function copies main-level item to submenu
 */

var confMobileMenu = {
    
    
    $main: $(".mobile__has--submenu"),
    
    init: function () {
        
        $.each(confMobileMenu.$main, function () {
           
            var $link = $(this).find('a').eq(0),
                $target = $(this).find('ul');
            
            $link = '<li class="level-2"><a href="' + $link.attr('href') + '">' + $link.text() + '</a></li>'
            
            $target.prepend($link);
            
        });
        
    }
    
    
}



function imageLinkFixer() {
    
    if ($(".row p a img").length) {
        
        $(".row p a img").closest('a').addClass('no--underline');
        
    }
    
}


var productCardSwiperFix = {
	
	$slide: $(".js-swiper-slide"),
	
	init: function () {
		
		if (productCardSwiperFix.$slide.length === 1) {
			$(".js-swiper-bullets").addClass('hidden');		
		}
		
	}
	
}



jQuery(function ($) {

	if ($(".js-news").length)
        News.init();

	if ($(".js-form").length)
		jsForm.init();

    if ($(".js-popup-toggle").length)
        popup.init();

	if ($(".js-swiper-slide").length)
		productCardSwiperFix.init();
		
	if ($(".js-dropdown").length) {
		
		$(".js-dropdown").each(function () {
			
			longDropdown($(this));
		
		});
		
	}
    
    if ($(".js-newsletter-form").length)
        newsletterForm.init();

    if ($(".js-map-container").length)
        mapApp.appendScript();
        
    imageLinkFixer();

    confMobileMenu.init();
	
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	
	if (isiPad) {
		$('body').addClass('ipad');
	}

	//if (!App.isIE9) {
	//	$('[data-sr]').css({ 'visibility': 'hidden' });
	//
	//	window.sr = new scrollReveal({
	//		reset: true,
	//		vFactor: 0.45,
	//		mobile: false
	//	});
	//}
	
	if (App.isIE9) {
		
		$("video").each(function () {
			
			$(this).attr('src', $(this).data('src'));
			
		});
		
	}
	
	
	$(".btn--open-header-search").on('click', function () {
		
		if ($(".site-header__search-form").hasClass('is--active')) {
			$(".site-header__search-form").find('[type=search]').focus();
		}
		
	});
    
});
