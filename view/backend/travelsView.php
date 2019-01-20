<?php
$order = "Choisir les voyages qui seront publiés sur le site :";
?>
<?php ob_start(); 

// Message d'erreur / de validation
if (isset($msg)) {
    echo '<div class="message">' . $msg . "</div>";
}
?>
<form method="POST" action="" enctype="multipart/form-data">
lalala
<input id="update-button" name="update-pastels" type="submit" value="Enregistrer">
</form>

<?php $procedure = ob_get_clean(); 
require('dashboard.php');
?>
