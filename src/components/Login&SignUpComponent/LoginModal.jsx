import React,{useState, useRef, useEffect} from 'react'
import LoginOrSignUpFormContainer from './LoginOrSignUpFormContainer'
import { useLoginModalContext } from '../../provider/LoginModalProvider'

function LoginModal() {
  
    const {setIsLoginModalVisible} = useLoginModalContext()
    return(
        <div 
            onClick={()=>setIsLoginModalVisible(false)} 
            className='login-modal-container'
        >
            <div 
                onClick={(e)=>e.stopPropagation()}
                className='login-modal'
            >
                <Carousel/>
                {/* <LoginForm/> */}
                <LoginOrSignUpFormContainer/>
            </div>
        </div>
    )
  
}
function Carousel(){
    const images = [
        'https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionRoad.webp',

    ]
    const carouselRef = useRef(null);
    const [index, setIndex] = useState(0)
    const [isSmooth, setIsSmooth] = useState(true)
    function scrollToIndexSmoothly(index, isSmooth) {
        const divNode = carouselRef.current;
        const imgNode = divNode.querySelectorAll('div > picture')[index];
        imgNode.scrollIntoView({
          behavior: isSmooth ? 'smooth' : 'instant',
          block: 'nearest',
          inline: 'center'
        });
      }
      function handlePrev(){
        // index == 0 ? setIndex(3) : setIndex(index-1);
        if(index == 0){
          setIndex(2);
          setIsSmooth(false);
        }
        else{
          setIndex(index-1)
          setIsSmooth(true)
        } 
      }
      function handleNext(){
        // index == 3 ? setIndex(0) : setIndex(index+1); 
        if(index == 2){
          setIndex(0);
          setIsSmooth(false)
        }
        else{
          setIndex(index + 1)
          setIsSmooth(true)
        }
      }
    useEffect(()=>{
        scrollToIndexSmoothly(index, isSmooth)
    },[index])
    return(
        <>
            <div id="carousel" className='carousel-image-container' ref={carouselRef}>
                {images.map((image,index)=>(
                    <picture key={index} className='carousel-picture'>
                        <img src={image} alt="" />
                    </picture>
                ))}
            </div>
        </>
    )
}

export default LoginModal
