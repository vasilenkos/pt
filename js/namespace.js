function namespace(psNamespaceString) {
    var laParts = psNamespaceString.split('.');
    var loParent = window;
    var lsCurrentPart = '';
        
    for(var i = 0, lnLength = laParts.length; i < lnLength; i++) {
        lsCurrentPart = laParts[i];
        loParent[lsCurrentPart] = loParent[lsCurrentPart] || {};
        loParent = loParent[lsCurrentPart];
    }
    
    return loParent;
}
