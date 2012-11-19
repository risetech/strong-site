//map work
function showMap() {
	$('.map-wrapper').show()
		.animate({ opacity: 1 }, 'slow');
	$('.map-city').tooltip({ trigger: 'manual' })
	.tooltip('show');
	$('.tooltip').click(function () {
		$('.map-city[data-original-title="' + $(this).text() + '"]').click();
	});
	$('head').append('<link rel="stylesheet" href="../Content/user-scrollbar.css" />')
			.append('<script src="../Scripts/map_descriptions.js"></script>');
	$(document).unbind('keydown').bind('keydown', function (event) {
		if (event.keyCode === 8 || event.keyCode === 27) {
			event.preventDefault();
			hideMap();
		}
	});
}

function hideMap() {
	$('.tooltip').hide();
	$('.map-city').tooltip('hide');
	$('.map-wrapper').animate({ opacity: 0 }, {
		duration: 'slow',
		complete: function () {
			$(this).hide();
		}
	});
}

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
function showModal(sender) {
	$('#modal-content .modal-body').empty()
										.append('<img src=' + sender.children().attr('src') + ' />')
	$('#modal-content').modal();
}

var reviews = [
	{ href: "/Information/Reviews#1", src: "/Content/img/reviews/pic1.jpg" },
	{ href: "/Information/Reviews#2", src: "/Content/img/reviews/pic2.jpg" },
	{ href: "/Information/Reviews#3", src: "/Content/img/reviews/pic3.jpg" },
	{ href: "/Information/Reviews#4", src: "/Content/img/reviews/pic4.jpg" },
	{ href: "/Information/Reviews#5", src: "/Content/img/reviews/pic5.jpg" },
	{ href: "/Information/Reviews#6", src: "/Content/img/reviews/pic6.jpg" },
	{ href: "/Information/Reviews#7", src: "/Content/img/reviews/pic7.jpg" },
	{ href: "/Information/Reviews#8", src: "/Content/img/reviews/pic8.jpg" },
	{ href: "/Information/Reviews#9", src: "/Content/img/reviews/pic9.jpg" },
	{ href: "/Information/Reviews#10", src: "/Content/img/reviews/pic10.jpg" },
	{ href: "/Information/Reviews#11", src: "/Content/img/reviews/pic11.jpg" }
]

var certificates = [
	{ href: "/Information/Certificates#1", src: "/Content/img/certificates/cert1.jpg" },
	{ href: "/Information/Certificates#2", src: "/Content/img/certificates/cert2.jpg" },
	{ href: "/Information/Certificates#3", src: "/Content/img/certificates/cert3.jpg" },
	{ href: "/Information/Certificates#4", src: "/Content/img/certificates/cert4.jpg" },
	{ href: "/Information/Certificates#5", src: "/Content/img/certificates/cert5.jpg" },
	{ href: "/Information/Certificates#6", src: "/Content/img/certificates/cert6.jpg" },
	{ href: "/Information/Certificates#7", src: "/Content/img/certificates/cert7.jpg" },
	{ href: "/Information/Certificates#8", src: "/Content/img/certificates/cert8.jpg" },
	{ href: "/Information/Certificates#9", src: "/Content/img/certificates/cert9.jpg" },
	{ href: "/Information/Certificates#10", src: "/Content/img/certificates/cert10.jpg" },
	{ href: "/Information/Certificates#11", src: "/Content/img/certificates/cert11.jpg" },
	{ href: "/Information/Certificates#12", src: "/Content/img/certificates/cert12.jpg" },
	{ href: "/Information/Certificates#13", src: "/Content/img/certificates/cert13.jpg" }
];

var partnersLogos = [
	{ href: "http://gde24.ru/company/card/BgHDrptc561uS6yno8JauNPr", target: "_blank", src: "../content/img/logos/LOGO-arcticgaz(BW).png", src_hovered: "../content/img/logos/LOGO-arcticgaz(CLR).png" },
	{ href: "http://www.transneft.ru", target: "_blank", src: "../content/img/logos/LOGO-transneft(BW).png", src_hovered: "../content/img/logos/LOGO-transneft(CLR).png" },
	{ href: "http://www.rosneft.ru", target: "_blank", src: "../content/img/logos/LOGO - logo_rosneft(BW).png", src_hovered: "../content/img/logos/LOGO - logo_rosneft(CLR).png" },
	{ href: "http://www.samaraneftgaz.ru", target: "_blank", src: "../content/img/logos/LOGO - samaraneftegaz (BW).png", src_hovered: "../content/img/logos/LOGO - samaraneftegaz (CLR).png" },
	{ href: "http://severneftegazprom.com", target: "_blank", src: "../content/img/logos/LOGO - severneftegazprom (BW).png", src_hovered: "../content/img/logos/LOGO - severneftegazprom (CLR).png" },
	{ href: "http://www.stroytransgaz.ru", target: "_blank", src: "../content/img/logos/LOGO - stroitransgas (BW).png", src_hovered: "../content/img/logos/LOGO - stroitransgas (CLR).png" },
	{ href: "http://www.seversc.ru/main", target: "_blank", src: "../content/img/logos/LOGO SSC (BW).png", src_hovered: "../content/img/logos/LOGO SSC (CLR).png" }
]

