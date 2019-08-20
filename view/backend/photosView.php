<?php
$order = "Choisir un lien Google Drive menant vers l'album de votre choix (en cliquant sur les sculptures) :";
?>
<?php ob_start(); 

// Message d'erreur / de validation
if (isset($msg)) {
    echo '<div class="message">' . $msg . "</div>";
}
?>
<form method="POST" action="" enctype="multipart/form-data">
</form>

<?php $procedure = ob_get_clean(); 
require('dashboard.php');
?>
