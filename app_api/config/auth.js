 module.exports = {
    'facebookAuth' : {
      'clientID': '118382295454494',
      'clientSecret': 'be0de9cc1c59fc41f3f4076e3fa91320',
      'callbackURL': 'http://localhost:3000/api/auth/facebook/callback',
      'profileFields': ['id', 'displayName', 'photos', 'email']
  },

  'googleAuth' : {
    'clientID'      : '206179895507-v4u0aprobcoh5cfarlva3m621ne96t5c.apps.googleusercontent.com',
    'clientSecret'  : '-tijR64tj99xrXchqTKO2ksT',
    'callbackURL':'http://localhost:3000/api/auth/google/callback'
},
'mailgun':{
    'apiKey':'key-6d2a51589e2e8f5a21a306c705950bb1',
    'domain':'sandbox25e0f4e28c3541ec8305f1bd4c14509b.mailgun.org'
}

};