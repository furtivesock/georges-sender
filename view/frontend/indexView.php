<?php $title = 'Georges Sender'; ?>
<?php $style = array("public/css/main.css","public/css/pastels.css");?>
<?php $script = array("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js","https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js","https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.17/angular-filter.js");?>
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
    <div class="dark-screen"></div>
    <div class="info-box" disabled>
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
            <img ng-src="{{pathlocation + location.image}}" usemap="{{location.name}}" class="rwdimgmap" ng-class="location.name == 'home' ? 'panorama' : 'not-panorama'" id="img-map">
            <!-- Areas -->
                <map name="{{location.name}}">
                    <!-- Default area -->
                    <div ng-model="destination" ng-if="!location.leaf">
                        <area ng-repeat="direction in location.destinations" ng-class="reveal ? 'appeared' : 'disappeared'" title="{{direction.title}}" ng-click="goToLocation(direction.name)" coords="{{direction.coords}}" shape="rect">
                    </div>
                    <!-- If area is leaf -->
                    <div ng-model="destination" ng-if="location.leaf">
                        <area ng-repeat="direction in location.destinations" ng-class="reveal ? 'appeared' : 'disappeared'" title="{{direction.title}}" href="{{direction.url}}" target="_blank" coords="{{direction.coords}}" shape="rect">
                    </div>
                </map>
        </div>
    <!-- /Default map -->
                
    <script src="public/js/main.js"></script> 
</div>
<script src="public/js/app.js"></script>
<script ng-if="!loading" src="public/js/angular-rwdImageMaps.js"></script>
<script src="public/js/preloader.js"></script>

<?php $content = ob_get_clean(); ?>

<?php require('view/template.php'); ?>