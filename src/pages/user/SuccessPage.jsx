// import React from 'react'

// import { useLocation } from 'react-router-dom';

// export const SuccessPage = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const sessionId = query.get('session_id');

//   return (
//     <div className="container mx-auto text-2xl mt-10 p-10 font-bold text-center">
//       <h2>Payment Successful!</h2>
//       {sessionId && (
//         <p>Your payment was successful. Session ID: {sessionId}</p>
//       )}
//     </div>
//   );
// };


import React from 'react'

export const SuccessPage = () => {
  return (
    <div>SuccessPage</div>
  )
}
