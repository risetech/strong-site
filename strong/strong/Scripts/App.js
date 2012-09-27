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

//array of <li>
var certificates = [
	$('<li><a class="thumbnail" href="/Information/Certificates#1"><img src="http://www.sng.perm.ru/big/se.jpg" /></a></li>'),
	$('<li><a class="thumbnail" href="/Information/Certificates#2"><img src="http://www.sng.perm.ru/big/lc.jpg" /></a></li>'),
	$('<li><a class="thumbnail" href="/Information/Certificates#3"><img src="http://www.sng.perm.ru/big/lcp.jpg" /></a></li>'),
	$('<li><a class="thumbnail" href="/Information/Certificates#4"><img src="http://www.sng.perm.ru/big/sv.jpg" /></a></li>'),
	$('<li><a class="thumbnail" href="/Information/Certificates#5"><img src="http://www.sng.perm.ru/big/lci.jpg" /></a></li>'),
	$('<li><a class="thumbnail" href="/Information/Certificates#6"><img src="http://www.sng.perm.ru/big/se.jpg" /></a></li>')
];

//random certificates for home page
function renderRandomCertificates() {
	var randomCertificates = jQuery(certificates).get().sort(function () {
		return Math.round(Math.random()) - 0.5
	}).slice(0, 4);
	randomCertificates.forEach(function (item) {
		$('.thumbnails-tiny').append(item);
	});
}

$(function () {

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
			$('.carousel-control').show();
			$("#content-canvas").css("overflow-y", "hidden");
		}
		else {
			$('#home-canvas-main').animate({ 'margin-left': $('#home-canvas-main').width() / 4, left: 0 });
			$(this).removeClass('right')
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

	//random certificate for sidebar
	$('#certificate-small').append(certificates[Math.floor(Math.random() * certificates.length)]);

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
		$targetCollapseElement.collapse('toggle');
	});

});