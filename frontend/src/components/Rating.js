import React from "react";
import PropTypes from 'prop-types'
import { propTypes } from "react-bootstrap/esm/Image";





const Rating = (props) => {
  const rating = props.value;
  const text = props.text;
  const color = props.color;
  return (
    <div className="rating">
      <span>
        <i style={{color}}
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        >

        </i>
      </span>
      <span>
      <i style={{color}}
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        >
  
        </i>
      </span>
      <span>
          <i style={{color}}
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        >

        </i>
      </span>
      <span>
      <i style={{color}}
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        >
    
        </i>
      </span>
      <span>
      <i style={{color}}
          className={
            rating >= 5
              ? "fas fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        >
    
        </i>
      </span>

      <span>{text&&text }</span>
    </div>
  );
};


Rating.defaultProps={
    color:'#f8e825'
}


Rating.propTypes = {
    value : PropTypes.number.isRequired,
    text : PropTypes.string.isRequired,
    color : PropTypes.string
}
export default Rating;