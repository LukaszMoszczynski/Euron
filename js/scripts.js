$(document).ready(function(){

//carousel
	$('.owl-carousel').owlCarousel({
		loop:true,
	    margin:30,
	    nav: false,
	    dots: false,
	    autoplay:true,
		autoplayTimeout:15000,
		autoplayHoverPause:true,
		smartSpeed:650,
		responsive:{
			0:{
				items:1
			},
			767:{
				items:2
			},
			1024:{
				items:3
			}
		}
	});

//nav smooth scrolling
	$('.smooth-scroll').click(function(e) {
		e.preventDefault();

		const targetElement = $(this).attr('href');
		const targetPosition = $(targetElement).offset().top;
		$('html, body').animate({scrollTop: targetPosition -50}, 'slow');
	});


//textarea expand
	$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        const savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        let minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });

//autoclose mobile menu
    if($(window).width() < 992) {
	 $('.navbar-nav li').click(function(){ 
	   $('.navbar-toggler').click();
	  });
	}
//hamburger animation
	var $hamburger = $('.hamburger');
	$hamburger.on("click", function(e) {
		$hamburger.toggleClass('is-active');
	});

//fade in animations

	let countUpFinished = false;
	
	$(window).scroll(function() {

		const statsTopOffset = $('.stats').offset().top;
		const aboutTopOffset = $('.about-text').offset().top;
		const aboutIconsTopOffset = $('#aboutIconsTop').offset().top;
		// const quoteTopOffset = $('#quote').offset().top;
		const contactTopOffset = $('#contact').offset().top;


		// if( $(window).width() > 767 && window.pageYOffset > headerTopOffset - $(window).height() +200) {
		// 	$('nav').addClass('navbar-background');
		// }


		if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 150) {
			$('.counter').each(function() {
				let element = $(this);
				const endVal = parseInt(element.text());
				element.countup(endVal);
			});

			countUpFinished = true;
		}


		if(window.pageYOffset > aboutTopOffset - $(window).height()) {
			$('.about-text h3').addClass('animated fadeInDown');
			$('.about-text p').addClass('animated zoomInUp delay-1s');
		}

		if(window.pageYOffset > aboutIconsTopOffset - $(window).height() + 300) {	

			const aboutItems = $('.aboutFade');
			let index = 0;

			const delay = setInterval( function(){
			  if ( index <= aboutItems.length ){
			    $(aboutItems[index]).addClass('formFadeInAnimation');
			    index ++;
			  }else{
			    clearInterval(delay);
			  }
			}, 500 );
		}

		// if(window.pageYOffset > quoteTopOffset - $(window).height()) {
		// 	$('.quote .container').addClass('animated zoomInUp');
		// }

		if(window.pageYOffset > contactTopOffset - $(window).height()) {
			$('.formData').addClass('animated zoomInUp');
			$('.form').addClass('animated zoomInUp');
		}

	});	

	//form

	function animateForm(firstClass, secondClass) {
		firstClass.removeClass('formFadeInAnimation');
		firstClass.addClass('formFadeOutAnimation');

		setTimeout(function(){
			firstClass.addClass('form-hide');
		}, 550);

		setTimeout(function(){
			secondClass.removeClass('formFadeOutAnimation');
			secondClass.addClass('formFadeInAnimation');
			secondClass.removeClass('form-hide');
		}, 600);	
	}

	$(function() {

	    $('.form').on('submit', function(e) {

	        e.preventDefault();

	        var $form = $(this);       
	            var dataToSend = $form.serializeArray();
	            dataToSend = dataToSend.concat(
	                $form.map(function() {
	                    return {"name": this.name, "value": this.value}
	                }).get()
	            );

	        var $submit = $form.find(':submit');
	        $submit.prop('disabled', 1);

	        $.ajax({
	            url: $form.attr('action'),
	            method: $form.attr('method'),
	            data: dataToSend,
	            success: function() {
	            	animateForm( $('#form'), $('.send-succes') );
	            },
	            error : function() {
	            	animateForm( $('#form'), $('.send-error') );
	            },
	            complete: function() {
	                $submit.prop('disabled', 0);
	            }
	        });            
	    })
	});


	$('.form-message-button').on('click', function() {
		$('#form').trigger('reset');

		const formDiv = $(this).closest('div');

		animateForm(formDiv, $('#form'));
	});

})
