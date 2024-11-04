import { Navigate, Route,Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
function App() {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<Protectedroute><Homepage/></Protectedroute>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}
export function Protectedroute(props){
  if(localStorage.getItem('user')){
    return props.children
  }
  else{
    return <Navigate to="/login"/>
  }
}
export default App;
