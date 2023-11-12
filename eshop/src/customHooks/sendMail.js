
export const SendMail = (body) => {
     
                fetch('http://localhost:4242/sendOrderEmail', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: body,
                  
                })
                  .then(response => response.json())
                  .then(result => {
                    console.log(result);
                  })
                  .catch(error => {
                    console.error('Error sending email:', error);
                  });



              };
        

     
    


  
 

 