//random certificates for home page
function renderImages(array, $jqObject, amount, isRandom) {
	if (isRandom) {
		var images = jQuery(array).get().sort(function () {
			return Math.round(Math.random()) - 0.5
		}).slice(0, amount);
	}
	else {
		var images = array;
	}
	images.forEach(function (item) {
		$jqObject.append(
			$('<li />')
			.append($('<a />', {
				'class': 'thumbnail',
				'href': item.href,
				'target': item.target
			})
				.append($('<img />', {
					'src': item.src
				}).mouseenter(function () {
					$(this).attr('src', item.src_hovered);
				})
				.mouseleave(function () {
					$(this).attr('src', item.src);
				})
				))
			);
	});
}

//

$(function () {

	$('#home-canvas-main').parent().css('overflow', 'auto')

	$('.map-city').click(function () {
		var $this = $(this);
		var source = $this.data('common-source') ? $this.data('common-source') : $this.attr('id');
		if (!($('#' + source + "-modal").length)) {
			var description = getDescription(source);
			var $modal = $('<div />',
				{
					"class": "modal hide fade city-modal",
					"id": source + '-modal',
				});
			var modalTitle = $this.data('common-title') ? $this.data('common-title') : $this.data('original-title');
			$modal.append('<div class="modal-header"><button type="button" class="close close-custom" data-dismiss="modal" aria-hidden="true">×</button><h3>' + modalTitle + '</h3></div>');
			if (description.projects) {
				$modal.append('<div class="modal-body"><div class="pagination pagination-centered"><ul></ul></div><div class="iframe-container"></div><ul class="thumbnails thumbnails-modal"></ul></div>');
				description.projects.forEach(function (item, idx) {
					var $tmpl = $('<li><a href=javascript:;>' + (idx + 1) + '</a></li>');
					$modal.find('.pagination ul').append($tmpl);
					$tmpl.click(function () {
						$modal.find('.pagination ul li').removeClass('active');
						$(this).addClass('active');
						var $iframeContainer = $modal.find('.iframe-container')
						$iframeContainer.empty();
						$modal.find('.thumbnails').empty();
						$modal.find('.iframe-container').load('..' + item.text);
						item.photos.forEach(function (item) {
							$modal.find('.thumbnails').append('<li><a href="javascript:;" class="thumbnail"><img src=' + item + ' /></a></li>')
						});
						return false;
					});
				});
			}
			else {
				$modal.append('<div class="modal-body"><div class="iframe-container"></div><ul class="thumbnails thumbnails-modal"></ul></div>');
				$modal.find('.iframe-container').load('..' + description.text);
				description.photos.forEach(function (item) {
					$modal.find('.thumbnails').append('<li><a href="javascript:;" class="thumbnail"><img src=' + item + ' /></a></li>');
				});
			}
			$modal.append('<div class="modal-footer"></div>');
			$('body').append($modal);
			$modal.modal('show');
			$modal.find('.pagination ul li:nth-child(1)').click();
		}
		else {
			$('#' + source + "-modal").modal('show');
		}
		$('.modal-backdrop').addClass('backdrop-custom');
	});

	$('#certificates-big a, #reviews-big a').click(function () {
		showModal($(this));
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
			$('#home-canvas-main').data('marginLeft', $('#home-canvas-main').css('margin-left'));
			$('#home-canvas-main').animate({ margin: 0, left: -925 });
			$(this).removeClass('left')
				.addClass('right');
			$(this).find('.switcher-arrow').removeClass('left')
				.addClass('right');
			$('.carousel-control').show();
			$("#content-canvas").css("overflow-y", "hidden");
		}
		else {
			$('#home-canvas-main').animate({ 'margin-left': $('#home-canvas-main').data('marginLeft'), left: 0 });
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
		var $targetCollapseElement = $($(this).attr('href') + '-collapse')
		if (!$targetCollapseElement.hasClass('in')) {
			$targetCollapseElement.collapse('show');
		}
	});

});