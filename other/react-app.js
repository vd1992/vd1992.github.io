//React render heading component, class declaraction unneeded
const introHolder = document.querySelector('#intro-component');
const introMessage = <h2>The content of this page was rendered with React, this is a me learning React page</h2> 
ReactDOM.render(introMessage, introHolder);

//React render form component, also minor
const formHolder = document.querySelector('#form-component');
const form = <form id="pokeForm">
                <label for="pokemon">Enter a Pokemon number from 1-800:</label>
                <input id="numberPoke" type="number" name="pokemon" min="1" max="800"></input>
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
            let typePrimary = pokeJSON.types[0];
            let types="";
            for (let i of pokeJSON.types){
                types = types + " " + i.type.name;
            }
            ReactDOM.render(<ReactMain name={pokeJSON.name} image={pokeJSON.sprites.front_default} types={types}/>, mainHolder);

            //adjust colour of border assigned to created div, conditional so as to adjust colour to fit to the type in question
            switch(typePrimary.type.name){
                case "water":
                    document.getElementById("react-rendered").style.borderBottomColor = "blue";
                    break;
                case "ice": 
                    document.getElementById("react-rendered").style.borderBottomColor = "#00BFFF";
                    break;
                case "fire":
                    document.getElementById("react-rendered").style.borderBottomColor = "red";
                    break;
                case "grass": case "poison":
                    document.getElementById("react-rendered").style.borderBottomColor = "green";
                    break;
                case "bug":
                    document.getElementById("react-rendered").style.borderBottomColor = "#ADFF2F";
                    break;
                case "electric":
                    document.getElementById("react-rendered").style.borderBottomColor = "yellow";
                    break;
                case "ghost": case "psychic":
                    document.getElementById("react-rendered").style.borderBottomColor = "#4B0082";
                    break;
                case "dragon": 
                    document.getElementById("react-rendered").style.borderBottomColor = "#BA55D3";
                    break;
                case "dark":
                    document.getElementById("react-rendered").style.borderBottomColor = "black";
                    break;
                case "fairy":
                    document.getElementById("react-rendered").style.borderBottomColor = "pink";
                    break;
                case "steel":
                    document.getElementById("react-rendered").style.borderBottomColor = "silver";
                    break;
                default:
                    document.getElementById("react-rendered").style.borderBottomColor = "#724242";
                    break;        
            }
        }
    )
}

//Add event listener to button, runs react function
let pokemonEvent = document.getElementById("pokemonButton");
pokemonEvent.addEventListener("click", reactFunction);
