var MainPage = namespace('PT.Pages.MainPage');

MainPage.Model = function() {

    this.OutgoingEvents = {
        LeftPanel: {
            Tabs: {
                OnHide: null,
                OnShow: null
            }
        },
        RightPanel: {
            Tabs: {
                OnHide: null,
                OnShow: null
            },
            OnSetWYSIWYGFromPlainText: null,
            OnSetPlainTextFromWYSIWYG: null,
            OnPlainTextNeeded: null,
            OnWYSIWYGTextNeeded: null
        }
    };
    
    this.IncomingEvents = {
        LeftPanel: {
            Tabs: {
                Activate: function( pnTabNum ) { _DoChangeTabOnLeftPanel( pnTabNum ); }
            }
        },
        RightPanel: {
            Tabs: {
                Activate: function( pnTabNum ) { _DoChangeTabOnRightPanel( pnTabNum ); }
            },
            SetPlainText: function( psText ) { _DoSetTextOnRightPanel( psText ); },
            SetWYSIWYGText: function( psText ) { _DoSetTextOnRightPanel( psText ); }
        }
    };

    var _oSelf = this;
    var _Call = function(f, a1, a2, a3, a4, a5) { if (f != null) f(a1, a2, a3, a4, a5); }

    var State = {
        LeftPanel: {
            ActiveTab: 0
        },
        RightPanel: {
            ActiveTab: 0,
            PlainText: ''
        },
        Resetting: false
    };

    var _DoChangeTabOnLeftPanel = function( pnNewTab ) {
        
        var lnOldTab = State.LeftPanel.ActiveTab;

        if (State.Resetting || (lnOldTab != pnNewTab))
        {
            _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs.OnHide( lnOldTab ) );
            _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs.OnShow( pnNewTab ) );
        }

        State.LeftPanel.ActiveTab = pnNewTab;
    };
		
    var _DoChangeTabOnRightPanel = function( pnNewTab ) {

        var lnOldTab = State.RightPanel.ActiveTab;

        if (State.Resetting || (lnOldTab != pnNewTab))
        {
            _Call( _oSelf.OutgoingEvents.RightPanel.Tabs.OnHide( lnOldTab ) );
            _Call( _oSelf.OutgoingEvents.RightPanel.Tabs.OnShow( pnNewTab ) );


            State.RightPanel.ActiveTab = pnNewTab;

            if (State.RightPanel.ActiveTab == 0)
                _Call( _oSelf.OutgoingEvents.RightPanel.OnPlainTextNeeded );

            if (State.RightPanel.ActiveTab == 1)
                _Call( _oSelf.OutgoingEvents.RightPanel.OnWYSIWYGTextNeeded );
        }
    };
    
    var _DoSetTextOnRightPanel = function ( psNewText ) {

        State.RightPanel.PlainText = psNewText;        
        
        if (State.RightPanel.ActiveTab == 0)
            _Call( _oSelf.OutgoingEvents.RightPanel.OnSetWYSIWYGFromPlainText, State.RightPanel.PlainText );
            
        if (State.RightPanel.ActiveTab == 1)
            _Call( _oSelf.OutgoingEvents.RightPanel.OnSetPlainTextFromWYSIWYG, State.RightPanel.PlainText );
    };

    this.Activate = function() {
    };

    this.Reset = function() {

        State.Resetting = true;

        _oSelf.IncomingEvents.RightPanel.SetPlainText( '<p></p>' );
        _oSelf.IncomingEvents.LeftPanel.Tabs.Activate( 0 );
        _oSelf.IncomingEvents.RightPanel.Tabs.Activate( 0 );

        State.Resetting = false;
    };    
}
