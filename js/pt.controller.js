var MainPage = namespace('PT.Pages.MainPage');

MainPage.Controller = function(poView, poModel) {
    
    var _oView = poView;
    var _oModel = poModel;

    var _DoBindings = function () {

        _oView.OutgoingEvents.LeftPanel.Tabs.OnHandleClick = function( pnTabNum ) { _oModel.IncomingEvents.LeftPanel.Tabs.Activate( pnTabNum ); };
        _oView.OutgoingEvents.RightPanel.Tabs.OnHandleClick = function( pnTabNum ) { _oModel.IncomingEvents.RightPanel.Tabs.Activate( pnTabNum ); };

        _oModel.OutgoingEvents.LeftPanel.Tabs.OnHide = function( pnTabNum ) { _oView.IncomingEvents.LeftPanel.Tabs.Hide( pnTabNum ); };
        _oModel.OutgoingEvents.RightPanel.Tabs.OnHide = function( pnTabNum ) { _oView.IncomingEvents.RightPanel.Tabs.Hide( pnTabNum ); };
        _oModel.OutgoingEvents.LeftPanel.Tabs.OnShow = function( pnTabNum ) { _oView.IncomingEvents.LeftPanel.Tabs.Show( pnTabNum ); };
        _oModel.OutgoingEvents.RightPanel.Tabs.OnShow = function( pnTabNum ) { _oView.IncomingEvents.RightPanel.Tabs.Show( pnTabNum ); };

        _oModel.OutgoingEvents.RightPanel.OnPlainTextNeeded = function () { _oView.IncomingEvents.RightPanel.PlainTextNeeded(); }
        _oModel.OutgoingEvents.RightPanel.OnWYSIWYGTextNeeded = function () { _oView.IncomingEvents.RightPanel.WYSIWYGTextNeeded(); }
        _oView.OutgoingEvents.RightPanel.OnWYSIWYGTextReady = function( psText ) { _oModel.IncomingEvents.RightPanel.SetWYSIWYGText( psText ); }
        _oView.OutgoingEvents.RightPanel.OnPlainTextReady = function( psText ) { _oModel.IncomingEvents.RightPanel.SetPlainText( psText ); }
        
        _oModel.OutgoingEvents.RightPanel.OnSetWYSIWYGFromPlainText = function ( psText ) { _oView.IncomingEvents.RightPanel.SetWYSIWYGFromPlainText( psText ); }
        _oModel.OutgoingEvents.RightPanel.OnSetPlainTextFromWYSIWYG = function ( psText ) { _oView.IncomingEvents.RightPanel.SetPlainTextFromWYSIWYG( psText ); }
    };

    this.Activate = function() {

        _oView.Activate();
        _oModel.Activate();

        _DoBindings();

        _oModel.Reset();
        
        return this;
    };
}
