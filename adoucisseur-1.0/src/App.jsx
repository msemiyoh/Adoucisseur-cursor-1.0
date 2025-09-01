import * as React from 'react';
import {
  CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Card, CardContent, Avatar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import OpacityIcon from '@mui/icons-material/Opacity';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import CloseIcon from '@mui/icons-material/Close';

// ⚠️ RÈGLE IMPORTANTE : Pour les listes déroulantes, TOUJOURS utiliser :
// - FormControl + InputLabel + Select + MenuItem (Material-UI)
// - JAMAIS TextField avec prop "select" (ne fonctionne pas correctement)
// 
// Exemple correct :
// <FormControl fullWidth>
//   <InputLabel>Label</InputLabel>
//   <Select value={value} onChange={handleChange}>
//     <MenuItem value="option1">Option 1</MenuItem>
//     <MenuItem value="option2">Option 2</MenuItem>
//   </Select>
// </FormControl>

const drawerWidth = 240;

const mainColor = '#1976d2'; // bleu principal
const accentColor = '#43a047'; // vert accent
const bgColor = '#10192a'; // fond sombre général
const cardColor = '#232b3e'; // cards gris foncé
const textColor = '#f4f8fb'; // texte clair
const cardTitleColor = '#90caf9'; // bleu clair pour titres de card

const pages = [
  { label: 'Tableau de bord', icon: <DashboardIcon />, key: 'dashboard' },
  { label: 'Interventions', icon: <HistoryIcon />, key: 'interventions' },
  { label: 'Paramètres', icon: <SettingsIcon />, key: 'parametres' },
  { label: 'Historique', icon: <HistoryIcon />, key: 'historique' },
  { label: 'Alertes', icon: <NotificationsIcon />, key: 'alertes' },
  { label: 'Documentation', icon: <DescriptionIcon />, key: 'documentation' },
  { label: 'Historique des paramètres', icon: <SettingsIcon />, key: 'historique-parametres' },
];

// État global de l'application
const AppContext = React.createContext();

// Types d'interventions étendus
const TYPES_INTERVENTIONS = [
  { value: 'Remplissage', label: 'Remplissage de sel', icon: '🧂', couleur: '#4caf50' },
  { value: 'Regeneration', label: 'Régénération', icon: '🔄', couleur: '#2196f3' },
  { value: 'Maintenance', label: 'Maintenance préventive', icon: '🔧', couleur: '#ff9800' },
  { value: 'Entretien', label: 'Entretien général', icon: '🧹', couleur: '#9c27b0' },
  { value: 'Depannage', label: 'Dépannage', icon: '⚠️', couleur: '#f44336' },
  { value: 'Inspection', label: 'Inspection technique', icon: '🔍', couleur: '#607d8b' },
  { value: 'Nettoyage', label: 'Nettoyage bac à sel', icon: '💧', couleur: '#00bcd4' },
  { value: 'Changement', label: 'Changement résine', icon: '🔄', couleur: '#795548' },
  { value: 'Calibration', label: 'Calibration', icon: '⚖️', couleur: '#e91e63' },
  { value: 'Test', label: 'Test de fonctionnement', icon: '🧪', couleur: '#3f51b5' }
];

// Priorités d'interventions
const PRIORITES = [
  { value: 'Basse', label: 'Basse', couleur: '#4caf50' },
  { value: 'Normale', label: 'Normale', couleur: '#ff9800' },
  { value: 'Haute', label: 'Haute', couleur: '#f44336' },
  { value: 'Urgente', label: 'Urgente', couleur: '#d32f2f' }
];

// États d'interventions
const ETATS_INTERVENTIONS = [
  { value: 'Planifiee', label: 'Planifiée', couleur: '#2196f3' },
  { value: 'EnCours', label: 'En cours', couleur: '#ff9800' },
  { value: 'Terminee', label: 'Terminée', couleur: '#4caf50' },
  { value: 'Annulee', label: 'Annulée', couleur: '#9e9e9e' },
  { value: 'Reportee', label: 'Reportée', couleur: '#607d8b' }
];

// Types d'alertes
const TYPES_ALERTES = [
  { value: 'NiveauSel', label: 'Niveau de sel', icon: '🧂', couleur: '#ff9800' },
  { value: 'Regeneration', label: 'Régénération', icon: '🔄', couleur: '#2196f3' },
  { value: 'Maintenance', label: 'Maintenance', icon: '🔧', couleur: '#f44336' },
  { value: 'Intervention', label: 'Intervention', icon: '📅', couleur: '#9c27b0' },
  { value: 'Performance', label: 'Performance', icon: '📊', couleur: '#4caf50' },
  { value: 'Systeme', label: 'Système', icon: '⚙️', couleur: '#607d8b' }
];

// Niveaux de gravité
const NIVEAUX_GRAVITE = [
  { value: 'Info', label: 'Information', couleur: '#2196f3', icone: 'ℹ️' },
  { value: 'Attention', label: 'Attention', couleur: '#ff9800', icone: '⚠️' },
  { value: 'Critique', label: 'Critique', couleur: '#f44336', icone: '🚨' },
  { value: 'Urgente', label: 'Urgente', couleur: '#d32f2f', icone: '🚨' }
];

function AppProvider({ children }) {
  const [parametres, setParametres] = React.useState({
    // Paramètres d'affichage
    uniteAffichage: 'Ltr',
    typeVanne: 'St1b',
    typeRegeneration: 'tc',
    typeVanneSerie: '5600',
    
    // Paramètres de capacité
    capaciteSysteme: 200,
    dureteEntree: 35,
    typeReserve: 'RC',
    valeurReserve: 1200,
    forcageCalendaire: 7,
    
    // Paramètres de régénération
    heureRegeneration: '02:00',
    tempsDetassage: 10,
    tempsAspiration: 60,
    tempsRincage: 10,
    tempsRemplissage: 12,
    
    // Paramètres de compteur
    typeCompteur: 't1.0',
    impulsionsParLitre: 3,
    
    // Paramètres de réglage
    dureteSortie: 7,
    volumeResine: 20,
    capaciteSel: 50,
    consoSel: 2.5,
    pressionEau: 3.0,
    temperatureEau: 15,
    debitEau: 12,
    efficaciteRegeneration: 85,
  });

  // États pour mémoriser les dernières valeurs de réserve
  const [derniereValeurRC, setDerniereValeurRC] = React.useState(1200);
  const [derniereValeurSF, setDerniereValeurSF] = React.useState(10);

  const [historique, setHistorique] = React.useState([
    { id: 1, date: '2024-06-12', type: 'Régénération', detail: 'Auto, 2.5kg sel', quantite: 2.5 },
    { id: 2, date: '2024-05-01', type: 'Maintenance', detail: 'Changement résine', quantite: 0 },
    { id: 3, date: '2024-04-15', type: 'Régénération', detail: 'Manuelle, 2.5kg sel', quantite: 2.5 },
    { id: 4, date: '2024-04-01', type: 'Remplissage', detail: 'Ajout de sel', quantite: 25 },
  ]);

  const [historiqueParametres, setHistoriqueParametres] = React.useState([
    {
      id: 1,
      date: new Date().toISOString(),
      parametres: {
        uniteAffichage: 'Ltr',
        typeVanne: 'St1b',
        typeRegeneration: 'tc',
        typeVanneSerie: '5600',
        capaciteSysteme: 200,
        dureteEntree: 35,
        typeReserve: 'RC',
        valeurReserve: 1200,
        forcageCalendaire: 7,
        heureRegeneration: '02:00',
        tempsDetassage: 10,
        tempsAspiration: 60,
        tempsRincage: 10,
        tempsRemplissage: 12,
        typeCompteur: 't1.0',
        impulsionsParLitre: 3,
        dureteSortie: 7,
        volumeResine: 20,
        capaciteSel: 50,
        consoSel: 2.5,
        pressionEau: 3.0,
        temperatureEau: 15,
        debitEau: 12,
        efficaciteRegeneration: 85,
      },
      commentaire: 'Configuration initiale complète'
    }
  ]);

  // État étendu pour les interventions
  const [interventions, setInterventions] = React.useState([
    {
      id: 1,
      date: '2024-06-12',
      type: 'Regeneration',
      priorite: 'Normale',
      etat: 'Terminee',
      detail: 'Régénération automatique programmée',
      quantite: 2.5,
      cout: 0,
      commentaires: 'Régénération normale, tout fonctionne correctement',
      photos: [],
      prochaineIntervention: '2024-06-19'
    },
    {
      id: 2,
      date: '2024-05-01',
      type: 'Maintenance',
      priorite: 'Haute',
      etat: 'Terminee',
      detail: 'Changement de la résine',
      quantite: 0,
      cout: 150,
      commentaires: 'Résine changée, système recalibré',
      photos: [],
      prochaineIntervention: '2025-05-01'
    },
    {
      id: 3,
      date: '2024-04-15',
      type: 'Remplissage',
      priorite: 'Normale',
      etat: 'Terminee',
      detail: 'Ajout de sel dans le bac',
      quantite: 25,
      cout: 0,
      commentaires: 'Bac rempli aux 3/4',
      photos: [],
      prochaineIntervention: '2024-05-15'
    },
    {
      id: 4,
      date: '2024-04-01',
      type: 'Nettoyage',
      priorite: 'Basse',
      etat: 'Terminee',
      detail: 'Nettoyage du bac à sel',
      quantite: 0,
      cout: 0,
      commentaires: 'Bac nettoyé, sel restant conservé',
      photos: [],
      prochaineIntervention: '2024-07-01'
    }
  ]);

  // Interventions planifiées
  const [interventionsPlanifiees, setInterventionsPlanifiees] = React.useState([
    {
      id: 5,
      date: '2024-06-19',
      type: 'Remplissage',
      priorite: 'Normale',
      etat: 'Planifiee',
      detail: 'Remplissage préventif du bac à sel',
      quantite: 20,
      cout: 0,
      commentaires: 'Remplissage préventif',
      photos: [],
      rappel: true,
      rappelDate: '2024-06-18'
    },
    {
      id: 6,
      date: '2024-07-01',
      type: 'Inspection',
      priorite: 'Basse',
      etat: 'Planifiee',
      detail: 'Inspection trimestrielle',
      quantite: 0,
      cout: 0,
      commentaires: 'Inspection de routine',
      photos: [],
      rappel: true,
      rappelDate: '2024-06-30'
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'Rappel',
      message: 'Intervention planifiée demain : Remplissage du bac à sel',
      date: '2024-06-18',
      lue: false,
      priorite: 'Normale'
    },
    {
      id: 2,
      type: 'Alerte',
      message: 'Niveau de sel bas (15%) - Remplissage recommandé',
      date: '2024-06-15',
      lue: true,
      priorite: 'Haute'
    }
  ]);

  // Calcul du niveau de sel
  const calculerNiveauSel = () => {
    const consommationTotale = historique
      .filter(item => item.type === 'Regeneration' || item.type === 'Maintenance')
      .reduce((total, item) => total + (item.quantite || 0), 0);
    
    const ajoutTotal = historique
      .filter(item => item.type === 'Remplissage')
      .reduce((total, item) => total + (item.quantite || 0), 0);
    
    const selRestant = ajoutTotal - consommationTotale;
    const niveau = Math.max(0, (selRestant / parametres.capaciteSel) * 100);
    
    return Math.round(niveau);
  };

  const niveauSel = calculerNiveauSel();

  // Fonction pour sauvegarder les paramètres avec historisation
  const sauvegarderParametres = (nouveauxParametres, commentaire = 'Modification des paramètres') => {
    const differences = [];
    
    // Comparer avec la dernière version
    const derniereVersion = historiqueParametres[0];
    if (derniereVersion) {
      Object.keys(nouveauxParametres).forEach(key => {
        if (derniereVersion.parametres[key] !== nouveauxParametres[key]) {
          differences.push(`${key}: ${derniereVersion.parametres[key]} → ${nouveauxParametres[key]}`);
        }
      });
    }

    const nouvelleEntree = {
      id: Date.now(),
      date: new Date().toISOString(),
      parametres: { ...nouveauxParametres },
      commentaire: commentaire,
      differences: differences
    };

    setHistoriqueParametres(prev => [nouvelleEntree, ...prev]);
    setParametres(nouveauxParametres);
  };

  // Fonction pour restaurer des paramètres
  const restaurerParametres = (versionId) => {
    const version = historiqueParametres.find(v => v.id === versionId);
    if (version) {
      // Créer un commentaire pour la restauration
      const commentaireRestoration = `Restauration du ${new Date(version.date).toLocaleString('fr-FR')}`;
      
      // Utiliser la fonction de sauvegarde pour créer une nouvelle entrée dans l'historique
      sauvegarderParametres(version.parametres, commentaireRestoration);
      return true;
    }
    return false;
  };

  // Fonctions pour les interventions
  const ajouterIntervention = (intervention) => {
    const nouvelleIntervention = {
      ...intervention,
      id: Date.now(),
      dateCreation: new Date().toISOString()
    };
    
    if (intervention.etat === 'Planifiee') {
      setInterventionsPlanifiees(prev => [nouvelleIntervention, ...prev]);
    } else {
      setInterventions(prev => [nouvelleIntervention, ...prev]);
    }
  };

  const modifierIntervention = (id, modifications) => {
    setInterventions(prev => prev.map(intervention => 
      intervention.id === id ? { ...intervention, ...modifications } : intervention
    ));
    setInterventionsPlanifiees(prev => prev.map(intervention => 
      intervention.id === id ? { ...intervention, ...modifications } : intervention
    ));
  };

  const supprimerIntervention = (id) => {
    setInterventions(prev => prev.filter(intervention => intervention.id !== id));
    setInterventionsPlanifiees(prev => prev.filter(intervention => intervention.id !== id));
  };

  const planifierIntervention = (intervention) => {
    const interventionPlanifiee = {
      ...intervention,
      etat: 'Planifiee',
      id: Date.now()
    };
    setInterventionsPlanifiees(prev => [interventionPlanifiee, ...prev]);
  };

  const terminerIntervention = (id) => {
    modifierIntervention(id, { 
      etat: 'Terminee',
      dateTermination: new Date().toISOString()
    });
  };

  // Calculs statistiques
  const calculerStatistiques = () => {
    const toutesInterventions = [...interventions, ...interventionsPlanifiees];
    
    const stats = {
      total: toutesInterventions.length,
      terminees: toutesInterventions.filter(i => i.etat === 'Terminee').length,
      planifiees: toutesInterventions.filter(i => i.etat === 'Planifiee').length,
      enCours: toutesInterventions.filter(i => i.etat === 'EnCours').length,
      coutTotal: toutesInterventions.reduce((total, i) => total + (i.cout || 0), 0),
      dureeTotale: toutesInterventions.reduce((total, i) => total + (i.duree || 0), 0),
      parType: {},
      parPriorite: {}
    };

    // Statistiques par type
    TYPES_INTERVENTIONS.forEach(type => {
      stats.parType[type.value] = toutesInterventions.filter(i => i.type === type.value).length;
    });

    // Statistiques par priorité
    PRIORITES.forEach(priorite => {
      stats.parPriorite[priorite.value] = toutesInterventions.filter(i => i.priorite === priorite.value).length;
    });

    return stats;
  };

  // Système d'alertes intelligent
  const [alertes, setAlertes] = React.useState([
    {
      id: 1,
      type: 'NiveauSel',
      niveau: 'Attention',
      titre: 'Niveau de sel bas',
      message: 'Le niveau de sel est à 15%. Un remplissage est recommandé dans les prochains jours.',
      date: new Date().toISOString(),
      lue: false,
      actionRequise: true,
      action: 'Remplir le bac à sel',
      parametres: { niveauSel: 15 }
    },
    {
      id: 2,
      type: 'Maintenance',
      niveau: 'Info',
      titre: 'Maintenance préventive',
      message: 'Une inspection trimestrielle est prévue pour le 01/07/2024.',
      date: new Date().toISOString(),
      lue: true,
      actionRequise: false,
      action: 'Planifier l\'inspection',
      parametres: { dateMaintenance: '2024-07-01' }
    },
    {
      id: 3,
      type: 'Performance',
      niveau: 'Info',
      titre: 'Performance optimale',
      message: 'L\'adoucisseur fonctionne de manière optimale. Efficacité de régénération : 85%.',
      date: new Date().toISOString(),
      lue: true,
      actionRequise: false,
      action: 'Continuer la surveillance',
      parametres: { efficacite: 85 }
    }
  ]);

  // Configuration des seuils d'alertes
  const [seuilsAlertes, setSeuilsAlertes] = React.useState({
    niveauSelCritique: 10,
    niveauSelAttention: 20,
    efficaciteMinimale: 80,
    dureeMaxIntervention: 30, // jours
    coutMaxIntervention: 200
  });

  // Fonction pour générer des alertes automatiques
  const genererAlertesAutomatiques = React.useCallback(() => {
    const nouvellesAlertes = [];

    // Alerte niveau de sel
    if (niveauSel <= seuilsAlertes.niveauSelCritique) {
      nouvellesAlertes.push({
        id: Date.now() + 1,
        type: 'NiveauSel',
        niveau: 'Critique',
        titre: 'Niveau de sel critique',
        message: `Le niveau de sel est très bas (${niveauSel}%). Remplissage urgent requis.`,
        date: new Date().toISOString(),
        lue: false,
        actionRequise: true,
        action: 'Remplir immédiatement le bac à sel',
        parametres: { niveauSel }
      });
    } else if (niveauSel <= seuilsAlertes.niveauSelAttention) {
      nouvellesAlertes.push({
        id: Date.now() + 2,
        type: 'NiveauSel',
        niveau: 'Attention',
        titre: 'Niveau de sel bas',
        message: `Le niveau de sel est bas (${niveauSel}%). Remplissage recommandé.`,
        date: new Date().toISOString(),
        lue: false,
        actionRequise: true,
        action: 'Planifier le remplissage',
        parametres: { niveauSel }
      });
    }

    // Alerte efficacité de régénération
    if (parametres.efficaciteRegeneration < seuilsAlertes.efficaciteMinimale) {
      nouvellesAlertes.push({
        id: Date.now() + 3,
        type: 'Performance',
        niveau: 'Attention',
        titre: 'Efficacité de régénération faible',
        message: `L'efficacité de régénération est de ${parametres.efficaciteRegeneration}%. Une maintenance peut être nécessaire.`,
        date: new Date().toISOString(),
        lue: false,
        actionRequise: true,
        action: 'Vérifier la résine et les paramètres',
        parametres: { efficacite: parametres.efficaciteRegeneration }
      });
    }

    // Alerte interventions planifiées
    const interventionsUrgentes = interventionsPlanifiees.filter(i => 
      new Date(i.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
    );
    
    if (interventionsUrgentes.length > 0) {
      nouvellesAlertes.push({
        id: Date.now() + 4,
        type: 'Intervention',
        niveau: 'Attention',
        titre: 'Interventions planifiées proches',
        message: `${interventionsUrgentes.length} intervention(s) planifiée(s) dans les 7 prochains jours.`,
        date: new Date().toISOString(),
        lue: false,
        actionRequise: true,
        action: 'Vérifier les interventions',
        parametres: { interventions: interventionsUrgentes }
      });
    }

    // Alerte coût élevé
    const coutTotal = interventions.reduce((total, i) => total + (i.cout || 0), 0);
    if (coutTotal > seuilsAlertes.coutMaxIntervention) {
      nouvellesAlertes.push({
        id: Date.now() + 5,
        type: 'Performance',
        niveau: 'Attention',
        titre: 'Coût des interventions élevé',
        message: `Le coût total des interventions (${coutTotal}€) dépasse le seuil recommandé.`,
        date: new Date().toISOString(),
        lue: false,
        actionRequise: true,
        action: 'Analyser les coûts',
        parametres: { coutTotal }
      });
    }

    return nouvellesAlertes;
  }, [niveauSel, parametres.efficaciteRegeneration, interventionsPlanifiees, interventions, seuilsAlertes]);

  // Mettre à jour les alertes automatiquement
  React.useEffect(() => {
    const nouvellesAlertes = genererAlertesAutomatiques();
    if (nouvellesAlertes.length > 0) {
      setAlertes(prev => {
        // Éviter les doublons
        const alertesExistant = prev.map(a => `${a.type}-${a.niveau}`);
        const nouvellesUniques = nouvellesAlertes.filter(a => 
          !alertesExistant.includes(`${a.type}-${a.niveau}`)
        );
        return [...nouvellesUniques, ...prev];
      });
    }
  }, [genererAlertesAutomatiques]);

  // Fonctions pour gérer les alertes
  const marquerAlerteLue = (id) => {
    setAlertes(prev => prev.map(alerte => 
      alerte.id === id ? { ...alerte, lue: true } : alerte
    ));
  };

  const supprimerAlerte = (id) => {
    setAlertes(prev => prev.filter(alerte => alerte.id !== id));
  };

  const marquerToutesLues = () => {
    setAlertes(prev => prev.map(alerte => ({ ...alerte, lue: true })));
  };

  const supprimerAlertesLues = () => {
    setAlertes(prev => prev.filter(alerte => !alerte.lue));
  };

  const getStatistiquesAlertes = () => {
    const total = alertes.length;
    const nonLues = alertes.filter(a => !a.lue).length;
    const critiques = alertes.filter(a => a.niveau === 'Critique' || a.niveau === 'Urgente').length;
    const parType = {};
    
    TYPES_ALERTES.forEach(type => {
      parType[type.value] = alertes.filter(a => a.type === type.value).length;
    });

    return { total, nonLues, critiques, parType };
  };

  const value = {
    parametres,
    setParametres,
    historique,
    setHistorique,
    historiqueParametres,
    niveauSel,
    sauvegarderParametres,
    restaurerParametres,
    derniereValeurRC,
    setDerniereValeurRC,
    derniereValeurSF,
    setDerniereValeurSF,
    // Nouvelles fonctions pour les interventions
    interventions,
    interventionsPlanifiees,
    notifications,
    ajouterIntervention,
    modifierIntervention,
    supprimerIntervention,
    planifierIntervention,
    terminerIntervention,
    calculerStatistiques,
    setNotifications,
    alertes,
    seuilsAlertes,
    setSeuilsAlertes,
    marquerAlerteLue,
    supprimerAlerte,
    marquerToutesLues,
    supprimerAlertesLues,
    getStatistiquesAlertes,
    setAlertes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

function InterventionDialog({ open, onClose, onAdd, intervention = null, mode = 'ajout' }) {
  const [formData, setFormData] = React.useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Remplissage',
    priorite: 'Normale',
    etat: mode === 'ajout' ? 'Terminee' : 'Planifiee',
    detail: '',
    quantite: 25,
    cout: 0,
    commentaires: '',
    rappel: false,
    rappelDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    prochaineIntervention: ''
  });

  React.useEffect(() => {
    if (intervention) {
      setFormData(intervention);
    }
  }, [intervention]);

  const handleSubmit = () => {
    const interventionData = {
      ...formData,
      quantite: parseFloat(formData.quantite),
      cout: parseFloat(formData.cout)
    };
    
    onAdd(interventionData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'Remplissage',
      priorite: 'Normale',
      etat: 'Terminee',
      detail: '',
      quantite: 25,
      cout: 0,
      commentaires: '',
      rappel: false,
      rappelDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      prochaineIntervention: ''
    });
  };

  const getTypeIcon = (type) => {
    const typeInfo = TYPES_INTERVENTIONS.find(t => t.value === type);
    return typeInfo ? typeInfo.icon : '📋';
  };

  const getTypeColor = (type) => {
    const typeInfo = TYPES_INTERVENTIONS.find(t => t.value === type);
    return typeInfo ? typeInfo.couleur : '#666';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: cardColor, color: cardTitleColor, display: 'flex', alignItems: 'center', gap: 2 }}>
        <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(formData.type)}</span>
        {mode === 'ajout' ? 'Nouvelle intervention' : 'Modifier intervention'}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: cardColor }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          {/* Informations de base */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              InputLabelProps={{ style: { color: cardTitleColor } }}
              InputProps={{ style: { color: textColor } }}
              sx={{ 
                input: { color: textColor },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                '& .MuiInputAdornment-root': { color: '#fff' },
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
              fullWidth
            />
            
            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>Type d'intervention</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '& .MuiSelect-icon': { color: '#fff' }
                }}
              >
                {TYPES_INTERVENTIONS.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Priorité et état */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>Priorité</InputLabel>
              <Select
                value={formData.priorite}
                onChange={(e) => setFormData(prev => ({ ...prev, priorite: e.target.value }))}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '& .MuiSelect-icon': { color: '#fff' }
                }}
              >
                {PRIORITES.map(priorite => (
                  <MenuItem key={priorite.value} value={priorite.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: priorite.couleur 
                      }} />
                      <span>{priorite.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>État</InputLabel>
              <Select
                value={formData.etat}
                onChange={(e) => setFormData(prev => ({ ...prev, etat: e.target.value }))}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '& .MuiSelect-icon': { color: '#fff' }
                }}
              >
                {ETATS_INTERVENTIONS.map(etat => (
                  <MenuItem key={etat.value} value={etat.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: etat.couleur 
                      }} />
                      <span>{etat.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Détails et opération */}
          <TextField
            label="Détail de l'intervention"
            value={formData.detail}
            onChange={(e) => setFormData(prev => ({ ...prev, detail: e.target.value }))}
            InputLabelProps={{ style: { color: cardTitleColor } }}
            InputProps={{ style: { color: textColor } }}
            sx={{ 
              input: { color: textColor },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' }
            }}
            fullWidth
            multiline
            rows={2}
          />

                      {formData.type === 'Remplissage' && (
              <TextField
                label="Quantité de sel (kg)"
                type="number"
                value={formData.quantite}
                onChange={(e) => setFormData(prev => ({ ...prev, quantite: e.target.value }))}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ 
                  input: { color: textColor },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' }
                }}
                fullWidth
              />
            )}

          {/* Coût des produits */}
          <TextField
            label="Coût des produits (€)"
            type="number"
            value={formData.cout}
            onChange={(e) => setFormData(prev => ({ ...prev, cout: e.target.value }))}
            InputLabelProps={{ style: { color: cardTitleColor } }}
            InputProps={{ style: { color: textColor } }}
            sx={{ 
              input: { color: textColor },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
              '& .MuiFormHelperText-root': { color: '#888' }
            }}
            fullWidth
            helperText="Sel, produits d'entretien, résine, etc."
          />

          {/* Commentaires */}
          <TextField
            label="Commentaires"
            value={formData.commentaires}
            onChange={(e) => setFormData(prev => ({ ...prev, commentaires: e.target.value }))}
            InputLabelProps={{ style: { color: cardTitleColor } }}
            InputProps={{ style: { color: textColor } }}
            sx={{ 
              input: { color: textColor },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' }
            }}
            fullWidth
            multiline
            rows={3}
          />

          {/* Planification */}
          {formData.etat === 'Planifiee' && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Date de rappel"
                type="date"
                value={formData.rappelDate}
                onChange={(e) => setFormData(prev => ({ ...prev, rappelDate: e.target.value }))}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ 
                  input: { color: textColor },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '& .MuiInputAdornment-root': { color: '#fff' },
                  '& .MuiSvgIcon-root': { color: '#fff' }
                }}
                fullWidth
              />
              
              <TextField
                label="Prochaine intervention"
                type="date"
                value={formData.prochaineIntervention}
                onChange={(e) => setFormData(prev => ({ ...prev, prochaineIntervention: e.target.value }))}
                InputLabelProps={{ style: { color: textColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ 
                  input: { color: textColor },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                  '& .MuiInputAdornment-root': { color: '#fff' },
                  '& .MuiSvgIcon-root': { color: '#fff' }
                }}
                fullWidth
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: cardColor }}>
        <Button onClick={onClose} sx={{ color: textColor }}>
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          sx={{ 
            color: '#fff',
            bgcolor: getTypeColor(formData.type),
            '&:hover': { bgcolor: getTypeColor(formData.type) + 'dd' }
          }}
        >
          {mode === 'ajout' ? 'Ajouter' : 'Modifier'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DashboardCards() {
  const { niveauSel, interventions, interventionsPlanifiees, calculerStatistiques, alertes, getStatistiquesAlertes } = useAppContext();
  const [openDialog, setOpenDialog] = React.useState(false);

  const stats = calculerStatistiques();
  const statsAlertes = getStatistiquesAlertes();
  
  // Trouver la prochaine intervention planifiée
  const prochaineIntervention = interventionsPlanifiees
    .filter(i => new Date(i.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // Trouver la dernière intervention terminée
  const derniereIntervention = interventions
    .filter(i => i.etat === 'Terminee')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  // Alertes critiques non lues
  const alertesCritiques = alertes.filter(a => 
    (a.niveau === 'Critique' || a.niveau === 'Urgente') && !a.lue
  );

  const handleAddIntervention = (entry) => {
    // Rediriger vers la page des interventions
    const event = new CustomEvent('navigate', { detail: 'interventions' });
    window.dispatchEvent(event);
  };

  const getNiveauSelColor = () => {
    if (niveauSel <= 10) return '#f44336';
    if (niveauSel <= 20) return '#ff9800';
    return '#4caf50';
  };

  const getNiveauSelIcon = () => {
    if (niveauSel <= 10) return '🚨';
    if (niveauSel <= 20) return '⚠️';
    return '✅';
  };

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
        {/* Niveau de sel avec alerte visuelle */}
        <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, position: 'relative' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: getNiveauSelColor(), mr: 2 }}>
                <OpacityIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Niveau de sel</Typography>
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontSize: '1.5rem' }}>{getNiveauSelIcon()}</span>
                {alertesCritiques.some(a => a.type === 'NiveauSel') && (
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: '#f44336',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </Box>
            </Box>
            <Typography variant="h3" sx={{ color: getNiveauSelColor(), fontWeight: 700, mb: 1 }}>
              {niveauSel}%
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              {niveauSel <= 10 ? 'Remplissage urgent requis !' :
               niveauSel <= 20 ? 'Remplissage recommandé' : 'Niveau correct'}
            </Typography>
          </CardContent>
        </Card>

        {/* Prochaine intervention */}
        <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <EventIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Prochaine intervention</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>
              {prochaineIntervention ? 
                `${prochaineIntervention.date} - ${TYPES_INTERVENTIONS.find(t => t.value === prochaineIntervention.type)?.label}` : 
                'Aucune planifiée'
              }
            </Typography>
          </CardContent>
        </Card>

        {/* Interventions */}
        <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <HistoryIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Interventions</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>
              {stats.total} total ({stats.planifiees} planifiées)
            </Typography>
          </CardContent>
        </Card>

        {/* Coût total */}
        <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Coût total</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>
              {stats.coutTotal}€
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Section Alertes critiques */}
      {alertesCritiques.length > 0 && (
        <Card sx={{ bgcolor: '#2c3e50', boxShadow: 3, borderRadius: 3, mb: 4, border: 2, borderColor: '#f44336' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#f44336', mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h5" sx={{ color: '#f44336', fontWeight: 700 }}>
                Alertes Critiques ({alertesCritiques.length})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {alertesCritiques.slice(0, 3).map((alerte) => (
                <Box key={alerte.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  p: 1, 
                  borderRadius: 1,
                  bgcolor: 'rgba(244, 67, 54, 0.1)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🚨</span>
                  <Typography sx={{ color: textColor, flex: 1 }}>
                    {alerte.titre}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'alertes' });
                      window.dispatchEvent(event);
                    }}
                    sx={{ color: '#f44336' }}
                  >
                    Voir détails
                  </Button>
                </Box>
              ))}
              {alertesCritiques.length > 3 && (
                <Typography sx={{ color: '#888', textAlign: 'center', mt: 1 }}>
                  + {alertesCritiques.length - 3} autres alertes critiques
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Section Actions rapides */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 3 }}>Actions rapides</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'interventions' });
                window.dispatchEvent(event);
              }}
              sx={{
                bgcolor: accentColor,
                color: '#fff',
                py: 2,
                '&:hover': { bgcolor: '#2e7d32' }
              }}
            >
              + Gérer les interventions
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'alertes' });
                window.dispatchEvent(event);
              }}
              sx={{
                bgcolor: statsAlertes.nonLues > 0 ? '#ff9800' : mainColor,
                color: '#fff',
                py: 2,
                '&:hover': { bgcolor: statsAlertes.nonLues > 0 ? '#f57c00' : '#1565c0' }
              }}
            >
              {statsAlertes.nonLues > 0 ? `📢 Alertes (${statsAlertes.nonLues})` : '📢 Voir les alertes'}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'parametres' });
                window.dispatchEvent(event);
              }}
              sx={{
                bgcolor: mainColor,
                color: '#fff',
                py: 2,
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              ⚙️ Paramètres
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Style pour l'animation pulse */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
}

function GenericCardPage({ title, icon }) {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>{icon}</Avatar>
            <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>{title}</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: textColor }}>
            (Contenu à venir)
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function ParametresForm() {
  const { 
    parametres, 
    setParametres, 
    sauvegarderParametres,
    derniereValeurRC,
    setDerniereValeurRC,
    derniereValeurSF,
    setDerniereValeurSF
  } = useAppContext();
  const [saved, setSaved] = React.useState(false);
  const [commentaire, setCommentaire] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Logique spéciale pour le type de réserve
    if (name === 'typeReserve') {
      if (value === 'RC') {
        // Passage en volume fixe : restaurer la dernière valeur RC
        setParametres(prev => ({ 
          ...prev, 
          [name]: value,
          valeurReserve: derniereValeurRC
        }));
      } else if (value === 'SF') {
        // Passage en pourcentage : restaurer la dernière valeur SF
        setParametres(prev => ({ 
          ...prev, 
          [name]: value,
          valeurReserve: derniereValeurSF
        }));
      }
    } else if (name === 'valeurReserve') {
      // Mémoriser la valeur selon le type actuel
      if (parametres.typeReserve === 'RC') {
        setDerniereValeurRC(Number(value));
      } else if (parametres.typeReserve === 'SF') {
        setDerniereValeurSF(Number(value));
      }
      setParametres(prev => ({ ...prev, [name]: value }));
    } else {
      setParametres(prev => ({ ...prev, [name]: value }));
    }
    
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    sauvegarderParametres(parametres, commentaire || 'Modification des paramètres');
    setSaved(true);
    setCommentaire('');
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, p: 2, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" sx={{ color: cardTitleColor, fontWeight: 700 }}>
              Paramètres de l'adoucisseur Fleck 5600 SXT
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'historique-parametres' });
                window.dispatchEvent(event);
              }}
              sx={{
                borderColor: accentColor,
                color: accentColor,
                '&:hover': { 
                  borderColor: '#2e7d32',
                  bgcolor: 'rgba(67, 160, 71, 0.1)'
                }
              }}
            >
              📋 Voir l'historique
            </Button>
          </Box>
          
          <Box component="form" onSubmit={handleSave}>
            {/* Section 1: Paramètres d'affichage */}
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, mt: 3, fontWeight: 600 }}>
              📊 Paramètres d'affichage
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: cardTitleColor }}>Unité d'affichage</InputLabel>
                <Select
                  name="uniteAffichage"
                  value={parametres.uniteAffichage}
                  onChange={handleChange}
                  sx={{ 
                    color: textColor,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                  }}
                >
                  <MenuItem value="Ltr">Litres (Ltr)</MenuItem>
                  <MenuItem value="GAL">Gallons US (GAL)</MenuItem>
                  <MenuItem value="Cu">Mètres cubes (Cu)</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel sx={{ color: cardTitleColor }}>Type de vanne</InputLabel>
                <Select
                  name="typeVanne"
                  value={parametres.typeVanne}
                  onChange={handleChange}
                  sx={{ 
                    color: textColor,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                  }}
                >
                  <MenuItem value="St1b">Standard 1 phase (St1b)</MenuItem>
                  <MenuItem value="St2b">Standard 2 phases (St2b)</MenuItem>
                  <MenuItem value="Fltr">Filtre (Fltr)</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel sx={{ color: cardTitleColor }}>Type de régénération</InputLabel>
                <Select
                  name="typeRegeneration"
                  value={parametres.typeRegeneration}
                  onChange={handleChange}
                  sx={{ 
                    color: textColor,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                  }}
                >
                  <MenuItem value="tc">Chronométrique (tc)</MenuItem>
                  <MenuItem value="dAY">Hebdomadaire (dAY)</MenuItem>
                  <MenuItem value="Fd">Volumétrique retardée (Fd)</MenuItem>
                  <MenuItem value="FI">Volumétrique immédiate (FI)</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Type de vanne (série)"
                name="typeVanneSerie"
                value={parametres.typeVanneSerie}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
            </Box>

            {/* Section 2: Paramètres de capacité */}
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, mt: 3, fontWeight: 600 }}>
              ⚙️ Paramètres de capacité
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <TextField
                label="Capacité système (m³ x °tH)"
                name="capaciteSysteme"
                type="number"
                value={parametres.capaciteSysteme}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Dureté d'entrée (°tH)"
                name="dureteEntree"
                type="number"
                value={parametres.dureteEntree}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <FormControl fullWidth>
                <InputLabel sx={{ color: cardTitleColor }}>Type de réserve</InputLabel>
                <Select
                  name="typeReserve"
                  value={parametres.typeReserve}
                  onChange={handleChange}
                  sx={{ 
                    color: textColor,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                  }}
                >
                  <MenuItem value="RC">Volume fixe (RC)</MenuItem>
                  <MenuItem value="SF">Pourcentage (SF)</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label={parametres.typeReserve === 'SF' ? "Valeur de réserve (%)" : "Valeur de réserve (L)"}
                name="valeurReserve"
                type="number"
                value={parametres.valeurReserve}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Forçage calendaire (jours)"
                name="forcageCalendaire"
                type="number"
                value={parametres.forcageCalendaire}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Heure de régénération"
                name="heureRegeneration"
                type="time"
                value={parametres.heureRegeneration}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
            </Box>

            {/* Section 3: Temps des cycles */}
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, mt: 3, fontWeight: 600 }}>
              ⏱️ Temps des cycles (minutes)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <TextField
                label="Temps détassage (Backwash)"
                name="tempsDetassage"
                type="number"
                value={parametres.tempsDetassage}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Temps aspiration & rinçage lent"
                name="tempsAspiration"
                type="number"
                value={parametres.tempsAspiration}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Temps rinçage rapide"
                name="tempsRincage"
                type="number"
                value={parametres.tempsRincage}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Temps remplissage"
                name="tempsRemplissage"
                type="number"
                value={parametres.tempsRemplissage}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
            </Box>

            {/* Section 4: Paramètres de compteur */}
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, mt: 3, fontWeight: 600 }}>
              📊 Paramètres de compteur
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: cardTitleColor }}>Type de compteur</InputLabel>
                <Select
                  name="typeCompteur"
                  value={parametres.typeCompteur}
                  onChange={handleChange}
                  sx={{ 
                    color: textColor,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                  }}
                >
                  <MenuItem value="t0.7">t0.7</MenuItem>
                  <MenuItem value="P0.7">P0.7</MenuItem>
                  <MenuItem value="t1.0">t1.0</MenuItem>
                  <MenuItem value="P1.0">P1.0</MenuItem>
                  <MenuItem value="t1.5">t1.5</MenuItem>
                  <MenuItem value="P1.5">P1.5</MenuItem>
                  <MenuItem value="GEn">GEn</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Impulsions par litre (K)"
                name="impulsionsParLitre"
                type="number"
                value={parametres.impulsionsParLitre}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
            </Box>

            {/* Section 5: Paramètres de réglage */}
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, mt: 3, fontWeight: 600 }}>
              🔧 Paramètres de réglage
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
              <TextField
                label="Dureté de sortie (°f)"
                name="dureteSortie"
                type="number"
                value={parametres.dureteSortie}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Volume de résine (L)"
                name="volumeResine"
                type="number"
                value={parametres.volumeResine}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Capacité bac à sel (kg)"
                name="capaciteSel"
                type="number"
                value={parametres.capaciteSel}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Consommation sel/régén. (kg)"
                name="consoSel"
                type="number"
                value={parametres.consoSel}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Pression d'eau (bar)"
                name="pressionEau"
                type="number"
                value={parametres.pressionEau}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Température d'eau (°C)"
                name="temperatureEau"
                type="number"
                value={parametres.temperatureEau}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Débit d'eau (L/min)"
                name="debitEau"
                type="number"
                value={parametres.debitEau}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
              
              <TextField
                label="Efficacité de régénération (%)"
                name="efficaciteRegeneration"
                type="number"
                value={parametres.efficaciteRegeneration}
                onChange={handleChange}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
                fullWidth
              />
            </Box>

            {/* Commentaire et sauvegarde */}
            <TextField
              label="Commentaire (optionnel)"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              InputLabelProps={{ style: { color: cardTitleColor } }}
              InputProps={{ style: { color: textColor } }}
              sx={{ input: { color: textColor }, label: { color: cardTitleColor } }}
              fullWidth
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <button
                type="submit"
                style={{
                  background: mainColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 32px',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
                  transition: 'background 0.2s',
                }}
              >
                Sauvegarder tous les paramètres
        </button>
            </Box>
            
            {saved && (
              <Typography sx={{ color: accentColor, mt: 2, fontWeight: 600 }}>
                ✅ Paramètres sauvegardés et historisés !
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function InterventionsPage() {
  const { 
    interventions, 
    interventionsPlanifiees, 
    ajouterIntervention, 
    modifierIntervention, 
    supprimerIntervention,
    terminerIntervention,
    calculerStatistiques,
    notifications,
    setNotifications
  } = useAppContext();
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedIntervention, setSelectedIntervention] = React.useState(null);
  const [dialogMode, setDialogMode] = React.useState('ajout');
  const [activeTab, setActiveTab] = React.useState(0);
  const [filtreType, setFiltreType] = React.useState('Tous');
  const [filtrePriorite, setFiltrePriorite] = React.useState('Toutes');
  const [filtreEtat, setFiltreEtat] = React.useState('Tous');

  const stats = calculerStatistiques();

  const handleAddIntervention = (intervention) => {
    ajouterIntervention(intervention);
    setOpenDialog(false);
  };

  const handleEditIntervention = (intervention) => {
    setSelectedIntervention(intervention);
    setDialogMode('modification');
    setOpenDialog(true);
  };

  const handleDeleteIntervention = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      supprimerIntervention(id);
    }
  };

  const handleTerminerIntervention = (id) => {
    terminerIntervention(id);
  };

  const handleMarquerLue = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, lue: true } : notif
    ));
  };

  const getTypeIcon = (type) => {
    const typeInfo = TYPES_INTERVENTIONS.find(t => t.value === type);
    return typeInfo ? typeInfo.icon : '📋';
  };

  const getTypeColor = (type) => {
    const typeInfo = TYPES_INTERVENTIONS.find(t => t.value === type);
    return typeInfo ? typeInfo.couleur : '#666';
  };

  const getPrioriteColor = (priorite) => {
    const prioriteInfo = PRIORITES.find(p => p.value === priorite);
    return prioriteInfo ? prioriteInfo.couleur : '#666';
  };

  const getEtatColor = (etat) => {
    const etatInfo = ETATS_INTERVENTIONS.find(e => e.value === etat);
    return etatInfo ? etatInfo.couleur : '#666';
  };

  const filtrerInterventions = (liste) => {
    return liste.filter(intervention => {
      const matchType = filtreType === 'Tous' || intervention.type === filtreType;
      const matchPriorite = filtrePriorite === 'Toutes' || intervention.priorite === filtrePriorite;
      const matchEtat = filtreEtat === 'Tous' || intervention.etat === filtreEtat;
      return matchType && matchPriorite && matchEtat;
    });
  };

  const interventionsFiltrees = filtrerInterventions(interventions);
  const planifieesFiltrees = filtrerInterventions(interventionsPlanifiees);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* En-tête avec statistiques */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <HistoryIcon />
              </Avatar>
              <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>
                Gestion des Interventions
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedIntervention(null);
                setDialogMode('ajout');
                setOpenDialog(true);
              }}
              sx={{
                bgcolor: accentColor,
                color: '#fff',
                '&:hover': { bgcolor: '#2e7d32' }
              }}
            >
              + Nouvelle intervention
            </Button>
          </Box>

          {/* Statistiques rapides */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Total</Typography>
              <Typography variant="h4" sx={{ color: textColor }}>{stats.total}</Typography>
            </Card>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Terminées</Typography>
              <Typography variant="h4" sx={{ color: '#4caf50' }}>{stats.terminees}</Typography>
            </Card>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Planifiées</Typography>
              <Typography variant="h4" sx={{ color: '#2196f3' }}>{stats.planifiees}</Typography>
            </Card>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Coût total</Typography>
              <Typography variant="h4" sx={{ color: '#ff9800' }}>{stats.coutTotal}€</Typography>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: '#555', mb: 3 }}>
            <Box sx={{ display: 'flex' }}>
              <Button
                onClick={() => setActiveTab(0)}
                sx={{
                  color: activeTab === 0 ? accentColor : textColor,
                  borderBottom: activeTab === 0 ? 2 : 0,
                  borderColor: accentColor,
                  borderRadius: 0,
                  '&:hover': { bgcolor: 'transparent' }
                }}
              >
                Interventions ({interventions.length})
              </Button>
              <Button
                onClick={() => setActiveTab(1)}
                sx={{
                  color: activeTab === 1 ? accentColor : textColor,
                  borderBottom: activeTab === 1 ? 2 : 0,
                  borderColor: accentColor,
                  borderRadius: 0,
                  '&:hover': { bgcolor: 'transparent' }
                }}
              >
                Planifiées ({interventionsPlanifiees.length})
              </Button>
              <Button
                onClick={() => setActiveTab(2)}
                sx={{
                  color: activeTab === 2 ? accentColor : textColor,
                  borderBottom: activeTab === 2 ? 2 : 0,
                  borderColor: accentColor,
                  borderRadius: 0,
                  '&:hover': { bgcolor: 'transparent' }
                }}
              >
                Notifications ({notifications.filter(n => !n.lue).length})
              </Button>
            </Box>
          </Box>

          {/* Filtres */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>Type</InputLabel>
              <Select
                value={filtreType}
                onChange={(e) => setFiltreType(e.target.value)}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                }}
              >
                <MenuItem value="Tous">Tous les types</MenuItem>
                {TYPES_INTERVENTIONS.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>Priorité</InputLabel>
              <Select
                value={filtrePriorite}
                onChange={(e) => setFiltrePriorite(e.target.value)}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                }}
              >
                <MenuItem value="Toutes">Toutes les priorités</MenuItem>
                {PRIORITES.map(priorite => (
                  <MenuItem key={priorite.value} value={priorite.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: priorite.couleur 
                      }} />
                      <span>{priorite.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>État</InputLabel>
              <Select
                value={filtreEtat}
                onChange={(e) => setFiltreEtat(e.target.value)}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                }}
              >
                <MenuItem value="Tous">Tous les états</MenuItem>
                {ETATS_INTERVENTIONS.map(etat => (
                  <MenuItem key={etat.value} value={etat.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: etat.couleur 
                      }} />
                      <span>{etat.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Contenu des onglets */}
          {activeTab === 0 && (
            <TableContainer component={Paper} sx={{ bgcolor: cardColor, boxShadow: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Priorité</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>État</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Détail</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Coût</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {interventionsFiltrees.map((intervention) => (
                    <TableRow key={intervention.id} sx={{ '&:hover': { bgcolor: '#2c3e50' } }}>
                      <TableCell sx={{ color: textColor }}>{intervention.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span style={{ fontSize: '1.2rem' }}>{getTypeIcon(intervention.type)}</span>
                          <Typography sx={{ color: textColor }}>
                            {TYPES_INTERVENTIONS.find(t => t.value === intervention.type)?.label}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: getPrioriteColor(intervention.priorite) 
                          }} />
                          <Typography sx={{ color: textColor }}>{intervention.priorite}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: getEtatColor(intervention.etat) 
                          }} />
                          <Typography sx={{ color: textColor }}>{intervention.etat}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: textColor, maxWidth: 200 }}>
                        <Typography variant="body2" sx={{ color: textColor }}>
                          {intervention.detail}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: textColor }}>{intervention.cout}€</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            onClick={() => handleEditIntervention(intervention)}
                            sx={{ color: mainColor, '&:hover': { bgcolor: '#1565c0' } }}
                          >
                            ✏️
                          </IconButton>
                          {intervention.etat === 'EnCours' && (
                            <IconButton
                              onClick={() => handleTerminerIntervention(intervention.id)}
                              sx={{ color: accentColor, '&:hover': { bgcolor: '#2e7d32' } }}
                            >
                              ✅
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => handleDeleteIntervention(intervention.id)}
                            sx={{ color: '#e74c3c', '&:hover': { bgcolor: '#c0392b' } }}
                          >
                            🗑️
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {activeTab === 1 && (
            <TableContainer component={Paper} sx={{ bgcolor: cardColor, boxShadow: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Date prévue</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Priorité</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Détail</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Rappel</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {planifieesFiltrees.map((intervention) => (
                    <TableRow key={intervention.id} sx={{ '&:hover': { bgcolor: '#2c3e50' } }}>
                      <TableCell sx={{ color: textColor }}>{intervention.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span style={{ fontSize: '1.2rem' }}>{getTypeIcon(intervention.type)}</span>
                          <Typography sx={{ color: textColor }}>
                            {TYPES_INTERVENTIONS.find(t => t.value === intervention.type)?.label}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: getPrioriteColor(intervention.priorite) 
                          }} />
                          <Typography sx={{ color: textColor }}>{intervention.priorite}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: textColor, maxWidth: 200 }}>
                        <Typography variant="body2" sx={{ color: textColor }}>
                          {intervention.detail}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: textColor }}>
                        {intervention.rappel ? intervention.rappelDate : 'Aucun'}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            onClick={() => handleEditIntervention(intervention)}
                            sx={{ color: mainColor, '&:hover': { bgcolor: '#1565c0' } }}
                          >
                            ✏️
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              modifierIntervention(intervention.id, { etat: 'EnCours' });
                            }}
                            sx={{ color: accentColor, '&:hover': { bgcolor: '#2e7d32' } }}
                          >
                            ▶️
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteIntervention(intervention.id)}
                            sx={{ color: '#e74c3c', '&:hover': { bgcolor: '#c0392b' } }}
                          >
                            🗑️
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {activeTab === 2 && (
            <Box>
              {notifications.length === 0 ? (
                <Typography sx={{ color: textColor, textAlign: 'center', py: 4 }}>
                  Aucune notification
                </Typography>
              ) : (
                notifications.map((notification) => (
                  <Card key={notification.id} sx={{ 
                    bgcolor: notification.lue ? '#2c3e50' : '#34495e', 
                    mb: 2, 
                    borderLeft: 4, 
                    borderColor: notification.priorite === 'Haute' ? '#f44336' : 
                                notification.priorite === 'Urgente' ? '#d32f2f' : '#ff9800'
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>
                            {notification.type}
                          </Typography>
                          <Typography sx={{ color: textColor, mb: 1 }}>
                            {notification.message}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#888' }}>
                            {new Date(notification.date).toLocaleString('fr-FR')}
                          </Typography>
                        </Box>
                        {!notification.lue && (
                          <Button
                            size="small"
                            onClick={() => handleMarquerLue(notification.id)}
                            sx={{ color: accentColor }}
                          >
                            Marquer comme lue
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      <InterventionDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onAdd={handleAddIntervention}
        intervention={selectedIntervention}
        mode={dialogMode}
      />
    </Box>
  );
}

function HistoriquePage() {
  const { historique, setHistorique } = useAppContext();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleAddEntry = (entry) => {
    setHistorique(prev => [entry, ...prev]);
    setOpenDialog(false);
  };

  const handleDeleteEntry = (id) => {
    setHistorique(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <HistoryIcon />
              </Avatar>
              <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>
                Historique
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => setOpenDialog(true)}
              sx={{
                bgcolor: accentColor,
                color: '#fff',
                '&:hover': { bgcolor: '#2e7d32' }
              }}
            >
              Ajouter une entrée
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ bgcolor: cardColor, boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Détail</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Quantité (kg)</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historique.map((entry) => (
                  <TableRow key={entry.id} sx={{ '&:hover': { bgcolor: '#2c3e50' } }}>
                    <TableCell sx={{ color: textColor }}>{entry.date}</TableCell>
                    <TableCell sx={{ color: textColor }}>{entry.type}</TableCell>
                    <TableCell sx={{ color: textColor }}>{entry.detail}</TableCell>
                    <TableCell sx={{ color: textColor }}>{entry.quantite}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteEntry(entry.id)}
                        sx={{ color: '#e74c3c', '&:hover': { bgcolor: '#c0392b' } }}
                      >
                        🗑️
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <InterventionDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onAdd={handleAddEntry} 
      />
    </Box>
  );
}

function DocumentationPage() {
  const { parametres, niveauSel } = useAppContext();

  const sections = [
    {
      id: 'presentation',
      titre: 'Présentation de l\'application',
      icon: '🏠',
      contenu: `
        <h3>Gestionnaire d'Adoucisseur Fleck 5600 SXT</h3>
        <p>Cette application vous permet de gérer efficacement votre adoucisseur d'eau Fleck 5600 SXT. Elle centralise toutes les informations importantes et vous aide à maintenir votre système en parfait état.</p>
        
        <h4>Fonctionnalités principales :</h4>
        <ul>
          <li><strong>📊 Tableau de bord</strong> : Vue d'ensemble de l'état de votre adoucisseur</li>
          <li><strong>⚙️ Paramètres</strong> : Configuration et suivi des paramètres techniques</li>
          <li><strong>📅 Interventions</strong> : Gestion complète des interventions et maintenance</li>
          <li><strong>📢 Alertes</strong> : Système d'alertes intelligent pour la surveillance</li>
          <li><strong>📈 Historique</strong> : Suivi des modifications et interventions passées</li>
        </ul>
      `
    },
    {
      id: 'tableau-bord',
      titre: 'Tableau de bord',
      icon: '📊',
      contenu: `
        <h3>Vue d'ensemble</h3>
        <p>Le tableau de bord vous donne une vision claire et immédiate de l'état de votre adoucisseur.</p>
        
        <h4>Indicateurs principaux :</h4>
        <ul>
          <li><strong>Niveau de sel</strong> : Affichage en temps réel avec codes couleur
            <ul>
              <li>🟢 Vert : Niveau correct (>20%)</li>
              <li>🟡 Orange : Attention requise (10-20%)</li>
              <li>🔴 Rouge : Remplissage urgent (<10%)</li>
            </ul>
          </li>
          <li><strong>Prochaine intervention</strong> : Date et type de la prochaine intervention planifiée</li>
          <li><strong>Statistiques</strong> : Nombre total d'interventions et coûts</li>
        </ul>
        
        <h4>Alertes critiques :</h4>
        <p>Les alertes critiques s'affichent automatiquement en haut du tableau de bord pour attirer votre attention sur les actions urgentes à effectuer.</p>
        
        <h4>Actions rapides :</h4>
        <p>Boutons d'accès direct aux principales fonctionnalités : gestion des interventions, consultation des alertes, modification des paramètres.</p>
      `
    },
    {
      id: 'parametres',
      titre: 'Paramètres',
      icon: '⚙️',
      contenu: `
        <h3>Configuration technique</h3>
        <p>La page Paramètres vous permet de configurer et surveiller tous les aspects techniques de votre adoucisseur.</p>
        
        <h4>Paramètres d'affichage :</h4>
        <ul>
          <li><strong>Unité d'affichage</strong> : Litres, Gallons US, ou Mètres cubes</li>
          <li><strong>Type de vanne</strong> : Standard 1/2 phases ou Filtre</li>
          <li><strong>Type de régénération</strong> : Chronométrique, Hebdomadaire, ou Volumétrique</li>
          <li><strong>Type de vanne série</strong> : 5600 (votre modèle)</li>
        </ul>
        
        <h4>Paramètres de capacité :</h4>
        <ul>
          <li><strong>Capacité système</strong> : Volume total traité par cycle (L)</li>
          <li><strong>Dureté d'entrée</strong> : Dureté de l'eau brute (°f)</li>
          <li><strong>Type de réserve</strong> : Volume fixe (RC) ou Pourcentage (SF)</li>
          <li><strong>Valeur de réserve</strong> : Volume ou pourcentage selon le type</li>
          <li><strong>Forçage calendaire</strong> : Jours entre régénérations forcées</li>
        </ul>
        
        <h4>Paramètres de régénération :</h4>
        <ul>
          <li><strong>Heure de régénération</strong> : Heure programmée (format 24h)</li>
          <li><strong>Temps de détassage</strong> : Durée en minutes</li>
          <li><strong>Temps d'aspiration</strong> : Durée en minutes</li>
          <li><strong>Temps de rinçage</strong> : Durée en minutes</li>
          <li><strong>Temps de remplissage</strong> : Durée en minutes</li>
        </ul>
        
        <h4>Paramètres de compteur :</h4>
        <ul>
          <li><strong>Type de compteur</strong> : t0.7, P0.7, t1.0, P1.0, t1.5, P1.5, ou GEn</li>
          <li><strong>Impulsions par litre</strong> : Nombre d'impulsions pour 1 litre</li>
        </ul>
        
        <h4>Paramètres de réglage :</h4>
        <ul>
          <li><strong>Dureté de sortie</strong> : Dureté cible de l'eau adoucie (°f)</li>
          <li><strong>Volume de résine</strong> : Volume de résine échangeuse d'ions (L)</li>
          <li><strong>Capacité bac à sel</strong> : Capacité maximale du bac (kg)</li>
          <li><strong>Consommation sel/régénération</strong> : Quantité de sel consommée (kg)</li>
          <li><strong>Pression d'eau</strong> : Pression d'alimentation (bar)</li>
          <li><strong>Température d'eau</strong> : Température de l'eau (°C)</li>
          <li><strong>Débit d'eau</strong> : Débit nominal (L/min)</li>
          <li><strong>Efficacité de régénération</strong> : Efficacité du processus (%)</li>
        </ul>
        
        <h4>Historisation :</h4>
        <p>Toutes les modifications sont automatiquement sauvegardées avec horodatage et commentaires. Vous pouvez consulter l'historique complet et restaurer d'anciennes configurations si nécessaire.</p>
      `
    },
    {
      id: 'interventions',
      titre: 'Gestion des interventions',
      icon: '📅',
      contenu: `
        <h3>Planification et suivi</h3>
        <p>La gestion des interventions vous permet de planifier, suivre et documenter toutes les actions sur votre adoucisseur.</p>
        
        <h4>Types d'interventions :</h4>
        <ul>
          <li><strong>🧂 Remplissage</strong> : Ajout de sel dans le bac</li>
          <li><strong>🔄 Régénération</strong> : Régénération manuelle ou automatique</li>
          <li><strong>🔧 Maintenance</strong> : Maintenance préventive</li>
          <li><strong>🧹 Entretien</strong> : Nettoyage et entretien général</li>
          <li><strong>⚠️ Dépannage</strong> : Résolution de problèmes</li>
          <li><strong>🔍 Inspection</strong> : Inspection technique</li>
          <li><strong>💧 Nettoyage</strong> : Nettoyage spécifique du bac à sel</li>
          <li><strong>🔄 Changement</strong> : Changement de résine</li>
          <li><strong>⚖️ Calibration</strong> : Calibration du système</li>
          <li><strong>🧪 Test</strong> : Test de fonctionnement</li>
        </ul>
        
        <h4>Niveaux de priorité :</h4>
        <ul>
          <li><strong>🟢 Basse</strong> : Intervention non urgente</li>
          <li><strong>🟡 Normale</strong> : Intervention standard</li>
          <li><strong>🟠 Haute</strong> : Intervention importante</li>
          <li><strong>🔴 Urgente</strong> : Intervention critique</li>
        </ul>
        
        <h4>États d'intervention :</h4>
        <ul>
          <li><strong>🔵 Planifiée</strong> : Intervention programmée</li>
          <li><strong>🟠 En cours</strong> : Intervention en cours d'exécution</li>
          <li><strong>🟢 Terminée</strong> : Intervention achevée</li>
          <li><strong>⚫ Annulée</strong> : Intervention annulée</li>
          <li><strong>🔘 Reportée</strong> : Intervention reportée</li>
        </ul>
        
        <h4>Fonctionnalités :</h4>
        <ul>
          <li><strong>Ajout d'intervention</strong> : Création d'une nouvelle intervention</li>
          <li><strong>Modification</strong> : Modification des détails d'une intervention</li>
          <li><strong>Suppression</strong> : Suppression d'une intervention</li>
          <li><strong>Planification</strong> : Programmation d'interventions futures</li>
          <li><strong>Suivi des coûts</strong> : Enregistrement des coûts associés</li>
          <li><strong>Commentaires</strong> : Ajout de notes et observations</li>
          <li><strong>Rappels</strong> : Système de rappels pour interventions planifiées</li>
        </ul>
        
        <h4>Filtres et recherche :</h4>
        <p>Filtrage par type, priorité, état, et recherche textuelle pour retrouver rapidement une intervention spécifique.</p>
      `
    },
    {
      id: 'alertes',
      titre: 'Système d\'alertes',
      icon: '📢',
      contenu: `
         <h3>Surveillance intelligente</h3>
         <p>Le système d'alertes surveille automatiquement l'état de votre adoucisseur et vous informe des actions à effectuer.</p>
         
         <h4>Types d'alertes :</h4>
         <ul>
           <li><strong>🧂 Niveau de sel</strong> : Alertes basées sur le niveau de sel
             <ul>
               <li>Seuil critique : &lt; 10%</li>
               <li>Seuil d'attention : &lt; 20%</li>
             </ul>
           </li>
           <li><strong>🔄 Régénération</strong> : Problèmes de régénération</li>
           <li><strong>🔧 Maintenance</strong> : Rappels de maintenance</li>
           <li><strong>📅 Intervention</strong> : Interventions planifiées proches</li>
           <li><strong>📊 Performance</strong> : Efficacité et coûts</li>
           <li><strong>⚙️ Système</strong> : Problèmes généraux</li>
         </ul>
         
         <h4>Niveaux de gravité :</h4>
         <ul>
           <li><strong>ℹ️ Information</strong> : Informations générales</li>
           <li><strong>⚠️ Attention</strong> : Actions recommandées</li>
           <li><strong>🚨 Critique</strong> : Actions urgentes requises</li>
           <li><strong>🚨 Urgente</strong> : Actions immédiates</li>
         </ul>
         
         <h4>Configuration des seuils :</h4>
         <p>Vous pouvez personnaliser les seuils d'alertes selon vos besoins :</p>
         <ul>
           <li>Seuil critique niveau de sel (par défaut : 10%)</li>
           <li>Seuil d'attention niveau de sel (par défaut : 20%)</li>
           <li>Efficacité minimale de régénération (par défaut : 80%)</li>
           <li>Coût maximum des interventions (par défaut : 200€)</li>
         </ul>
         
         <h4>Gestion des alertes :</h4>
         <ul>
           <li><strong>Marquer comme lu</strong> : Indiquer qu'une alerte a été traitée</li>
           <li><strong>Supprimer</strong> : Supprimer une alerte</li>
           <li><strong>Tout marquer comme lu</strong> : Marquer toutes les alertes comme lues</li>
           <li><strong>Supprimer les lues</strong> : Nettoyer les alertes traitées</li>
         </ul>
         
         <h4>Filtres :</h4>
         <p>Filtrage par type d'alerte, niveau de gravité, et état (lue/non lue).</p>
       `
    },
    {
      id: 'historique',
      titre: 'Historique',
      icon: '📈',
      contenu: `
        <h3>Suivi et traçabilité</h3>
        <p>L'historique vous permet de consulter toutes les actions passées et de maintenir une traçabilité complète.</p>
        
        <h4>Historique des interventions :</h4>
        <ul>
          <li><strong>Interventions terminées</strong> : Toutes les interventions achevées</li>
          <li><strong>Interventions planifiées</strong> : Interventions futures programmées</li>
          <li><strong>Détails complets</strong> : Type, date, coût des produits</li>
          <li><strong>Commentaires</strong> : Notes et observations</li>
        </ul>
        
        <h4>Historique des paramètres :</h4>
        <ul>
          <li><strong>Modifications</strong> : Toutes les modifications de paramètres</li>
          <li><strong>Horodatage</strong> : Date et heure de modification</li>
          <li><strong>Commentaires</strong> : Raison de la modification</li>
          <li><strong>Restauration</strong> : Possibilité de restaurer d'anciennes configurations</li>
          <li><strong>Comparaison</strong> : Visualisation des différences entre versions</li>
        </ul>
        
        <h4>Statistiques :</h4>
        <ul>
          <li><strong>Fréquence des interventions</strong> : Analyse des patterns</li>
          <li><strong>Coûts cumulés</strong> : Suivi des dépenses</li>
          <li><strong>Performance</strong> : Évolution de l'efficacité</li>
          <li><strong>Consommation de sel</strong> : Suivi de la consommation</li>
        </ul>
      `
    },
    {
      id: 'conseils',
      titre: 'Conseils d\'utilisation',
      icon: '💡',
      contenu: `
        <h3>Bonnes pratiques</h3>
        <p>Voici quelques conseils pour optimiser l'utilisation de votre adoucisseur et de cette application.</p>
        
        <h4>Surveillance régulière :</h4>
        <ul>
          <li><strong>Vérifiez le niveau de sel</strong> : Au moins une fois par semaine</li>
          <li><strong>Consultez les alertes</strong> : Régulièrement pour ne pas manquer d'actions importantes</li>
          <li><strong>Planifiez les interventions</strong> : Anticipez les besoins de maintenance</li>
          <li><strong>Documentez les interventions</strong> : Gardez une trace de toutes les actions</li>
        </ul>
        
        <h4>Maintenance préventive :</h4>
        <ul>
          <li><strong>Remplissage préventif</strong> : Ne pas attendre que le niveau soit critique</li>
          <li><strong>Inspection trimestrielle</strong> : Vérification générale du système</li>
          <li><strong>Nettoyage du bac à sel</strong> : Éviter l'accumulation de dépôts</li>
          <li><strong>Surveillance de l'efficacité</strong> : Maintenir une bonne performance</li>
        </ul>
        
        <h4>Optimisation des paramètres :</h4>
        <ul>
          <li><strong>Adaptez les seuils</strong> : Ajustez les alertes selon votre usage</li>
          <li><strong>Optimisez la régénération</strong> : Programmez aux heures creuses</li>
          <li><strong>Surveillez la dureté</strong> : Ajustez selon la qualité de l'eau</li>
          <li><strong>Calibrez régulièrement</strong> : Maintenez la précision du système</li>
        </ul>
        
        <h4>Gestion des coûts :</h4>
        <ul>
          <li><strong>Suivez les dépenses</strong> : Enregistrez tous les coûts</li>
          <li><strong>Analysez les tendances</strong> : Identifiez les optimisations possibles</li>
          <li><strong>Planifiez le budget</strong> : Anticipez les dépenses de maintenance</li>
          <li><strong>Optimisez la consommation</strong> : Réduisez les coûts d'exploitation</li>
        </ul>
        
        <h4>En cas de problème :</h4>
        <ul>
          <li><strong>Consultez les alertes</strong> : Elles peuvent indiquer la cause</li>
          <li><strong>Vérifiez l'historique</strong> : Comparez avec les périodes normales</li>
          <li><strong>Documentez le problème</strong> : Ajoutez une intervention de dépannage</li>
          <li><strong>Consultez la documentation</strong> : Pour résoudre les problèmes courants</li>
        </ul>
      `
    },
    {
      id: 'technique',
      titre: 'Informations techniques',
      icon: '🔧',
      contenu: `
        <h3>Spécifications Fleck 5600 SXT</h3>
        <p>Informations techniques détaillées sur votre adoucisseur Fleck 5600 SXT.</p>
        
        <h4>Caractéristiques générales :</h4>
        <ul>
          <li><strong>Modèle</strong> : Fleck 5600 SXT</li>
          <li><strong>Type</strong> : Adoucisseur d'eau automatique</li>
          <li><strong>Contrôle</strong> : Électronique avec affichage LCD</li>
          <li><strong>Régénération</strong> : Chronométrique, volumétrique ou hebdomadaire</li>
        </ul>
        
        <h4>Capacités :</h4>
        <ul>
          <li><strong>Débit nominal</strong> : 1,5 à 2,5 m³/h</li>
          <li><strong>Pression de service</strong> : 1,5 à 8,5 bar</li>
          <li><strong>Température d'eau</strong> : 2 à 50°C</li>
          <li><strong>Capacité résine</strong> : 20 à 50 L selon configuration</li>
          <li><strong>Capacité bac à sel</strong> : 50 à 200 kg selon modèle</li>
        </ul>
        
        <h4>Consommation :</h4>
        <ul>
          <li><strong>Consommation sel</strong> : 2,5 à 5 kg par régénération</li>
          <li><strong>Consommation eau</strong> : 100 à 200 L par régénération</li>
          <li><strong>Durée régénération</strong> : 60 à 120 minutes</li>
          <li><strong>Fréquence</strong> : Selon dureté et consommation</li>
        </ul>
        
        <h4>Composants principaux :</h4>
        <ul>
          <li><strong>Vanne de contrôle</strong> : Fleck 5600 SXT</li>
          <li><strong>Résine échangeuse</strong> : Résine cationique forte</li>
          <li><strong>Bac à sel</strong> : Bac en polyéthylène</li>
          <li><strong>Filtre</strong> : Filtre à sédiments intégré</li>
          <li><strong>Bypass</strong> : Bypass manuel intégré</li>
        </ul>
        
        <h4>Codes d'erreur courants :</h4>
        <ul>
          <li><strong>Erreur 1</strong> : Problème de pression d'eau</li>
          <li><strong>Erreur 2</strong> : Problème de vanne</li>
          <li><strong>Erreur 3</strong> : Problème de compteur</li>
          <li><strong>Erreur 4</strong> : Problème de programmation</li>
        </ul>
        
        <h4>Maintenance recommandée :</h4>
        <ul>
          <li><strong>Nettoyage bac à sel</strong> : Tous les 6 mois</li>
          <li><strong>Inspection générale</strong> : Tous les 3 mois</li>
          <li><strong>Changement résine</strong> : Tous les 5-10 ans</li>
          <li><strong>Calibration</strong> : Annuellement</li>
        </ul>
      `
    }
  ];

  const [activeSection, setActiveSection] = React.useState('presentation');

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* En-tête */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
              <DescriptionIcon />
            </Avatar>
            <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>
              Documentation complète
            </Typography>
          </Box>
          <Typography sx={{ color: textColor, fontSize: '1.1rem' }}>
            Guide complet d'utilisation de votre application de gestion d'adoucisseur Fleck 5600 SXT
          </Typography>
        </CardContent>
      </Card>

      {/* Navigation des sections */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 2 }}>Sections de la documentation</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? 'contained' : 'outlined'}
                sx={{
                  bgcolor: activeSection === section.id ? accentColor : 'transparent',
                  color: activeSection === section.id ? '#fff' : textColor,
                  borderColor: activeSection === section.id ? accentColor : '#555',
                  '&:hover': {
                    bgcolor: activeSection === section.id ? '#2e7d32' : 'rgba(76, 175, 80, 0.1)',
                    borderColor: accentColor
                  },
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '1.2rem' }}>{section.icon}</span>
                  <span>{section.titre}</span>
                </Box>
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Contenu de la section active */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <span style={{ fontSize: '2rem', marginRight: '1rem' }}>
              {sections.find(s => s.id === activeSection)?.icon}
            </span>
            <Typography variant="h5" sx={{ color: cardTitleColor, fontWeight: 700 }}>
              {sections.find(s => s.id === activeSection)?.titre}
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              color: textColor,
              '& h3': { color: cardTitleColor, mt: 3, mb: 2 },
              '& h4': { color: cardTitleColor, mt: 2, mb: 1 },
              '& p': { mb: 2, lineHeight: 1.6 },
              '& ul': { mb: 2, pl: 3 },
              '& li': { mb: 0.5, lineHeight: 1.5 },
              '& strong': { color: accentColor }
            }}
            dangerouslySetInnerHTML={{ 
              __html: sections.find(s => s.id === activeSection)?.contenu || '' 
            }}
          />
        </CardContent>
      </Card>

      {/* Informations rapides */}
      <Card sx={{ bgcolor: '#2c3e50', boxShadow: 3, borderRadius: 3, mt: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 2 }}>Informations rapides</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#34495e', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Niveau de sel actuel</Typography>
              <Typography variant="h4" sx={{ 
                color: niveauSel <= 10 ? '#f44336' : niveauSel <= 20 ? '#ff9800' : '#4caf50' 
              }}>
                {niveauSel}%
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#34495e', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Dureté d'entrée</Typography>
              <Typography variant="h4" sx={{ color: textColor }}>
                {parametres.dureteEntree} °f
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#34495e', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Capacité système</Typography>
              <Typography variant="h4" sx={{ color: textColor }}>
                {parametres.capaciteSysteme} L
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function HistoriqueParametresPage() {
  const { historiqueParametres, restaurerParametres } = useAppContext();
  const [restaurationMessage, setRestaurationMessage] = React.useState('');
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const [selectedVersion, setSelectedVersion] = React.useState(null);

  const handleRestaurer = (versionId) => {
    const success = restaurerParametres(versionId);
    if (success) {
      setRestaurationMessage('Paramètres restaurés avec succès !');
      setTimeout(() => setRestaurationMessage(''), 3000);
    }
  };

  const handleVoirDetails = (version) => {
    setSelectedVersion(version);
    setOpenDetailsDialog(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
              <SettingsIcon />
            </Avatar>
            <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>
              Historique des paramètres
            </Typography>
          </Box>

          {restaurationMessage && (
            <Typography sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              {restaurationMessage}
            </Typography>
          )}

          <TableContainer component={Paper} sx={{ bgcolor: cardColor, boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Commentaire</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Modifications</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Détails</TableCell>
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historiqueParametres.map((version) => (
                  <TableRow key={version.id} sx={{ '&:hover': { bgcolor: '#2c3e50' } }}>
                    <TableCell sx={{ color: textColor }}>{formatDate(version.date)}</TableCell>
                    <TableCell sx={{ color: textColor }}>{version.commentaire}</TableCell>
                    <TableCell sx={{ color: textColor }}>
                      {version.differences && version.differences.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {version.differences.slice(0, 3).map((diff, index) => (
                            <Typography key={index} variant="body2" sx={{ color: textColor, fontSize: '0.8rem' }}>
                              {diff}
                            </Typography>
                          ))}
                          {version.differences.length > 3 && (
                            <Typography variant="body2" sx={{ color: cardTitleColor, fontSize: '0.8rem' }}>
                              +{version.differences.length - 3} autres...
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" sx={{ color: textColor, fontStyle: 'italic' }}>
                          Aucune modification
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleVoirDetails(version)}
                        sx={{
                          borderColor: mainColor,
                          color: mainColor,
                          mr: 1,
                          '&:hover': { 
                            borderColor: '#1565c0',
                            bgcolor: 'rgba(25, 118, 210, 0.1)'
                          }
                        }}
                      >
                        VOIR
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRestaurer(version.id)}
                        sx={{
                          borderColor: accentColor,
                          color: accentColor,
                          '&:hover': { 
                            borderColor: '#2e7d32',
                            bgcolor: 'rgba(67, 160, 71, 0.1)'
                          }
                        }}
                      >
                        Restaurer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog pour afficher les détails des paramètres */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: cardColor, color: cardTitleColor }}>
          Détails des paramètres - {selectedVersion && formatDate(selectedVersion.date)}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: cardColor }}>
          {selectedVersion && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 2 }}>
                {selectedVersion.commentaire}
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                    Paramètres de dureté
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Dureté d'entrée :</strong> {selectedVersion.parametres.dureteEntree} °f
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Dureté de sortie :</strong> {selectedVersion.parametres.dureteSortie} °f
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                    Configuration résine
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Volume de résine :</strong> {selectedVersion.parametres.volumeResine} L
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Capacité bac à sel :</strong> {selectedVersion.parametres.capaciteSel} kg
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                    Régénération
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Consommation sel/régén. :</strong> {selectedVersion.parametres.consoSel} kg
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Fréquence :</strong> {selectedVersion.parametres.freqRegen}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Heure :</strong> {selectedVersion.parametres.heureRegen}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                    Volume d'eau
                  </Typography>
                  <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
                    <strong>Volume avant régénération :</strong> {selectedVersion.parametres.volumeAvantRegen} L
                  </Typography>
                </Box>
              </Box>

              {selectedVersion.differences && selectedVersion.differences.length > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: '#2c3e50', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#ffa000', mb: 1, fontWeight: 600 }}>
                    Modifications apportées :
                  </Typography>
                  {selectedVersion.differences.map((diff, index) => (
                    <Typography key={index} variant="body2" sx={{ color: textColor, mb: 0.5 }}>
                      • {diff}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: cardColor }}>
          <Button onClick={() => setOpenDetailsDialog(false)} sx={{ color: textColor }}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function AlertesPage() {
  const { 
    alertes, 
    seuilsAlertes, 
    setSeuilsAlertes,
    marquerAlerteLue, 
    supprimerAlerte, 
    marquerToutesLues, 
    supprimerAlertesLues,
    getStatistiquesAlertes,
    niveauSel,
    parametres
  } = useAppContext();

  const [filtreType, setFiltreType] = React.useState('Tous');
  const [filtreNiveau, setFiltreNiveau] = React.useState('Tous');
  const [filtreLue, setFiltreLue] = React.useState('Toutes');
  const [openConfig, setOpenConfig] = React.useState(false);

  const stats = getStatistiquesAlertes();

  const filtrerAlertes = () => {
    return alertes.filter(alerte => {
      const matchType = filtreType === 'Tous' || alerte.type === filtreType;
      const matchNiveau = filtreNiveau === 'Tous' || alerte.niveau === filtreNiveau;
      const matchLue = filtreLue === 'Toutes' || 
        (filtreLue === 'Non lues' && !alerte.lue) || 
        (filtreLue === 'Lues' && alerte.lue);
      return matchType && matchNiveau && matchLue;
    });
  };

  const alertesFiltrees = filtrerAlertes();

  const getTypeIcon = (type) => {
    const typeInfo = TYPES_ALERTES.find(t => t.value === type);
    return typeInfo ? typeInfo.icon : '📋';
  };

  const getTypeColor = (type) => {
    const typeInfo = TYPES_ALERTES.find(t => t.value === type);
    return typeInfo ? typeInfo.couleur : '#666';
  };

  const getNiveauIcon = (niveau) => {
    const niveauInfo = NIVEAUX_GRAVITE.find(n => n.value === niveau);
    return niveauInfo ? niveauInfo.icone : 'ℹ️';
  };

  const getNiveauColor = (niveau) => {
    const niveauInfo = NIVEAUX_GRAVITE.find(n => n.value === niveau);
    return niveauInfo ? niveauInfo.couleur : '#666';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* En-tête avec statistiques */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>
                Centre d'Alertes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenConfig(true)}
                sx={{
                  color: accentColor,
                  borderColor: accentColor,
                  '&:hover': { borderColor: '#2e7d32', bgcolor: 'rgba(76, 175, 80, 0.1)' }
                }}
              >
                ⚙️ Configuration
              </Button>
              <Button
                variant="contained"
                onClick={marquerToutesLues}
                sx={{
                  bgcolor: mainColor,
                  color: '#fff',
                  '&:hover': { bgcolor: '#1565c0' }
                }}
              >
                ✓ Tout marquer comme lu
              </Button>
            </Box>
          </Box>

          {/* Statistiques rapides */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Total</Typography>
              <Typography variant="h4" sx={{ color: textColor }}>{stats.total}</Typography>
            </Card>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Non lues</Typography>
              <Typography variant="h4" sx={{ color: '#ff9800' }}>{stats.nonLues}</Typography>
            </Card>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Critiques</Typography>
              <Typography variant="h4" sx={{ color: '#f44336' }}>{stats.critiques}</Typography>
            </Card>
            <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
              <Typography variant="h6" sx={{ color: cardTitleColor, mb: 1 }}>Niveau sel</Typography>
              <Typography variant="h4" sx={{ 
                color: niveauSel <= 10 ? '#f44336' : niveauSel <= 20 ? '#ff9800' : '#4caf50' 
              }}>
                {niveauSel}%
              </Typography>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 2 }}>Filtres</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>Type d'alerte</InputLabel>
              <Select
                value={filtreType}
                onChange={(e) => setFiltreType(e.target.value)}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                }}
              >
                <MenuItem value="Tous">Tous les types</MenuItem>
                {TYPES_ALERTES.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>Niveau de gravité</InputLabel>
              <Select
                value={filtreNiveau}
                onChange={(e) => setFiltreNiveau(e.target.value)}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                }}
              >
                <MenuItem value="Tous">Tous les niveaux</MenuItem>
                {NIVEAUX_GRAVITE.map(niveau => (
                  <MenuItem key={niveau.value} value={niveau.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{niveau.icone}</span>
                      <span>{niveau.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: cardTitleColor }}>État</InputLabel>
              <Select
                value={filtreLue}
                onChange={(e) => setFiltreLue(e.target.value)}
                sx={{ 
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
                }}
              >
                <MenuItem value="Toutes">Toutes les alertes</MenuItem>
                <MenuItem value="Non lues">Non lues</MenuItem>
                <MenuItem value="Lues">Lues</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Liste des alertes */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: cardTitleColor }}>
              Alertes ({alertesFiltrees.length})
            </Typography>
            {alertes.filter(a => a.lue).length > 0 && (
              <Button
                variant="outlined"
                onClick={supprimerAlertesLues}
                sx={{
                  color: '#e74c3c',
                  borderColor: '#e74c3c',
                  '&:hover': { borderColor: '#c0392b', bgcolor: 'rgba(231, 76, 60, 0.1)' }
                }}
              >
                🗑️ Supprimer les lues
              </Button>
            )}
          </Box>

          {alertesFiltrees.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: textColor, fontSize: '1.2rem' }}>
                🎉 Aucune alerte à afficher !
              </Typography>
              <Typography sx={{ color: '#888', mt: 1 }}>
                Toutes les alertes sont gérées ou les filtres sont trop restrictifs.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {alertesFiltrees.map((alerte) => (
                <Card 
                  key={alerte.id} 
                  sx={{ 
                    bgcolor: alerte.lue ? '#2c3e50' : '#34495e',
                    borderLeft: 4,
                    borderColor: getNiveauColor(alerte.niveau),
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'translateX(5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(alerte.type)}</span>
                            <Typography variant="h6" sx={{ color: cardTitleColor }}>
                              {alerte.titre}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '1.2rem' }}>{getNiveauIcon(alerte.niveau)}</span>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: getNiveauColor(alerte.niveau),
                                fontWeight: 600,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: getNiveauColor(alerte.niveau) + '20'
                              }}
                            >
                              {NIVEAUX_GRAVITE.find(n => n.value === alerte.niveau)?.label}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography sx={{ color: textColor, mb: 2 }}>
                          {alerte.message}
                        </Typography>

                        {alerte.actionRequise && (
                          <Box sx={{ 
                            bgcolor: '#2c3e50', 
                            p: 2, 
                            borderRadius: 1, 
                            border: 1, 
                            borderColor: accentColor,
                            mb: 2
                          }}>
                            <Typography variant="body2" sx={{ color: accentColor, fontWeight: 600, mb: 1 }}>
                              Action requise :
                            </Typography>
                            <Typography sx={{ color: textColor }}>
                              {alerte.action}
                            </Typography>
                          </Box>
                        )}

                        <Typography variant="body2" sx={{ color: '#888' }}>
                          {formatDate(alerte.date)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                        {!alerte.lue && (
                          <IconButton
                            onClick={() => marquerAlerteLue(alerte.id)}
                            sx={{ 
                              color: accentColor, 
                              '&:hover': { bgcolor: '#2e7d32' },
                              bgcolor: 'rgba(76, 175, 80, 0.1)'
                            }}
                          >
                            ✓
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => supprimerAlerte(alerte.id)}
                          sx={{ 
                            color: '#e74c3c', 
                            '&:hover': { bgcolor: '#c0392b' },
                            bgcolor: 'rgba(231, 76, 60, 0.1)'
                          }}
                        >
                          🗑️
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialogue de configuration des seuils */}
      <Dialog open={openConfig} onClose={() => setOpenConfig(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: cardColor, color: cardTitleColor }}>
          ⚙️ Configuration des seuils d'alertes
        </DialogTitle>
        <DialogContent sx={{ bgcolor: cardColor }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <Typography variant="h6" sx={{ color: cardTitleColor }}>
              Seuils de niveau de sel (%)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Seuil critique"
                type="number"
                value={seuilsAlertes.niveauSelCritique}
                onChange={(e) => setSeuilsAlertes(prev => ({ 
                  ...prev, 
                  niveauSelCritique: parseInt(e.target.value) 
                }))}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor } }}
                fullWidth
              />
              <TextField
                label="Seuil d'attention"
                type="number"
                value={seuilsAlertes.niveauSelAttention}
                onChange={(e) => setSeuilsAlertes(prev => ({ 
                  ...prev, 
                  niveauSelAttention: parseInt(e.target.value) 
                }))}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor } }}
                fullWidth
              />
            </Box>

            <Typography variant="h6" sx={{ color: cardTitleColor }}>
              Seuils de performance
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Efficacité minimale (%)"
                type="number"
                value={seuilsAlertes.efficaciteMinimale}
                onChange={(e) => setSeuilsAlertes(prev => ({ 
                  ...prev, 
                  efficaciteMinimale: parseInt(e.target.value) 
                }))}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor } }}
                fullWidth
              />
              <TextField
                label="Coût max intervention (€)"
                type="number"
                value={seuilsAlertes.coutMaxIntervention}
                onChange={(e) => setSeuilsAlertes(prev => ({ 
                  ...prev, 
                  coutMaxIntervention: parseInt(e.target.value) 
                }))}
                InputLabelProps={{ style: { color: cardTitleColor } }}
                InputProps={{ style: { color: textColor } }}
                sx={{ input: { color: textColor } }}
                fullWidth
              />
            </Box>

            <Typography variant="h6" sx={{ color: cardTitleColor }}>
              État actuel du système
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
                <Typography variant="body2" sx={{ color: cardTitleColor }}>Niveau de sel</Typography>
                <Typography variant="h6" sx={{ 
                  color: niveauSel <= seuilsAlertes.niveauSelCritique ? '#f44336' : 
                         niveauSel <= seuilsAlertes.niveauSelAttention ? '#ff9800' : '#4caf50' 
                }}>
                  {niveauSel}%
                </Typography>
              </Card>
              <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
                <Typography variant="body2" sx={{ color: cardTitleColor }}>Efficacité régénération</Typography>
                <Typography variant="h6" sx={{ 
                  color: parametres.efficaciteRegeneration < seuilsAlertes.efficaciteMinimale ? '#ff9800' : '#4caf50' 
                }}>
                  {parametres.efficaciteRegeneration}%
                </Typography>
              </Card>
              <Card sx={{ bgcolor: '#2c3e50', p: 2 }}>
                <Typography variant="body2" sx={{ color: cardTitleColor }}>Alertes actives</Typography>
                <Typography variant="h6" sx={{ color: stats.nonLues > 0 ? '#ff9800' : '#4caf50' }}>
                  {stats.nonLues}
                </Typography>
              </Card>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: cardColor }}>
          <Button onClick={() => setOpenConfig(false)} sx={{ color: textColor }}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function PageContent({ page }) {
  switch (page) {
    case 'dashboard':
      return (
        <>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: cardTitleColor }}>Tableau de bord</Typography>
          <DashboardCards />
        </>
      );
    case 'interventions':
      return <InterventionsPage />;
    case 'parametres':
      return <ParametresForm />;
    case 'historique':
      return <HistoriquePage />;
    case 'alertes':
      return <AlertesPage />;
    case 'documentation':
      return <DocumentationPage />;
    case 'historique-parametres':
      return <HistoriqueParametresPage />;
    default:
      return null;
  }
}

function AppContent() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState('dashboard');

  // Écouter les événements de navigation
  React.useEffect(() => {
    const handleNavigate = (event) => {
      setSelectedPage(event.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ height: '100%', background: mainColor, color: '#fff' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          Adoucisseur 1.0
        </Typography>
      </Toolbar>
      <List>
        {pages.map((page) => (
          <ListItem button key={page.key} selected={selectedPage === page.key} onClick={() => { setSelectedPage(page.key); setMobileOpen(false); }}
            sx={{
              color: selectedPage === page.key ? accentColor : '#fff',
              bgcolor: selectedPage === page.key ? '#263859' : 'inherit',
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { bgcolor: '#1565c0', color: accentColor },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{page.icon}</ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: bgColor }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: mainColor, boxShadow: 3 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            Adoucisseur 1.0
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="menu principal">
        {/* Drawer mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: mainColor, color: '#fff' },
          }}
        >
          {drawer}
        </Drawer>
        {/* Drawer bureau */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: mainColor, color: '#fff' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, background: bgColor }}
      >
        <Toolbar />
        <PageContent page={selectedPage} />
      </Box>
    </Box>
  );
}

export default function App() {
  console.log('🚀 Application Adoucisseur 1.0 en cours de chargement...');
  
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
