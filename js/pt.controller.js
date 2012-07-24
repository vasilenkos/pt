var MainPage = namespace('PT.Pages.MainPage');

MainPage.Controller = function(poView, poModel) {
    
    var _oView = poView;
    var _oModel = poModel;

    var _DoBindings = function () {

        _oView.OutgoingEvents.LeftPanel.Tabs[0].OnHandleClick = function() { _oModel.IncomingEvents.LeftPanel.Tabs[0].Activate(); };
        _oView.OutgoingEvents.LeftPanel.Tabs[1].OnHandleClick = function() { _oModel.IncomingEvents.LeftPanel.Tabs[1].Activate(); };
        _oView.OutgoingEvents.RightPanel.Tabs[0].OnHandleClick = function() { _oModel.IncomingEvents.RightPanel.Tabs[0].Activate(); };
        _oView.OutgoingEvents.RightPanel.Tabs[1].OnHandleClick = function() { _oModel.IncomingEvents.RightPanel.Tabs[1].Activate(); };

        _oModel.OutgoingEvents.LeftPanel.Tabs[0].OnHide = function() { _oView.IncomingEvents.LeftPanel.Tabs[0].Hide(); };
        _oModel.OutgoingEvents.LeftPanel.Tabs[1].OnHide = function() { _oView.IncomingEvents.LeftPanel.Tabs[1].Hide(); };
        _oModel.OutgoingEvents.RightPanel.Tabs[0].OnHide = function() { _oView.IncomingEvents.RightPanel.Tabs[0].Hide(); };
        _oModel.OutgoingEvents.RightPanel.Tabs[1].OnHide = function() { _oView.IncomingEvents.RightPanel.Tabs[1].Hide(); };

        _oModel.OutgoingEvents.LeftPanel.Tabs[0].OnShow = function() { _oView.IncomingEvents.LeftPanel.Tabs[0].Show(); };
        _oModel.OutgoingEvents.LeftPanel.Tabs[1].OnShow = function() { _oView.IncomingEvents.LeftPanel.Tabs[1].Show(); };
        _oModel.OutgoingEvents.RightPanel.Tabs[0].OnShow = function() { _oView.IncomingEvents.RightPanel.Tabs[0].Show(); };
        _oModel.OutgoingEvents.RightPanel.Tabs[1].OnShow = function() { _oView.IncomingEvents.RightPanel.Tabs[1].Show(); };
    };

    this.Activate = function() {

        _oView.Activate();
        _oModel.Activate();

        _DoBindings();

        _oModel.Reset();
        
        return this;
    };
}
