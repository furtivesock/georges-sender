<?php $title = 'Georges Sender'; ?>
<?php $style = array("public/css/main.css","public/css/pastels.css");?>
<?php $script = array("public/js/jquery-3.3.1.min.js","public/js/angular.min.js","public/js/angular-filter.min.js");?>
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
            <!-- Pastels -->
            <div ng-if="destination==='pastels'" class="gallery">
                <img src="public/images/locations/pastels.png" class="not-panorama board">
                <table align="center">
                    <tr ng-repeat="pastels in pastelslist | chunkBy:3">
                        <td ng-repeat="pastel in pastels">
                            <span class="date">{{pastel.date}}</span>
                            <img ng-src="{{pathpastel + pastel.pastelimg}}" width="240px" height="225px">
                        </td>
                    </tr>
                </table>
            </div>
            <!-- /Pastels -->
            <!-- Selectors for travels -->
            <div ng-if="destination==='travels-map'" class="selection">
                <!-- Turn the planisphere 
                <div class="planisphere-left" ng-click="goLeft()">&#60;</div>
                <div class="planisphere-right" ng-click="goRight()">&#62;</div>
                -->
                <!-- Select the year -->
                <a href="#" ng-repeat="year in years" ng-click="try(year)" style="color:#fff; margin-left: 5px;">{{year}}</a>
            </div>
            <!-- /Selectors -->
            <!-- Return : When the location is not the root -->
            <div ng-if="location.origin !== undefined" class="button return" ng-click="goToLocation(location.origin)"><</div>
            <!-- /Return -->
            <img ng-if="destination !== 'pastels'" ng-src="{{location.image !== '' && pathlocation + location.image || none}}" usemap="#{{location.name}}" class="rwdimgmap" ng-class="location.name == 'home' ? 'panorama' : 'not-panorama'" id="img-map">
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
                    <!-- Travels -->
                    <div ng-model="destination" ng-if="destination==='travels-map'">
                        <area ng-repeat="travel in travels | filter: {year:travelYear}" ng-class="reveal ? 'appeared' : 'disappeared'" title="{{travel.name}}" href="{{travel.url}}" target="_blank" coords="{{travel.coords}}" shape="rect">
                    </div>
                    <!-- /Travels -->
                </map>
            <!-- /Areas -->
        </div>
    <!-- /Default map -->
                
    <script type="text/javascript" src="public/js/main.js"></script> 
</div>
<script type="text/javascript" src="public/js/app.js"></script>
<script type="text/javascript" ng-if="!loading" src="public/js/angular-rwdImageMaps.js"></script>
<script type="text/javascript" src="public/js/preloader.js"></script>

<?php $content = ob_get_clean(); ?>

<?php require('view/template.php'); ?>