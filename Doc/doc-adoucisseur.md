<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# <q>ParamètreCodeDescriptionOptions / FormatExempleUnité d’affichageDFGallons US, Litres ou Mètres</q> fait la liste des paramètres avec leurs roles et reglage par defaut

Voici la liste complète des paramètres programmables du contrôleur électronique Fleck SXT avec leur rôle et le réglage par défaut (quand indiqué ou celui généralement recommandé). Cette liste reprend et synthétise les données extraites de la documentation fournie.


| Paramètre | Code | Rôle / Description | Options / Réglages possibles | Réglage par défaut / Exemple |
| :-- | :-- | :-- | :-- | :-- |
| **Unité d’affichage** | DF | Unité utilisée pour l’affichage des volumes, temps, dureté water | [GAL] : Gallons US (échelle impériale) <br>[Ltr] : Litres <br>[Cu] : Mètres cubes | Ltr (litres, métrique) |
| **Type de vanne** | VT | Type de piston / vanne, indique à l’électronique la configuration mécanique | [St1b] : Co-courant 1 phase détassage (standard)<br>[St2b] : Co-courant 2 phases détassage<br>[Fltr] : Filtre<br>[dFFF] : Co-courant renvoi eau 1er<br>[UFbF] : Contre-courant aspiration 1er<br>[^8500] : Modèle non utilisé en Europe<br>[Othr] : Autre | St1b (standard co-courant 1 phase) |
| **Type de régénération** | CT | Type de mode régénération | [tc] : Chronométrique (par intervalle de jours) <br>[dAY] : Chronométrique hebdomadaire <br>[Fd] : Volumétrique retardée <br>[FI] : Volumétrique immédiate | tc (chronométrique classique) |
| **Type de vanne (série)** | NT | Sélection du modèle de vanne / configuration spécifique | Modèles type 4600, 5600, 9000 (Twin), etc. | 5600 (exemple vanne standard) |
| **Capacité système** | C | Capacité totale exprimée en m3 x °tH (volume x dureté) | Valeur numérique adaptée à l'installation | Ex. 200 (200 m3°tH) |
| **Dureté eau entrée** | H | Dureté de l'eau d'entrée en degrés français (°tH) | Valeur numérique (exemple : de 0 à 50 °tH) | Ex. 35 °tH |
| **Type de réserve** | RS | Type et valeur de la réserve (volume ou % capacité) | RC : volume fixe en litres <br>SF : pourcentage (%) | Ex : RC = 1200 L ou SF = 15% |
| **Forçage calendaire** | DO | Nombre maximum de jours entre deux régénérations (contraint en mode chronométrique) | Valeur entière (1 à 99 jours) | Ex. 7 jours |
| **Heure régénération** | RT | Heure de départ de la régénération (format 24h) | hh:mm (exemple 2h00) | 2h00 |
| **Temps détassage (Backwash)** | 10.1 | Durée du cycle de détassage (backwash) | Minutes (exemple 1 à 30 min) | 10 min |
| **Temps aspiration \& rinçage lent** | 10.2 | Durée du cycle d’aspiration et rinçage lent | Minutes (exemple 10 à 120 min) | 60 min |
| **Temps rinçage rapide** | 10.3 | Durée du cycle de rinçage rapide | Minutes (exemple 1 à 30 min) | 10 min |
| **Temps remplissage (renvoi eau)** | 10.4 | Durée du remplissage du bac à sel | Minutes (exemple 5 à 30 min) | 12 min |
| **Jours de régénération** | D | Jours activés pour la régénération (en mode chronométrique hebdomadaire) | ON=1 / OFF=0 par jour (lundi à dimanche) | Exemple : Lundi, vendredi ON |
| **Type de compteur** | FM | Type de compteur volumétrique raccordé pour mesure consommation | [t0.7], [P0.7], [t1.0], [P1.0], [t1.5], [P1.5], [GEn] | Selon compteur raccordé |
| **Impulsions par litre (K)** | K | Nombre d’impulsions par litre à régler (si compteur non Fleck [GEn]) | Nombre entier (exemple 3 impulsions / litre) | Ex : 3 impulsions/litre |

### Notes importantes :

- Le réglage par défaut le plus courant est la vanne standard 1 phase détassage (St1b), affichage en litres (Ltr), régénération chronométrique (tc), avec heure de régénération 2h00 du matin.
- En mode volumétrique, les paramètres Capacité système (C), Dureté eau entrée (H) et Réserve (RS) sont pris en compte pour calcul du volume restant.
- La programmation doit obligatoirement passer par tous les paramètres pour valider les changements.
- L’option jours de régénération doit avoir au moins un jour activé en mode hebdomadaire, sinon l’appareil signale une erreur.
- Le « forçage calendaire » DO est obligatoire en mode chronométrique pour forcer une régénération après un certain nombre de jours.
- Certains paramètres ne sont visibles ni réglables en mode chronométrique (ex : C, H, RS, compteur).

Si vous souhaitez, je peux aussi produire un résumé formaté personnalisé ou un tableau prêt à l’impression. Dites-moi.

<div style="text-align: center">⁂</div>

[^1]: adoucisseur-top-cab-20-litres-fleck-5600-sxt-254.pdf

