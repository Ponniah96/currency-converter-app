import { Navigate ,useLocation} from "react-router-dom";
import { useLoginCredentials } from "../layouts/bodyLayout";
export function RequiredAuth({children}){
  const location=useLocation();
  const name = useLoginCredentials();
  return(  
    <>
    {name.firstName
      ?
      children
      :
      <Navigate to="/login" state={{path:location.pathname}}/>
    }
    </>  
  )
}