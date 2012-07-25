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
                0: {
                    OnHandleClick: _DoNothing
                },
                1: {
                    OnHandleClick: _DoNothing
                }
            }
        },
        RightPanel: {
            Tabs: {
                0: {
                    OnHandleClick: _DoNothing
                },
                1: {
                    OnHandleClick: _DoNothing
                }
            }
        }
    };
    
    this.IncomingEvents = {
        LeftPanel: {
            Tabs: {
                0: {
                    Show: function() { _SetTabActivationState( Layout.LeftPanel, 0, true ); },
                    Hide: function() { _SetTabActivationState( Layout.LeftPanel, 0, false ); }
                },
                1: {
                    Show: function() { _SetTabActivationState( Layout.LeftPanel, 1, true ); },
                    Hide: function() { _SetTabActivationState( Layout.LeftPanel, 1, false ); }
                }
            }
        },
        RightPanel: {
            Tabs: {
                0: {
                    Show: function() { _SetTabActivationState( Layout.RightPanel, 0, true ); },
                    Hide: function() { _SetTabActivationState( Layout.RightPanel, 0, false ); }
                },
                1: {
                    Show: function() { _SetTabActivationState( Layout.RightPanel, 1, true ); },
                    Hide: function() { _SetTabActivationState( Layout.RightPanel, 1, false ); }
                }
            }
        }
    };

    var _oSelf = this;

    var _Call = function(f) { if (f != null) f(); }
    var _AddClass = function(poElement, psClass) { poElement.addClass(psClass); }
    var _RemoveClass = function(poElement, psClass) { poElement.removeClass(psClass); }
    var _ApplyClassFunctor = function(poFunctor, poElement, psClass) { if (poElement != null) poFunctor( poElement, psClass ); };

    var _SetTabActivationState = function(poPanel, pnTabNum, pbState) { 

        var loStateFunctor = pbState ? _AddClass : _RemoveClass;

        _ApplyClassFunctor( loStateFunctor, poPanel.Tabs[pnTabNum].Element, Options.ActiveTabElementClassName );
        _ApplyClassFunctor( loStateFunctor, poPanel.Tabs[pnTabNum].AdditionalPanel != null ? poPanel.Tabs[pnTabNum].AdditionalPanel.Element : null , Options.ActiveTabAdditionalPanelClassName );
        _ApplyClassFunctor( loStateFunctor, poPanel.Tabs[pnTabNum].Handle, Options.ActiveTabHandleClassName );
    };

    this.Activate = function() {
        
        Layout.LeftPanel.Tabs[0].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs[0].OnHandleClick ); e.preventDefault(); });
        Layout.LeftPanel.Tabs[1].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.LeftPanel.Tabs[1].OnHandleClick ); e.preventDefault(); });
        Layout.RightPanel.Tabs[0].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.RightPanel.Tabs[0].OnHandleClick ); e.preventDefault(); });
        Layout.RightPanel.Tabs[1].Handle.bind( 'click', function(e) { _Call( _oSelf.OutgoingEvents.RightPanel.Tabs[1].OnHandleClick ); e.preventDefault(); });

    };
}
