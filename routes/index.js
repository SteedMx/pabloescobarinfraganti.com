var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pablo Escobar - Infraganti' });
});

/* POST home page. */
router.post('/', function (req, res) {
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

  console.log('BODY: ', req.body);
  // setup e-mail data, even with unicode symbols
  mailOpts = {
    from: '"Matías Gianesini" <matias@steed.mx>', // sender's address
    to: 'matias.rodgian@gmail.com', // list of receivers
    subject: 'Pablo Escobar Infraganti | Solicitud de pase V.I.P ', // subject line
    html: req.body.names + "  " + req.body.lastnames + '<br>Correo: ' + req.body.email
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    // email failed to send
    if (error) {
      res.render('index', {
        title: 'Deluxe - Contact',
        msg: 'Error occurred, message not sent.',
        err: true,
        page: 'index'
      })
    }
    // email sent successfully
    else {
      res.render('index', {
        title: 'Deluxe- Contact',
        msg: 'Message sent! Thank you.',
        err: false,
        page: 'index'
      })
    }
  });

});

module.exports = router;
