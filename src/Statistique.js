import "./Statistique.css";

function Statistique() {
  return (
    <div className="statistique">
      <p className="statistique-chiffre">10</p>
      <p className="statistique-libelle">lignes</p>
    </div>
  );
}

function StatistiqueArrets() {
  return (
    <div className="statistique">
      <p className="statistique-chiffre">150</p>
      <p className="statistique-libelle">arrêts</p>
    </div>
  );
}

function StatistiqueBus() {
  return (
    <div className="statistique">
      <p className="statistique-chiffre">45</p>
      <p className="statistique-libelle">bus</p>
    </div>
  );
}

export { StatistiqueArrets, StatistiqueBus };
export default Statistique;
