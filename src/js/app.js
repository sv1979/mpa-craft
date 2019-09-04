window.Popper = require('popper.js');
window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('lightbox2');

$(document).ready(function(){
    const imageBlock = $('#imageBlock');

    if(imageBlock){
        const topImage = $('#topImage');
        const thumbs = $('.thumbnailItem', imageBlock);

        thumbs.on('click', (e) => {
            topImage.attr('src', $(e.currentTarget).data('mainimage'));
        });
    }

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
});
