// Copyright SpaceReg Ltd. all rights reserved
function simpleGUIEl(node){this.container=node;}
simpleGUIEl.prototype.addToDocument=function(parent){if ("createDocumentElements" in this)
this.createDocumentElements();if (!("container" in this)){jslLog("Refusing to attach an object to the document because it has no container!","ERROR");return;}
if (arguments.length==0)
parent=document.body;parent.appendChild(this.container);jslLog("Added "+this.container.nodeName+", class: "+this.container.className+", innerHTML: "+this.container.innerHTML,"DEBUG","simpleGUIEl.addToDocument");if ("addedToDocument" in this)
this.addedToDocument();}
simpleGUIEl.prototype.removeFromDocument=function(){if ("destroyDocumentElements" in this)
this.destroyDocumentElements();this.container.parentNode.removeChild(this.container);if ("removedFromDocument" in this)
this.removedFromDocument();}
simpleGUIEl.prototype.setVisible=function(visible){this.container.style.display =visible ?"" :"none";}
simpleGUIEl.prototype.getPosition=function(){return jslGetPosition(this.container);}
simpleGUIEl.prototype.setPosition=function(p){jslSetPosition(this.container,p);}
simpleGUIEl.prototype.getSize=function(){return jslGetSize(this.container);}
simpleGUIEl.prototype.setSize=function(s){jslSetSize(this.container,s);}
jslObjectExtend(simpleGUIEl,simpleObject);