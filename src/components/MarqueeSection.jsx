import { Link } from "react-router-dom";
import { useLoginCredentials } from "../layouts/bodyLayout";
import "../styles/marqueeSection.scss";
export function MarqueeSection({data}){
  const name = useLoginCredentials();
  return(
    <div className={`marquee-section ${data.pageName}`}>
      <div className="marquee-card-section">
        <div className="marquee-card-header">
          {data.title} {name.firstName} {name.lastName}
        </div>
        <div className="marquee-card-subtext">
          {data.description}
        </div>
        <div className="marquee-card-subtext">
          {data.concepts}
        </div>
        <div className="marquee-card-buttons">
          {name.firstName 
            ?
            <button className="primary-button">Explore Now</button>
            :
            <Link to="/login" className="primary-button">{data.buttonText}</Link>
          }
          {/* <button className="primary-button">Explore Now</button> */}
        </div>
      </div>
    </div>
  )
}