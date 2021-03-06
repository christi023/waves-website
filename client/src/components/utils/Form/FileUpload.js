import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// faPlusCircle

export default class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false,
    };
    // binding methods
    this.showUploadedImages = this.showUploadedImages.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  // on drop
  onDrop = (files) => {
    // console.log(files);
    this.setState = {
      uploading: true,
    };
    let formData = new formData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/users/uploadimage', formData, config).then((response) => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data],
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        },
      );
    });
  };

  // show uploaded images method
  showUploadedImages = () => {};

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone onDrop={(e) => this.onDrop(e)} multiple={false} className="dropzone_box">
              <div className="wrap">
                <i className="fas fa-plus-circle"></i>
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone-box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px',
                }}
              >
                <CircularProgress
                  style={{
                    color: '#00bcd4',
                  }}
                  thickness={7}
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}
