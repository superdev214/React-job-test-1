import api from "./api";

export const uploadFile = async (file, value) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("number_value", value);

  return api.post("/app/report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
