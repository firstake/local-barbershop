import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import './Avatar.css';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.imgInput = React.createRef();
    this.onImgLoadError = this.onImgLoadError.bind(this);
    this.openUploadDialog = this.openUploadDialog.bind(this);
    this.imgHandleChange = this.imgHandleChange.bind(this);
  }

  onImgLoadError(evt) {
    evt.target.src = 'avatars/error.png';
  }

  openUploadDialog() {
    this.imgInput.current.click();
  }

  imgHandleChange(evt) {
    const reader = new FileReader();
    const img = evt.target.files[0];
    const {changeUserAvatar} = this.props;

    if (img) {
      reader.readAsDataURL(img);
    }

    reader.onloadend = () => {
      const formData = new FormData();

      formData.append('name', Date.now().toString());
      formData.append('avatar', img);

      changeUserAvatar(formData);
    };
  }

  render() {
    const {avatar} = this.props;

    return (
      <>
        <img
          onError={this.onImgLoadError}
          className="rounded mb-4 w-100"
          src={avatar}
          alt="Avatar"
        />
        <button
          type="button"
          className="plus-upload-btn"
          onClick={this.openUploadDialog}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <input
          type="file"
          accept="image/*"
          className="d-none"
          ref={this.imgInput}
          onChange={this.imgHandleChange}
        />
      </>
    );
  }
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  changeUserAvatar: PropTypes.func,
};

export default Avatar;
