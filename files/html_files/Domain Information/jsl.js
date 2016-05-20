// Copyright SpaceReg Ltd. all rights reserved
if ("jsl" in window){jslLog("jsl.js appears to be included more than once!","WARNING");}else {window.jsl={extended:{},timers:{},events:{}};if (jslBrowserType()=="IE"){jsl.events.active =[];}
if (!("jsConfig" in window)){jslLog("jsConfig is missing, some things may be broken","WARNING");}else {if (!("jsRoot" in jsConfig)){window.jsConfig.jsRoot =window.jsConfig.docRoot +"jsl/";jslLog("jsRoot is not in jsConfig, setting it to default: "+window.jsConfig.jsRoot,"LOG");}
}
}
function jslBrowserType(){if (window.navigator.userAgent.match(/MSIE/))
return "IE";if (window.navigator.userAgent.match(/Gecko\/[0-9]{8}/))
return "Gecko";if (window.navigator.userAgent.match(/KHTML/))
return "KHTML";return "unknown";}
function jslEscapeHtml(unescapedText){var spanNode=document.createElement("SPAN");var textNode=document.createTextNode(unescapedText);spanNode.appendChild(textNode);return spanNode.innerHTML;}
function jslUnescapeHtml(escapedText){if (escapedText.indexOf("<")!=-1 ||escapedText.indexOf(">")!=-1)
jslLog("The escaped text contains html tags: "+espacedText,"ERROR");var spanNode=document.createElement("SPAN");spanNode.innerHTML=escapedText;return jslGetInnerText(spanNode);}
function jslLog(msg,severity,callerName){if (arguments.length<2)
severity="ERROR";if (!("noLogging" in jsl)){if (arguments.length<3 ||callr==null)
callr=new String(arguments.callee.caller);if (arguments.length<4){var re=/^\s*function ([^\(]+)/;if (callr.match(re))
callerName=RegExp.$1;else
callerName="_window_";}
var time =new Date().getTime();if (!("logWindow" in window.jsl)){if (!("logWindow_log_win_print" in window.jsl)){window.jsl.logWindow_log_win_print =[];}
window.jsl.logWindow_log_win_print.push([time,callerName,severity,msg]);}else {var logWindow =logWindow_getInstance();if ("logWindow_log_win_print" in window.jsl){for (var n =0;n <window.jsl.logWindow_log_win_print.length;n++){var line =window.jsl.logWindow_log_win_print[n];logWindow.addLine(line[0],line[1],line[2],line[3]);}
delete window.jsl.logWindow_log_win_print;}
logWindow.addLine(time,callerName,severity,msg);}
}
if (severity=="ERROR")
alert(severity+": "+msg);}
function _jslLogOnload(){if (!("logWindow_getInstance" in window)){jsl.noLogging =1;delete window.jsl.logWindow_log_win_print;}
}
jslOnload(_jslLogOnload);function jslFunctionName(func){var name=func.toString();if (name.match(/function\s+(.+?)\s*\(/)){return RegExp.$1;}
jslLog("Could not decode function name for function: \""+func+"\" func.toString(): \""+name+"\" returning null","ERROR");return null;}
function jslObjectExtend(derived,parent){var fnm;var derivedName=jslFunctionName(derived);var parentName=jslFunctionName(parent);if (!(parentName in jsl.extended)){jsl.extended[parentName]={superRefs:{},methods:{}};for (fnm in parent.prototype)
jsl.extended[parentName].methods[fnm]=true
}
if (!(derivedName in jsl.extended))
jsl.extended[derivedName]={superRefs:{},methods:{}};var parentExtended;if (parentName in jsl.extended)
parentExtended=jsl.extended[parentName];for (fnm in derived.prototype)
jsl.extended[derivedName].methods[fnm]=true
for (fnm in parent.prototype){if (!(fnm in derived.prototype))
derived.prototype[fnm]=parent.prototype[fnm];if (parentExtended &&!(fnm in parentExtended.methods))
jsl.extended[derivedName].superRefs[fnm]=parentExtended.superRefs[fnm];else
jsl.extended[derivedName].superRefs[fnm]=parent;}
}
function jslObjCallSuper(derivedObj,methodName,args){if (arguments.length<3)
args=[];var derivedName;if ("_jslSuperContext" in derivedObj)
derivedName=derivedObj._jslSuperContext[derivedObj._jslSuperContext.length-1];else {derivedName=jslFunctionName(derivedObj.constructor);if (!(methodName in jsl.extended[derivedName].methods))
derivedName=jslFunctionName(jsl.extended[derivedName].superRefs[methodName]);}
if (derivedName in jsl.extended){if (methodName in jsl.extended[derivedName].superRefs){var parent=jsl.extended[derivedName].superRefs[methodName];var parentName=jslFunctionName(parent);var stored={};for (var fnm in parent.prototype){stored[fnm]=derivedObj[fnm];derivedObj[fnm]=parent.prototype[fnm];}
if (!("_jslSuperContext" in derivedObj))
derivedObj._jslSuperContext=[];derivedObj._jslSuperContext.push(parentName);var rc=parent.prototype[methodName].apply(derivedObj,args);for (var fnm in stored){derivedObj[fnm]=stored[fnm];}
derivedObj._jslSuperContext.pop();if (derivedObj._jslSuperContext.length==0)
delete derivedObj._jslSuperContext;return rc;}
}
jslLog("No method named \""+methodName+"\" in \""+derivedName+"\" parents","ERROR");}
function jslGetXMLHttpRequest(){var req;try {req=new XMLHttpRequest();}catch (e){try {req=new ActiveXObject("Microsoft.XMLHTTP");}catch (e){jslLog("jslGetXMLHttpRequest fatal error, XMLHttpRequest is not supported by this browser!","ERROR");return null;}
}
return req;}
function jslNeedsFunctionality(callerLabel,requiredList){for (var n=0;n<requiredList.length;n++){var nm=requiredList[n];if ("jslNeedsFunctionalityTest_"+nm in window){jslLog("Testing \""+nm+"\" for \""+callerLabel+"\"","DEBUG");if (!window["jslNeedsFunctionalityTest_"+nm]())
jslLog("Functionality test for \""+nm+"\", used by \""+callerLabel+"\", failed.","ERROR");}else
jslLog("Functionality test for \""+nm+"\", used by \""+callerLabel+"\", is not implemented","WARNING");}
}
function jslNeedsFunctionalityTest_jslGetComputedStyle(){return jslGetComputedStyle(document.body,"font-size")!="";}
function jslNeedsFunctionalityTest_documentActiveElement(){if (!("activeElement" in document))
jslOnload(_jslActiveElementEmulate);return true;}
function jslNeedsFunctionalityTest_jslGetMousePosition(){_jslInitMousePosition();return true;}
function jslNeedsFunctionalityTest_jslSetMouseCapture(){return true;}
function jslNeedsFunctionalityTest_jslGetXMLHttpRequest(){var req=jslGetXMLHttpRequest();if (req==null)
return false;return true;}
function jslGetTarget(e){var tNode;if (!e)var e =window.event;if (e.target){tNode =e.target;}else if (e.srcElement){tNode =e.srcElement;}
if (tNode.nodeType ==3)tNode =tNode.parentNode;return tNode;}
function jslRegisterEventHandler(node,eventName,handler,obj){var n;if (!("jslEvent" in node))
node.jslEvent={};if (!(eventName in node.jslEvent)){node.jslEvent[eventName]=[];if (!("instanceName" in node)){if (eventName.match("^jsl(.+)$")){var fn="_jslRegisterEventHandler"+RegExp.$1;if (fn in window)
window[fn](node);else
jslLog("Unknown event \""+eventName+"\"");}else {if ("addEventListener" in node)node.addEventListener(eventName,_jslEventHandler,false);else node.attachEvent("on"+eventName,_jslEventHandler);}
}
}
for (n in node.jslEvent[eventName]){var r=node.jslEvent[eventName][n];if (r.handler==handler &&
((arguments.length==3 &&!("obj" in r))||
(arguments.length==4 &&"obj" in r &&r.obj==obj))){node.jslEvent[eventName].splice(n,1);break;}
}
var r={handler:handler};if (arguments.length==4)
r.obj=obj;node.jslEvent[eventName].push(r);}
function jslUnregisterEventHandler(node,eventName,handler,obj){if (!("jslEvent" in node)||(!(eventName in node.jslEvent)&&arguments.length>1)){jslLog("Cannot unregister inexistant event handler","ERROR");return;}
if (arguments.length==1){var eventName;for (eventName in node.jslEvent)
jslUnregisterEventHandler(node,eventName);return;}
if (arguments.length>2){for (var n in node.jslEvent[eventName]){var r=node.jslEvent[eventName][n];if ((arguments.length==4 &&obj==r.obj &&handler==r.handler)||
(arguments.length==3 &&r.handler==handler)){node.jslEvent[eventName].splice(n,1);}
}
}
if (arguments.length==2 ||node.jslEvent[eventName].length==0){delete node.jslEvent[eventName];if (!("instanceName" in node)){if ("removeEventListener" in node)node.removeEventListener(eventName,_jslEventHandler,false);else node.detachEvent("on"+eventName,_jslEventHandler);}
}
}
function jslGetEventsRegisteredOnNode(node){if ("jslEvent" in node){return node.jslEvent;}
return false;}
function jslFireEvent(event,node){if (!("type" in event)){jslLog("No type in event: "+jslJSONEncode(event),"ERROR");return;}
event._fireEvent=true;return _jslEventHandler(event,node);}
function _jslEventHandler(event,node){if (!event)event=window.event;if ("eventCapture" in jsl &&event.type in jsl.eventCapture.events){if (node !=jsl.eventCapture.node ||"fired" in jsl.eventCapture){if ("preventDefault" in event)
event.preventDefault();return false;}
jsl.eventCapture.fired=true;}
if (arguments.length==1){if (!window.event ||jslBrowserType()=="KHTML")node=this;else {if (event.srcElement!=null)event.target=event.srcElement;else
event.target=window;var activeIndex;for (activeIndex =0;activeIndex <jsl.events.active.length;activeIndex++){var active =jsl.events.active[activeIndex];if (active.type ==event.type &&active.target ==event.target){active.atIndex++;break;}
}
if (activeIndex ==jsl.events.active.length){var nodes =[];node=event.target;while (node){if ("jslEvent" in node &&event.type in node.jslEvent){nodes.push(node);}
node=node.parentNode;}
jsl.events.active[activeIndex]={type:event.type,target:event.target,nodes:nodes,atIndex:0};}
var active =jsl.events.active[activeIndex];node =active.nodes[active.atIndex];if (active.nodes.length ==(active.atIndex +1)){jsl.events.active.splice(activeIndex,1);}
if (!node){jslLog("The event "+event.type+" does not appear to have been registered on a parent of the node "+event.srcElement.nodeName+" "+event.srcElement.id,"DEBUG");return true;}
}
}
if (event.type !="mousemove" &&!("_noLog" in event)){jslLog("event="+event.type+" node="+node.nodeName+("name" in node ?" (name="+node.name+")" :""),"DEBUG");}
var rc =true;if ("returnValue" in event){rc=event.returnValue;}
if (!("preventDefault" in event)){event.preventDefault=function (){rc=false};}
if (!("stopPropagation" in event)){event.stopPropagation=function (){jslLog("stopPropagation not implemented in "+event.type,"ERROR")};}
var recs=("jslEvent" in node &&event.type in node.jslEvent)?node.jslEvent[event.type]:null;if (recs==null){if ("nodeName" in node &&!("_fireEvent" in event))jslLog("The event "+event.type+" does not appear to be registered on this node "+node.nodeName+" "+node.id,"DEBUG");recs =[];}
for (var n=0;n<recs.length;n++){var r=recs[n];if ("obj" in r){r.obj[r.handler](event,node);}else
r.handler(event,node);}
return rc;}
function _jslRegisterEventHandlerChange(node){if (!("Change" in jsl.events)){jsl.events.Change=[];jslSetTimeout(50,_jslPollEventChange,null);}
var rec={node:node,oldValue:node.value};jsl.events.Change.push(rec);}
function _jslPollEventChange(){var n;for (n=0;n<jsl.events.Change.length;n++){var rec=jsl.events.Change[n];if (rec.node.value!=rec.oldValue){jslLog(n+": "+rec.node.nodeName+" was \""+rec.oldValue+"\", is now \""+rec.node.value+"\"","DEBUG");var event={type:"jslChange",oldValue:rec.oldValue};_jslEventHandler(event,rec.node);rec.oldValue=rec.node.value;}
}
if (n==0)
delete jsl.events.Change;else
jslSetTimeout(50,_jslPollEventChange,null);}
function jslInclude(uri){if (!("include" in jsl)){jsl.include ={added:{},
loading:[],
data:{}
};}
if (!("loading" in jsl.include)){jslLog("jslInclude called after the document has finished loading","ERROR");return;}
if (!(uri in jsl.include.added)){jslLog("Loading "+uri,"DEBUG");jsl.include.added[uri]=1;jsl.include.loading.push(uri);var req=jslGetXMLHttpRequest();req.open("GET",uri,true);req.onreadystatechange=function(){try {if (req.readyState==4){if (!req.status){jslLog("jslInclude["+uri+"] Transfer interrupted","DEBUG");return;}
if (req.status==200){jslLog("jslInclude["+uri+"] got data","DEBUG");jsl.include.data[uri]=req.responseText;_jslIncludeCheckLoading();}else {jslLog("jslInclude["+uri+"] HTTP status "+req.status,"DEBUG");}
}
}catch (e){jslLog("jslInclude["+uri+"] Transfer interrupted (e="+e+")","DEBUG");return;}
};req.send(null);}
}
function _jslIncludeCheckLoading(){if (jsl.include.loading.length <1){if ("onload" in jsl.include){delete jsl.include.onload;_jslOnloadHandler();}
return;}
var uri =jsl.include.loading[0];if (uri in jsl.include.data){jslLog("jslInclude["+uri+"] Evaluating","DEBUG");eval(jsl.include.data[uri]);delete jsl.include.data[uri];jsl.include.loading.shift();_jslIncludeCheckLoading();}
}
function jslOnload(handler,obj,priority){if (!priority)
priority=100;jslLog("Adding onload handler ["+("onload" in jsl ?jsl.onload.length+"]" :"empty]"),"DEBUG");if (!("onload" in jsl)){jslLog("Creating jsl onload handler","DEBUG");jsl.onload=[];var tmp=window.onload;window.onload=_jslOnloadHandler;if (tmp &&tmp!=_jslOnloadHandler){jslLog("window.onload already in use, bootstrapping it to the jsl onload infrastructure","DEBUG");jsl.onload.push({handler:tmp,priority:100});}
}
var rec;if (obj)
rec={handler:handler,obj:obj,priority:priority};else
rec={handler:handler,priority:priority};jsl.onload.push(rec);}
function _jslOnloadHandler(){if ("include" in jsl){if (jsl.include.loading.length >=1){jsl.include.onload =1;return;}
delete jsl.include.onload;delete jsl.include.loading;delete jsl.include.data;}
if (!("onload" in jsl))
return;var recs=jsl.onload;delete jsl.onload;jslLog("Calling "+recs.length+" onload handlers","DEBUG");recs=recs.sort(function(a,b){if (a.priority==b.priority)return 0;return a.priority>b.priority ?1 :-1;});for (var n=0;n<recs.length;n++){var r=recs[n];jslLog("Calling onload handler "+n+": "+jslJSONEncode(r),"DEBUG");try {if ("obj" in r){r.obj[r.handler]();}else {r.handler();}
}catch (err){jslLog("Error calling onload handler "+n+", handler="+r.handler,"ERROR");}
}
delete jsl.onload;}
function jslJSONDecode(text){return JSON.parse(text);}
function jslJSONEncode(obj){return JSON.stringify(obj);}
if (!("JSON" in window)){jslInclude(window.jsConfig.jsRoot+"compat/json.js");}
function jslSetTimeout(msec,handler,arg,obj){var r={handler:handler,arg:arg};if (arguments.length==4)
r.obj=obj;var id=new Date().getTime()+Math.random();while (id in jsl.timers)
id=new Date().getTime()+Math.random();r.id=id;r.bid=setTimeout('_jslTimeout('+id+')',msec);jsl.timers[id]=r;return id;}
function jslClearTimeout(id){var r=jsl.timers[id];clearTimeout(r.bid);delete jsl.timers[id];}
function _jslTimeout(id){if (id in jsl.timers){var r=jsl.timers[id];delete jsl.timers[id];if ("obj" in r)
r.obj[r.handler](r.arg);else
r.handler(r.arg);}else
jslLog("Invalid timeout id "+id,"ERROR");}
function jslSetMouseCapture(domNode){jslLog("Setting mouse capture to node "+domNode.nodeName,"DEBUG");if ("eventCapture" in jsl){jslLog("Refusing to capute mouse events when they are alreay captured","ERROR");return;}
var mouseEvents={mouseup:true,mousedown:true,mousemove:true,click:true,contextmenu:true};jsl.eventCapture={node:domNode,events:mouseEvents};if ("addEventListener" in this){for (var eventName in jsl.eventCapture.events)
document.body.addEventListener(eventName,_jslMouseEvent,false);}else {for (var eventName in jsl.eventCapture.events)
document.body.attachEvent("on"+eventName,_jslMouseEvent);}
}
function jslReleaseMouseCapture(){if (!("eventCapture" in jsl)){jslLog("Refusing to release mouse capture when they are node being captured","ERROR");return;}
if ("removeEventListener" in this){for (var eventName in jsl.eventCapture.events)
document.body.removeEventListener(eventName,_jslMouseEvent,false);}else {for (var eventName in jsl.eventCapture.events)
document.body.detachEvent("on"+eventName,_jslMouseEvent);}
var domNode=jsl.eventCapture.node;delete jsl.eventCapture;jslLog("Releasing mouse capture from node "+domNode.nodeName,"DEBUG");}
function _jslMouseEvent(event){if (!("fired" in jsl.eventCapture)){if (arguments.length==0)
event=window.event;_jslEventHandler(event,jsl.eventCapture.node);if ("eventCapture" in jsl)delete jsl.eventCapture.fired;return;}
delete jsl.eventCapture.fired;}
function _jslInitMousePosition(){if (document.body){jsl.mousePosition={x:0,y:0};jslRegisterEventHandler(document.body,"mousemove",_jslMousePositionEvent);}else
jslSetTimeout(10,_jslInitMousePosition,null);}
function _jslMousePositionEvent(event){jsl.mousePosition.x=event.clientX;jsl.mousePosition.y=event.clientY;}
function jslGetMousePosition(){jslLog("Mouse position: "+jslJSONEncode(jsl.mousePosition),"DEBUG");return jsl.mousePosition;}
function jslSetGloballyBusy(){if (!("globallyBusy" in jsl)){jslWorkaroundIEComboBoxBug();var windowWidth=document.body.scrollWidth;var windowHeight=document.body.scrollHeight>document.body.clientHeight ?document.body.scrollHeight:document.body.clientHeight;var node=document.createElement("div");document.body.appendChild(node);node.style.cursor="progress";node.style.position="absolute";node.style.left="0px";node.style.top="0px";node.style.width=windowWidth+"px";node.style.height=windowHeight+"px";if (jslBrowserType()=="IE"){node.style.filter="alpha(opacity=0)";node.style.backgroundColor="black";}
jsl.globallyBusy={ncalls:1,node:node};}else
jsl.globallyBusy.ncalls++;jslLog("Set globally busy, ncalls="+jsl.globallyBusy.ncalls,"DEBUG");}
function jslClearGloballyBusy(){if (!("globallyBusy" in jsl)){jslLog("globallyBusy was not set!","ERROR");return;}
jsl.globallyBusy.ncalls--;jslLog("Cleared globally busy, ncalls="+jsl.globallyBusy.ncalls,"DEBUG");if (jsl.globallyBusy.ncalls==0){jsl.globallyBusy.node.parentNode.removeChild(jsl.globallyBusy.node);delete jsl.globallyBusy;jslRestoreFromIEComboBoxWorkaround();}
}
function _jslActiveElementEmulate(){jslLog("Emulating IE document.activeElement functionality","DEBUG");jslRegisterEventHandler(document.body,"focus",_jslActiveElementOnClickHandler);}
function _jslActiveElementOnClickHandler(event){document.activeElement=event.target;}
function jslGetInnerText(node){if ("innerText" in node)
return node.innerText;if ("textContent" in node)
return node.textContent;jslLog("Get innet text is not implemented for this platform: "+window.navigator.userAgent,"ERROR");}
function jslGetPosition(node){var p={x:node.offsetLeft,y:node.offsetTop};node=node.offsetParent;while (node){p.x+=node.offsetLeft;p.y+=node.offsetTop;node=node.offsetParent;}
return p;}
function jslSetPosition(node,p){node.style.position="absolute";node.style.left=p.x+"px";node.style.top=p.y+"px";}
function jslGetSize(node){var s={width:node.offsetWidth,height:node.offsetHeight};return s;}
function jslSetSize(node,s){node.style.width=s.width+"px";node.style.height=s.height+"px";}
function jslGetComputedStyle(node,cssRuleName){if(document.defaultView &&document.defaultView.getComputedStyle){return document.defaultView.getComputedStyle(node,"").getPropertyValue(cssRuleName);}
if(node.currentStyle){cssRuleName=cssRuleName.replace(/\-(\w)/g,function (strMatch,p1){return p1.toUpperCase();});return node.currentStyle[cssRuleName];}
return "";}
function jslGetDOMNodeAt(x,y,referenceNode){if (arguments.length <3){referenceNode =document.body;}
if (!(x >=referenceNode.offsetLeft &&y >=referenceNode.offsetTop &&
x <=(referenceNode.offsetLeft +referenceNode.offsetWidth)&&
y <=(referenceNode.offsetTop +referenceNode.offsetHeight))){return;}
while (1){x -=referenceNode.offsetLeft;y -=referenceNode.offsetTop;var n;var node;for (n =0;n <referenceNode.childNodes.length;n++){node =referenceNode.childNodes[n];if (x >=node.offsetLeft &&y >=node.offsetTop &&
x <=(node.offsetLeft +node.offsetWidth)&&
y <=(node.offsetTop +node.offsetHeight)){referenceNode =node;break;}
}
if (n >=referenceNode.childNodes.length){return referenceNode;}else {referenceNode =node;}
}
}
function jslAmmendStyleClass(domNode,addClassName,removeClassName){var className=" "+domNode.className+" ";if (removeClassName!=""){while (1){var n=className.indexOf(removeClassName+" ");if (n!=-1)
className=className.substring(0,n)+" "+className.substring(n+removeClassName.length);else
break;}
}
if (addClassName!="" &&className.indexOf(addClassName+" ")==-1)
className=className+" "+addClassName;className=className.replace(/ +/g," ");jslLog("\""+domNode.className+"\" -> adding \""+addClassName+"\", removing \""+removeClassName+"\" -> \""+className+"\"","DEBUG");domNode.className=className.substring(1);}
function jslSelectionClear(){if ("getSelection" in window){window.getSelection().removeAllRanges();return;}
if ("selection" in document){document.selection.clear();return;}
jslLog("Clear selection not implemented for this platform: "+window.navigator.userAgent,"ERROR");}
function _jslGetWindowDimensions(node){var winDim={bodyWidth:node.clientWidth ?node.clientWidth :0,
bodyHeight:node.clientHeight,
bodyScrollWidth:node.scrollWidth,
bodyScrollHeight:node.scrollHeight,
bodyScrollLeft:node.scrollLeft,
bodyScrollTop:node.scrollTop
};return winDim;}
function jslGetWindowDimensions(){var bodyNode =document.getElementsByTagName("HTML")[0];winDim=_jslGetWindowDimensions(bodyNode);jslLog("HTML node dimensions: "+jslJSONEncode(winDim),"DEBUG");if (winDim.bodyWidth==0){winDim=_jslGetWindowDimensions(document.body);jslLog("BODY node dimensions: "+jslJSONEncode(winDim),"DEBUG");}
jslLog("Final dimensions: "+jslJSONEncode(winDim),"DEBUG");return winDim;}
function jslGetCookie(name){var cookies ="; "+document.cookie+"; ";var start =cookies.indexOf("; "+name+"=");if (start !=-1){cookies =cookies.substring(start +name.length +3);if (cookies.match(/^([^;]+);/))
return RegExp.$1;}
return "";}
function jslSetCookie(name,content,expiry,path){if (arguments.length <4){path ="/";}
name =""+name;content =""+content;if (name.match(/=/)){jslLog("The cookie name cannot contain an =","ERROR");}
if (content.match(/;/)){jslLog("The cookie conteny cannot contain a ;","ERROR");}
var cookie =name+'='+content;if (expiry){cookie +=';expires='+expiry.toGMTString();}
cookie +=';path='+path;document.cookie =cookie;jslLog("Added cookie: "+cookie,"DEBUG");}
function jslWorkaroundIEComboBoxBug(){}
function jslRestoreFromIEComboBoxWorkaround(){}
if (jslBrowserType()=="IE"){jslInclude(window.jsConfig.jsRoot+"compat/ie6.js");}
function simpleObjectConstructFromTemplate(template){var obj;var objType =template[0];if (!(objType in window)){jslLog("There does not appear to be a constructor for object "+objType+" in the window","ERROR");}
var evalText ="obj = new "+objType+"(";for (var n =1;n <template.length;n++){evalText +="template["+n+"]";if (n <template.length -1){evalText +=",";}
}
evalText +=")";try {eval(evalText);}catch (e){jslLog("Could not create "+objType+" object from template: "+jslJSONEncode(template),"ERROR");eval(evalText);}
return obj;}
function simpleObject(){}
simpleObject.prototype.instanceName=function(){return jslFunctionName(this.constructor);}
simpleObject.prototype.callSuper=function(methodName,args){if (arguments.length==1)
args=[];return jslObjCallSuper(this,methodName,args);}
simpleObject.prototype.fireEvent=function(event,node){if (arguments.length==1)
node=this;jslLog("Firing event \""+event.type+"\" from "+this.instanceName()+" on "+("nodeName" in node ?node.nodeName :node.instanceName()),"DEBUG","simpleObject.fireEvent");return jslFireEvent(event,node);}
simpleObject.setObjectName=function(name){this._simpleObjectName=name;}
simpleObject.getObjectName=function(){if (!("_simpleObjectName" in this)){jslLog("Object has no name!","ERROR");return;}
return this._simpleObjectName;}
