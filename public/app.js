const emailul=document.getElementById('customerList');
const email =document.getElementById("email");
const emailButton = document.getElementById('createButton')

const emails = []

fetch("/api/email")
.then(result => result.json())
.then(data=>data.forEach(emaildata=>{
    //create email
    const emailli=document.createElement('li');
    emailli.innerText=emaildata.emailadress;
    emailli.id=emaildata.id;
    emailul.appendChild(emailli);

    //create button
    const removeButton = document.createElement('button')
    removeButton.innerText = 'Delete'
    emailli.appendChild(removeButton)

    removeButton.addEventListener("click",function(){
        console.log(emailli.id)

        fetch(`/api/${emailli.id}`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'delete',
            body: JSON.stringify({
                emailid: emailli.id
            })
          })
          emailli.remove();

    })

    emails.push(emaildata.emailadress)
}))
.catch(err => console.error(err));


document.getElementById('mybutton').addEventListener("click",function(){

    fetch('/api/createemail', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            emailadress: email.value
        })
      })
      .then(response=>console.log(response))
      

})

