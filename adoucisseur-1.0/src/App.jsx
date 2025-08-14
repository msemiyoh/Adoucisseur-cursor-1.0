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
  { label: 'Paramètres', icon: <SettingsIcon />, key: 'parametres' },
  { label: 'Historique', icon: <HistoryIcon />, key: 'historique' },
  { label: 'Alertes', icon: <NotificationsIcon />, key: 'alertes' },
  { label: 'Documentation', icon: <DescriptionIcon />, key: 'documentation' },
  { label: 'Historique des paramètres', icon: <SettingsIcon />, key: 'historique-parametres' },
];

// État global de l'application
const AppContext = React.createContext();

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
    { id: 1, date: '2024-06-12', type: 'Régénération', detail: 'Auto, 2.5kg sel', operation: 'Consommation', quantite: 2.5 },
    { id: 2, date: '2024-05-01', type: 'Maintenance', detail: 'Changement résine', operation: 'Consommation', quantite: 0 },
    { id: 3, date: '2024-04-15', type: 'Régénération', detail: 'Manuelle, 2.5kg sel', operation: 'Consommation', quantite: 2.5 },
    { id: 4, date: '2024-04-01', type: 'Remplissage', detail: 'Ajout de sel', operation: 'Ajout', quantite: 25 },
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

  // Calcul du niveau de sel
  const calculerNiveauSel = () => {
    const consommationTotale = historique
      .filter(item => item.operation === 'Consommation')
      .reduce((total, item) => total + item.quantite, 0);
    
    const ajoutTotal = historique
      .filter(item => item.operation === 'Ajout')
      .reduce((total, item) => total + item.quantite, 0);
    
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

function AddInterventionDialog({ open, onClose, onAdd }) {
  const [newEntry, setNewEntry] = React.useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Remplissage',
    detail: '',
    operation: 'Ajout',
    quantite: 25
  });

  const handleAdd = () => {
    const entry = {
      id: Date.now(),
      ...newEntry,
      quantite: parseFloat(newEntry.quantite)
    };
    onAdd(entry);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      type: 'Remplissage',
      detail: '',
      operation: 'Ajout',
      quantite: 25
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: cardColor, color: cardTitleColor }}>
        Ajouter une intervention
      </DialogTitle>
      <DialogContent sx={{ bgcolor: cardColor }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Date"
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
            InputLabelProps={{ style: { color: cardTitleColor } }}
            InputProps={{ style: { color: textColor } }}
            sx={{ input: { color: textColor } }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel sx={{ color: cardTitleColor }}>Type</InputLabel>
            <Select
              value={newEntry.type}
              onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value }))}
              sx={{ 
                color: textColor,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
              }}
            >
              <MenuItem value="Remplissage">Remplissage</MenuItem>
              <MenuItem value="Régénération">Régénération</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Entretien">Entretien</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel sx={{ color: cardTitleColor }}>Opération</InputLabel>
            <Select
              value={newEntry.operation}
              onChange={(e) => setNewEntry(prev => ({ ...prev, operation: e.target.value }))}
              sx={{ 
                color: textColor,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: accentColor },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentColor }
              }}
            >
              <MenuItem value="Ajout">Ajout de sel</MenuItem>
              <MenuItem value="Consommation">Consommation de sel</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={newEntry.operation === 'Consommation' ? 'Sel consommé (kg)' : 'Sel ajouté (kg)'}
            type="number"
            value={newEntry.quantite}
            onChange={(e) => setNewEntry(prev => ({ ...prev, quantite: e.target.value }))}
            InputLabelProps={{ style: { color: cardTitleColor } }}
            InputProps={{ style: { color: textColor } }}
            sx={{ input: { color: textColor } }}
            fullWidth
          />
          <TextField
            label="Détail"
            value={newEntry.detail}
            onChange={(e) => setNewEntry(prev => ({ ...prev, detail: e.target.value }))}
            InputLabelProps={{ style: { color: cardTitleColor } }}
            InputProps={{ style: { color: textColor } }}
            sx={{ input: { color: textColor } }}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: cardColor }}>
        <Button onClick={onClose} sx={{ color: textColor }}>
          Annuler
        </Button>
        <Button onClick={handleAdd} sx={{ color: accentColor }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DashboardCards() {
  const { niveauSel, historique, setHistorique } = useAppContext();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleAddIntervention = (entry) => {
    setHistorique(prev => [entry, ...prev]);
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Card sx={{ minWidth: 220, flex: 1, bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <EventIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Prochaine régénération</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>12/06/2024 à 02:00</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 220, flex: 1, bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: niveauSel > 20 ? accentColor : '#ffa000', mr: 2 }}>
                <OpacityIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Niveau de sel</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>
              {niveauSel}% {niveauSel > 20 ? '🟢' : niveauSel > 10 ? '🟡' : '🔴'}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 220, flex: 1, bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
                <WaterDropIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Volume traité</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>3200 L</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 220, flex: 1, bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: '#ffa000', mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h6" sx={{ color: cardTitleColor }}>Alertes</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: textColor }}>
              {niveauSel <= 20 ? 'Niveau de sel bas' : 'Aucune alerte'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
      {/* Bouton d'ajout d'intervention */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            bgcolor: accentColor,
            color: '#fff',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            '&:hover': { bgcolor: '#2e7d32' }
          }}
        >
          + Ajouter une intervention
        </Button>
      </Box>

      <AddInterventionDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onAdd={handleAddIntervention} 
      />
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
                  <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Opération</TableCell>
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
                    <TableCell sx={{ color: textColor }}>
                      <span style={{ 
                        color: entry.operation === 'Ajout' ? accentColor : '#e74c3c',
                        fontWeight: 600 
                      }}>
                        {entry.operation}
                      </span>
                    </TableCell>
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

      <AddInterventionDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onAdd={handleAddEntry} 
      />
    </Box>
  );
}

function DocumentationPage() {
  const handleOpenPDF = () => {
    // Ouvrir le PDF dans un nouvel onglet
    window.open('/Doc/adoucisseur-top-cab-20-litres-fleck-5600-sxt-254.pdf', '_blank');
  };

  const handleDownloadPDF = () => {
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.href = '/Doc/adoucisseur-top-cab-20-litres-fleck-5600-sxt-254.pdf';
    link.download = 'Notice_Fleck_5600_SXT.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* En-tête */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: mainColor, mr: 2 }}>
              <DescriptionIcon />
            </Avatar>
            <Typography variant="h4" sx={{ color: cardTitleColor, fontWeight: 700 }}>
              Documentation Fleck 5600 SXT
            </Typography>
          </Box>
          
          <Typography variant="h5" sx={{ color: textColor, mb: 2, fontWeight: 600 }}>
            Guide complet d'utilisation et de programmation
          </Typography>
          
          <Typography variant="body1" sx={{ color: textColor, mb: 3 }}>
            Documentation technique complète pour l'utilisation, la programmation et le dépannage de votre adoucisseur Fleck 5600 SXT.
          </Typography>

          {/* Boutons d'action */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={handleOpenPDF}
              sx={{
                bgcolor: mainColor,
                color: '#fff',
                px: 3,
                py: 1.5,
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              📖 Notice complète PDF
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadPDF}
              sx={{
                borderColor: accentColor,
                color: accentColor,
                px: 3,
                py: 1.5,
                '&:hover': { 
                  borderColor: '#2e7d32',
                  bgcolor: 'rgba(67, 160, 71, 0.1)'
                }
              }}
            >
              💾 Télécharger PDF
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Table des matières */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 2, fontWeight: 600 }}>
            📋 Table des matières
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" sx={{ color: textColor }}>
              • <strong>1. Fonctionnement général</strong> - Boutons, modes, affichage
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              • <strong>2. Programmation</strong> - Paramètres, codes, configuration
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              • <strong>3. Mode diagnostic</strong> - Codes d'erreur, dépannage
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Section 1: Fonctionnement général */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: cardTitleColor, mb: 3, fontWeight: 700 }}>
            1. Fonctionnement général
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              1.1 Boutons et icônes
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  Bouton de régénération :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Déclenche une régénération manuelle
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  Boutons de réglage :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Pour ajuster l'heure, les valeurs et les paramètres
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              1.2 Modes de régénération
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  Régénération chronométrique (tc) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Selon un intervalle de jours préréglé
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  Régénération hebdomadaire (dAY) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Jours pré-définis dans la semaine
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  Régénération volumétrique retardée (Fd) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Selon volume d'eau utilisé, démarrage à l'heure programmée
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  Régénération volumétrique immédiate (FI) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Dès que la capacité est épuisée
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              1.3 Cycles de régénération
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  BW (Backwash) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Détassage
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  BD (Brine draw) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Aspiration & rinçage lent
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  RR (Rapid rinse) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Rinçage rapide
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  BF (Brine fill) :
                </Typography>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Renvoi d'eau
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              1.4 Régénération manuelle
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              • <strong>Départ programmé :</strong> Appuyer puis relâcher le bouton de régénération
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              • <strong>Départ immédiat :</strong> Appuyer et maintenir 5 secondes
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Section 2: Programmation */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: cardTitleColor, mb: 3, fontWeight: 700 }}>
            2. Programmation
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              2.1 Accès au mode programmation
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              1. Régler l'heure à 12:01 puis sortir
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              2. Appuyer 5 secondes sur + et - simultanément
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              3. Bouton de régénération pour naviguer, +/- pour modifier
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              4. Passer sur toutes les étapes et revenir en service pour valider
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              2.2 Paramètres principaux
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2c3e50', boxShadow: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Paramètre</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Code</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>Type de régénération</TableCell>
                    <TableCell sx={{ color: textColor }}>CT</TableCell>
                    <TableCell sx={{ color: textColor }}>tc, dAY, Fd, FI</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>Capacité système</TableCell>
                    <TableCell sx={{ color: textColor }}>C</TableCell>
                    <TableCell sx={{ color: textColor }}>m³ x °tH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>Dureté eau entrée</TableCell>
                    <TableCell sx={{ color: textColor }}>H</TableCell>
                    <TableCell sx={{ color: textColor }}>en °tH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>Heure Régénération</TableCell>
                    <TableCell sx={{ color: textColor }}>RT</TableCell>
                    <TableCell sx={{ color: textColor }}>Format 24h</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Section 3: Diagnostic et dépannage */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: cardTitleColor, mb: 3, fontWeight: 700 }}>
            3. Diagnostic et dépannage
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              3.1 Mode diagnostic
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
              Appuyer 5 secondes sur + et - depuis le service, puis utiliser +/- pour naviguer :
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  FR : Débit instantané
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  PF : Débit de pointe
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  HR : Heures depuis régénération
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  VU : Volume utilisé depuis régénération
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  RC : Capacité de réserve
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 600 }}>
                  SV : Version carte
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              3.2 Codes d'erreur (ER)
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#2c3e50', boxShadow: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Code</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ color: cardTitleColor, fontWeight: 700 }}>Solution</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>ER0</TableCell>
                    <TableCell sx={{ color: textColor }}>Capteur came</TableCell>
                    <TableCell sx={{ color: textColor }}>Vérifier moteurs, connexions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>ER1</TableCell>
                    <TableCell sx={{ color: textColor }}>Position cycle</TableCell>
                    <TableCell sx={{ color: textColor }}>Vérifier configuration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>ER2</TableCell>
                    <TableCell sx={{ color: textColor }}>Régénération</TableCell>
                    <TableCell sx={{ color: textColor }}>Lancer régénération manuelle</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: textColor }}>ER3</TableCell>
                    <TableCell sx={{ color: textColor }}>Mémoire</TableCell>
                    <TableCell sx={{ color: textColor }}>Réinitialiser/programmer</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
              3.3 Réinitialisation
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              • <strong>Partielle :</strong> En mode service, maintenir + et -
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>
              • <strong>Totale :</strong> Débrancher, maintenir bouton régénération au re-branchement
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Conseils d'utilisation */}
      <Card sx={{ bgcolor: cardColor, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: cardTitleColor, mb: 3, fontWeight: 600 }}>
            💡 Conseils d'utilisation
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                Entretien régulier
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
                • Vérifiez le niveau de sel régulièrement
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
                • Ajoutez du sel quand le niveau descend sous 20%
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
                • Utilisez du sel spécial adoucisseur
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                Maintenance
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
                • Changez la résine tous les 8-10 ans
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
                • Nettoyez le bac à sel annuellement
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, mb: 2 }}>
                • Vérifiez les paramètres de dureté
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

function PageContent({ page }) {
  switch (page) {
    case 'dashboard':
      return (
        <>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: cardTitleColor }}>Tableau de bord</Typography>
          <DashboardCards />
        </>
      );
    case 'parametres':
      return <ParametresForm />;
    case 'historique':
      return <HistoriquePage />;
    case 'alertes':
      return <GenericCardPage title="Alertes" icon={<NotificationsIcon />} />;
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
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
