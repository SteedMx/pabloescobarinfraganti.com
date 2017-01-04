var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Deluxe - Contact', page: 'contact' })
});

/* POST contact page. */
router.post('/', function (req, res) {
  console.log('Este es el res: ', res);
  var mailOpts, smtpTrans;

  // setup nodemailer transport
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use ssl
    auth: {
      user: 'matias@steed.mx',
      pass: 'Deltron3030'
    }
  });

  // setup e-mail data, even with unicode symbols
  mailOpts = {
    from: '"Matías Gianesini" <matias@steed.mx>', // sender's address
    to: 'matias@steed.mx', // list of receivers
    subject: 'Hello ', // subject line
    text: 'Hello world',
    html: '<b>Message summary </b><br> From:' + req.body.name + '<br>Email:' + req.body.email + '<br>Street address' + req.body.address + '<br> Message:' + req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    // email failed to send
    if (error) {
      console.log('Error: ', error);
      res.render('contact', {
        title: 'Deluxe - Contact',
        msg: 'Error occurred, message not sent.',
        err: true,
        page: 'contact'
      })
    }
    // email sent successfully
    else {
      res.render('contact', {
        title: 'Deluxe- Contact',
        msg: 'Message sent! Thank you.',
        err: false,
        page: 'contact'
      })
    }
  });

});

module.exports = router;
