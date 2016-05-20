// Copyright SpaceReg Ltd. all rights reserved
function sp_all_init()
{sp_all_setcgicookies();sp_all_setsource();sp_all_named_click();sp_add_bshow();}
function sp_all_onclick()
{setTimeout("sp_all_named_click()",200);}
var sp_all_named_last;var sp_all_named_lastcolor;var sp_all_named_timerid;function sp_all_named_click()
{sp_all_named_unem();if (document.location &&document.anchors &&document.location.hash.match(/^#.+$/))
{var name=document.location.hash.substr(1);var nanchors=document.anchors.length;for (var n=0;n<nanchors;n++)
{var anchor=document.anchors[n];if (anchor.name==name)
{sp_all_named_last=anchor;sp_all_named_lastcolor="red";sp_all_named_last.style.color="red";sp_all_named_last.setAttribute("onmouseover","sp_all_named_unem()");sp_all_named_timerid=setInterval("sp_all_named_blink()",500);}
}
}
}
function sp_all_named_unem()
{if (sp_all_named_last)
sp_all_named_last.style.color="black";if (sp_all_named_timerid)
clearInterval(sp_all_named_timerid);sp_all_named_timerid=null;}
function sp_all_named_blink()
{sp_all_named_lastcolor=sp_all_named_lastcolor=="red" ?"black" :"red";sp_all_named_last.style.color=sp_all_named_lastcolor;}
function sp_all_cookiecheck(name)
{var Cookies=["referer","discount","payment","source","noads"];for (var n=0;n<Cookies.length;n++)
{if (Cookies[n]==name)
return 1;}
return 0;}
function sp_all_setcookie(name,value)
{var time=30*24*60*60*1000;var CookieExpires=new Date();CookieExpires.setTime(CookieExpires.getTime()+time);document.cookie=name+"="+value+"; Path=/; expires="+CookieExpires.toGMTString();}
function sp_all_getcookie(name)
{var result=null;var tmp=" "+name+"=";var cookies=" "+document.cookie+";";var start=cookies.indexOf(tmp);if (start!=-1)
{start+=tmp.length;end=cookies.indexOf(";",start);result=unescape(cookies.substring(start,end));}
return result;}
function sp_all_setcgicookies()
{var tmp="&cc_";var search=window.location.search+"&";search="&"+search.substr(1);var s=search.indexOf(tmp);while (s!=-1)
{s+=tmp.length;e=search.indexOf("=",s);if (e!=-1)
{var name=unescape(search.substring(s,e));s=e+1;e=search.indexOf("&",s);var value=sp_all_getcookie(name);if (value==null)
{value=unescape(search.substring(s,e))}
sp_all_setcookie(name,value);s=search.indexOf(tmp,e);}
else
s=-1;}
}
function sp_all_setsource()
{var source=sp_all_getcookie("source");if (!source)
{var re=/^http\:\/\/([^\/]+)(.*)$/;if (r=re.exec(document.referrer.toLowerCase()))
{r[2].replace(":","%%3a");r[2].replace(",","%%sc");if (!r[1].match("spacereg.com"))
sp_all_setcookie("source",r[1]+r[2]);}
}
}
function sp_all_updatecookies()
{var tmp=" ";var search=" "+document.cookie+";";var s=search.indexOf(tmp);while (s!=-1)
{s+=tmp.length;e=search.indexOf("=",s);var name=unescape(search.substring(s,e));s=e+1;e=search.indexOf(";",s);var value=unescape(search.substring(s,e));if (sp_all_cookiecheck(name)==1)
sp_all_setcookie(name,value);s=search.indexOf(tmp,e);}
}
function sp_add_bshow(){var node =document.getElementById("bshow");if (!node){return;}
if (!sp_all_getcookie("basket")){node.style.display ="none";}else {node.style.display ="";}
}