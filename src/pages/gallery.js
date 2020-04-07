import React, { Component } from 'react';
import GalleryImages from '../components/GalleryImages';

class Gallery extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center border-bottom pb-2 pt-4">Gallery</h1>
        <GalleryImages />
      </div>
    );
  }
}

export default Gallery;
