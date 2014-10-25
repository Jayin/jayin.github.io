/**
 * 可选的动画
 */

(function($) {

    var $sidebar_page = $('.sidebar-page');

    $sidebar_page.on('mouseenter', 'li', function() {
        console.log('mouseenter');
        $(this).animate({
            fontSize: "120%",
             paddingLeft: "+=10px"
        }, 0);

    });
    
    $sidebar_page.on('mouseleave', 'li', function() {
        console.log('mouseleave');
        $(this).animate({
            fontSize: "100%",
            paddingLeft: "-=10px"
        }, 0);
    });

})(jQuery);
