import React from 'react';
import { Link } from 'react-router-dom';



function CardItem(props) {
  const isExternalLink = props.externalLink; // Assuming you pass a prop called externalLink

  if (isExternalLink) {
    return (
      <>
        <li className='cards__item'>
          <a
            className='cards__item__link'
            href={props.path}
            // target='_blank' // Open the link in a new tab
            // rel='noopener noreferrer' // Recommended for security
          >
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img
                className='cards__item__img'
                alt='Travel Image'
                src={props.src}
              />
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          </a>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li className='cards__item'>
          <Link className='cards__item__link' to={props.path}>
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img
                className='cards__item__img'
                alt='Travel Image'
                src={props.src}
              />
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          </Link>
        </li>
      </>
    );
  }
}

export default CardItem;


