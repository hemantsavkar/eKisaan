// Code goes here
'use strict';

/*
 *  * angular-socialshare v0.0.2
 *   * ♡ CopyHeart 2014 by Dayanand Prabhu http://djds4rce.github.io
 *    * Copying is an act of love. Please copy.
 *     */

angular.module('djds4rce.angular-socialshare', [])
.factory('$FB',['$window',function($window){
  return {
    init: function(fbId){
      if(fbId){
        this.fbId = fbId;
        $window.fbAsyncInit = function() {
          FB.init({
            appId: fbId,
            channelUrl: 'app/channel.html',
            status: true,
            xfbml: true
          });
        };
        (function(d){
          var js,
          id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];
          if (d.getElementById(id)) {
            return;
          }

          js = d.createElement('script');
          js.id = id;
          js.async = true;
          js.src = "//connect.facebook.net/en_US/all.js";

          ref.parentNode.insertBefore(js, ref);

        }(document));
      }
      else{
        throw("FB App Id Cannot be blank");
      }
    }
  };

}]).directive('facebook', ['$timeout','$http', function($timeout,$http) {
  return {
    scope: {
      shares: '='
    },
    transclude: true,
    //template: '<div class="facebookButton">' +
    //  '<div class="pluginButton">' +
    //    '<div class="pluginButtonContainer">' +
    //      '<div class="pluginButtonImage">' +
    //        '<button type="button">' +
    //          '<i class="pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue"></i>' +
    //        '</button>' +
    //      '</div>' +
    //      '<span class="pluginButtonLabel">Share</span>' +
    //    '</div>' +
    //  '</div>' +
    //'</div>' +
    //'<div class="facebookCount">' +
    //  '<div class="pluginCountButton pluginCountNum">' +
    //    '<span ng-transclude></span>' +
    //  '</div>' +
    //  '<div class="pluginCountButtonNub"><s></s><i></i></div>' +
      //'</div>',
    template:'<div class="col-xs-4" style="text-align:center">' +
                      '<a href="#">' +
                          '<h4>' +
                              '<i class="fa fa-facebook fa-align-center fa-3x"></i>' +
                              '<br />' +
                          '</h4>' +
                      '</a>' +
                  '</div>' ,
    link: function(scope, element, attr) {
      if(attr.shares){
        attr.$observe('url', function(){
          $http.get('https://api.facebook.com/method/links.getStats?urls='+attr.url+'&format=json').success(function(res){
            var count = res[0] ? res[0].share_count.toString() : 0;
            var decimal = '';
            if(count.length > 6){
              if(count.slice(-6,-5) != "0"){
                decimal = '.'+count.slice(-6,-5);
              }
              count = count.slice(0, -6);
              count = count + decimal + 'M';
            }else if(count.length > 3){
              if(count.slice(-3,-2) != "0"){
                decimal = '.'+count.slice(-3,-2);
              }
              count = count.slice(0, -3);
              count = count + decimal + 'k';
            }
            scope.shares = count;
          }).error(function(){
            scope.shares = 0;
          });
        });
      }
      $timeout(function(){
        element.bind('click',function(e){
          FB.ui(
            {method: 'share',
              href: attr.url
          });
          e.preventDefault();
        });
      });
    }
  };
}]).directive('twitter',['$timeout', '$window',function($timeout, $window) {
    return {
        template: '<div class="col-xs-4" style="text-align:center">' +
                    '<a href="https://twitter.com/intent/tweet?text=eKisaan One Stop Solution for Farmers&url=http://ekisaan.hemantsavkar.in&original_referer=http://ekisaan.hemantsavkar.in">' +
                        '<h4>' +
                            '<i class="fa fa-twitter fa-align-center fa-3x"></i>' +
                            '<br />' +
                        '</h4>' +
                    '</a>' +
                '</div>',
    link: function(scope, element, attr) {
      $timeout(function() {
        $timeout(function() {
          //twttr.widgets.createShareButton(
          //  attr.url || $window.location.href,
          //  element[0],
          //  function() {}, {
          //    count: attr.count,
          //    text: attr.text,
          //    via: attr.via,
          //    size: attr.size
          //  }
          //);
        });
      });
    }
  };
}])
.directive('googleplus',['$timeout', '$window',function($timeout, $window) {
    return {
        template: '<div class="col-xs-4" style="text-align:center">' +
                    '<a href="https://plus.google.com/share?url=http://ekisaan.hemantsavkar.in/&image=http://ekisaan.hemantsavkar.in/images/assets/kissan_small.png"  onclick="javascript:window.open(\'https://plus.google.com/share?url=http://ekisaan.hemantsavkar.in&image=http://ekisaan.hemantsavkar.in/images/assets/kissan_small.png\',\'\',  \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600\');  return false;">' +
                        '<h4>' +
                            '<i class="fa fa-google-plus fa-align-center fa-3x"></i>' +
                            '<br />' +
                        '</h4>' +
                    '</a>' +
                '</div>',
        link: function(scope, element, attr) {
        }
    };
}])
.directive('email', ['$timeout', '$window', function ($timeout, $window) {
        return {
            template: '<div class="col-xs-4" style="text-align:center">' +
                        '<a href="mailto:?to=&subject=eKisaan App&body=Please checkout new eKisaan App for Farmers.More Details at http://www.ekisaan.in">' +
                            '<h4>' +
                                '<i class="fa fa-envelope fa-align-center fa-3x"></i>' +
                                '<br />' +
                            '</h4>' +
                        '</a>' +
                    '</div>',
            link: function (scope, element, attr) {
            }
        };
    }])
 .directive('linkedin', ['$timeout', '$http', '$window', function ($timeout, $http, $window) {
  return {
    scope: {
      shares: '='
    },
    transclude: true,
    //template: '<div class="linkedinButton">' +
    //  '<div class="pluginButton">' +
    //    '<div class="pluginButtonContainer">' +
    //      '<div class="pluginButtonImage">in' +
    //      '</div>' +
    //      '<span class="pluginButtonLabel"><span>Share</span></span>' +
    //    '</div>' +
    //  '</div>' +
    //'</div>' +
    //'<div class="linkedinCount">' +
    //  '<div class="pluginCountButton">' +
    //    '<div class="pluginCountButtonRight">' +
    //      '<div class="pluginCountButtonLeft">' +
    //        '<span ng-transclude></span>' +
    //      '</div>' +
    //    '</div>' +
    //  '</div>' +
      //'</div>',
    template: '<div class="col-xs-4" style="text-align:center">' +
                      '<a href="#/share">' +
                          '<h4>' +
                              '<i class="fa fa-linkedin fa-align-center fa-3x"></i>' +
                              '<br />' +
                          '</h4>' +
                      '</a>' +
                  '</div>',
    link: function(scope, element, attr) {
      if(attr.shares){
        $http.jsonp('http://www.linkedin.com/countserv/count/share?url='+attr.link+'&callback=JSON_CALLBACK&format=jsonp').success(function(res){
          scope.shares = res.count.toLocaleString();
        }).error(function(){
          scope.shares = 0;
        });
      }
      $timeout(function(){
        element.bind('click',function(){
          var url = encodeURIComponent(attr.url).replace(/'/g,"%27").replace(/"/g,"%22")
          //$window.open("//www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + attr.title + "&summary=" + attr.summary, '');
          window.open("//www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + attr.title + "&summary=" + attr.summary, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          return false;
        });
      });
    }
  };
 }])


  .directive('gplus', [function () {
  return {
    link: function(scope,element,attr){
      if(typeof gapi == "undefined"){
        (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          po.src = 'https://apis.google.com/js/plusone.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
    }
  };
}]).directive('tumblrText',[function(){
  return {
    link: function(scope,element,attr){
      var tumblr_button = document.createElement("a");
      tumblr_button.setAttribute("href", "http://www.tumblr.com/share/link?url=" + encodeURIComponent(attr.url) + "&name=" + encodeURIComponent(attr.name) + "&description=" + encodeURIComponent(attr.description));
      tumblr_button.setAttribute("title", attr.title||"Share on Tumblr");
      tumblr_button.setAttribute("style", attr.styling||"display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
      element.append(tumblr_button);
    }

  }
}]).directive('tumblrQoute',[function(){
  return {
    link: function(scope,element,attr){
      var tumblr_button = document.createElement("a");
      tumblr_button.setAttribute("href", "http://www.tumblr.com/share/quote?quote=" + encodeURIComponent(attr.qoute) + "&source=" + encodeURIComponent(attr.source));
      tumblr_button.setAttribute("title", attr.title||"Share on Tumblr");
      tumblr_button.setAttribute("style", attr.styling||"display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
      element.append(tumblr_button);
    }
  }
}]).directive('tumblrImage',[function(){
  return {
    link: function(scope,element,attr){
      var tumblr_button = document.createElement("a");
      tumblr_button.setAttribute("href", "http://www.tumblr.com/share/photo?source=" + encodeURIComponent(attr.source) + "&caption=" + encodeURIComponent(attr.caption) + "&clickthru=" + encodeURIComponent(attr.clickthru));
      tumblr_button.setAttribute("title", attr.title||"Share on Tumblr");
      tumblr_button.setAttribute("style", attr.styling||"display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
      element.append(tumblr_button);
    }
  }
}]).directive('tumblrVideo',[function(){
  return {
    link: function(scope,element,attr){
      var tumblr_button = document.createElement("a");
      tumblr_button.setAttribute("href", "http://www.tumblr.com/share/video?embed=" + encodeURIComponent(attr.embedcode) + "&caption=" + encodeURIComponent(attr.caption));
      tumblr_button.setAttribute("title", attr.title||"Share on Tumblr");
      tumblr_button.setAttribute("style", attr.styling||"display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
      element.append(tumblr_button);
    }
  }
}]).directive('pintrest',[function(){
  return {
    template: '<a href="{{href}}" data-pin-do="{{pinDo}}" data-pin-config="{{pinConfig}}"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" /></a>',
    link: function(scope,element,attr){
      scope.href = '//www.pinterest.com/pin/create/button/?url='+encodeURIComponent(attr.href)+'&media='+encodeURIComponent(attr.img)+'&description='+encodeURIComponent(attr.description);
      scope.pinDo = attr.pinDo||"buttonPin";
      scope.pinConfig = attr.pinConfig||"beside";
    }
  }
}]);
