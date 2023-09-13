import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "./Components/App.css";
import Auth from "./Components/Auth";
import Cookies from "universal-cookie";
import { useState, useRef } from "react";
import Chat from "./Components/Chat";

function App() {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [roomid, setRoomid] = useState(null);
  const roomidRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <div>
      {roomid ? (
        <Chat roomid={roomid}/>
      ) : (
        <div className="bgc_holder">
          <div className="container-fluid d-flex align-items-center justify-content-center ">
          <div className="row form_div ">
          <div className="col-sm-8  " >
          <h5 className="text-light mt-3 mb-3">Enter Room</h5>
            <input placeholder="Enter Room Id"  ref={roomidRef} /> <br />
            <button className="btn btn-primary mt-3 mb-3" onClick={() => setRoomid(roomidRef.current.value)}>
              Enter
            </button>
          </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
