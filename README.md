# Application de gestion – Adoucisseur Fleck 5600 SXT

## Objectif

Cette application permet de gérer, suivre et modifier l'ensemble des paramètres de l'adoucisseur d'eau Fleck 5600 SXT pour un usage personnel.

---

## Fonctionnalités principales

- **Tableau de bord** : Vue d'ensemble de l'état de l'adoucisseur
- **Gestion des paramètres** : Consultation et modification de tous les paramètres
- **Historique** : Suivi des régénérations, entretiens, modifications
- **Alertes** : Notifications sur le niveau de sel, maintenance, etc.
- **Documentation** : Accès à la notice PDF

---

## Paramètres à gérer et suivre

- Dureté de l'eau d'entrée (°f ou °TH)
- Dureté de l'eau de sortie
- Volume de résine
- Capacité du bac à sel
- Consommation de sel par régénération
- Fréquence et heure des régénérations
- Volume d'eau traité avant régénération
- Mode de régénération (manuel/automatique)
- Historique des régénérations et entretiens
- Alertes (niveau de sel, maintenance, etc.)

---

## Maquette UI (exemple textuel)

### 1. Tableau de bord

```
+------------------------------------------------------+
|   Tableau de bord – Fleck 5600 SXT                   |
+------------------------------------------------------+
|  Prochaine régénération : 12/06/2024 à 02:00         |
|  Niveau de sel : 65% [🟢]                            |
|  Volume d'eau traité : 3200 L                        |
|  Dernière maintenance : 01/05/2024                   |
+------------------------------------------------------+
|  [Paramètres]  [Historique]  [Documentation]         |
+------------------------------------------------------+
```

### 2. Paramètres

```
+------------------------------------------------------+
|   Paramètres – Fleck 5600 SXT                        |
+------------------------------------------------------+
|  Dureté d'entrée (°f)        : [  30  ]  [Modifier]  |
|  Dureté de sortie (°f)       : [   7  ]  [Modifier]  |
|  Volume de résine (L)        : [  20  ]  [Modifier]  |
|  Capacité bac à sel (kg)     : [  50  ]  [Modifier]  |
|  Consommation sel/régén. (kg): [ 2.5  ]  [Modifier]  |
|  Fréquence régénération      : [Auto]   [Modifier]   |
|  Heure régénération          : [02:00]  [Modifier]   |
|  Volume avant régénération   : [2500L]  [Modifier]   |
+------------------------------------------------------+
|  [Sauvegarder les modifications]                     |
+------------------------------------------------------+
```

### 3. Historique

```
+------------------------------------------------------+
|   Historique des régénérations et entretiens         |
+------------------------------------------------------+
|  Date        | Type         | Détail                 |
|--------------|--------------|------------------------|
| 12/06/2024   | Régénération | Auto, 2.5kg sel        |
| 01/05/2024   | Maintenance  | Changement résine      |
| 15/04/2024   | Régénération | Manuelle, 2.5kg sel    |
| ...          | ...          | ...                    |
+------------------------------------------------------+
|  [Ajouter une note d'entretien]                      |
+------------------------------------------------------+
```

### 4. Alertes

```
+------------------------------------------------------+
|   Alertes                                            |
+------------------------------------------------------+
|  [🔔] Niveau de sel bas : 15%                        |
|  [🔔] Maintenance annuelle recommandée               |
+------------------------------------------------------+
```

### 5. Documentation

```
+------------------------------------------------------+
|   Documentation                                      |
+------------------------------------------------------+
|  [Notice d'utilisation PDF]                          |
|    adoucisseur-top-cab-20-litres-fleck-5600-sxt-254.pdf |
+------------------------------------------------------+
```

---

## Conseils d'utilisation

- Mettre à jour les paramètres après chaque entretien ou modification.
- Consulter régulièrement le niveau de sel et l'historique des régénérations.
- Utiliser la documentation PDF pour toute opération technique ou dépannage.

---

## Évolutions possibles

- Ajout de graphiques de suivi (niveau de sel, volume traité…)
- Export de l'historique en PDF/CSV
- Intégration de notifications par email

---

## Fichier de documentation utilisé

- `Doc/adoucisseur-top-cab-20-litres-fleck-5600-sxt-254.pdf`
