// Copyright SpaceReg Ltd. all rights reserved
function ajaxRpc(uri,message,callback,obj){jslFireEvent({type:"ajaxStart",url:uri},document.body);var req=jslGetXMLHttpRequest();if (!("sessionId" in message)){var sessionId =jslGetCookie("session");if (sessionId !=""){message.sessionId =sessionId;}
}
message=jslJSONEncode(message);jslLog(uri+" "+message,"DEBUG");req.open("POST",uri,true);req.setRequestHeader("Content-Type","application/json");req.onreadystatechange=function(){try {if (req.readyState==4){jslLog("ajaxRPC "+uri+" callback ("+(obj ?obj.instanceName()+"."+callback:callback)+") ready: "+req.responseText,"DEBUG");var message;if (!req.status){jslLog("ajaxRPC Transfer interrupted","DEBUG");return;}
if (req.status==200){message=jslJSONDecode(req.responseText);}else {message={error:{text:req.status+": "+req.statusText,"class":"ajaxRPC:network",statusCode:req.status}};}
if ("error" in message){_ajaxOnError(message);}else {if (obj)
obj[callback](message);else
callback(message);}
jslFireEvent({type:"ajaxEnd",url:uri},document.body);}
}catch (e){jslLog("ajaxRPC Transfer interrupted (e="+e+")","DEBUG");jslFireEvent({type:"ajaxEnd",url:uri,exception:e},document.body);return;}
};req.send(message);}
function _ajaxOnError(message){jslLog(message.error.text);}
function axaxFormNodeToTemplate(formNode){var objects ={};for (var n =0;n <formNode.elements.length;n++){var node =formNode.elements[n];var type =node.type;var value =node.value;if (node.type.match("^select")){type ="select";value =node.options[node.selectedIndex].value;if (value ==""){value =jslGetInnerText(node.options[node.selectedIndex]);}
}
objects[node.name]={type:type,
attr:{value:value}
}
}
return {objects:objects};}