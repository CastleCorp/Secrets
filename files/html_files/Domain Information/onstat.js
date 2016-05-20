// Copyright SpaceReg Ltd. all rights reserved
var _spStat ={"h":"www.spacereg.com",
"p":"onstat/",
"t":[]
};function _spStatCommsLoad(url){if (!("comms" in _spStat)||_spStat.comms ==null){if ("jslLog" in window)
jslLog("Missing comms node");return;}
var node =document.createElement("SCRIPT");node.src =url;_spStat.comms.appendChild(node);}
function _spStatAddComms(){document.write('<span id="_spStatComms"></span>');_spStat.comms =document.getElementById("_spStatComms");}
_spStatAddComms();function _spStatSend(cmd,data){var url ="http";if (location.protocol.match(/https/i))
url +="s";url +="://"+_spStat.h+"/"+_spStat.p+"s.rpl?"+cmd;for (var n=0;n<data.length;n++){var v =""+data[n];url +=v.length+","+escape(v);}
_spStatCommsLoad(url);}
function _spStatReceived(){}
function _spStatOnload(){var uid =document.cookie.match(/_spStatU=([0-9a-f]+)/)?RegExp.$1 :0;var vid =document.cookie.match(/_spStatV=([0-9a-f]+)/)?RegExp.$1 :0;_spStatSend("s",[uid,vid,location.href,document.referrer,navigator.userAgent]);}
function _spStatTag(){if ("pageViewId" in _spStat){var d =_spStat.t.shift();d.push(_spStat.pageViewId);_spStatSend("t",d);}
if (_spStat.t.length >0){setTimeout("_spStatTag()",50);}
}
function spStatTag(name,value){_spStat.t.push([name,value]);_spStatTag();}
_spStatOnload();function _onstatAddTag(tagsAdded,name,value){if (!("1"+name+":"+value in tagsAdded)){spStatTag(name,value);tagsAdded["1"+name+":"+value]=1;jslLog("Set tag "+name+"="+value,"DEBUG");}
}
function _onstatUsernameLookupCb(replyMsg){var tagsAdded =jslGetCookie("_onstatTags");jslLog("tagsAdded = "+tagsAdded,"DEBUG");tagsAdded =tagsAdded=="" ?{}:jslJSONDecode(tagsAdded);_onstatAddTag(tagsAdded,"username",replyMsg.data.userid);tagsAdded["2"]=1;tagsAdded =jslJSONEncode(tagsAdded);jslLog("tagsAdded = "+tagsAdded,"DEBUG");jslSetCookie("_onstatTags",tagsAdded);}
function _onstatTags(){var tagsAdded =jslGetCookie("_onstatTags");jslLog("tagsAdded = "+tagsAdded,"DEBUG");tagsAdded =tagsAdded=="" ?{}:jslJSONDecode(tagsAdded);var search =window.location.search+"&";if (search.match(/cc_source=(.+)&/)){_onstatAddTag(tagsAdded,"source",RegExp.$1);}
var session =jslGetCookie("session");if (session !=""){var userid =session.substring(8,16);if (userid !="00000000"){jslLog(userid,"DEBUG");}
}
if (!("2" in tagsAdded)){var username =jslGetCookie("username");if (username !=""){username =jslGetCookie("username");var reqMsg ={consumer:"My::DomReg::AMAConsumer::UsernameLookup",data:{username:username}};ajaxRpc(window.jsConfig.ajaxUrl,reqMsg,_onstatUsernameLookupCb);}else {tagsAdded["2"]=1;}
}
tagsAdded =jslJSONEncode(tagsAdded);jslLog("tagsAdded = "+tagsAdded,"DEBUG");jslSetCookie("_onstatTags",tagsAdded);}
function _onstatOnLoad(){jslSetTimeout(10,_onstatTags);}
jslOnload(_onstatOnLoad);