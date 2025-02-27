;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};
	/**
   * Porfolio isotope and filter
   */
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
		  let portfolioIsotope = new Isotope(portfolioContainer, {
			itemSelector: '.portfolio-item'
		  });
	
		  let portfolioFilters = select('#portfolio-flters li', true);
	
		  on('click', '#portfolio-flters li', function(e) {
			e.preventDefault();
			portfolioFilters.forEach(function(el) {
			  el.classList.remove('filter-active');
			});
			this.classList.add('filter-active');
	
			portfolioIsotope.arrange({
			  filter: this.getAttribute('data-filter')
			});
			portfolioIsotope.on('arrangeComplete', function() {
			  AOS.refresh()
			});
		  }, true);
		}
	
	});
	
	/**
	* Initiate portfolio lightbox 
	*/
	  const portfolioLightbox = GLightbox({
		selector: '.portfolio-lightbox'
	  });
	
	  /**
	   * Initiate portfolio details lightbox 
	   */
	  const portfolioDetailsLightbox = GLightbox({
		selector: '.portfolio-details-lightbox',
		width: '90%',
		height: '90vh'
	  });
	


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});

	/**
   * Navbar links active state on scroll
   */
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
	  let position = window.scrollY + 200
	  navbarlinks.forEach(navbarlink => {
		if (!navbarlink.hash) return
		let section = select(navbarlink.hash)
		if (!section) return
		if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
		  navbarlink.classList.add('active')
		} else {
		  navbarlink.classList.remove('active')
		}
	  })
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)
	
	/**
   * Scrolls to an element with header offset
   */
	const scrollto = (el) => {
		let elementPos = select(el).offsetTop
		window.scrollTo({
		  top: elementPos,
		  behavior: 'smooth'
		})
	}
	/**
   * Mobile nav toggle
   */
	on('click', '.mobile-nav-toggle', function(e) {
		select('body').classList.toggle('mobile-nav-active')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	  })
	
	  /**
	   * Scrool with ofset on links with a class name .scrollto
	   */
	  on('click', '.scrollto', function(e) {
		if (select(this.hash)) {
		  e.preventDefault()
	
		  let body = select('body')
		  if (body.classList.contains('mobile-nav-active')) {
			body.classList.remove('mobile-nav-active')
			let navbarToggle = select('.mobile-nav-toggle')
			navbarToggle.classList.toggle('bi-list')
			navbarToggle.classList.toggle('bi-x')
		  }
		  scrollto(this.hash)
		}
	  }, true)


}());