Ext.data.JsonP.TouchApp_view_Carousel({"tagname":"class","name":"TouchApp.view.Carousel","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Carousel.js","href":"Carousel.html#TouchApp-view-Carousel"}],"aliases":{"widget":["MyCarousel"]},"alternateClassNames":[],"extends":"Ext.Carousel","mixins":[],"requires":[],"uses":[],"members":[{"name":"initialize","tagname":"method","owner":"TouchApp.view.Carousel","id":"method-initialize","meta":{"private":true}},{"name":"onData","tagname":"method","owner":"TouchApp.view.Carousel","id":"method-onData","meta":{}}],"code_type":"ext_define","id":"class-TouchApp.view.Carousel","short_doc":"This is our very own Carousel class, which loads some dynamic items from our backend and saving those items\nto the lo...","classIcon":"icon-class","superclasses":["Ext.Carousel"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Carousel<div class='subclass '><strong>TouchApp.view.Carousel</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Carousel.html#TouchApp-view-Carousel' target='_blank'>Carousel.js</a></div></pre><div class='doc-contents'><p>This is our very own Carousel class, which loads some dynamic items from our backend and saving those items\nto the localStorage. If the connection is down, then the <a href=\"#!/api/TouchApp.view.Carousel-method-onData\" rel=\"TouchApp.view.Carousel-method-onData\" class=\"docClass\">onData</a> method loads the latest saved data into our\nCarousel. From this point, every ten seconds the <a href=\"#!/api/TouchApp.view.Carousel-method-onData\" rel=\"TouchApp.view.Carousel-method-onData\" class=\"docClass\">onData</a> method will reload itself. If a up-to-date data retrieved\nthen the cache will be refresh and the new data will be added to the Carousel</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-initialize' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='TouchApp.view.Carousel'>TouchApp.view.Carousel</span><br/><a href='source/Carousel.html#TouchApp-view-Carousel-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/TouchApp.view.Carousel-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='TouchApp.view.Carousel'>TouchApp.view.Carousel</span><br/><a href='source/Carousel.html#TouchApp-view-Carousel-method-onData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/TouchApp.view.Carousel-method-onData' class='name expandable'>onData</a>( <span class='pre'>[result], response, success</span> ) : undefined<span class=\"signature\"></span></div><div class='description'><div class='short'>This class do the hard work of the managing the content of the carousel. ...</div><div class='long'><p>This class do the hard work of the managing the content of the carousel.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>result</span> : type (optional)<div class='sub-desc'><p>The result array from our backend.</p>\n</div></li><li><span class='pre'>response</span> : type<div class='sub-desc'><p>The response object from Ext.Direct Provider.</p>\n</div></li><li><span class='pre'>success</span> : type<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});