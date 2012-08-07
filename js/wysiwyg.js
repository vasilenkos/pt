var Controls = namespace('PT.Controls');

Controls.WYSIWYG = function( poElement ) {
    
    var _oElement = poElement;
    var _oDocument = null;
    var _oBody = null;
    
    var _DoInit = function() {

        _oDocument = _oElement.contents().get(0);
        
        _oDocument.open();
        _oDocument.write('<html><body><p></p></body></html>');
        _oDocument.close();
        _oDocument.designMode = 'on';
        
    };
    
    this.GetText = function() {
    
        return _oDocument.body.innerHTML;
    };
    
    this.SetText = function( psText ) {
    
        _oDocument.body.innerHTML = psText;
    };

    this.Activate = function() {

        _DoInit();
        
        $('#id-left-switch-container-iframe-go-button').bind( 'click', function(e) {
        
            var loFrame = $('#id-source-iframe');
            var lsFrameName = loFrame.attr('name');
            var lsTarget = $('#id-left-switch-container-iframe-location').val();

            loFrame.attr('src', lsTarget);
            //window.frames[ lsFrameName ].location.reload();
        
            e.preventDefault();
        });

        $('#id-right-switch-container-wysiwyg-button-h1').bind( 'click', function(e) {
        
            _oDocument.execCommand('formatBlock', false, 'H1');
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-h2').bind( 'click', function(e) {
        
            _oDocument.execCommand('formatBlock', false, 'H2');
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-h3').bind( 'click', function(e) {
        
            _oDocument.execCommand('formatBlock', false, 'H3');
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-para').bind( 'click', function(e) {
        
            _oDocument.execCommand('formatBlock', false, 'P');
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-bold').bind( 'click', function(e) {
        
            _oDocument.execCommand('bold', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-italic').bind( 'click', function(e) {
        
            _oDocument.execCommand('italic', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-underline').bind( 'click', function(e) {
        
            _oDocument.execCommand('underline', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-strikethrough').bind( 'click', function(e) {
        
            _oDocument.execCommand('strikeThrough', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-a-left').bind( 'click', function(e) {
        
            _oDocument.execCommand('justifyLeft', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-a-center').bind( 'click', function(e) {
        
            _oDocument.execCommand('justifyCenter', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-a-right').bind( 'click', function(e) {
        
            _oDocument.execCommand('justifyRight', false, null);
        
            e.preventDefault();
        });

        $('#id-right-switch-container-wysiwyg-button-ul').bind( 'click', function(e) {
        
            _oDocument.execCommand('insertUnorderedList', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-ol').bind( 'click', function(e) {
        
            _oDocument.execCommand('insertOrderedList', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-indent').bind( 'click', function(e) {
        
            _oDocument.execCommand('indent', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-outdent').bind( 'click', function(e) {
        
            _oDocument.execCommand('outdent', false, null);
        
            e.preventDefault();
        });
        $('#id-right-switch-container-wysiwyg-button-blockquote').bind( 'click', function(e) {
        
            _oDocument.execCommand('formatBlock', false, 'BLOCKQUOTE');
        
            e.preventDefault();
        });

        return this;
    };
}



