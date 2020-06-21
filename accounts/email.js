var sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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');

// sgMail.send({
//     to:"pathikritchanda2407@gmail.com",
//     from:"random@gmail.com",
//     subject:"Nothing interesting",
//     text:"This is just for a test"
// });


var Email = (email , id , number)  => {
    sgMail.send({
        to: email ,
        from:"Vacc-App@gmail.com",
        subject:"Thanks for joining !",
        text:"Welcome to Vacc-app ! Your login id is " + id + "Use it with the phone-Number " + number +" you used during registration . Happy to see you choosing our app ."
    })
}


module.exports  =  Email ;