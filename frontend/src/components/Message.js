import React, { useEffect,useState } from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({variant,children}) => {



  const initial = <Alert variant={variant}>{children}</Alert>
  const [element,setElement] = useState(initial)
  useEffect(()=>{
      const timer = setTimeout(()=>{
          if(variant==="success")
          {
            setElement(<div></div>);
          }
          
      },1000)

      return ()=>clearTimeout(timer);
  },[children,variant])

  return (
    <>
      {element}
    </>
  )
}


Message.defaultProps = {
    variant:'info'
}

export default Message
