import { Spin } from "antd";
import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import UploadImage from "~/repositories/UploadImage";

function LandingImage({ onSelectImage }) {
  const [loadingImg, setLoadingImg] = useState(false);

  const onUploadImage = (event) => {
    event.preventDefault();
    setLoadingImg(true);
    const file = event.target.files?.[0];
    if (file) {
      UploadImage.uploadImage({ image: file })
        .then((res) => {
          onSelectImage(res.data.imageUrl);
          setLoadingImg(false);
        })
        .catch((e) => {
          console.log(e);
          setLoadingImg(false);
        });
    }
  };

  return (
    <div className="upload-btn-wrapper">
      <Spin tip="Loading..." spinning={loadingImg}>
        <button class="button__upload">
          <BiUpload />
          <p className="button__upload-title">Upload file</p>
          <p className="button__upload-description">PNG, JPEG, WEBP, SVG</p>
        </button>
        <input type="file" name="file" onChange={onUploadImage} />
      </Spin>
    </div>
  );
}

export default LandingImage;
