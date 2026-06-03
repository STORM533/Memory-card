import { useEffect, useState } from "react";
import "../Styles/App.css";

const pokemonIds = [25, 39, 52, 54, 58, 66, 77, 92, 104, 133, 143, 147];

function shuffleCards(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Could not load Pokemon cards.");
  }

  const pokemon = await response.json();

  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default,
    type: pokemon.types.map((typeSlot) => typeSlot.type.name).join(" / "),
  };
}

function Scoreboard({ score, bestScore }) {
  return (
    <section className="scoreboard" aria-label="Scoreboard">
      <div className="score-card">
        <span>Current Score</span>
        <strong>{score}</strong>
      </div>
      <div className="score-card">
        <span>Best Score</span>
        <strong>{bestScore}</strong>
      </div>
    </section>
  );
}

function PokemonCard({ pokemon, onClick }) {
  return (
    <button className="pokemon-card" type="button" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="card-copy">
        <strong>{pokemon.name}</strong>
        <span>{pokemon.type}</span>
      </div>
    </button>
  );
}

function CardGrid({ pokemon, onCardClick }) {
  return (
    <section className="card-grid" aria-label="Pokemon memory cards">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} onClick={onCardClick} />
      ))}
    </section>
  );
}

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadPokemon() {
      try {
        const cards = await Promise.all(pokemonIds.map((id) => getPokemon(id)));
        setPokemon(shuffleCards(cards));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadPokemon();
  }, []);

  function handleCardClick(id) {
    const alreadyClicked = clickedCards.includes(id);

    if (alreadyClicked) {
      setClickedCards([]);
      setScore(0);
      setPokemon((currentPokemon) => shuffleCards(currentPokemon));
      return;
    }

    const nextScore = score + 1;
    setClickedCards((currentCards) => [...currentCards, id]);
    setScore(nextScore);
    setBestScore((currentBestScore) => Math.max(currentBestScore, nextScore));
    setPokemon((currentPokemon) => shuffleCards(currentPokemon));
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Pokemon Memory Challenge</p>
          <h1>Pick every card once</h1>
        </div>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>

      {status === "loading" && <p className="status-message">Loading cards...</p>}
      {status === "error" && (
        <p className="status-message">The cards could not be loaded. Try refreshing.</p>
      )}
      {status === "ready" && (
        <CardGrid pokemon={pokemon} onCardClick={handleCardClick} />
      )}
    </main>
  );
}

export { App };
