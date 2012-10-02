//slideshow timer change
var slideshowTimer = setInterval(function () { nextSlideshowSlide() }, 10000);
function nextSlideshowSlide() {
	var slidesCount = $('#slideshow-slides .slideshow-slide').length;
	var index = $('#slideshow-slides .slideshow-slide').index($('#slideshow-slides .slideshow-slide.active'));
	$('.slideshow-slide.active').animate({ opacity: 0 },
				{
					duration: 'slow',
					complete: function () {
						$(this).removeClass('active')
					}
				})
	$($('.slideshow-slide')[(index + 1) % slidesCount])
		.animate({ opacity: 1 },
		{
			duration: 'slow',
			complete: function () {
				$(this).addClass('active')
			}
		})
	$('#slideshow-controls a').removeClass('active')
	$($('#slideshow-controls a')[(index + 1) % slidesCount]).addClass('active');
}

//modal-certificate
function showCertificateModal(sender) {
	$('#modal-certificate .modal-header h3').text(sender.attr('title'));
	$('#modal-certificate .modal-body').empty()
										.append('<img src=' + sender.children().attr('src') + ' />')
	$('#modal-certificate').modal();
}

var certificates = [
	{ href: "/Information/Certificates#1", src: "http://www.sng.perm.ru/big/se.jpg" },
	{ href: "/Information/Certificates#2", src: "http://www.sng.perm.ru/big/lc.jpg" },
	{ href: "/Information/Certificates#3", src: "http://www.sng.perm.ru/big/lcp.jpg" },
	{ href: "/Information/Certificates#4", src: "http://www.sng.perm.ru/big/sv.jpg" },
	{ href: "/Information/Certificates#5", src: "http://www.sng.perm.ru/big/lci.jpg" },
	{ href: "/Information/Certificates#6", src: "http://www.sng.perm.ru/big/se.jpg" }
];
var partnersLogos = [
	{ href: "#", src: "content/img/LOGO-arcticgaz.png" },
	{ href: "#", src: "content/img/LOGO-transneft.png" },
	{ href: "#", src: "content/img/LOGO - logo_rosneft.png" },
	{ href: "#", src: "content/img/LOGO - samaraneftegaz.png" },
	{ href: "#", src: "content/img/LOGO - severneftegazprom.png" },
	{ href: "#", src: "content/img/LOGO - stroitransgas.png" },
	{ href: "#", src: "content/img/LOGO SSC.png" }
]

//random certificates for home page
function renderRandomImages(array, $jqObject, amount) {
	var randomImages = jQuery(array).get().sort(function () {
		return Math.round(Math.random()) - 0.5
	}).slice(0, amount);
	randomImages.forEach(function (item) {
		$jqObject.append(
			$('<li />')
			.append($('<a />', {
				'class': 'thumbnail',
				'href': item.href
			})
				.append($('<img />', {
					'src': item.src
				})))
			);
	});
}

//some shit there

$(function () {

	var w = $(window);

	// add a custom ":inView" selector
	$.expr[':'].inView = function (obj) {
		var $this = $(obj);
		var relY = $this.offset().top - w.scrollTop();
		return relY >= 0 && relY <= w.height();
	};

	$.fn.visibilityChange = function (fun) {
		return this.each(function () {
			var elem = $(this);
			var pVisible = elem.is(":inView");
			$(document).scroll(function (e) {
				if (pVisible != elem.is(":inView")) {
					pVisible = !pVisible;
					fun(pVisible);
				}
			});
		});
	};

	//modals for certificates
	$('#certificates-big a').click(function () {
		showCertificateModal($(this));
		return false;
	});

	//slideshow manual change
	$('#slideshow-controls a').click(function () {
		clearInterval(slideshowTimer)
		if (!$($('.slideshow-slide')[$(this).text() - 1]).hasClass('active')) {
			$('.slideshow-slide.active').animate({ opacity: 0 },
				{
					duration: 'slow',
					complete: function () {
						$(this).removeClass('active')
					}
				})
			$($('.slideshow-slide')[$(this).text() - 1])
				.animate({ opacity: 1 },
				{
					duration: 'slow',
					complete: function () {
						$(this).addClass('active')
					}
				})
			$('#slideshow-controls a').removeClass('active')
			$(this).addClass('active');
		}
	});

	//navigation
	var splittedLocation = location.href.split('/');
	if (splittedLocation[4]) {
		$('.sub-navigation ul li[data-href=' + splittedLocation[4].split('#')[0] + ']').addClass('active');
	}
	var a = $('.sub-navigation ul li.active a')[0];
	if (a) {
		$('.breadcrump ul').append('<li><a href=' + $(a).attr('href') + '>' + $(a).text() + '</a></li>');
	}
	$('#navigation-header li[data-href=' + splittedLocation[3].split('#')[0] + ']').addClass('active');
	if ($('#navigation-header li[data-href=' + splittedLocation[3].split('#')[0] + ']').length) {
		$('#navigation-header li').removeClass('active');
		$('#navigation-header li[data-href=' + splittedLocation[3].split('#')[0] + ']').addClass('active');
	}

	//switching slides and content
	$('.switcher').click(function () {
		if ($(this).hasClass('left')) {
			$('#home-canvas-main').animate({ margin: 0, left: -925 });
			$(this).removeClass('left')
				.addClass('right');
			$(this).find('.switcher-arrow').removeClass('left')
				.addClass('right');
			$('.carousel-control').show();
			$("#content-canvas").css("overflow-y", "hidden");
		}
		else {
			$('#home-canvas-main').animate({ 'margin-left': $('#home-canvas-main').width() / 4, left: 0 });
			$(this).removeClass('right')
				.addClass('left');
			$(this).find('.switcher-arrow').removeClass('right')
				.addClass('left');
			$('.carousel-control').hide();
			$("#content-canvas").css("overflow-y", "auto");

		}
	});

	//slides carousel
	$('.carousel').on('slid', function () {
		$(this).carousel('pause');
	});

	//footer hover-start
	$('.navigation-footer li').mouseenter(function () {
		if (!$(this).hasClass('active')) {
			$('.navigation-footer li').removeClass('active');
			$(this).addClass('active');
			var index = $('.navigation-footer li').index($(this));
			$('.footer-hover').animate({ opacity: 0 }, 'fast')
							  .css('display', 'none');
			$($('.footer-hover')[index]).css('display', 'block')
				.animate({ opacity: 1 }, 'fast');
		}
	});
	//footer hover-end
	$('#footer-canvas').mouseleave(function () {
		$('.footer-hover').animate({ opacity: 0 }, 'fast')
						  .css('display', 'none');
		$('.navigation-footer li').removeClass('active');
	});

	//changing accordion-item chevron
	$('.accordion-body')
	.on('hide', function () {
		var $divCollection = $(this).closest('.accordion-group').find('div');
		var index = $divCollection.index($(this));
		$($divCollection[index - 1]).find('i').removeClass('icon-chevron-up')
				.addClass('icon-chevron-down');
	})
	.on('show', function () {
		var $divCollection = $(this).closest('.accordion-group').find('div');
		var index = $divCollection.index($(this));
		$($divCollection[index - 1]).find('i').removeClass('icon-chevron-down')
				.addClass('icon-chevron-up');
	})
	.on('shown', function () {
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh')
		});
	})
	.on('hidden', function () {
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh')
		});
	});

	//collapse on navigation click
	$('#sub-navigation-projects ul li a').click(function () {
		//$(this).parent('li').addClass('active');
		var $targetCollapseElement = $($(this).attr('href') + '-collapse')
		$targetCollapseElement.collapse('show');
	});

});