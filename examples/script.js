/*
** script.js for Ext.ux.Dialog
**
** Made by goldledoigt
** Contact <gary@chewam.com>
**
** Started on  Thu Mar 11 19:41:28 2010 goldledoigt
** Last update Thu Mar 11 21:43:06 2010 goldledoigt
*/

Ext.onReady(function(){

//    Ext.dialog = new Ext.ux.Dialog;

    /****************************************************
     * BUTTONS ******************************************
     ***************************************************/

    new Ext.Panel({
      renderTo:Ext.getBody(),
      width:250,
      height:40,
      layout:"hbox",
      border:false,
      defaults:{
	xtype:"button"
	,flex:1
	,margins:'10'
      },
      items:[{
	text:"dialog over grid"
	,handler:function() {
	  grid.openDialog({
	    title:"Dialog box"
	    ,items:[{
	      html:"a simple message"
	    }]
	    ,buttons:[{
	      text:"OK"
	    }]
	  });
	}
      }, {
	text:"dialog over form"
	,handler:function() {
	  form.openDialog({
	    items:[{
	      html:"a simple message"
	    }]
	  });
	}
      }]
    });

    /****************************************************
     * GRID *********************************************
     ***************************************************/

    var myData = [
        ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
        ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
        ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
        ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
        ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
        ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
        ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
        ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
        ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
        ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
        ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
        ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
        ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
        ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
        ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
        ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
        ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am'],
        ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
        ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am'],
        ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am'],
        ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
        ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
        ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am'],
        ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
        ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am'],
        ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
        ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am'],
        ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am'],
        ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
    ];

    var grid = new Ext.grid.GridPanel({
      renderTo:Ext.getBody(),
      title: 'Array Grid',
      height: 350,
      width: 400,
      floating:true,
      x:10,
      y:50,
      store:new Ext.data.ArrayStore({
	fields: ['company', 'price', 'change', 'pctChange', 'lastChange']
      }),
      columns: [
        {id:'company',header: 'Company', dataIndex: 'company'},
        {header: 'Price', dataIndex: 'price'},
        {header: 'Change', dataIndex: 'change'},
        {header: '% Change', dataIndex: 'pctChange'},
        {header: 'Last Updated', dataIndex: 'lastChange'}
      ]
    });

    grid.getStore().loadData(myData);

    /****************************************************
     * FORM *********************************************
     ***************************************************/

    var form = new Ext.FormPanel({
      labelWidth: 75, // label settings here cascade unless overridden
      bodyStyle:'padding:10px;border-width:0 0 1px 0;',
      defaults: {width: 230},
      defaultType: 'textfield',
      items:[
	{fieldLabel: 'First Name', name: 'first'}
	,{fieldLabel: 'Last Name', name: 'last'}
	,{fieldLabel: 'Company', name: 'company'}
	,{fieldLabel: 'Email', name: 'email', vtype:'email'}
      ],
      buttons:[{text:'Save'}, {text:'Cancel'}]
    });

    new Ext.Window({
      title:'Simple Form',
      width:350,
      height:195,
      layout:"fit",
      items:form,
      plain:true,
      closable:false,
      x:430,
      y:50
    }).show();

});