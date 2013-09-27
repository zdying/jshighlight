jshighlight
========================
jshighlight-一款基于javascript的轻量级的代码着色插件
------------------------

###  插件特点
1. 真正轻量级，JS代码压缩后3K左右；
2. 调用方便，引入jshighlight核心js文件即可；
3. 不依赖于任何其他库；
4. 原生支持HTML、CSS、Javascript；
5. 支持其他语言的轻松扩展；
6. 显示行号，直接复制代码不会复制行号；
7. 提供四套主题可选，默认使用Monokai样式主题；

### 使用步骤
1. 在&lt;head&gt;中引入相应的样式文件：

        <!--默认样式-->
        <link href="../theme/jshighlight-default.css" rel="stylesheet" />

2. 在&lt;/body&gt;前或者&lt;head&gt;中引入相应js文件：

        <!--核心js文件-->
        <script src="../js/jshighlight.core-v1.0.1.min.js"></script>

3. 在需要着色的pre标签中加入'data-language'属性，取值为：'javascript'|'html'|'css'，扩展后可以设置其他的值；

### 如何扩展
1. 在&lt;/body&gt;前或者&lt;head&gt;中引入相应js文件：

        <script src="../js/jshighlight.core-v1.0.1.min.js"></script>

2. 自定义需要着色的语言所需要的样式，例如：

        .php-com{
            color: #CCC;
        }
        .php-mrk{
            color: red;
            font-weight: bold;
        }
        .php-bol{
            color: #F92665;
            font-style: italic;
        }
        .php-var{
            color: #A6E22E;
        }
        .......
        /* 也可以使用默认的样式，传入默认样式类名即可，
         * 样式名称可以自由使用，比如注释对应的样式也可以用.key
         * 默认样式如下：
         */
        .com{ color:#75715E } /*普通注释*/
        .doc{ color:#48BEEF } /*文档注释*/
        .str{ color:#E6DB74 } /*字符串*/
        .key{ color:#48BEEF; font-weight: bold; font-style: italic } /*关键字*/
        .obj{ color:#AE81FF; font-weight:bold } /*内置对象、函数*/
        .num{ color:#F92672 } /*数字*/
        .ope{ color:#FD971F } /*操作符*/
        .bol{ color:#FF5600; font-style: italic } /*布尔值*/

        .mrk{ color:#F92665 } /*html标签*/
        .attr{ color:#A6E22E } /*属性名称*/
        .val{ color:#E6DB74 } /*属性值*/

3. 定义提取需要着色的内容的正则，比如：

        'com' : /(\/\*[\s\S]*?\*\/|\/\/.*|&lt;\!--[\s\S]*?--&gt;)/,  //普通注释
        'mrk' : /(&lt;\?php|\?&gt;)/, //标签
        'str' : /('(?:(?:\\'|[^'\r\n])*?)'|"(?:(?:\\"|[^"\r\n])*?)")/, //字符串

4. 调用JSHL的extendLanguage方法：

        JSHL.extendLanguage('php',{
           /*
            * 每个分组对应的样式类名
            * 比如：'com'中有一个分组，'mrk'中有一个分组，'key'中有两个分组，
            * 那么： com中的分组对应'php-com','mrk'中的分组对应
            * 'php-mrk','key'中的第一个分组对应'str',第二个对应'key'，以此类推；
            */
           cls : ['php-com','php-mrk','str','key','php-var','obj','num','php-bol','ope'],
           reg : {
                'com' : /(\/\*[\s\S]*?\*\/|\/\/.*|&lt;\!--[\s\S]*?--&gt;)/,  //普通注释
                'mrk' : /(&lt;\?php|\?&gt;)/, //标签
                'str' : /('(?:(?:\\'|[^'\r\n])*?)'|"(?:(?:\\"|[^"\r\n])*?)")/, //字符串
                'key' : /(?:[^$_@a-zA-Z0-9])?(and|or|...|throw)(?![$_@a-zA-Z0-9])/, //关键字
                'var' : /(\$[\w][\w\d]*)/, //变量名
                'obj' : /(?:[^$_@A-Za-z0-9])?(echo|...|date)(?:[^$_@A-Za-z0-9])/, //内置函数(部分)
                'num' : /\b(\d+(?:\.\d+)?(?:[Ee][-+]?(?:\d)+)?)\b/,  //数字
                'bol' : /(?:[^$_@A-Za-z0-9])?(true|false)(?:[^$_@A-Za-z0-9])/, //布尔值
                'ope' : /(==|=|===|\+|-|\+=|-=|\*=|\\=|%=|&lt;|&lt;=|&gt;|&gt;=|\.)/  //操作符
            },
            //如果这个语言是包含在html中的设置下列属性
            wrapper: 'html',
            content : {
                lang : 'php', // 语言名称，在于pre标签的data-language一致
                wrapper : /(<\?php(?:[\s\S]*?)\?>)/g // 需要着色的代码被包裹的形式
            }
        })

### E-Mail

如果你有什么好的意见或者建议，或者发现Bug，欢迎与我交流：
97532151@qq.com/zdying@live.com

### Site

http://sanjh.cn