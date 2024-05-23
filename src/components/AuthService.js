export const isShopper = () => {
    const userId = localStorage.getItem('userName');
    if(userId === 'Shopper123') return true;
    return false;
  };  
  
export  const isUserLoggedIn = () => {
    const userId = localStorage.getItem('userName');
    if(userId == null) return false;
    return true; 
  }