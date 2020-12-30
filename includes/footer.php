<footer class="site-footer">
    <div class="page-width">
        <hr>
        <div class="footer-row">
            <div class="left"> <span class="site-footer__logo">
					<img src="img/logo.png" alt="" height="50" width="100">
				</span> <span class="site-footer__copyright">
                @EMIT 2021 All the photographs depicted are designed and manufactured by EMIT and are subject to copyright.
                </span> 
                </div>
            <div class="right"> <span class="site-footer__social-media">
					<a href="https://www.linkedin.com" target="_blank">
						<img src="images/icon-linkedin.svg" alt="LinkedIn" height="32" width="32">
					</a>
					<a href="https://www.youtube.com/" target="_blank">
						<img src="images/icon-youtube.svg" alt="YouTube" height="32" width="32">
					</a>
					<a href="https://www.facebook.com/" target="_blank">
						<img src="images/icon-facebook.svg" alt="Facebook" height="32" width="32">
					</a>
				</span> </div>
        </div>
    </div>
    <div class="top">
        <a href="#" class="go-up">
            <img src="images/top.png">
        </a>
    </div>
</footer>
<div class="overlay js-overlay"></div>
<script src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.nanogallery.min.js"></script>
<script>
    //DropDown Menu
    jQuery(document).ready(function() {
        jQuery(".site-header--desktop .site-navigation ul .dropdown-menu").mouseover(function() {
            jQuery(".site-header--desktop .site-navigation ul .dropdown-menu .dropdown").stop().slideDown("slow");
        });
        jQuery(".dropdown").mouseleave(function() {
            jQuery(".dropdown").stop().slideUp("100");
        });
        jQuery(".dropdown-menu").mouseleave(function() {
            jQuery(".dropdown").stop().slideUp("100");
        });

        jQuery(".site-header--desktop .site-navigation ul .dropdown-menu-2").mouseover(function() {
            jQuery(".site-header--desktop .site-navigation ul .dropdown-menu-2 .dropdown-2").stop().slideDown("slow");
        });
        jQuery(".dropdown-2").mouseleave(function() {
            jQuery(".dropdown-2").stop().slideUp("100");
        });
        jQuery(".dropdown-menu-2").mouseleave(function() {
            jQuery(".dropdown-2").stop().slideUp("100");
        });

        jQuery(".site-header--desktop .site-navigation ul .dropdown-menu-3").mouseover(function() {
            jQuery(".site-header--desktop .site-navigation ul .dropdown-menu-3 .dropdown-3").stop().slideDown("slow");
        });
        jQuery(".dropdown-3").mouseleave(function() {
            jQuery(".dropdown-3").stop().slideUp("100");
        });
        jQuery(".dropdown-menu-3").mouseleave(function() {
            jQuery(".dropdown-3").stop().slideUp("100");
        });

        jQuery(".site-header--desktop .site-navigation ul .dropdown-menu-4").mouseover(function() {
            jQuery(".site-header--desktop .site-navigation ul .dropdown-menu-4 .dropdown-4").stop().slideDown("slow");
        });
        jQuery(".dropdown-4").mouseleave(function() {
            jQuery(".dropdown-4").stop().slideUp("100");
        });
        jQuery(".dropdown-menu-4").mouseleave(function() {
            jQuery(".dropdown-4").stop().slideUp("100");
        });

        //for mobile

        jQuery(".mobile-dropdown").click(function() {
            jQuery(".mobile-dropdown-menu").slideToggle();
        });
        jQuery(".mobile-dropdown2").click(function() {
            jQuery(".mobile-dropdown-menu2").slideToggle();
        });
        jQuery(".mobile-dropdown3").click(function() {
            jQuery(".mobile-dropdown-menu3").slideToggle();
        });
        jQuery('.go-up').each(function() {
            jQuery(this).click(function(e) {
                e.preventDefault();
                jQuery('html, body').animate({
                    scrollTop: 0
                }, 2000);
                return true;
            });

        });


    });
</script>
<script type="text/javascript">
      $(document).ready(function () {
      $("#nanoGallery1").nanoGallery({
          itemsBaseURL:'img/gallery'
      });
          $("#nanoGallery2").nanoGallery({
          itemsBaseURL:'img/gallery/civil'
      });
          $("#nanoGallery3").nanoGallery({
          itemsBaseURL:'img/gallery'
      });
  });
</script>
<script src="layout/js/main.min8df7.js?ver=001"></script>
<script src="bx/jquery.bxslider.min.js" type="text/javascript"></script>

<script>
    /*Bx Slider Initialization*/

    jQuery(document).ready(function() {
        $('.bxslider').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideWidth: 320,
            slideMargin: 10,
            infiniteLoop: true,
            auto: true,
            autoControls: true
        });
    });
</script>
<script src="layout/js/main.extra8df7.js?ver=001"></script>
    <script>
        document.addEventListener('contextmenu', event => event.preventDefault());
 function killCopy(e){
        return false
    }
    function reEnable(){
        return true
    }
    document.onselectstart=new Function ("return false")
    if (window.sidebar){
        document.onmousedown=killCopy
        document.onclick=reEnable
    }
    </script>
</body>

</html>