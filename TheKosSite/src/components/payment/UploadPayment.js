import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const UploadPayment = (props) => {
  const [image, setImage] = useState();

  const handleImageChange = async (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => setImage(reader.result);
  };


  return (
    <div className="payment-other-form">
      <p>
        Submit a picture showing your payment of $206 to KOS. You will be
        automatically registered for the season and we will review your
        submission.
      </p>
      <div className="upload-box">
        <p>Click Here to Upload</p>
        <label htmlFor="upload-image">
          <FontAwesomeIcon icon={faUpload} className="payment-upload-icon" />
        </label>
        <hr />

        {image ? (
          <button className="upload-box-button" onClick={() => props.handleUploadPayment(image)}>
            Submit Image
          </button>
        ) : null}
        <input
          type="file"
          id="upload-image"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default UploadPayment;
