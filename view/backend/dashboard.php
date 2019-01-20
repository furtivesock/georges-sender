<?php $title = 'Administration du site Georges Sender'; ?>
<?php $style = array("public/css/admin.css","public/css/pastels.css");?>

<?php ob_start(); ?>

<ul class="menu">
    <li><a href="?a=logout" class="admin-button disconnect">Déconnexion</a></li>
    <li><a href="?a=pastels" class="admin-button">Pastels</a></li>
    <li><a href="?a=travels" class="admin-button">Voyages</a></li>
    <li><a href="?a=photos" class="admin-button">Photographies</a></li>
    <li><a href="?a=options" class="admin-button">Options</a></li>
</ul>

<div class="box" id="encart">
    <h3>Bonjour et bienvenue sur votre dashboard</h3><br>
    <?= $order ?>
</div>
<?= $procedure ?>

<?php $content = ob_get_clean(); ?>

<?php require('view/template.php'); ?>