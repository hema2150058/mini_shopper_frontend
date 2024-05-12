import React, {useState} from 'react'
import Navbar from '../HeaderFooter/ShopperNavHeader'

function LandingPage (){
  //const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Navbar currentTab="home" />
      
        <div className='mainDiv'>
          <div className='welcomeUser'>
            Hello, {localStorage.getItem("userName")}
          </div>
          <div className='page-container'>
            <h2>home</h2>
          </div>
</div>

</>
        
          )
}

          export default LandingPage;
