// src/utils/uploadAudio.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// Just handle storage & return URL
export async function uploadAudio(file, type) {
  let folder = "others";
  if (type === "base") folder = "base";
  else if (type === "layer") folder = "layer";
  else if (type === "merged") folder = "merged";

  // Firebase Storage path
  const storageRef = ref(storage, `tracks/${folder}/${Date.now()}-${file.name}`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // ✅ Return public download URL
  const url = await getDownloadURL(storageRef);
  return url;
}
