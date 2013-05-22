<?php 
/*
Plugin Name: jshighlight
Plugin URI: http://sanjh.cn/
Description: this plugin highlight the code in your article
Version: 1.0.2
Author: daiying.zhang
Author URI: http://sanjh.cn/
License: GPL
*/

add_action('admin_init','add_jshl_btn');
function add_jshl_btn(){
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
      return;
    }
    if ( get_user_option('rich_editing') == 'true' ) { //所见即所得模式下
      add_filter( 'mce_external_plugins', 'add_jshl_plugin' );
      add_filter( 'mce_buttons', 'register_jshl_button' );
    }
}

function register_jshl_button( $buttons ) {
    array_push( $buttons, "|", "jshlBtn" ); //加入按钮
    return $buttons;
}
function add_jshl_plugin( $plugin_array ) {
    echo "<script>var globalLang = '".get_option('jshl_lang','javascript|html|css')."';";
    echo "var jshl_default_lang = '".get_option('jshl_default_lang')."';</script>";
    $path = WP_PLUGIN_URL."/jshighlight";
    $plugin_array['jshlBtn'] = $path . '/js/jshlbtn-v1.0.2.min.js';
    return $plugin_array;
}

//后台 引入样式
function wptuts_styles_with_the_lot()  
{ 
    wp_register_style( 'custom-style', plugins_url( '/css/style.css', __FILE__ ), array(), '20130508', 'all' );  
    wp_enqueue_style( 'custom-style' );  
}  
add_action( 'admin_enqueue_scripts', 'wptuts_styles_with_the_lot' );
//前台 引入代码高亮的样式
function wptuts_styles_with_the_lot1()  
{  
    wp_register_style( 'custom-style', plugins_url( '/css/theme/jshighlight-'.get_option('jshl_theme').'.css', __FILE__ ), array(), '20130508', 'all' );  
    wp_enqueue_style( 'custom-style' ); 
}  
add_action( 'wp_enqueue_scripts', 'wptuts_styles_with_the_lot1', 15);

//在前台引入代码高亮的js文件
function addScript(){
    wp_register_script( 'custom-script', plugins_url( '/js/jshighlight.core-v1.0.2.min.js', __FILE__ ), array(), '20130508');  
    wp_enqueue_script( 'custom-script' ); 
}
add_action('wp_footer','addScript');

function add_jshl_options(){
    add_option('jshl_lang','javascript|html|css|php');
    add_option('jshl_default_lang','javascript');
    add_option('jshl_theme','default');  
}
//安装插件的时候存储一些数据
register_activation_hook(__FILE__, 'add_jshl_options');

function delete_jshl_options(){
    delete_option('jshl_lang');
    delete_option('jshl_default_lang');
    delete_option('jshl_theme');
}
//删除插件时删除数据
register_deactivation_hook( __FILE__,'delete_jshl_options');
//在侧边栏加入按钮
/* 判断是否在 WordPress 后台 */
if( is_admin() ) {
  /*  利用 admin_menu 钩子，添加菜单 */
  add_action('admin_menu', 'add_jshl_menu');
}

function add_jshl_menu() {
  //add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position )
  add_menu_page('JSHighlight', '高亮设置', 'administrator','show_setPage', 'jshighlight_set_page');
}

function show_setPage( $content ) {
    //if(is_single())
    //    $content = $content . get_option('jshl_default_lang');
    //return $content;
}

function jshighlight_set_page(){
?>
  <div id="jshl_seting_form">
    <h2>JSHighlight Setting</h2>
    <form method="post" action="options.php" class="setting_form">
      <!-- 下面这行代码用来保存表单中内容到数据库 */ -->
      <?php wp_nonce_field('update-options'); ?>
      <p>
        默认语言:
        <input type="txt" style="width:268px;"  
          name="jshl_default_lang" 
          id="jshl_default_lang"
          value="<?php echo get_option('jshl_default_lang'); ?>" />
        <br/>
        支持的语言:(eg:javascript|html|css)<br/>
        <textarea 
          name="jshl_lang" 
          id="jshl_lang" 
          cols="40" 
          rows="6" style="height:115px;"><?php echo get_option('jshl_lang'); ?></textarea>
        <br>
        主题：<br>
        <input type="radio" name="jshl_theme" value="default" <?php echo get_option('jshl_theme')=="default"?'checked="checked"':''; ?> /> Default
        <input type="radio" name="jshl_theme" value="Blackboard"  <?php echo get_option('jshl_theme')=="Blackboard"?'checked="checked"':''; ?>/> Blackboard
        <input type="radio" name="jshl_theme" value="Eiffel"  <?php echo get_option('jshl_theme')=="Eiffel"?'checked="checked"':''; ?>/> Eiffel
        <input type="radio" name="jshl_theme" value="iPlastic"  <?php echo get_option('jshl_theme')=="iPlastic"?'checked="checked"':''; ?>/> iPlastic
        
      </p>
        
      <p>
        <!-- /* 下面这两个隐藏字段为必须，其中第二个字段的值为要修改的字段名 */ -->
        <input type="hidden" name="action" value="update" />
        <input type="hidden" name="page_options" value="jshl_default_lang,jshl_lang,jshl_theme" />
        <input type="submit" value="保存更改" class="button-primary" />
      </p>
    </form>
    <div id="theme_preview" class="<?php echo get_option('jshl_theme') ?>">
    </div>
    <script type="text/javascript">
      var r = document.getElementsByName('jshl_theme');
      for (var i = 0; i < r.length; i++) {
        (function(i){
          r[i].onclick = function(){
            document.getElementById('theme_preview').className = r[i].value  
          }
        })(i);
      };
    </script>
  </div>
<?php
}
?>