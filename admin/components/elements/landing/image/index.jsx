import React from "react";
import { BiUpload } from "react-icons/bi";
import UploadImage from "~/repositories/UploadImage";

function LandingImage({onSelectImage}) {

  const onUploadImage = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0]
    if(file) {
      UploadImage.uploadImage({image: file}).then(res => {
        onSelectImage(res.data.imageUrl)
      })
    }
  };

  return (
    <div className="upload-btn-wrapper">
      <button class="button__upload">
        <BiUpload />
        <p className="button__upload-title">Upload file</p>
        <p className="button__upload-description">PNG, JPEG, WEBP, SVG</p>
      </button>
      <input type="file" name="file" onChange={onUploadImage} />
    </div>
  );
}

export default LandingImage;
