import '../Styles/App.css'
function Grid () {
    return (
        <div className="grid">STORM</div>
    )
}
function App ()  {
    return(
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
    )
}
export {App};