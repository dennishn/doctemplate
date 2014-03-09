var toggleSidebar = function() {

	$('.menubar').toggleClass('is-open');

	$('.toggle-topbar').toggle();

	if( $('body').hasClass('navigation-is-open') ) {

		$('body').removeClass('navigation-is-open');

	} else {

		$('body').addClass('navigation-is-open');

		$('body.navigation-is-open').one('click', function(event) {
			$('.menubar').removeClass('is-open');
			$('body').removeClass('navigation-is-open');
			$('.toggle-topbar').show();
		});

		$('.menubar a').one('click', function(event) {
			$('.menubar').removeClass('is-open');
			$('body').removeClass('navigation-is-open');
			$('.toggle-topbar').show();
		});

	}

};

var toggleTopbar = function() {

	var currentOffset = $('body').scrollTop();

	$('.primary-navigation').toggleClass('is-open');

	$('.toggle-sidebar').toggle();

	$('.menubar').removeClass('is-open');

	if( $('body').hasClass('navigation-is-open') ) {
		console.log('ttif');
		$('body').removeClass('navigation-is-open');

	} else {
		console.log('ttelse');
		$('body').addClass('navigation-is-open');

		$('.toggle-topbar').one('click', function(event) {

			$('body').scrollTop(currentOffset);
			$('body').removeClass('navigation-is-open');
		});

		$('.top-bar-section a').one('click', function(event) {

			$('.primary-navigation').removeClass('is-open');
			$('body').removeClass('navigation-is-open');
			$('body').scrollTop(currentOffset);
			$('.toggle-sidebar').show();
		});

	}

}

var scrollToElement = function(el) {
	var _this = el;

	var targetId = _this.attr('href');

	targetOffset = ($(targetId).offset().top - 60);

	window.scrollTo(0, targetOffset)

}

var setActiveMenu = function() {
	var path = window.location.pathname;
	var targetString = path.substring(1);
	// console.log(targetString);
	$(document).find('a[href="' + targetString + '"]').parent().addClass('active');
}

$(document).on('flatdoc:ready', function() {
	//Add active class to flatdoc navigation as we scroll along!
	$("h1, h2, h3, h4, h5, h6").scrollagent(function(cid, pid, currentElement, previousElement) {
		if (pid) {
			$("[href='#"+pid+"']").removeClass('active');
		}
		if (cid) {
			$("[href='#"+cid+"']").addClass('active');
		}
	});

	$('.menubar a').on('click', function(event) {
		event.preventDefault();
		scrollToElement($(this));
	});


});

$(document).ready(function(){
	$(document).foundation();

	setActiveMenu();

	$('.toggle-sidebar').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		toggleSidebar();
	});
	$('.toggle-topbar').on('click', function(event) {
		event.preventDefault();
		toggleTopbar();
	});

});
