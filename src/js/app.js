window.Popper = require('popper.js');
window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('lightbox2');
require('slick-carousel');
require('jquery-lazy');
import lightbox2 from 'lightbox2';
import AOS from 'aos';
import 'aos/dist/aos.css';

$(document).ready(function(){

    // initImageClick();
    initImageSliders();
    initForms();
    initLazy();
    // initAuctionImageLoader();
    initNavbar();
    initMobileMenu();
    AOS.init();
    lightbox2.option({ disableScrolling: false });

    $('.lb-close').attr('href', "javascript:;");
    
    function initMobileMenu() {
        const dropdownLink = $('.has-dropdown', '#mobilemenu');
        dropdownLink.on('click', (e) => {
            $(e.currentTarget).closest('.dropdown-opener').toggleClass('expanded');
        });
    }

    function initNavbar() {
        const navbar = $('#navbarNav');
        const navbarWrap = $('#navbarWrap');
        const hamburger = $('.hamburger').first();
        const $body = $('body');

        navbar.on('show.bs.collapse', () => {
            navbarWrap.toggleClass('menuShown');
            hamburger.toggleClass('is-active');
            // $body.toggleClass('menuOpen');
        });

        navbar.on('hide.bs.collapse', () => {
            navbarWrap.toggleClass('menuShown');
            hamburger.toggleClass('is-active');
            // $body.toggleClass('menuOpen');
        });
    }

    function initLazy() {
        const toLazy = $('.to_lazyload');
        toLazy.Lazy();
    }

    function initImageSliders(){
        const imageBlock = $('#imageBlock');

        if(imageBlock){
            const bigImages = $('#bigImagesPlace');
            const thumbnails = $('#thumbnailsPlace');

            bigImages.slick({
                lazyLoad: 'ondemand',
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '#thumbnailsPlace',
                adaptiveHeight: true
            });

            thumbnails.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                asNavFor: '#bigImagesPlace',
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                infinite: true,
                variableWidth: true
            });
        }
    }

    function initImageClick() {
        const imageBlock = $('#imageBlock');

        if(imageBlock){
            const topImage = $('#topImage');
            const thumbs = $('.thumbnailItem', imageBlock);
    
            thumbs.on('click', (e) => {
                topImage.attr('src', $(e.currentTarget).data('mainimage'));
            });
        }
    }

    function initForms() {
        const ajaxForms = $('.ajaxForm');
        ajaxForms.submit(function(ev) {
            const successMessage = $(this).find('.success');
            const failMessage = $(this).find('.fail');
            ev.preventDefault();
            $.post({
                url: '/',
                dataType: 'json',
                data: $(this).serialize(),
                success: function(response) {
                    if (response.success) {
                        successMessage.addClass('shown');
                    } else {
                        // response.error will be an object containing any validation errors that occurred, indexed by field name
                        // e.g. response.error.fromName => ['From Name is required']
                        failMessage.addClass('shown');
                    }
                }
            });
        });
    }

    function initAuctionImageLoader() {
        const loadMoreButton = $('#loadMore');
        const loadableImages = $('.loadable');
        let loadPortion = 12; // Initially show up to 12 images

        if(loadMoreButton && loadableImages){
            loadableImages.each((idx, el) => {
                if(parseInt($(el).attr('data-counter'), 10) > loadPortion) {
                    $(el).hide();
                } else {
                    loadImage($(el));
                }
            });

            loadMoreButton.on('click', (e) => {
                loadPortion+=12;
                loadableImages.each((idx, el) => {
                    if(!$(el).is(':visible') && parseInt($(el).attr('data-counter'), 10) <= loadPortion) {
                        $(el).fadeIn('slow');
                        loadImage($(el));
                    }
                });
                if (loadPortion >= loadableImages.length) {
                    loadMoreButton.hide();
                }
            });
        }
    }

    function loadImage(el){
        const targetElement = el.find('.imagePart');
        targetElement.attr('style', targetElement.data('imagesource'));
    }
});
