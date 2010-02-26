Ext.ns('Ext.ux');

Ext.ux.DialogPanel = Ext.extend(Ext.Panel, {

  frame:true
  ,height:150
  ,width:185
  ,closable:true
  ,layout:"fit"
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
    if (this.isVisible()) this.close();
    if (cmp.rendered) this.boundEl = cmp.getEl();
    cmp.on({
      scope:this
      ,render:function(cmp) {this.boundEl = cmp.getEl();}
      ,destroy:function() {this.destroy();}
      ,bodyresize:function(cmp, width, height) {
	if (cmp.rendered) this.el.anchorTo(cmp.el, "c-c");
      }
    });
    return this;
  }

  ,setConfig:function(config) {
    delete this.config.buttons;
    Ext.apply(this.config, config);
    return this.config;
  }

  ,loadConfig:function() {
    if (this.config.title) this.setTitle(this.config.title);
    if (this.config.iconCls) this.setIconClass(this.config.iconCls);
//    if (this.config.layout) this.setLayout(this.config.layout);
    if (this.config.width) this.setWidth(this.config.width);
    if (this.config.height) this.setHeight(this.config.height);
    if (this.config.buttons) this.addButtons(this.config.buttons);
  }

  ,addButtons:function(buttons) {
    for (var i = 0, l = buttons.length; i < l; i++)
      this.addButton(buttons[i]);
  }

  ,open:function(content) {
    if (this.boundEl && !this.isLocked) {
      this.boundEl.mask();
      if (!this.isRendered) this.render(this.boundEl);
      this.removeAll();
      this.fbar.removeAll();
      this.loadConfig();
      this.add(content);
      this.show();
      this.el.anchorTo(this.boundEl, "c-c");
      this.doLayout();
      //this.fbar.doLayout();
      /*
      if (!this.closable) {
	this.isLocked = true;
	this.unlock.defer(5000, this);
      }
       */
      return this;
    }
    return false;
  }

  ,close:function(force) {
//    if (this.isLocked && !force) this.toHide = true;
    if(this.fireEvent('beforeclose', this) !== false) {
//      this.isLocked = false;
      this.boundEl.unmask();
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
