import React, { useEffect, useState,useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import '../Components/App.css'
export default function Chat(props) {
  const { roomid } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setmessage] = useState([]);
  const dbref = collection(db, "Texts");
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  useEffect(() => {
    // Fetch messages and update the messages state

    // Scroll down the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const newTextQuery = query(
      dbref,
      where("roomid", "==", roomid),
      orderBy("createdAt")
    );

    const unsuscribe = onSnapshot(newTextQuery, (snapshot) => {
      let allmessage = [];

      snapshot.forEach((doc) => {
        allmessage.push({ ...doc.data(), id: doc.id });
      });
      setmessage(allmessage);
      setNewMessage("");

    });
    return () => unsuscribe();
  }, []);





  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(dbref, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      roomid,
    });
    setNewMessage("");
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
    
  };
  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight)

  },[])

  return (
    <div className="chat-holder ">
      <div className="container-fluid  pb-0 ">
        <div className="row chat-room ">
          <div className="col-sm-12  ">
             
            <h3 className="id_head">You are Currently in Room {roomid}</h3>
            <form onSubmit={handleSubmit} className="form">
              <div ref={chatContainerRef} className="container1">
                
                <div className="">
                  <div>
                    {messages.map((txt) => (
                      
                      <div className={auth.currentUser.displayName==txt.user ? "d-flex align-items-start justify-content-end chatBOx":"d-flex align-items-start justify-content-start chatBox"}>
                        <div className="text-div mt-2 mb-2" >
                        <i>
                          <p >{txt.text}</p>
                        </i>
                        <hr />
                        <span>Sent by : {txt.user}</span>

                      </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="sticky-input"
                    placeholder="Write Here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button type="submit" className="btn  mt-1 mb-1 send_button">
                Send
              </button>
                </div>
                
              </div>

             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
