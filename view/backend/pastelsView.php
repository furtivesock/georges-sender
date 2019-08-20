<?php
$order = "Choisir les pastels qui seront publiées sur le site :";
?>
<?php ob_start(); 

// Message d'erreur / de validation
if (isset($msg)) {
    echo '<div class="message">' . $msg . "</div>";
}
?>
<form method="POST" action="" enctype="multipart/form-data">
<table align="center">
    <tr>
    <?php for ($i = 1; $i <= MAXPASTELS; ++$i) {
        echo '<td>';
        if (!empty($pastels[$i - 1]->img)) {
            echo '<img src="public/images/pastels/' . $pastels[$i - 1]->img . '" width="252px" height="231px">';
        } else {
            echo '<img src="public/images/vide.png">';
        }
        echo '<input type="file" name="' . $i . '"/></td>';
        if ($i % 3 == 0) {
            echo "</tr><tr>";
        }
    }
    ?>
    </tr>
</table>

<input id="update-button" name="update-pastels" type="submit" value="Mettre à jour la galerie">
</form>

<?php $procedure = ob_get_clean(); 
require('dashboard.php');
?>
