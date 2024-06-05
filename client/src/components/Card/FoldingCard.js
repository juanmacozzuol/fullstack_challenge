import React, { useState } from 'react';
import './FoldingCard.css';

const FoldingCard = ({ name,email ,image,phone_number}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let index = image.indexOf('img')
  let image_src = image.substring(index)
image_src.replaceAll('\\','/')

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
  
      <div className={`folding-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
        <div className="card-front">
          <h3>{name}</h3>
          <img src={`http://localhost:8080/${image_src}`} alt={name} />

        </div>
        
        <div className="card-back">
        <h3>{name}</h3>
          <img src={`http://localhost:8080/${image_src}`} alt={name} />
          <p>Email: {email}</p>
          <p>Phone: {phone_number}</p>
        </div>
      </div>

 
  );
};

export default FoldingCard;
