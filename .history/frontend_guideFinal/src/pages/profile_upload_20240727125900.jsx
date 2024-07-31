import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

const ProfileUpload = ({ setProfileImageUrl }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState('');

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((image) => {
    this.imageRef = image;
  }, []);

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(this.imageRef, crop, 'newFile.jpeg');
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const file = await fetch(croppedImageUrl)
      .then(res => res.blob())
      .then(blob => new File([blob], 'profile.jpg', { type: 'image/jpeg' }));

    formData.append('image', file);

    try {
      const result = await axios.post('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProfileImageUrl(result.data.imagePath);
    } catch (error) {
      console.error('Error uploading cropped image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      {croppedImageUrl && (
        <div>
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
          <button onClick={handleSubmit}>Upload Cropped Image</button>
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
