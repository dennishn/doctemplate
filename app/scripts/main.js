//Add active class to flatdoc navigation as we scroll along!
$(document).on('flatdoc:ready', function() {
	$("h1, h2, h3").scrollagent(function(cid, pid, currentElement, previousElement) {
		if (pid) {
			$("[href='#"+pid+"']").removeClass('active');
		}
		if (cid) {
			$("[href='#"+cid+"']").addClass('active');
		}
	});

	$(function() {
		var $sidebar = $('.menubar'),
			$content = $('.content');
		var elTop;

		$(window)
		.on('resize.sidestick', function() {
			elTop = $sidebar.offset().top;
			$(window).trigger('scroll.sidestick');
		})
		.on('scroll.sidestick', function() {
			var scrollY = $(window).scrollTop();
			$sidebar.toggleClass('fixed', (scrollY >= elTop));
			$content.toggleClass('menu-is-fixed', (scrollY >= elTop));
		})
		.trigger('resize.sidestick');
	});
});
