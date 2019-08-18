<?php $title = 'Georges Sender'; ?>
<?php $style = array("public/css/main.css","public/css/pastels.css");?>
<?php $script = array("https://code.jquery.com/jquery-3.4.0.min.js","https://code.angularjs.org/1.7.2/angular.min.js","public/js/angular-filter.min.js");?>
<?php ob_start(); ?>
<!-- Loading -->
<div class="loading" ng-if="loading">Chargement...</div>
<div ng-if="!loading">
    <!-- Buttons -->
    <!-- Reveal interactives areas -->
    <div class="button reveal" ng-click="setReveal()" ng-class="menuShowed ? 'black-button' : ''">
        <div class="eye opened" ng-if="reveal"></div>
        <div class="eye closed" ng-if="!reveal"></div>
    </div>
    <!-- Show menu button -->
    <div class="button menu-button" ng-class="menuShowed ? 'black-button' : ''" ng-click="menuShowed ? closeMenu() : showMenu()">?</div>
    <!-- Close pop-up container -->
    <div ng-if="travelsShowed" class="button travel-button" ng-click="closeTravels()">X</div>
    <!-- /Buttons -->
    <!-- Menu -->
    <div class="menu">
        <div class="box info">
            <div class="notice-container">
                
            <div class="notice">
                <div><div class="key-icon"><</div><div class="key-icon">></div></div> 
                <p>Parcourir le salon</p>
                <div class="key-icon">I</div><div class="key-icon">M</div>
                <p>Ouvre/ferme le menu principal</p>
                <div class="key-icon">Echap</div>
                <p>Ferme la fenêtre en cours</p>
            </div>
            <div class="portrait">
            </div>
            </div>
            <div class="info-description">
                Glaneur d'objets, de matériaux de toutes sortes, d'idées, Georges Sender, marcheur invétéré, parcourt
                la planète depuis plus d'un demi-siècle pour ramener des morceaux d'ailleurs qu'il compile dans des créations originales,
                sculptures graves et drôles.
                <br>Ces dernières années, il a enrichi son monde imaginaire de séries de pastels au format carré, tableaux figuratifs et
                oniriques, comme autant de fenêtres ouvertes sur le monde, qui livrent ses humeurs et sa vision de la vie.
                <br>Enigmatique, fantasque, mélancolique. Une exposition à voir et revoir.
                <br><p>ES, <i>Le Monde des Arts</i>, 2018</p>
            </div>
        </div>
        <div class="box map">
            <div class="index">
                <div ng-repeat="location in locations">
                    <h2 ng-click="closeMenu();goToLocation(location.name)" ng-class="location.name === destination ? 'highlighted' : ''">{{location.title}}</h2>
                    <div class="destinations-list" ng-if="location.destinations.length > 0">
                        <span ng-click="goToLocationFromMenu(direction.name)" ng-if="direction.type === null && location.name !== 'home'" ng-repeat="direction in location.destinations">
                            <a>{{direction.title}}</a>
                        </span>
                        <!-- Pop-up link -->
                        <span ng-click="showAlbumFromMenu(location.name,direction.name)" ng-if="direction.type === 'pop-up'" ng-repeat="direction in location.destinations">
                            <a ng-class="currentFolderType === direction.name ? 'link-highlighted' : ''">{{direction.title}}</a>
                        </span>
                        <!-- Pop-up container link -->
                        <span ng-click="showPopUpFromMenu(location.name,direction.name)" ng-if="direction.type === 'container'" ng-repeat="direction in location.destinations">
                            <a ng-class="travelsShowed ? 'link-highlighted' : ''">{{direction.title}}</a>
                        </span>
                        <!-- Url -->
                        <span ng-click="openInNewTab(direction.url)" ng-if="direction.type === 'link'" target="_blank" ng-repeat="direction in location.destinations">
                            <a>{{direction.title}}</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Menu -->
    <!-- /Informations -->
    <!-- Travels list -->
    <div ng-if="destination==='travels-map'" class="travel-container">
        <div class="content">
            <div class="box" ng-repeat="decade in decades">
                <div ng-if="hasTravels(y)" ng-repeat="y in years | filterByDecade:decade | orderBy:'-toString()'">
                    <h3>{{y}}</h3>
                    <span ng-click="openInNewTab(travel.url)" ng-repeat="travel in travels | filterByYear:y | orderBy:'name'">
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
                    <a ng-repeat="album in albums | filter: {type:currentFolderType}" href="{{album.url}}" target="_blank">
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