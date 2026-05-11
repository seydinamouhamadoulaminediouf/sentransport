import LigneBus from "./LigneBus";

function ListeLignes({ lignes, ligneSelectionnee, onClickLigne }) {
  return (
    <div className="liste-lignes">
      {lignes.map((ligne) => (
        <LigneBus
          key={ligne.id}
          numero={ligne.numero}
          depart={ligne.depart}
          arrivee={ligne.arrivee}
          arrets={ligne.arrets}
          couleur={ligne.couleur}
          estSelectionnee={
            ligneSelectionnee && ligneSelectionnee.id === ligne.id
          }
          onClick={() => onClickLigne(ligne)}
        />
      ))}
    </div>
  );
}

export default ListeLignes;
