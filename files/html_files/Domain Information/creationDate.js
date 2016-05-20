// Copyright SpaceReg Ltd. all rights reserved
function creationDate(){}
creationDate.prototype._onLoad =function(){var node =document.getElementById("creationdate");this.creationTimestamp =parseInt(jslGetInnerText(node));var creationDate =new Date(this.creationTimestamp);while (node.firstChild){node.removeChild(node.firstChild);}
node.appendChild(document.createTextNode("Created at "+creationDate.toUTCString()));node.style.display="";this._checkDate();}
creationDate.prototype._checkDate =function(){var e =document.getElementById("checkdate");if (e){var now =new Date().getTime();var daysold =(now -this.creationTimestamp)/(1000*60*60*24);while (e.firstChild){e.removeChild(e.firstChild);}
if (daysold>1){e.appendChild(document.createTextNode("Warning: This page is more than "+Math.floor(daysold)+" days old, please reload for more up to date information."));}
}
}
creationDate.prototype.getCreationTimestamp =function(){return this.creationTimestamp;}
jslObjectExtend(creationDate,simpleObject);window.jsl.creationDate =new creationDate();jslOnload("_onLoad",window.jsl.creationDate,1);function creationDate_getInstance(){return window.jsl.creationDate;}
