import React, {Component} from 'react';

const images = new Array(9).fill(0).map((item, index) => index + 1);

class Gallery extends Component {
  render() {
    return (
      <div className="container f-h">
        <h1 className="text-center border-bottom pb-2 pt-4">Gallery</h1>
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
      </div>
    );
  }
}

export default Gallery;
