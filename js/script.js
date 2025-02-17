$(document).ready(function () {

    // animation
    function setHomePositions() {
        $(".box").each(function () {

            $(this).css({ "left": "", "top": "" });

            var pos = $(this).position();

            $(this).data("homex", pos.left);
            $(this).data("homey", pos.top);
        });
    }

    setHomePositions();

    var container = $(".wrapper");
    var mouse = { x: 0, y: 0 };

    $(document).on("mousemove", function (e) {
        var offset = container.offset();
        mouse.x = e.pageX - offset.left;
        mouse.y = e.pageY - offset.top;
    });

    function animateBoxes() {
        $(".box").each(function () {
            var $box = $(this);
            var currentX = parseFloat($box.css("left"));
            var currentY = parseFloat($box.css("top"));
            var homeX = parseFloat($box.data("homex"));
            var homeY = parseFloat($box.data("homey"));
            var dx = mouse.x - currentX;
            var dy = mouse.y - currentY;
            var distance = Math.sqrt(dx * dx + dy * dy) || 1;

            var magnet = 1000;

            var powerX = currentX - (dx / distance) * magnet / distance;
            var powerY = currentY - (dy / distance) * magnet / distance;
            var forceX = (homeX - currentX) / 2;
            var forceY = (homeY - currentY) / 2;

            $box.css("left", (powerX + forceX) + "px");
            $box.css("top", (powerY + forceY) + "px");
        });
    }

    var magnetInterval = setInterval(animateBoxes, 15);


    var resizeTimer;
    $(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $(".box").css({ "left": "", "top": "" });
            setHomePositions();
        }, 20);
    });


    // modal
    $('.modal-toggler').on('click', function (e) {
        e.preventDefault();
        $('.modal').addClass('active');
        $('body').addClass('overflow-hidden');
    });

    $('.modal-close').on('click', function (e) {
        e.preventDefault();
        $('.modal').removeClass('active');
        $('body').removeClass('overflow-hidden');
    });

    $(document).on('click', '.modal', function (e) {
        if ($('.modal').hasClass('active') &&
            !$(e.target).closest('.modal-content').length &&
            !$(e.target).is('.modal-content')) {
            $('.modal').removeClass('active');
            $('body').removeClass('overflow-hidden');
        }
    });


    $('.modal form').on('submit', function (e) {
        e.preventDefault();

        // var formData = $(this).serialize();
        // var $form = $(this);
        // $.ajax({
        //     type: 'POST',
        //     url: 'mail.php',
        //     data: formData,
        //     success: function () {
        //         var $successMessage = $('<div class="modal-success">Your form has been successfully submitted!</div>');
        //         $('.modal').append($successMessage);

        //         $successMessage.fadeIn(300).delay(2000).fadeOut(300, function () {
        //             $(this).remove();
        //             $('.modal').removeClass('active');
        //             $('body').removeClass('overflow-hidden');
        //             $form.trigger('reset');
        //         });
        //     },
        //     error: function(xhr, status, error) {
        //         console.error("Error: ", status, error);
        //     }
        // });

        $('.modal').removeClass('active');
        $('body').removeClass('overflow-hidden');

    });

    //hero parallax 
    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        var parallaxOffset = scrollPos * 0.1;
        $('.hero .container').css('transform', 'translateY(' + parallaxOffset + 'px)');
    });
});


