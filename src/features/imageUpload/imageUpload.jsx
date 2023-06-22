import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Col, Row } from "reactstrap";
import generateDownload from "./helpers/generate-download";
import setCanvasImage from "./helpers/set-canvas-image";

import { useRef, useState } from "react";

const ImageUpload = () => {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  const [crop, setCrop] = useState({ unit: "px", aspect: 1 });
  const [image, setImage] = useState({
    height: null,
    width: null,
    url: "",
    data: null,
  });

  const isSquare =
    image.height > 0 && image.width > 0 && image.height === image.width;

  const isUrlExist = image.url !== "";

  const loadImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage({
        url: imageUrl,
        height: img.height,
        width: img.width,
        data: img,
      });
    };
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
  };

  const handleFileInputChange = (e) => {
    e.preventDefault();
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    loadImage(imageUrl);
  };

  const handleCompleteCrop = (cropToSet) => {
    setCrop(cropToSet);
    setCanvasImage(imgRef.current, previewCanvasRef.current, cropToSet);
  };

  const handleChange = (cropToSet) => setCrop(cropToSet);

  return (
    <Row>
      <Col className="d-flex flex-column mt-4">
        <h3>Please try to upload an image with a 1:1 ratio.</h3>
        <input
          className="mt-2"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        {isUrlExist && isSquare ? (
          <div className="mt-4">
            <img src={image.url} />
            <p>
              <b>Great, you uploaded 1:1 ratio image.</b>
            </p>
          </div>
        ) : isUrlExist && !isSquare ? (
          <Row>
            <Col className="mt-4 d-flex flex-column align-items-center">
              <b>Image must be square. Please resize or crop the image.</b>
              <ReactCrop
                src={image.url}
                crop={crop}
                onChange={handleChange}
                aspect={1}
                onComplete={handleCompleteCrop}
              >
                <img ref={imgRef} src={image.url} alt="original-image" />
              </ReactCrop>
              <canvas
                className="my-4"
                ref={previewCanvasRef}
                style={{
                  width: Math.round(crop?.width ?? 0),
                  height: Math.round(crop?.height ?? 0),
                }}
              />
              <button
                className="btn btn-primary"
                disabled={!crop?.width || !crop?.height}
                onClick={() => {
                  generateDownload(previewCanvasRef.current, crop);
                }}
              >
                Download cropped image
              </button>
            </Col>
          </Row>
        ) : null}
      </Col>
    </Row>
  );
};

export default ImageUpload;
