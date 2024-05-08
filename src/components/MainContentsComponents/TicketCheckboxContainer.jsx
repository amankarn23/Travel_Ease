import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import '../../styles/GenericMainContent.css'

function TicketCheckboxContainer({checkboxForTickets, paraText, spanText}) {
  return (
    <div className='checkbox-ticket-container'>
        <div className='makeFlex gap-20 '>
            {checkboxForTickets.map((item,index)=>(
                <FormControlLabel className={`${index == 0 && ('checkbox-ticket-active')} p-r-8`} key={index}
                  control={
                    <Checkbox
                      checked={index == 0}
                      
                      disabled = {index != 0}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                    />
                  }
                  label={item.name}
                />
            ))}
        </div>
        <div style={{textAlign:'center'}}>
            <p>
              {paraText}
            </p>
            {spanText && <span style={{color:'gray', fontSize:'14px', position:'relative', top:'-4px'}}>{spanText}</span>}
        </div>
      </div>
  )
}

export default TicketCheckboxContainer
