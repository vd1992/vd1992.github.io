//React render heading component, class declaraction unneeded
const introHolder = document.querySelector('#intro-component');
const introMessage = <h2>The content of this page was rendered with React, this is a me learning React page</h2> 
ReactDOM.render(introMessage, introHolder);

//React render form component, also minor
const formHolder = document.querySelector('#form-component');
const form = <form id="pokeForm">
                <label for="pokemon">Enter a Pokemon number:</label>
                <input type="number" name="pokemon" min="1" max="805"></input>
                <input id="pokemonButton" type="submit" value="Submit"></input>
            </form>
ReactDOM.render(form, formHolder);

//React render main component basics, declare its associated DOM root too
class ReactMain extends React.Component{
    render() {
        return(
            <div id="react-rendered">
                <img src={this.props.image}></img>
                <br/>
                <p>{this.props.name}</p>
                <p>{this.props.types}</p>
            </div>
        );
    }
}
const mainHolder = document.querySelector('#main-component');

//React render function, trigger on event, fetch with form value, then run render component with arguments pulled from response
let reactFunction = function(event){
    let pokeNumber=document.getElementById("pokeForm").pokemon.valueAsNumber;
    event.preventDefault();
    fetch("https://pokeapi.co/api/v2/pokemon/"+pokeNumber.toString()+"/").then(response => {
        return response.json();
      }).then(pokeJSON => {
            //types is an array of 1 or 2 elements, so must variably extract it
            let types="";
            for (let i of pokeJSON.types){
                types = types + " " + i.type.name;
            }
            ReactDOM.render(<ReactMain name={pokeJSON.name} image={pokeJSON.sprites.front_default} types={types}/>, mainHolder);
        }
    )
}

//Add event listener to button, runs react function
let pokemonEvent = document.getElementById("pokemonButton");
pokemonEvent.addEventListener("click", reactFunction);
