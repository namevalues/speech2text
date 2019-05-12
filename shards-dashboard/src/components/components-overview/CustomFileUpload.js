import React, {Component} from "react";

class CustomFileUpload extends Component {
 render() {
   return (
     <div className="custom-file mb-3">
       <input type="file" className="custom-file-input" id="customFile2" />
       <label className="custom-file-label" htmlFor="customFile2">
         Choose file...
       </label>
     </div>
   );
 }
}


export default CustomFileUpload;
