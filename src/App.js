import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import StatReseau from "./StatReseau";
import LigneBus from "./LigneBus";
import Footer from "./Footer";
import Statistique, { StatistiqueArrets, StatistiqueBus } from "./Statistique";
import Recherche from "./Recherche";
import DetailLigne from "./DetailLigne";

function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);

  function chargerLignes() {
    setChargement(true);
    setErreur(null);
    fetch("http://localhost:5000/lignes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLignes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  useEffect(() => {
    chargerLignes();
  }, []);

  const lignesFiltrees = lignes.filter(
    (l) =>
      l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
      l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
      l.numero.includes(recherche),
  );

  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
      return;
    }

    fetch(`http://localhost:5000/lignes/${ligne.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLigneSelectionnee(data);
      })
      .catch((error) => {
        console.error("Erreur chargement détail :", error.message);
      });
  }

  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes...</p>
        </main>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Vérifiez que Flask est lancé (python api/app.py).</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <button className="btn-recharger" onClick={chargerLignes}>
        ↺ Recharger
      </button>
      <main className="contenu">
        <div>
          <Statistique />
          <StatistiqueArrets />
          <StatistiqueBus />
        </div>
        <StatReseau lignes={lignes} />
        <p className="compteur-recherches">
          Vous avez effectue {nbRecherches} recherche
          {nbRecherches > 1 ? "s" : ""}
        </p>
        <Recherche
          valeur={recherche}
          onChange={(valeur) => {
            setRecherche(valeur);
            setNbRecherches((nb) => nb + 1);
          }}
        />
        {lignesFiltrees.length === 0 ? (
          <p className="aucune-ligne">Aucune ligne trouvee</p>
        ) : (
          <p className="resultat-recherche">
            {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? "s" : ""}{" "}
            trouvee{lignesFiltrees.length > 1 ? "s" : ""}
          </p>
        )}
        {lignesFiltrees.map((ligne) => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={
              ligneSelectionnee && ligneSelectionnee.id === ligne.id
            }
            onClick={() => handleClickLigne(ligne)}
          />
        ))}
        {ligneSelectionnee && ligneSelectionnee.listeArrets && (
          <DetailLigne ligne={ligneSelectionnee} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
