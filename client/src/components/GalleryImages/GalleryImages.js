import React, {Component} from 'react';
import './GalleryImages.css';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class GalleryImages extends Component {
  render() {
    return (
      <div className="gallery my-4">
        {images.map((item) => (
          <div className="mb-3" key={item}>
            <img
              className="img-fluid"
              loading="lazy"
              src={`img/gallery/${item}.jpg`}
              alt="Local Barbershop"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default GalleryImages;
