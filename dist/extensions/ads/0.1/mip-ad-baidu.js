define("extensions/ads/0.1/mip-ad-baidu",["require","customElement"],function(i){function t(){if(!this.isRender){this.isRender=!0;var i=$(this),t=i.data("cproid");t&&(e(),n(i,t))}}function e(){var i=document.getElementById("MIP_DUP_JS");if(!i){var t=document.createElement("script");t.src="//dup.baidustatic.com/js/dm.js",t.id="MIP_DUP_JS",document.body.appendChild(t)}}function n(i,t){var e="_"+Math.random().toString(36).slice(2),n='<div style="" id="'+e+'"></div>';i.append(n),(window.slotbydup=window.slotbydup||[]).push({id:t,container:e,display:"inlay-fix",async:!0})}var d=i("customElement");return d.prototype.init=function(){this.build=t},d}),require(["extensions/ads/0.1/mip-ad-baidu"],function(i){MIP.registerMipElement("mip-ad-baidu",i)});