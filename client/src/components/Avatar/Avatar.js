import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Avatar.css';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.imgInput = React.createRef();
    this.openUploadDialog = this.openUploadDialog.bind(this);
    this.imgHandleChange = this.imgHandleChange.bind(this);
  }

  openUploadDialog() {
    this.imgInput.current.click();
  }
  
  imgHandleChange(e) {
    const reader = new FileReader();
    const img = e.target.files[0];
    const { token, changeUserAvatar } = this.props;

    if (img) {
      reader.readAsDataURL(img);
    }

    reader.onloadend = () => {
      const formData = new FormData();

      formData.append('name', token + Date.now());
      formData.append('avatar', img);

      changeUserAvatar(formData, token);
    };
  }

  render() {
    const { avatar } = this.props;

  	return (
      <>
        <img
          className="rounded mb-4 w-100"
          src={`avatars/${avatar}`}
          alt="Avatar"
        />
        <button
          className="plus-upload-btn"
          onClick={this.openUploadDialog}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <input
          type="file"
          className="d-none"
          ref={this.imgInput}
          onChange={this.imgHandleChange}
        />
      </>
  	);
  }
}

Avatar.propTypes = {
  token: PropTypes.number,
  avatar: PropTypes.string,
  changeUserAvatar: PropTypes.func,
};

export default Avatar;
