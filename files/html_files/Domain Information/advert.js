// Copyright SpaceReg Ltd. all rights reserved
function _advertOnload(){var advertNode =document.getElementById("advert");var aNodes =advertNode.getElementsByTagName("A");for (var n=0;n<aNodes.length;n++){var aNode =aNodes[n];jslRegisterEventHandler(aNode,"click",_advertClick);}
}
jslOnload(_advertOnload);function _advertClick(event,node){if (node.href.match(/cc_source=/)){return;}
if (node.href.match(/\?/)){node.href +="&";}else {node.href +="?";}
node.href +="cc_source=spad";}
