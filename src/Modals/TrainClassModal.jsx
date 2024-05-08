import React, { useEffect } from 'react'
import './TrainClassModal.css'

function TrainClassModal({myElementRef, setShowModal, value, dispatch , search}) {
    function setModalFalse(e){
        if(!myElementRef.current.contains(e.target)){
            setShowModal(false)
        }
    }
    useEffect(()=>{
        document.body.addEventListener('click', setModalFalse)
        return ()=>{
            document.body.removeEventListener('click',setModalFalse);
        }
    },[])
  return (
    <div  onClick={(e)=>{
     }} className={`train-class-hidden ${search ? 'train-class-hidden-search' : ''}`}>
      <ul>
        <li className='stations' onClick={(e)=>{
            dispatch({type: 'updateClass', payload:{head: 'All', text: 'All Class'}})
        }}>All Class</li>
        <li className='stations' onClick={(e)=>{
            dispatch({type: 'updateClass', payload:{head: 'SL', text: 'Sleeper Class'}})
        }}>Sleeper Class</li>
        <li className='stations' onClick={(e)=>{
            dispatch({type: 'updateClass', payload:{head: '3A', text: 'Third AC'}})
        }}>Third AC</li>
        <li className='stations' onClick={(e)=>{
            dispatch({type: 'updateClass', payload:{head: '2A', text: 'Second AC'}})
        }}>Second AC</li>
        <li className='stations' onClick={(e)=>{
            dispatch({type: 'updateClass', payload:{head: '1A', text: 'First AC'}})
        }}>First AC</li>
      </ul>
    </div>
  )
}

export default TrainClassModal
