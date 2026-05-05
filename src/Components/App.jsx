import "../Styles/App.css";
const names = [101, 102, 103, 104, 105, 106, 107, 108, 109];
async function getPokemon(names) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${names}`);
  const PokeName = await response.json();
  console.log(PokeName);
}
function Grid() {
  return <div className="grid">{getPokemon()}</div>;
}
function App() {
  return (
    <div>
      <div className="grid-container">
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid></Grid>
      </div>
    </div>
  );
}
export { App };
