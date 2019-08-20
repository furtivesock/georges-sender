<?php $title = 'Administration du site Georges Sender';?>
<?php $style = array("public/css/admin.css");?>

<?php ob_start();?>

<?php 
if (isset($erreur)) {
    echo '<h3 class="message" id="login-error">' . $erreur . "</h3>";
}
?>
<form method="POST" action="" class="box" id="login">
    <h3>Espace Admin</h3>
    <input class="login-text" id="username" maxlength="40" name="usernameconnect" placeholder="username">
    <input class="login-text" placeholder="Mot de passe" id="password" type="password" maxlength="25" name="passwordconnect">
    <input id="login-button" class="connect-input" type="submit" name="login" value="Se connecter">
</form>

<?php $content = ob_get_clean();?>

<?php require 'view/template.php';?>