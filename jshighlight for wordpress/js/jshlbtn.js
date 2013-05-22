
function JSHLInput(fun){
    var $ = function(id){
            return document.getElementById(id);
        },
        trim = function(str){
            return str.replace(/^\s*|\s*$/g,'')
        }
    var langs = (globalLang || 'html|css|javascript').split(/\s*\|\s*/),
        len = langs.length,
        index = 0,
        options = [],
        tmp = '';
    for(; index < len; index += 1){
        tmp = trim(langs[index]);
        options.push('<option value="',tmp,'"',tmp == jshl_default_lang ? ' selected':'','>',tmp,'</option>');
    }
    
    if(!$('jshl-inputForm')){
         this.form = document.createElement('div');
         this.form.id =  "jshl-inputForm";
         this.form.className = "inputForm" ;
         this.callback = fun;
         this.form.innerHTML = '' +
                 '<form onsubmit="return false;" id="addform">\
                     <div class="title" id="jshl-title"> \
                     </div>\
                     <label for="lang">\
                         Language:\
                     </label>\
                     <select id="jshl-lang" class="w150">' +
                     options.join('') +
                     '</select>\
                     <br/>  \
                     <label for="code"> \
                        The Code:\
                     </label>\
                     <br/> \
                     <textarea id="jshl-code" placeholder="//Your code here..."></textarea>\
                     <br/> \
                     <button class="btn" id="jshl-submit">Submit</button>\
                     <button class="btn" id="jshl-cancel">Cancel</button> \
                 </form>';

         document.body.appendChild(this.form);
     }else{
         //this.form = $('jshl-inputForm')
     }


     this.show = function(){
         this.form.style.display = 'block';
     }
     this.hide = function(){
         this.form.style.display = 'none';
     }
     this.code = $('jshl-code');
     this.lang = $('jshl-lang');
     this.code = $('jshl-code');
     this.cancel = $('jshl-cancel');
     this.submit = $('jshl-submit');
     var _this = this;
     this.init = function(){
         this.show();
         this.cancel.onclick = function(){
             _this.hide();
             _this.lang.value = 'javascript';
             _this.code.value = '';
         }

         this.submit.onclick = function(){
             if(_this.callback){
                 _this.callback(_this.lang.value,_this.code.value);
             }
             _this.hide();
             _this.lang.value = 'javascript';
             _this.code.value = '';
         }

         this.code.onkeydown = function(e){
            e = e || window.event;
            if(e.keyCode==9){
                e.preventDefault && e.preventDefault();
                e.returnValue = false;
                if(document.all){
                    document.selection.createRange().text = '    ';
                    return false;
                }
                var s = this.selectionStart;
                this.value = this.value.substring(0,this.selectionStart) + "    " + this.value.substring(this.selectionEnd);
                this.selectionEnd = s+4;
                return false;
            }
         }
     }

    this.init();
}
    var jshlinput = null;
(function() {
    tinymce.create('tinymce.plugins.jshlBtn', {
        init : function(ed, url) {
            
            ed.addButton('jshlBtn', {
                title : 'Insert Code',
                image : url+'/../images/code.png',
                onclick : function() {
                     var selection = ed.selection,
                         node = selection.getNode(),
                         isPre = /pre/ig.test(node.nodeName);
                     function s(l,c){
                        if(!c) return false;
                        c = c.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                        if(selection.getNode().nodeName === "PRE"){
                            selection.getNode().innerHTML = c;
                            selection.getNode().setAttribute('data-language',l);
                        }else{
                            selection.setContent('<pre class="jshl_code" data-language="'+l+'">'+c+'</pre>');
                        }
                     }
                     if(!jshlinput){
                         jshlinput = new JSHLInput(s);
                     }else{
                         jshlinput.show();
                     }
                     if(isPre){
                        jshlinput.code.value = node.innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
                        jshlinput.lang.value = node.getAttribute('data-language');
                     }
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        }
    });
    tinymce.PluginManager.add('jshlBtn', tinymce.plugins.jshlBtn);
})();