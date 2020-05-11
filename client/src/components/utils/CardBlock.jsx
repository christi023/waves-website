import React from 'react';
// component
import Card from '../utils/Card';

const CardBlock = (props) => {
  // render Cards function
  const renderCards = () =>
    props.list ? props.list.map((card, i) => <Card key={i} {...card} />) : null;

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {/* function to loop the carts */}
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
