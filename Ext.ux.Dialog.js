Ext.ns('Ext.ux');

Ext.ux.DialogPanel = Ext.extend(Ext.Panel, {

  frame:true
  ,height:150
  ,width:185
//  ,closable:false
//  ,layout:"fit"
  ,title:"Dialog"
  ,buttonAlign:"center"

  ,initComponent:function() {
    this.buttons = []; // to force fbar creation
    this.config = {
      title:this.title
      ,iconCls:this.iconCls
      ,layout:this.layout
      ,width:this.width
      ,height:this.height
      ,buttons:this.buttons
    };
    if (this.closable) {
      this.tools = Ext.isArray(this.tools) || [];
      this.tools.push({id:"close", handler:this.close, scope:this});
    }
    Ext.apply(this, {floating:true});
    Ext.ux.DialogPanel.superclass.initComponent.call(this);
  }

  ,init:function(cmp) {
    if (cmp.rendered) this.ownerEl = cmp.el;
    cmp.on({
      scope:this
      ,render:function(cmp) {this.ownerEl = cmp.getEl();}
      ,destroy:function() {this.destroy();}
      ,bodyresize:function(cmp, width, height) {
	if (cmp.rendered) this.el.anchorTo(cmp.el, "c-c");
      }
    });
    console.log("init", this, cmp);
    return this;
  }

  ,setConfig:function(config) {
    Ext.apply(this.config, config);
    return this.config;
  }

  ,loadConfig:function() {
    console.log("load config", this, this.config);
    if (this.config.title) this.setTitle(this.config.title);
    if (this.config.iconCls) this.setIconClass(this.config.iconCls);
    if (this.config.layout) this.setLayout(this.layout);
    if (this.config.width) this.setWidth(this.config.width);
    if (this.config.height) this.setHeight(this.config.height);
    if (this.config.buttons) this.addButtons(this.config.buttons);
  }

  ,addButtons:function(buttons) {
    this.fbar.removeAll();
    for (var i = 0, l = buttons.length; i < l; i++)
      this.addButton(buttons[i]);
  }

  ,open:function(content) {
    console.log("dialog open", this, content);
    if (this.ownerEl && !this.isLocked) {
      this.ownerEl.mask();
      if (!this.isRendered) this.render(this.ownerEl);
      console.log("add content", content);
      this.removeAll();
      this.add(content);
      this.show();
      this.loadConfig();
      this.el.anchorTo(this.ownerEl, "c-c");
      this.doLayout();
      if (!this.closable) {
	this.isLocked = true;
	this.unlock.defer(5000, this);
      }
      return this;
    }
    return false;
  }

  ,close:function(force) {
    if (this.isLocked && !force) this.toHide = true;
    else if(this.fireEvent('beforeclose', this) !== false) {
      this.isLocked = false;
      this.ownerEl.unmask();
      this.hide();
//      this.el.fadeOut();
      return true;
    }
    return false;
  }

  ,unlock:function() {
    this.isLocked = false;
    if (this.toHide) this.hide();
  }

});

Ext.reg('dialogpanel', Ext.ux.DialogPanel);
