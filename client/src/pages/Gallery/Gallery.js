import React, {Component} from 'react';

import images from '../../consts/gallery-images';

import './Gallery.scss';

class Gallery extends Component {
  render() {
    return (
      <div className="container f-h">
        <h1 className="text-center border-bottom pb-2 pt-4">Gallery</h1>
        <div className="gallery my-4">
          {images.map((image) => (
            <div className="mb-3" key={image.id}>
              <picture>
                <source srcSet={`img/gallery/${image.id}.webp`} type="image/webp" />
                <source srcSet={`img/gallery/${image.id}.jpg`} type="image/jpeg" />
                <img
                  className="img-fluid"
                  loading="lazy"
                  src={`img/gallery/${image.id}.jpg`}
                  alt="Local Barbershop"
                  width={image.width}
                  height={image.height}
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
