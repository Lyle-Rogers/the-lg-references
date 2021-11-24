import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const SlideCard = (props) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className={showCard ? "slide-option" : "slide-option close"}>
    <div
      className="slide-option-header"
      onClick={() => setShowCard(!showCard)}
    >
      {showCard ? (
        <FontAwesomeIcon
          icon={faMinus}
          className="slide-header-icon"
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className="slide-header-icon"
        />
      )}
      <div className="slide-header-title">{props.title}</div>
    </div>
    <div className={showCard ? "slide-option-body" : "slide-option-body hide"}>
      {props.children}
    </div>
  </div>
  
  )
}

export default SlideCard;