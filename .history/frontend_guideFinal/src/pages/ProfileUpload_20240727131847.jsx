import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

const ProfileUpload = ({ setProfileImageUrl }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [imageRef, setImageRef] = useState(null);

  const onSelectFile = (e) => {
    console.log("CHANGE")
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        imageRef,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const fileUrl = URL.createObjectURL(blob);
          setCroppedImageUrl(fileUrl);
          uploadImage(blob);
        }
      }, 'image/jpeg');
    }
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const uploadImage = async (blob) => {
    const formData = new FormData();
    const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
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
      {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />}
    </div>
  );
};

export default ProfileUpload;
