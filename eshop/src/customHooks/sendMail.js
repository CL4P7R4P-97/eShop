
export const SendMail = (body) => {
     
             console.log(body);
                fetch('https://tranquil-cocada-3b715c.netlify.app/sendOrderEmail', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
                  
                })
                  .then(response => response.json())
                  .then(result => {
                    console.log(result);
                  })
                  .catch(error => {
                    console.error('Error sending email:', error);
                  });



              };
        

     
    


  
 

 
