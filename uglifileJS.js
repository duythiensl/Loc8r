'use strict';

function exportFileMinjs(){
    var uglifyJs = require("uglify-js");
    var fs = require('fs');
    var appClientFiles = [
            fs.readFileSync('app_client/app.js',"UTF8"),
            fs.readFileSync('app_client/home/home.controller.js',"UTF8"),
            fs.readFileSync('app_client/locationDetail/locationDetail.controller.js',"UTF8"),
            fs.readFileSync('app_client/about/about.controller.js',"UTF8"),
            fs.readFileSync('app_client/reviewModal/reviewModal.controller.js',"UTF8"),
            fs.readFileSync('app_client/auth/register/register.controller.js',"UTF8"),
            fs.readFileSync('app_client/auth/login/login.controller.js',"UTF8"),
            fs.readFileSync('app_client/auth/login/callbackLogin.controller.js',"UTF8"),
            fs.readFileSync('app_client/common/directives/navigation/navigation.controller.js',"UTF8"),
            fs.readFileSync('app_client/auth/forgotpassword/forgotpassword.controller.js',"UTF8"),
            fs.readFileSync('app_client/auth/resetpassword/resetpassword.controller.js',"UTF8"),
            fs.readFileSync('app_client/common/services/loc8rData.service.js',"UTF8"),
            fs.readFileSync('app_client/common/services/geolocation.service.js',"UTF8"),
            fs.readFileSync('app_client/common/services/authentication.service.js',"UTF8"),
            fs.readFileSync('app_client/common/directives/ratingStars/ratingStars.directive.js',"UTF8"),
            fs.readFileSync('app_client/common/directives/footerGeneric/footerGeneric.directive.js',"UTF8"),
            fs.readFileSync('app_client/common/directives/navigation/navigation.directive.js',"UTF8"),
            fs.readFileSync('app_client/common/directives/pageHeader/pageHeader.directive.js',"UTF8"),
            fs.readFileSync('app_client/common/filters/formatDistance.filter.js',"UTF8"),
            fs.readFileSync('app_client/common/filters/addHtmlLineBreaks.filter.js',"UTF8")
    ];
    var uglified = uglifyJs.minify(appClientFiles, { compress : false });
    fs.writeFile('app_client/lib/js/loc8r.min.js', uglified.code, function (err){
       if(err) {
           console.log(err);
       } else {
           console.log('Script generated and saved: loc8r.min.js');
       }
   }); 
}
module.exports = exportFileMinjs();