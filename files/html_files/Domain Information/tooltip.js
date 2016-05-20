// Copyright SpaceReg Ltd. all rights reserved
jslNeedsFunctionality("tooltip",["jslSetMouseCapture","jslGetMousePosition"]);function tooltip(){}
tooltip.prototype.attachtoNode =function (docNode,tipNode){if ("docNode" in this){jslLog("This tooltip is already attached","ERROR","tooltip.attachtoNode");}
if (tipNode.parentNode){tipNode.parentNode.removeChild(tipNode);}
tipNode.style.display ="inline";this.container =tipNode;this.docNode =docNode;jslRegisterEventHandler(docNode,"mouseover","_waitBeforeShow",this);var parentNode =docNode.parentNode;while (parentNode.nodeName !="A" &&parentNode.parentNode){parentNode =parentNode.parentNode;}
if (parentNode.nodeName !="A"){jslRegisterEventHandler(docNode,"click","_clickBeforeShow",this);}
}
tooltip.prototype._waitBeforeShow =function (event,node){if (arguments.length ==2){if (event.type =="mouseover"){jslRegisterEventHandler(this.docNode,"mouseout","_waitBeforeShow",this);jslRegisterEventHandler(document.body,"mousemove","_waitBeforeShow",this);this.waitBeforeShowTimeoutId =jslSetTimeout(750,"_waitBeforeShow",null,this);}else {jslClearTimeout(this.waitBeforeShowTimeoutId);delete this.waitBeforeShowTimeoutId;if (event.type =="mouseout"){jslUnregisterEventHandler(this.docNode,"mouseout","_waitBeforeShow",this);jslUnregisterEventHandler(document.body,"mousemove","_waitBeforeShow",this);}else {this.waitBeforeShowTimeoutId =jslSetTimeout(750,"_waitBeforeShow",null,this);}
}
}else {jslUnregisterEventHandler(this.docNode,"mouseout","_waitBeforeShow",this);jslUnregisterEventHandler(document.body,"mousemove","_waitBeforeShow",this);this._show();}
}
tooltip.prototype._clickBeforeShow =function (event,node){if ("waitBeforeShowTimeoutId" in this){jslClearTimeout(this.waitBeforeShowTimeoutId);delete this.waitBeforeShowTimeoutId;jslUnregisterEventHandler(this.docNode,"mouseout","_waitBeforeShow",this);jslUnregisterEventHandler(document.body,"mousemove","_waitBeforeShow",this);}
jslSetTimeout(10,"_show",null,this);}
tooltip.prototype._show =function (){if (!("showing" in this)){if ("tooltip" in jsl){jsl.tooltip._hide();}
var p =jslGetMousePosition();var winDim =jslGetWindowDimensions();p.x +=winDim.bodyScrollLeft;p.y +=winDim.bodyScrollTop;this.addToDocument(document.body);jslSetPosition(this.container,p);jslRegisterEventHandler(this.container,"click","_hide",this);jslRegisterEventHandler(this.container,"mouseout","_hide",this);jslSetMouseCapture(this.container);this.showing =1;jsl.tooltip =this;var event ={type:"tooltipShow",docNode:this.docNode};jslFireEvent(event,this.container);}
}
tooltip.prototype._hide =function (event,docNode){if ("showing" in this){jslUnregisterEventHandler(this.container,"click","_hide",this);jslUnregisterEventHandler(this.container,"mouseout","_hide",this);jslReleaseMouseCapture();this.removeFromDocument();delete this.showing;delete jsl.tooltip;var event ={type:"tooltipHide",docNode:docNode};jslFireEvent(event,this.container);}
}
jslObjectExtend(tooltip,simpleGUIEl);