define("customElement",["require"],function(){function t(){this.init&&this.init()}return t.prototype.mipCreatedCallback=function(){},t.prototype.mipAttachedCallback=function(){},t.prototype.mipDetachedCallback=function(){},t.prototype.mipAttributeChangedCallback=function(){},t.prototype.inviewCallback=function(){this.isInviewer()&&this.build()},t.prototype.build=function(){},t});