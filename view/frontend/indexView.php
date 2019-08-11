<?php $title = 'Georges Sender'; ?>
<?php $style = array("public/css/main.css","public/css/pastels.css");?>
<?php $script = array("https://code.jquery.com/jquery-3.4.0.min.js","https://code.angularjs.org/1.7.2/angular.min.js","public/js/angular-filter.min.js");?>
<?php ob_start(); ?>
<!-- Loading -->
<div class="loading" ng-if="loading">Chargement...</div>
<div ng-if="!loading">
    <!-- Buttons -->
    <!-- Reveal interactives areas -->
    <div class="button reveal" ng-click="setReveal()">
        <div class="eye opened"ng-if="reveal"></div>
        <div class="eye closed"ng-if="!reveal"></div>
    </div>
    <!-- Show menu button -->
    <div class="button menu-button" ng-click="menuShowed ? closeMenu() : showMenu()">?</div>
    <!-- Close pop-up container -->
    <div ng-if="travelsShowed" class="button travel-button" ng-click="closeTravels()">X</div>
    <!-- /Buttons -->
    <!-- Menu -->
    <div class="menu">
        <div class="box info">
            <div class="portrait"></div>
            <div class="info-description">
                "Glaneur d'objets, de matériaux de toutes sortes, d'idées, Georges Sender, marcheur invétéré, parcourt
                la planète depuis plus d'un demi-siècle pour ramener des morceaux d'ailleurs qu'il compile dans des créations originales,
                sculptures graves et drôles.
                <br>Ces dernières années, il a enrichi son monde imaginaire de séries de pastels au format carré, tableaux figuratifs et
                oniriques, comme autant de fenêtres ouvertes sur le monde, qui livrent ses humeurs et sa vision de la vie.
                <br>Enigmatique, fantasque, mélancolique. Une exposition à voir et revoir."
                <br><p>ES, <i>Le Monde des Arts</i>, 2018</p>
            </div>
        </div>
        <div class="box map">
            <div ng-repeat="location in locations">
                // TODO
                <h2 ng-click="goToLocation(location.name)">{{location.title}}</h2>
                <span ng-click="goToLocation(direction.name)" ng-if="direction.type === null" ng-repeat="direction in location.destinations">
                    {{direction.title}}
                </span>
                <!-- Pop-up link -->
                <span ng-click="showAlbumPopUp(direction.name)" ng-if="direction.type === 'pop-up'" ng-repeat="direction in location.destinations">
                    {{direction.title}}
                </span>
                <!-- Url -->
                <span ng-if="direction.type === 'link'" target="_blank" ng-repeat="direction in location.destinations">
                    {{direction.title}}
                </span>
            </div>
        </div>
    </div>
    <!-- Menu -->
    <!-- /Informations -->
    <!-- Travels list -->
    <div ng-if="destination==='travels-map'" class="travel-container">
        <div class="content">
            <div class="box" ng-repeat="decade in decades">
                <h2 class="decade">{{decade}}0s</h2>
                <div ng-if="hasTravels(y)" ng-repeat="y in years | filterByDecade:decade">
                    <h3>{{y}}</h3>
                    <span ng-click="openInNewTab(travel.url)" ng-repeat="travel in travels | filterByYear:y">
                        {{travel.name}}
                    </span>
                </div>
                
            </div>
        </div> 
    </div>
    <!-- /Travels list -->
    <!-- Default map -->
        <div class="container" ng-class="destination !== 'home' ? 'overflow-hidden' : ''" ng-repeat="location in locations | filter: {name:destination}:true">
            <!-- Albums pop-up (for destinations of type "pop-up") -->
            <div class="dark-screen" ng-click="closePopUp()">   
                <div ng-if="containsPopUp(location)" class="list-container">
                    <a ng-repeat="album in albums | filter: {type:currentFolderType}:true" href="{{album.url}}" target="_blank">
                        <div class="album-box" style="background-image:url('{{pathalbum + currentFolderType + '/' + album.image}}')">
                            <div class="album-box-title"><p>{{album.title}}</p></div>
                        </div>
                    </a>
                </div>
            </div>
            <!-- /Folders pop-up -->
            <!-- Gallery of albums -->
            <div ng-if="destination==='objects'" class="album-gallery">
                <div id="albums-grid">
                    <a ng-repeat="album in albums | filter: {type:'folders'}:true" href="{{album.url}}" target="_blank">
                        <div class="albums-grid-link" style="background-image:url('{{pathalbum + album.image}}')">
                            <p>{{album.title}}</p>
                        </div>
                    </a>
                </div>
            </div>
            <!-- /Gallery of albums -->
            <!-- /Selectors -->
            <!-- Return : When the location is not the root -->
            <div ng-if="location.origin !== undefined" class="button return" ng-click="goToLocation(location.origin)"><</div>
            <!-- /Return -->
            <img ng-if="destination !== 'objects'" ng-src="{{location.image !== '' && pathlocation + location.image || none}}" usemap="#{{location.name}}" class="rwdimgmap" ng-class="location.name == 'home' ? 'panorama' : 'not-panorama'" id="img-map">
            <!-- Areas -->
                <map name="{{location.name}}">
                    <!-- Default areas -->
                    <div ng-model="destination">
                        <!-- Direction area -->
                        <span title="{{direction.title}}" ng-click="goToLocation(direction.name)" ng-if="direction.type === null" class="area-title area-title-big" ng-class="reveal ? 'appeared' : 'disappeared'" ng-repeat="direction in location.destinations">
                            <area title="{{direction.title}}" coords="{{direction.coords}}" shape="rect">
                        </span>
                        <!-- Pop-up area -->
                        <span title="{{direction.title}}" ng-click="showAlbumPopUp(direction.name)" ng-if="direction.type === 'pop-up'" class="area-title area-title-big" ng-class="reveal ? 'appeared' : 'disappeared'" href="#" ng-repeat="direction in location.destinations">
                            <area id="album-link" title="{{direction.title}}" coords="{{direction.coords}}" shape="rect">
                        </span>
                        <!-- Url area -->
                        <span title="{{direction.title}}" ng-if="direction.type === 'link'" class="area-title area-title-big" target="_blank" ng-click="openInNewTab(direction.url)" ng-class="reveal ? 'appeared' : 'disappeared'" ng-repeat="direction in location.destinations">
                            <area title="{{direction.title}}" coords="{{direction.coords}}" shape="rect">
                        </span>
                        <!-- Container area -->
                        <span title="{{direction.title}}" ng-click="showTravels()" ng-if="direction.type==='container'" ng-class="reveal ? 'appeared' : 'disappeared'" class="area-title area-title-big" ng-repeat="direction in location.destinations">
                            <area title="{{direction.title}}" coords="{{direction.coords}}" shape="rect">
                        </span>
                    </div>
                    <!-- /Default areas -->
                    <!-- /World map areas/travels -->
                </map>
            <!-- /Areas -->
        </div>
    <!-- /Default map -->       
</div>
<script type="text/javascript" src="public/js/app.js"></script>
<script type="text/javascript" ng-if="!loading" src="public/js/angular-rwdImageMaps.js"></script>
<script type="text/javascript" src="public/js/preloader.js"></script>

<?php $content = ob_get_clean(); ?>

<?php require('view/template.php'); ?>