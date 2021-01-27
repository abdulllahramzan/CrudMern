
import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
function App() {

  const [location, setLocation] = useState("");
  const [day, setDay] = useState(0);
  const [meetingList, setMeetingList] = useState([]);
  const [newMeeting, setNewMeeting] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) =>{
      setMeetingList(response.data);
    });
  }, []);

  const addtolist = () => {
   Axios.post("http://localhost:3001/insert",{ 
   location : location, 
    day : day,
  });
  };

  const updateMeeting = (id) => {
      Axios.put("http://localhost:3001/update", {
        id : id,
        newMeeting : newMeeting,
      })
  };

  const deleteMeeting = (id) => {
    Axios.delete('http://localhost:3001/delete/'+id);
};
  
  return (
    <div className="wholeDiv">
    <div className="App">
        <h1 className="heading">"CRUD with MERN"</h1>

        <label>Meeting Location : </label>
        <input type ="text" onChange = {(event) => {
          setLocation(event.target.value)
          }}
          />
        <label>Meeting Date :</label>
        <input type ="number" 
             onChange = {(event) => {
          setDay(event.target.value)
          }}
          />
        <button onClick={addtolist}>Add to List</button>

        <h1 className="heading2">Meetings List: </h1>
        {meetingList.map((val, key) => {
          return ( <div key = {key} className = "meeting"> 
            <h1>{val.meetingLocation}</h1> <h1>{val.meetingDay}</h1>
            <input type="text" placeholder="New Location..."
            onChange = {(event) => {
              setNewMeeting(event.target.value)
              }} /> <br/>
            <button onClick={ () => updateMeeting(val._id) }>Update</button>
            <button onClick={ () => deleteMeeting(val._id) }>Delete</button>
             </div>
        );
      })}
    </div>
    </div>
  );
}

export default App;
