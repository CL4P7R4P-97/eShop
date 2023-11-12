
export const SendMail = (body) => {
     
             
                fetch('https://tranquil-cocada-3b715c.netlify.app/sendOrderEmail', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body:body,
                  
                })
                  .then(response => response.json())
                  .then(result => {
                    console.log(result);
                  })
                  .catch(error => {
                    console.error('Error sending email:', error);
                  });



              };
        

     
    


  
 

 
