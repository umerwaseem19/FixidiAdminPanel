import { FC } from "react";
import "./spinner.css";

const Spinner: FC = () => (
/*   <div className="fallback-spinner">
    <div className="loading component-loader">
      <div className="effect-1 effects" />
      <div className="effect-2 effects" />
      <div className="effect-3 effects" />
    </div>
  </div> */
   <div className="spinner-overlay">
    <div className="spinner-container">
      <div className="effect-1 effects" />
      <div className="effect-2 effects" />
      <div className="effect-3 effects" />
      <p className="spinner-text">Loading...</p>
    </div>
  </div>
);
export default Spinner;
