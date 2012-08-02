var MainPage = namespace('PT.Pages.MainPage');

MainPage.View = function( poLayout, poOptions ) {

    var _DoNothing = function() {};

    var Layout = $.extend({},
    {
        LeftPanel: {
            Element: null,
            Tabs: {
                0: {
                    Element: null,
                    Handle: null,
                    AdditionalPanel: {
                        Element: null,
                        LocationInput: null,
                        LocationGoButton: null
                    },
                    SourceIFrame: null
                },
                1: {
                    Element: null,
                    Handle: null,
                    AdditionalPanel : null,
                    SourceText: null
                }
            }
        },
        RightPanel: {
            Element: null,
            Tabs: {
                0: {
                    Element: null,
                    Handle: null,
                    AdditionalPanel: {
                        Element: null,
                        Buttons: {
                            H1: null,
                            H2: null,
                            H3: null,
                            Paragraph: null,
                            Bold: null,
                            Italic: null,
                            Underline: null,
                            Strikethrough: null,
                            AlignLeft: null,
                            AlignCenter: null,
                            AlignRight: null,
                            UnorderedList: null,
                            OrderedList: null,
                            Indent: null,
                            Outdent: null,
                            Blockquote: null
                        }
                    },
                    DestinationWYSIWYG: null
                },
                1: {
                    Element : null,
                    Handle: null,
                    AdditionalPanel : null,
                    DestinationText: null
                }
            }
        }
    }, poLayout);

    var Options = $.extend({},
    {
        ActiveTabHandleClassName: null,
        ActiveTabElementClassName: null,
        ActiveTabAdditionalPanelClassName: null
    }, poOptions);

    this.OutgoingEvents = {
        LeftPanel: {
            Tabs: {
                OnHandleClick: _DoNothing
            }
        },
        RightPanel: {
            Tabs: {
                OnHandleClick: _DoNothing
            },
            OnWYSIWYGTextReady: _DoNothing,
            OnPlainTextReady: _DoNothing
        }
    };
    
    this.IncomingEvents = {
        LeftPanel: {
            Tabs: {
                Show: function( pnTabNum ) { _SetTabActivationState( Layout.LeftPanel, pnTabNum, true ); },
                Hide: function( pnTabNum ) { _SetTabActivationState( Layout.LeftPanel, pnTabNum, false ); }
            }
        },
        RightPanel: {
            Tabs: {
                Show: function( pnTabNum ) { _SetTabActivationState( Layout.RightPanel, pnTabNum, true ); },
                Hide: function( pnTabNum ) { _SetTabActivationState( Layout.RightPanel, pnTabNum, false ); }
            },
            SetWYSIWYGFromPlainText: function( psText ) { _DoSetWYSIWYGFromPlainText( psText ); },
            SetPlainTextFromWYSIWYG: function( psText ) { _DoSetPlainTextFromWYSIWYG( psText ); },
            PlainTextNeeded: function() { _PlainTextNeeded(); },
            WYSIWYGTextNeeded: function() { _WYSIWYGTextNeeded(); }
        }
    };

    var _oSelf = this;
    var _oDestinationWYSIWYG = null;

    var _Call = function(f, a1, a2, a3, a4, a5) { if (f != null) f(a1, a2, a3, a4, a5); }
    var _AddClass = function(poElement, psClass) { poElement.addClass(psClass); }
    var _RemoveClass = function(poElement, psClass) { poElement.removeClass(psClass); }
    var _ApplyClassFunctor = function(poFunctor, poElement, psClass) { if (poElement != null) poFunctor( poElement, psClass ); };

    var _SetTabActivationState = function(poPanel, pnTabNum, pbState) { 

        var loStateFunctor = pbState ? _AddClass : _RemoveClass;

        _ApplyClassFunctor( loStateFunctor, poPanel.Tabs[pnTabNum].Element, Options.ActiveTabElementClassName );
        _ApplyClassFunctor( loStateFunctor, poPanel.Tabs[pnTabNum].AdditionalPanel != null ? poPanel.Tabs[pnTabNum].AdditionalPanel.Element : null , Options.ActiveTabAdditionalPanelClassName );
        _ApplyClassFunctor( loStateFunctor, poPanel.Tabs[pnTabNum].Handle, Options.ActiveTabHandleClassName );
    };
    
    var _PlainTextNeeded = function() {

        var lsText = Layout.RightPanel.Tabs[1].DestinationText.attr("value");
        
        _Call( _oSelf.OutgoingEvents.RightPanel.OnPlainTextReady, lsText );
    };

    var _WYSIWYGTextNeeded = function() {

        var lsText = _oDestinationWYSIWYG.GetText();

        _Call( _oSelf.OutgoingEvents.RightPanel.OnWYSIWYGTextReady, lsText );
    };
    
    var _DoSetWYSIWYGFromPlainText = function( psText ) {
    
        _oDestinationWYSIWYG.SetText( psText );
    };

    var _DoSetPlainTextFromWYSIWYG = function( psText ) {

        Layout.RightPanel.Tabs[1].DestinationText.attr("value", psText);
    };

    this.Activate = function() {
        
        _oDestinationWYSIWYG = new Controls.WYSIWYG( Layout.RightPanel.Tabs[0].DestinationWYSIWYG );

        _oDestinationWYSIWYG.Activate();
        
        Layout.LeftPanel.Tabs[0].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs.OnHandleClick, 0 ); e.preventDefault(); });
        Layout.LeftPanel.Tabs[1].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs.OnHandleClick, 1 ); e.preventDefault(); });
        Layout.RightPanel.Tabs[0].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.RightPanel.Tabs.OnHandleClick, 0 ); e.preventDefault(); });
        Layout.RightPanel.Tabs[1].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.RightPanel.Tabs.OnHandleClick, 1 ); e.preventDefault(); });

    };
}
