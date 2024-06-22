import { useContext, useEffect, useState } from 'react'
import { IoTrashOutline } from "react-icons/io5"
import client,{database} from '../appwrite/config'
import conf from '../appwrite/variable';
import { Query,ID } from 'appwrite';
import { Navigate, useNavigate } from 'react-router-dom';
import userContext from '../context_api/context';
import Header from '../components/Header';
import Welcome from '../components/Welcome';


function Room() {
  
   const {user} = useContext(userContext);
  
  const [messages,setMessages] = useState([]);
  const [messageBody,setMessageBody]= useState();

  useEffect(()=>{
    getValue();

    const unsubscribe = client.subscribe(`databases.${conf.databaseId}.collections.${conf.collectionId}.documents`,res=>{
      if(res.events.includes("databases.*.collections.*.documents.*.create")){
        setMessages((prev)=>[res.payload,...prev]);
      }
          
      
      if(res.events.includes("databases.*.collections.*.documents.*.delete")){
        setMessages((prev)=>prev.filter((message)=>message.$id!==res.payload.$id));
      } 
    });
    
    return ()=>{
      unsubscribe();
    }
    
  },[]);

  const getValue = async()=>{
    const result = await database.listDocuments(
      conf.databaseId,
      conf.collectionId,
      [Query.orderDesc('$createdAt')]
    );
    setMessages(result.documents);
  }

  const deleteMessage = async(message_id)=>{
    const response = await database.deleteDocument(
      conf.databaseId,
      conf.collectionId,
      message_id
    );
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let payload = {
      username:user.name,
      body:messageBody,
      user_id:user.$id
    }

    let response = await database.createDocument(
      conf.databaseId,
      conf.collectionId,
      ID.unique(),
      payload
    );
    
    setMessageBody('');
  }
  

  if(!user){
    return <Navigate to='/login'/>;
  }

  return (
    <>
    <main className='container'>
      <Welcome/>
      <Header/>
      <div className='room--container'>
        {/* <div> */}
          <form onSubmit={handleSubmit} className='message--form'>
            <div>
              <textarea 
                required 
                maxLength="1000"
                placeholder='Say something...'
                onChange={(e)=>setMessageBody(e.target.value)}
                value={messageBody}></textarea>
            </div>
            <div className='send-btn--wrapper'>
              <input className="btn btn--secondary" type="submit" value='Send' />
            </div>
          </form>

          {messages.map((message)=>
          (
            <div key={message.$id} className={`message--wrapper ${message.user_id===user.$id && 'message--header--user'}`}>

              <div className='message--header'>
                <p>
                    {message.username}
                    <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                </p>
                {user.$id===message.user_id && <IoTrashOutline className='delete--btn' onClick={()=>deleteMessage(message.$id)}/>}
              </div>

              <div className={`message--body ${message.user_id===user.$id && 'message--user'}`}>
                <span>{message.body}</span>
              </div>
            </div>

          ))}
        {/* </div> */}
      </div>
    </main>
    </>
  )
}

export default Room
