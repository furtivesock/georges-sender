<?php $title = 'Georges Sender'; ?>
<?php $style = array("public/css/main.css","public/css/pastels.css","public/css/jquery.qtip.min.css");?>
<?php $script = array("https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js","https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.17/angular-filter.js","https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js");?>
<?php ob_start(); ?>

<!-- Reveal interactives areas -->
<!-- Return -->
<div class="button return"><</div>
<!-- Informations -->
<div class="button info">?</div>
<div class="info-box">"Glaneur d'objets, de matériaux de toutes sortes, d'idées, Georges Sender, marcheur invétéré, parcourt
    la planète depuis plus d'un demi-siècle pour ramener des morceaux d'ailleurs qu'il compile dans des créations originales,
     sculptures graves et drôles.
    <br>Ces dernières années, il a enrichi son monde imaginaire de séries de pastels au format carré, tableaux figuratifs et
     oniriques, comme autant de fenêtres ouvertes sur le monde, qui livrent ses humeurs et sa vision de la vie.
    <br>Enigmatique, fantasque, mélancolique. Une exposition à voir et revoir."
    <br><p>ES, <i>Le Monde des Arts</i>, 2018</p>
</div>

<div class="container">    
    <img src="public/images/locations/home.jpg" usemap="#homemap" class="panorama">
    <map name="homemap">
        <area target="_self" alt="Sculptures" title="Sculptures" href="#sculptures" coords="3018,554,3531,1179" shape="rect">
        <area target="_self" alt="Desk" title="Desk" href="#desk" coords="5388,906,6263,1983" shape="rect">
        <area target="_self" alt="Pastels" title="Pastels" href="#pastels" coords="6343,1106,6727,1396" shape="rect">
        <area target="_self" alt="Bookshelf1" title="Bookshelf1" href="#bookshelf1" coords="3679,478,4135,1196" shape="rect">
        <area target="_self" alt="Bookshelf2" title="Bookshelf2" href="#bookshelf2" coords="6640,1101,6263,541" shape="rect">
    </map>
</div>

<script src="public/js/app.js"></script>
<script src="public/js/preloader.js"></script>
<script src="public/js/imageMapResizer.min.js"></script>
<script src="public/js/map.js"></script>
<script src="public/js/animations.js"></script>
<script type="text/javascript">
    $('map').imageMapResize();
</script>
<?php $content = ob_get_clean(); ?>

<?php require('view/template.php'); ?>