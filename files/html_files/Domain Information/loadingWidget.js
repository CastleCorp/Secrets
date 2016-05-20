// Copyright SpaceReg Ltd. all rights reserved
function _loadingWidget_onloadStart(){if ("loadingWidget_timeout" in window &&window.loadingWidget_timeout !=-1){clearTimeout(window.loadingWidget_timeout);}
}
function _loadingWidget_onloadEnd(){if ("loadingWidget_timeout" in window &&window.loadingWidget_timeout !=-1){_loadingWidget_end()
}
}
jslOnload(_loadingWidget_onloadStart,null,1);jslOnload(_loadingWidget_onloadEnd,null,1000000000);