<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title><?= $title ?></title>
        <?php if (isset($style)) { foreach ($style as $s) echo '<link href="'.$s.'" rel="stylesheet"/>'; }?>
        <?php if (isset($script)) { foreach ($script as $s) echo '<script type="text/javascript" src="'.$s.'"></script>'; }?>
    </head>
    
    <?php if (isset($script) and in_array('public/js/angular.min.js',$script)) {
    ?>
    <body ng-cloak ng-app="myApp" ng-controller="pointAndClick">    
    <?php } else {
    ?>
    <body>
    <?php } ?>
        <?= $content ?>
    </body>
</html>