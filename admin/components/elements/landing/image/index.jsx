import React from "react";
import { BiUpload } from "react-icons/bi";

function LandingImage(props) {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const changeHandler = (event) => {
    if (event.target.files[0]) setSelectedFile(event.target.files[0]);

    if (selectedFile !== null) {
      setUrlImage(URL.createObjectURL(selectedFile));
      console.log(urlImage);
    }
  };

  return (
    <div className="upload-btn-wrapper">
      <button class="button__upload">
        <BiUpload />
        <p className="button__upload-title">Upload file</p>
        <p className="button__upload-description">PNG, JPEG, WEBP, SVG</p>
      </button>
      <input type="file" name="file" onChange={changeHandler} />
    </div>
  );
}

export default LandingImage;
