import React, { useState } from "react";
import {  gql } from "@apollo/client";
import { useMutation } from "@apollo/client";


function UploadForm() {
  const [ImageSelected, setImageSelected] = useState(null);
//MUTATION DECLARED IN BACKEND
  const UPLOAD_IMAGE = gql`
    mutation uploadFile($file: FileUpload) {
      uploadFile(file: $file)
    }
  `;
 const [addTodo, { data }] = useMutation(UPLOAD_IMAGE);
 console.log(data);
 return (
    <div>
      <h2>Upload Images with React JS</h2>
      <input
       type="file"
       name="image"
       onChange={(e) => setImageSelected(e.target.files[0])}
      />
      <button
       onClick={(e) => {
       e.preventDefault();
       addTodo({ variables: { file: ImageSelected } });
       }}
      >
     Save image
     </button>
   </div>
 );
}

export default UploadForm