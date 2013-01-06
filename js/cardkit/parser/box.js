
define([
    'dollar',
    'mo/lang',
    './util'
], function($, _, util){
    
    function exports(cell, raw){
        cell = $(cell);
        var source = util.getSource(cell, raw),
            config = {
                paper: cell.data('cfgPaper'),
                plain: cell.data('cfgPlain')
            },
            hd = get_hd(source && source.find('.ckd-hd')),
            ft = get_hd(source && source.find('.ckd-ft')),
            contents = source && (
                util.getOuterHTML(source.find('.ckd-content'))
                || util.getInnerHTML(source)
            ),
            custom_hd = (util.getCustom('.ckd-hd', cell, raw, get_hd) || [{}])[0],
            custom_ft = (util.getCustom('.ckd-ft', cell, raw, get_hd) || [{}])[0];
        util.getCustom('.ckd-content', cell, raw, replace_content);
        var data = {
            config: config,
            style: cell.data('style'),
            content: cell[0].innerHTML + (contents || ''),
            hd: custom_hd.html === undefined ? hd.html : custom_hd.html,
            hd_url: custom_hd.href || custom_hd.href !== null && hd.href,
            ft: custom_ft.html === undefined ? ft.html : custom_ft.html
        };
        return data;
    }

    function replace_content(source, custom){
        if (custom) {
            $(custom).replaceWith(source.clone());
        }
    }

    function get_hd(source, custom){
        source = $(source);
        var data = source && {
            html: util.getText(source),
            href: util.getHref(source)
        } || {};
        if (custom && typeof custom === 'object') {
            var custom_data = get_hd(custom);
            for (var i in custom_data) {
                if (custom_data[i]) {
                    data[i] = custom_data[i];
                }
            }
            $(custom).remove();
        }
        return data;
    }

    return exports;

});
