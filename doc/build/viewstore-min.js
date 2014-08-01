/*! trees - v2.0.0 - 2013-09-25 4:12:06 PM
* Copyright (c) 2013 桐人; Licensed  */
KISSY.add("kg/trees/2.0.0/store",function(a){function b(c){var d=this;c=a.merge(b.config,c),b.superclass.constructor.call(d,c),d.events=["load","searchTree"],d._init()}return b.config={url:null,requestType:"get",idKey:null,param:{},data:[],isJsonp:!1,autoLoad:!0,adapterForNode:{id:"id",value:"value",children:"children",parent:"parent",isleaf:"isleaf"},adapterForData:{success:"success",nodes:"nodes",message:"message"},dataErrorFunc:function(){}},a.extend(b,a.Base),a.augment(b,{isTreeReady:function(a,b){var c,d=this,e=d.get("adapterForNode"),f=!0;if(a){if(a[e.isleaf])return!0;c=a[e.children]}else c=d.getTreeData();if(0===c.length&&(f=!1),!f){var g=a?a[e.id]:null;d.load(g,null,b)}return f},load:function(b,c,d,e){var f=this,g=f.get("adapterForData"),h=f.get("idKey"),e=e||!1,i=f._getParam(b),j={type:f.get("requestType"),dataType:"json"};if(c=c||f.get("url"),!c)throw"please assign the URL of Data for Tree!";f.get("isJsonp")&&(j=a.merge(j,{type:"get",dataType:"jsonp",cache:!1,crossDomain:!0})),a.io(a.merge(j,{url:c,data:i,success:function(a){a&&a[g.success]===!0&&a[g.nodes].length>0?(f.fire("load",{data:a[g.nodes],id:e?null:i[h]||null,param:i}),d&&d()):f._dataError(a?a[g.message]:"")},error:function(){f._dataError("\u8bf7\u6c42\u5f02\u5e38\uff01")}}))},initLoad:function(){var a=this;a.get("url")?a.load():a.setTreeData(a.get("data"))},traverseTreeById:function(a){var b,c=this,d=c.get("adapterForNode"),e=c.getTreeData(),f=[],g=[],h=[];return b=function(c,e){if(e=e||0,c)for(var i=0;i<c.length;i++){var j=c[i];if(j[d.id]===a||!j[d.isleaf]&&b(j[d.children],e+1))return f[e]=j[d.id],g[e]=j[d.value],h[e]=j,!0}return!1},a&&b(e),{path:f,valuePath:g,pathNode:h,node:h[h.length-1]||null}},traverseTreeByText:function(b){var c,d=this,e=d.get("adapterForNode"),f=d.getTreeData(),g=[],h=[],i=[],j=[],k=[],l=[];return c=function(f,m){if(m=m||0,f)for(var n=0;n<f.length;n++){for(var o=g.length-m-1,p=f[n],q=0;o>q;q++)g.pop(),i.pop(),h.pop();g[m]=p[e.id],i[m]=p[e.value],h[m]=p,p[e.value].indexOf(b)>-1&&(j.push(a.clone(g)),l.push(a.clone(i)),k.push(d.dataFilter(h))),p[e.isleaf]||c(p[e.children],m+1)}},b&&c(f),{pathList:j,pathNodeList:k,valuePathList:l}},getNodeById:function(a){var b=this;return b.traverseTreeById(a).node},getNodeByPath:function(b){b=b||[];var c=this,d=c.get("adapterForNode"),e=c.getTreeData(),f=null,g=e;return a.each(b,function(b){a.each(g,function(a){return a[d.id]===b?(f=a,!1):void 0}),g=f[d.children]}),f},getPathById:function(a){var b=this;return b.traverseTreeById(a).path},getParentById:function(a){var b=this,c=b.get("adapterForNode"),d=b.getNodeById(a);return d[c.parent],b.getNodeById(parent)},getChildrenById:function(a){var b=this,c=b.get("adapterForNode"),d=b.getNodeById(a);return d?d[c.children]||[]:[]},getChildrenByPath:function(a){a=a||[];var b=this,c=b.get("adapterForNode"),d=null;return 0===a.length?b.getTreeData():(d=b.getNodeByPath(a),d?d[c.children]||[]:[])},getChildrenByNode:function(a){var b=this,c=b.get("adapterForNode"),d=[];return d=a?a[c.children]||[]:[]},getLeafsById:function(a){var b=this,c=(b.get("adapterForNode"),b.getNodeById(a));return c?b.getLeafsByNode(c):[]},getLeafsByNode:function(a){var b,c=this,d=c.get("adapterForNode"),e=[],f=[];return b=function(a,g){if(g=g||0,a)for(var h=0;h<a.length;h++){for(var i=e.length-g-1,j=a[h],k=0;i>k;k++)e.pop();e[g]=j,j[d.isleaf]?f.push(c.dataFilter(e)):b(j[d.children],g+1)}},b(c.getChildrenByNode(a)),f},getTreeData:function(){var a=this;return a.get("treeData")},setTreeData:function(a,b){var c=this;c.fire("load",{data:a,id:b})},searchTree:function(a){var b=this,c=b.traverseTreeByText(a);return b.fire("searchTree",{text:a,pathList:c.pathList,valuePathList:c.valuePathList,result:c}),c},dataFilter:function(b){var c,d=this,e=d.get("adapterForNode"),f=function(b){return a.clone(b,function(a,b){return b===e.children?!1:void 0})};return a.isArray(b)?(c=[],a.each(b,function(a){var b=f(a);c.push(b)})):c=f(b),c},getTreeByLevel:function(b){var c,d=this,e=d.getTreeData(),f=d.get("adapterForNode"),g=a.clone(e);return c=function(a,d){if(d=d||0,a)for(var e=0;e<a.length;e++){var g=a[e];d===b-1?(g[f.children]=[],g[f.isleaf]=!0):c(g[f.children],d+1)}},b>0?c(g):g=[],g},destroy:function(){var a=this;a.detach(),a=null},_init:function(){var a=this;a.set("treeData",[]),a._initIdKey(),a._initEvent(),a.get("autoLoad")&&a.initLoad()},_initEvent:function(){var a=this;a.on("load",function(b){a._fillInTreeData(b.data,b.id)})},_initIdKey:function(){var a=this,b=a.get("adapterForNode"),c=a.get("idKey");c||a.set("idKey",b.id)},_fillInTreeData:function(b,c){var d,e=this,f=e.get("adapterForNode"),g=e.getTreeData();c&&(d=e.getNodeById(c),d&&(g=d[f.children])),g.length=0,a.each(b,function(a){g.push(a)})},_dataError:function(a){var b=this;a&&b.get("dataErrorFunc")(a)},_getParam:function(b){var c=this,d=c.get("idKey"),e=c.get("lastParam")||c.get("param"),f={};return b&&(a.isNumber(b)||a.isString(b))?(f[d]=b,f=a.merge(e,f)):!b||a.isEmptyObject(b)?f=e:a.isPlainObject(b)&&(f=b),c.set("lastParam",f),f}}),b},{requires:["core"]}),KISSY.add("kg/trees/2.0.0/viewstore",function(a,b){function c(b){var d=this;b=a.merge(c.config,b),c.superclass.constructor.call(d,b),d.events=["pushPath","popPath","pushView","popView","searchView","changeSelect"],d._initView()}return a.extend(c,b),a.augment(c,{getViewManager:function(){return this.get("viewManager")},getViewsByPath:function(b){b=b||[];var c=this,d=c.getViewManager(),e=d.viewPath.length,f=(c.get("adapterForNode"),b.length),g=c.getNodeByPath(b);if(c.set("targetPath",b),!c.isTreeReady(g,function(){c.getViewsByPath(b)}))return!2.0.0===b.length&&c._setBaseView(),a.each(b,function(a,b){return a!==d.viewPath[b]?(f=b,!1):void 0});for(var h=0;e-f>h;h++)c._popViewPath();for(var i=f;i<b.length;i++)c._pushViewPath(b[i]);return d},getViewsById:function(a){var b=this,c=b.getPathById(a);return b.getViewsByPath(c)},getViewIndex:function(b){var c=this,d=c.getViewManager(),e=null;return a.each(d.views,function(a,c){return a===b?(e=c,!1):void 0}),e},searchView:function(b,c){var d,e=this,f=e.get("adapterForNode"),g=e.getViewManager(),h=g.views[c];return b=b||"",d=a.filter(h.list,function(a){return a[f.value].indexOf(b)>-1}),e.fire("searchView",{data:d,index:c,text:b}),d},_initView:function(){var a=this;a._initViewManage(),a._initViewEvent()},_initViewEvent:function(){var a=this;a.on("pushPath",function(b){a._pushView(b.id,b.path)}),a.on("popPath",function(){a._popView()})},_initViewManage:function(){var a=this,b={viewPath:[],views:[]};a.set("viewManager",b)},_getViewByPath:function(a){a=a||[];var b=this,c={};return c.list=b._getDataOfView(a),c.selectedId=null,c},_setBaseView:function(){var a,b=this,c=b.getViewManager();0===c.views.length&&(a=b._getViewByPath(),c.views.push(a),b.fire("pushView",{view:a}))},_getDataOfView:function(a){a=a||[];var b=this,c=(b.get("adapterForNode"),b.getChildrenByPath(a)),d=b.dataFilter(c);return d},_pushViewPath:function(a){var b=this,c=b.getViewManager();return c.viewPath.push(a),b.fire("pushPath",{id:a,path:c.viewPath}),c.viewPath},_popViewPath:function(){var a,b=this,c=b.getViewManager();if(0!==c.viewPath.length)return a=c.viewPath.pop(),b.fire("popPath",{id:a,path:c.viewPath}),c.viewPath},_pushView:function(a,b){var c,d=this,e=d.getViewManager(),f=d._getViewByPath(b);return d._setBaseView(),c=e.views[e.views.length-1],d._changeViewSelect(c,a),e.views.push(f),d.fire("pushView",{view:f}),f},_popView:function(){var a,b,c=this,d=c.getViewManager();return a=d.views.pop(),c.fire("popView",{view:a}),b=d.views[d.views.length-1],b&&c._changeViewSelect(b,null),a},_changeViewSelect:function(a,b){var c=this;a.selectedId=b,c.fire("changeSelect",{view:a,id:b})},_destroyView:function(){var a=this,b=a.getViewManager();b.viewPath=[],b.views=[]}}),c},{requires:["./store"]});