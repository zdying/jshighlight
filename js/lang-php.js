/**
 * User: dying-zhang
 * Date: 13-5-6
 * Time: 下午4:10
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
JSHL.extendLanguage('php',{
    //对应的类名称
    cls : ['php-com','php-mrk','str','key','php-var','obj','num','php-bol','ope'],
    //相应的正则表达式
    reg : {
        'com' : /(\/\*[\s\S]*?\*\/|\/\/.*|&lt;\!--[\s\S]*?--&gt;)/,  //普通注释
        'mrk' : /(&lt;\?php|\?&gt;)/, //标签
        'str' : /('(?:(?:\\'|[^'\r\n])*?)'|"(?:(?:\\"|[^"\r\n])*?)")/, //字符串
        'key' : /(?:[^$_@a-zA-Z0-9])?(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|extends|private|protected|throw)(?![$_@a-zA-Z0-9])/, //关键字
        'var' : /(\$[\w][\w\d]*)/, //变量名
        'obj' : /(?:[^$_@A-Za-z0-9])?(echo|mail|date)(?:[^$_@A-Za-z0-9])/, //内置函数(部分)
        'num' : /\b(\d+(?:\.\d+)?(?:[Ee][-+]?(?:\d)+)?)\b/,  //数字
        'bol' : /(?:[^$_@A-Za-z0-9])?(true|false)(?:[^$_@A-Za-z0-9])/, //布尔值
        'ope' : /(==|=|===|\+|-|\+=|-=|\*=|\\=|%=|&lt;|&lt;=|&gt;|&gt;=|\.)/  //操作符
    },
    //父级语言
    wrapper: 'html',
    //内容 ,用于push到wrapper的include
    content : {
        lang : 'php',
        wrapper : /(<\?php(?:[\s\S]*?)\?>)/g
    }
})