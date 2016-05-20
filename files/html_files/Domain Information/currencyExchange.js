// Copyright SpaceReg Ltd. all rights reserved
jslNeedsFunctionality("currencyExchange",["jslGetXMLHttpRequest"]);function _currencyExchange_onLoad(){var tooltipNode =document.createElement("DIV");tooltipNode.className ="tooltipTipNode cur";jslRegisterEventHandler(tooltipNode,"tooltipShow",_currencyExchange_onShow);var nodes =document.body.getElementsByTagName("SPAN");for (var n=0;n<nodes.length;n++){if (nodes[n].className =="cur"){new tooltip().attachtoNode(nodes[n],tooltipNode);}
}
}
function _currencyExchange_onShow(event,tipNode){while (tipNode.firstChild){tipNode.removeChild(tipNode.firstChild);}
if (!("currencyExchange" in jsl)){tipNode.appendChild(document.createTextNode("Loading..."));var ajaxReq ={consumer:"My::DomReg::AMAConsumer::ExchangeRates"};ajaxRpc(window.jsConfig.ajaxUrl,ajaxReq,_currencyExchange_rateCb);jsl.currencyExchange ={};}
jsl.currencyExchange.tipNode =tipNode;jsl.currencyExchange.docNode =event.docNode;_currencyExchange_renderCurrencies();}
function _currencyExchange_renderCurrencies(){if (!("rate" in jsl.currencyExchange)){jslSetTimeout(500,_currencyExchange_renderCurrencies);return;}
if ("tipNode" in jsl.currencyExchange){var tipNode =jsl.currencyExchange.tipNode;while (tipNode.firstChild){tipNode.removeChild(tipNode.firstChild);}
tipNode.style.textAlign ="right";jslGetInnerText(jsl.currencyExchange.docNode).match(/(\S+)\s+([A-Z]{3})/);var amount =RegExp.$1;var currency =RegExp.$2;while (amount.match(/,/))
amount =amount.replace(/,/,"");amount =parseFloat(amount);var exchange ={};exchange[currency]=amount;if (currency !="USD"){exchange.USD =amount /jsl.currencyExchange.rate[currency];}
jslLog(jslJSONEncode(jsl.currencyExchange.rate),"DEBUG");jslLog(jslJSONEncode(exchange),"DEBUG");var currencies =["BTC","EUR","GBP","USD"];for (var n=0;n<currencies.length;n++){currency =currencies[n];if (currency in exchange){amount =exchange[currency];}else {amount =exchange.USD *jsl.currencyExchange.rate[currency];}
amount =(amount +0.005)+"00";amount.match(/(\d+)(\.\d\d)/);var amountString =RegExp.$2;amount =RegExp.$1;while (amount.match(/(\d+)(\d\d\d)/)){amountString ="," +RegExp.$2 +amountString;amount =RegExp.$1;}
amountString =amount +amountString;if (tipNode.firstChild)
tipNode.appendChild(document.createElement("BR"));tipNode.appendChild(document.createTextNode(amountString+" "+currency));}
delete jsl.currencyExchange.tipNode;delete jsl.currencyExchange.docNode;}
}
function _currencyExchange_rateCb(ajaxRes){jsl.currencyExchange.rate =ajaxRes.data;_currencyExchange_renderCurrencies();}
jslOnload(_currencyExchange_onLoad);