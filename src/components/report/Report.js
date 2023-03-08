import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadFile } from "../../utils/uploadService";
const Report = ({}) => {
  const [formData, setFormData] = useState({
    numValue: 0,
    imageFile: "",
  });

  const [currentFile, setCurrentFile] = useState(undefined);
  const [responseData, setResponseData] = useState(null);
  // const [previewImage, setPreviewImage] = useState(undefined);
  //
  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    // setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleFormValueChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const upload = async () => {
    try {
      const res = await uploadFile(currentFile, formData.numValue);
      console.log(res);
      setResponseData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-5 py-5">
      <h1 className="py-5">Report</h1>
      <div className="container mx-auto d-flex justify-content-center">
        <div className="text-left">
          <div>
            <h2>Enter a value between 1 and 10</h2>
            <input
              type="number"
              placeholder="Value."
              name="numValue"
              value={formData.numValue}
              className="col-8"
              onChange={handleFormValueChange}
              required
            />
          </div>
          <div>
            <h2>Attach a JPG image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={selectFile}
              className="my-3 border col-8 p-0"
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-success btn-sm my-3"
              disabled={!currentFile}
              onClick={upload}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
      {responseData && (
        <div className="container mx-auto border rounded border-primary p-2">
          <div dangerouslySetInnerHTML={{ __html: responseData }} />
        </div>
      )}
    </div>
  );
};

export default connect()(Report);
