import React from 'react';
import Card from '../utils/Card';

const CardBlockShop = (props) => {
  const renderCards = () =>
    props.list
      ? props.list.map((cards) => <Card key={cards._id} {...cards} grid={props.grid} />)
      : null;

  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.list ? (
            props.list.length === 0 ? (
              <div className="no_result">Sorry, No results</div>
            ) : null
          ) : null}
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;
