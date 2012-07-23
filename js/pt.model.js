var MainPage = namespace('PT.Pages.MainPage');

MainPage.Model = function() {

    this.OutgoingEvents = {
        LeftPanel: {
            Tabs: {
                0: {
                    OnHide: null,
                    OnShow: null
                },
                1: {
                    OnHide: null,
                    OnShow: null
                }
            }
        },
        RightPanel: {
            Tabs: {
                0: {
                    OnHide: null,
                    OnShow: null
                },
                1: {
                    OnHide: null,
                    OnShow: null
                }
            }
        }
    };
    
    this.IncomingEvents = {
        LeftPanel: {
            Tabs: {
                0: {
                    Activate: function() { _DoChangeTabOnLeftPanel(0); }
                },
                1: {
                    Activate: function() { _DoChangeTabOnLeftPanel(1); }
                }
            }
        },
        RightPanel: {
            Tabs: {
                0: {
                    Activate: function() { _DoChangeTabOnRightPanel(0); }
                },
                1: {
                    Activate: function() { _DoChangeTabOnRightPanel(1); }
                }
            }
        }
    };

    var _oSelf = this;
    var _Call = function(f) { if (f != null) f(); }

    var State = {
        LeftPanel: {
            ActiveTab: 0
        },
        RightPanel: {
            ActiveTab: 0
        },
        Resetting: false
    };

    var _DoChangeTabOnLeftPanel = function( pnNewTab ) {
        
        var lnOldTab = State.LeftPanel.ActiveTab;

        if (State.Resetting || (lnOldTab != pnNewTab))
        {
            _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs[lnOldTab].OnHide );
            _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs[pnNewTab].OnShow );
        }

        State.LeftPanel.ActiveTab = pnNewTab;
    };

    var _DoChangeTabOnRightPanel = function( pnNewTab ) {

        var lnOldTab = State.RightPanel.ActiveTab;

        if (State.Resetting || (lnOldTab != pnNewTab))
        {
            _Call( _oSelf.OutgoingEvents.RightPanel.Tabs[lnOldTab].OnHide );
            _Call( _oSelf.OutgoingEvents.RightPanel.Tabs[pnNewTab].OnShow );
        }

        State.RightPanel.ActiveTab = pnNewTab;
    };

    this.Activate = function() {
    };

    this.Reset = function() {

        State.Resetting = true;

        _oSelf.IncomingEvents.LeftPanel.Tabs[0].Activate();
        _oSelf.IncomingEvents.RightPanel.Tabs[0].Activate();

        State.Resetting = false;
    };    
}
