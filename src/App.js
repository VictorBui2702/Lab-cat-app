import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "",
      special_ability: "",
      filteredCatList: [],

      CATS: [
        {
          id: 0,
          name: "Missy",
          color: "Tabby",
          special_ability: "Catching Mice",

          adopt: false
        },
        {
          id: 1,
          name: "Snowball",
          color: "white",
          special_ability: "Jumping",

          adopt: false
        },
        {
          id: 2,
          name: "Snugget",
          color: "black",
          special_ability: "time travel",

          adopt: false
        }
      ]
    };
    this.filterList = this.filterList.bind(this);
  }

  componentWillMount = () => {
    this.setState({ filteredCatList: this.state.CATS });
  };

  handleClick = id => {
    this.setState({
      CATS: this.state.CATS.map(cat => {
        if (cat.id === id) {
          cat.adopt = !cat.adopt;
        }
        console.log(cat.id);
        return cat;
      })
    });
  };

  handleInput = e => {
    console.log(e.target.name, e.target.value);
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = () => {
    console.log("Submitttt");

    let newCat = {
      id: this.state.CATS.length,

      name: this.state.name,
      color: this.state.color,
      special_ability: this.state.special_ability,
      adopt: false
    };
    console.log(newCat);
    this.setState({
      CATS: [...this.state.CATS, newCat],
      name: "",
      color: "",
      special_ability: ""
    });
  };

  filterList = event => {
    debugger;
    var updatedList = this.state.CATS;
    updatedList = updatedList.filter(function(item) {
      if (
        item.id.toString().indexOf(event.target.value.toLowerCase()) > -1 ||
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >
          -1 ||
        item.color.toLowerCase().indexOf(event.target.value.toLowerCase()) >
          -1 ||
        item.special_ability
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) > -1
      ) {
        return true;
      }
    });
    this.setState({ filteredCatList: updatedList });
  };

  render() {
    let renderCat = this.state.filteredCatList.map(cat => (
      <Cat
        id={cat.id}
        name={cat.name}
        color={cat.color}
        special_ability={cat.special_ability}
        adopt={cat.adopt}
        handleClick={this.handleClick}
      />
    ));

    return (
      <div>
        <p>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
          />
        </p>

        <p>
          Color:
          <input
            type="text"
            id="color"
            name="color"
            value={this.state.color}
            onChange={this.handleInput}
          />
        </p>

        <p>
          Ability:
          <input
            type="text"
            id="ability"
            name="special_ability"
            onChange={this.handleInput}
          />
        </p>
        <button onClick={this.handleSubmit}>Submit</button>
        <div>
          <input
            type="text"
            // value={this.state.search}
            name="filter"
            onChange={this.filterList}
          />
        </div>
        <h1>here are the cats</h1>
        {renderCat}
      </div>
    );
  }
}

class Cat extends React.Component {
  render() {
    let buttonText = {};
    let ad = () => {
      if (this.props.adopt) {
        buttonText = { text: "Abandon", class: "text-danger" };
        return "adopted";
      } else {
        buttonText = { text: "Adopt", class: "text-warning" };
        return "adopt";
      }
    };
    return (
      <div className="ui link cards">
        <div className="card">
          <p> {this.props.id}</p>
          <p>Cat {this.props.name}</p>
          <p> Color: {this.props.color}</p>
          <p> Ability: {this.props.special_ability}</p>
          <p> Adopt: {ad()}</p>
          <button
            onClick={id => {
              this.props.handleClick(this.props.id);
            }}
            className={buttonText.class}
          >
            {buttonText.text}
          </button>
        </div>
      </div>
    );
  }
} 


export default App;
