import React from 'react';
import { cardsData } from './cardsData';
import './card.css';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: 0,
      addImage: false,
      url:"",
      cardsData: cardsData,
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

renderCard(){
return this.state.cardsData.map(data => (
    <div key={data.id} className="card-wrapper">
      <div className = {`card-content ${this.state.activeId === data.id ? "card-active" : "card-inactive"}`}
          onClick={() => this.handleCardClick(data.id)}
      >
      {this.state.activeId === data.id ? data.id : ''}
      {this.state.addImage && this.state.activeId !== data.id ? < img alt="cat"  className = "imgSize" src={`http://placekitten.com/${Math.ceil(Math.random() * 800)}/${Math.ceil(Math.random() * 1000)}`} /> : ''}
      </div>
      <div>
        <button className="cards-btn" onClick={() => this.handleDelete(data.id)} >Delete Card</button>
      </div>
    </div>
  ));
}

  //Active and deactive card
  handleCardClick = id => {
    console.log(id);
    id === this.state.activeId && id !== 0 ? this.setState({activeId: 0 }) : this.setState({ activeId: id })
  }

  handleBtnClick = id => {
    this.setState({
      activeId: 0,
      addImage: !this.state.addImage,
    });
    console.log(this.state.image);
  }

  //Delete a card
  handleDelete = id => {
    const cards = this.state.cardsData;
    cards.forEach((card, index) => {
      if (card.id === id) {
        cards.splice(index, 1);
      }
    })
    this.setState({ cardsData: cards });
  }

  //Add a card
  handleAddCard = () => {
    const cards = this.state.cardsData;
    const newId = cards.length > 0 ? cards[cards.length - 1].id + 1 : 1;
    const newName = `Card ${newId}`;
    cards.push({
      id: newId,
      name: newName
    });
    this.setState({ cardsData: cards });
  }

  render() {

    return(
        <div className = "cards-dashboard">
            {this.renderCard()}
            <button className="cards-btn" onClick={this.handleBtnClick}>Add Image</button>
            <button className="cards-btn" onClick={this.handleAddCard}>Add Card</button>
            
        </div>
          );
      }
  
  };

export default Card;
