<?php $title = 'Georges Sender'; ?>
<?php $style = array("public/css/main.css","public/css/pastels.css");?>
<?php $script = array("https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js","https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.17/angular-filter.js","https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js");?>
<?php ob_start(); ?>
<!-- Loading -->
<div class="loading" ng-if="loading">Chargement...</div>
<div ng-if="!loading">
    <!-- Reveal interactives areas -->
    <div class="button reveal" ng-click="setReveal()">
        <div class="eye opened"ng-if="reveal"></div>
        <div class="eye closed"ng-if="!reveal"></div>
    </div>
    <!-- /Reveal -->
    <!-- Informations -->
    <div class="button info">?</div>
    <div class="info-box">
        "Glaneur d'objets, de matériaux de toutes sortes, d'idées, Georges Sender, marcheur invétéré, parcourt
        la planète depuis plus d'un demi-siècle pour ramener des morceaux d'ailleurs qu'il compile dans des créations originales,
        sculptures graves et drôles.
        <br>Ces dernières années, il a enrichi son monde imaginaire de séries de pastels au format carré, tableaux figuratifs et
        oniriques, comme autant de fenêtres ouvertes sur le monde, qui livrent ses humeurs et sa vision de la vie.
        <br>Enigmatique, fantasque, mélancolique. Une exposition à voir et revoir."
        <br><p>ES, <i>Le Monde des Arts</i>, 2018</p>
    </div>
    <!-- /Informations -->
    <!-- Default map -->
        <div class="container" ng-repeat="location in locations | filter: {name:destination}:true">
            <!-- Return : When the location is not the root -->
            <div ng-if="location.origin !== undefined" class="button return" ng-click="goToLocation(location.origin)"><</div>
            <!-- /Return -->
            <img src="{{pathlocation + location.image}}" usemap="{{location.name}}" class="panorama">
            <!-- Areas -->
                <map name="{{location.name}}">
                    <div ng-model="destination" ng-if="!location.leaf">
                        <area ng-repeat="direction in location.destinations" ng-class="reveal ? 'appeared' : 'disappeared'" title="{{direction.title}}" ng-click="goToLocation(direction.name)" coords="{{direction.coords}}" shape="rect">
                    </div>
                    <div ng-model="destination" ng-if="location.leaf">
                        <area ng-repeat="direction in location.destinations" ng-class="reveal ? 'appeared' : 'disappeared'" title="{{direction.title}}" ng-click="goToLocation(direction.name)" coords="{{direction.coords}}" shape="rect">
                    </div>
                </map>
        </div>
        <!-- 
        <img src="public/images/locations/home.jpg" usemap="#homemap" class="panorama">
        <map name="homemap">
            <area target="_self" alt="Sculptures" title="Sculptures" href="#sculptures" coords="3018,554,3531,1179" shape="rect">
            <area target="_self" alt="Desk" title="Desk" href="#desk" coords="5388,906,6263,1983" shape="rect">
            <area target="_self" alt="Pastels" title="Pastels" href="#pastels" coords="6343,1106,6727,1396" shape="rect">
            <area target="_self" alt="Bookshelf1" title="Bookshelf1" href="#bookshelf1" coords="3679,478,4135,1196" shape="rect">
            <area target="_self" alt="Bookshelf2" title="Bookshelf2" href="#bookshelf2" coords="6640,1101,6263,541" shape="rect">
        </map>
-->
    <!-- /Default map -->
    
<script src="public/js/imageMapResizer.js"></script>
<script src="public/js/map.js"></script>
<script src="public/js/animations.js"></script>
</div>

<script src="public/js/app.js"></script>
<script src="public/js/preloader.js"></script>
<?php $content = ob_get_clean(); ?>

<?php require('view/template.php'); ?>