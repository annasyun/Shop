import axios from "axios";

export const imgUploader = async (event) => {
  const files = event.target.files;

  const cloudApiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  let formData = new FormData();

  formData.append("api_key", cloudApiKey);
  formData.append("upload_preset", uploadPreset);
  formData.append("timestamp", (Date.now() / 1000) | 0);
  formData.append(`file`, files[0]);

  const config = {
    header: { "Content-Type": "multipart/form-data" },
  };

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
    config
  );

  return response.data.url;
};
