<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // +----------------------------------------------------------------------
    // | 应用设置
    // +----------------------------------------------------------------------

    // 应用命名空间
    'app_namespace'          => 'app',
    // 应用调试模式
    'app_debug'              => false,
    // 应用Trace
    'app_trace'              => false,
    // 应用模式状态
    'app_status'             => '',
    // 是否支持多模块
    'app_multi_module'       => true,
    // 入口自动绑定模块
    'auto_bind_module'       => false,
    // 注册的根命名空间
    'root_namespace'         => [],
    // 扩展函数文件
    'extra_file_list'        => [THINK_PATH . 'helper' . EXT],
    // 默认输出类型
    'default_return_type'    => 'html',
    // 默认AJAX 数据返回格式,可选json xml ...
    'default_ajax_return'    => 'json',
    // 默认JSONP格式返回的处理方法
    'default_jsonp_handler'  => 'jsonpReturn',
    // 默认JSONP处理方法
    'var_jsonp_handler'      => 'callback',
    // 默认时区
    'default_timezone'       => 'PRC',
    // 是否开启多语言
    'lang_switch_on'         => false,
    // 默认全局过滤方法 用逗号分隔多个
    'default_filter'         => '',
    // 默认语言
    'default_lang'           => 'zh-cn',
    // 应用类库后缀
    'class_suffix'           => false,
    // 控制器类后缀
    'controller_suffix'      => false,

    // +----------------------------------------------------------------------
    // | 模块设置
    // +----------------------------------------------------------------------

    // 默认模块名
    'default_module'         => 'index',
    // 禁止访问模块
    'deny_module_list'       => ['common'],
    // 默认控制器名
    'default_controller'     => 'Index',
    // 默认操作名
    'default_action'         => 'index',
    // 默认验证器
    'default_validate'       => '',
    // 默认的空控制器名
    'empty_controller'       => 'Error',
    // 操作方法后缀
    'action_suffix'          => '',
    // 自动搜索控制器
    'controller_auto_search' => false,

    // +----------------------------------------------------------------------
    // | URL设置
    // +----------------------------------------------------------------------

    // PATHINFO变量名 用于兼容模式
    'var_pathinfo'           => 's',
    // 兼容PATH_INFO获取
    'pathinfo_fetch'         => ['ORIG_PATH_INFO', 'REDIRECT_PATH_INFO', 'REDIRECT_URL'],
    // pathinfo分隔符
    'pathinfo_depr'          => '/',
    // URL伪静态后缀
    'url_html_suffix'        => 'html',
    // URL普通方式参数 用于自动生成
    'url_common_param'       => false,
    // URL参数方式 0 按名称成对解析 1 按顺序解析
    'url_param_type'         => 0,
    // 是否开启路由
    'url_route_on'           => true,
    // 路由使用完整匹配
    'route_complete_match'   => false,
    // 路由配置文件（支持配置多个）
    'route_config_file'      => ['route'],
    // 是否强制使用路由
    'url_route_must'         => false,
    // 域名部署
    'url_domain_deploy'      => false,
    // 域名根，如thinkphp.cn
    'url_domain_root'        => '',
    // 是否自动转换URL中的控制器和操作名
    'url_convert'            => true,
    // 默认的访问控制器层
    'url_controller_layer'   => 'controller',
    // 表单请求类型伪装变量
    'var_method'             => '_method',
    // 表单ajax伪装变量
    'var_ajax'               => '_ajax',
    // 表单pjax伪装变量
    'var_pjax'               => '_pjax',
    // 是否开启请求缓存 true自动缓存 支持设置请求缓存规则
    'request_cache'          => false,
    // 请求缓存有效期
    'request_cache_expire'   => null,
    // 全局请求缓存排除规则
    'request_cache_except'   => [],

    // +----------------------------------------------------------------------
    // | 模板设置
    // +----------------------------------------------------------------------

    'template'               => [
        // 模板引擎类型 支持 php think 支持扩展
        'type'         => 'Think',
        // 模板路径
        'view_path'    => '',
        // 模板后缀
        'view_suffix'  => 'html',
        // 模板文件名分隔符
        'view_depr'    => DS,
        // 模板引擎普通标签开始标记
        'tpl_begin'    => '{',
        // 模板引擎普通标签结束标记
        'tpl_end'      => '}',
        // 标签库标签开始标记
        'taglib_begin' => '{',
        // 标签库标签结束标记
        'taglib_end'   => '}',
    ],

    // 视图输出字符串内容替换
    'view_replace_str'       => [
        '__ZY__'=>'/static',
        '__ZHOME__'=>'/static/home',
        '__PUBLIC__' => '/public/',
        '__ROOT__'   => '/',
        '__CDN__'    => '',
    ],
    // 默认跳转页面对应的模板文件
    'dispatch_success_tmpl'  => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',
    'dispatch_error_tmpl'    => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',

    // +----------------------------------------------------------------------
    // | 异常及错误设置
    // +----------------------------------------------------------------------

    // 异常页面的模板文件
    'exception_tmpl'         => THINK_PATH . 'tpl' . DS . 'think_exception.tpl',

    // 错误显示信息,非调试模式有效
    'error_message'          => '页面错误！请稍后再试～',
    // 显示错误信息
    'show_error_msg'         => false,
    // 异常处理handle类 留空使用 \think\exception\Handle
    'exception_handle'       => '',

    // +----------------------------------------------------------------------
    // | 日志设置
    // +----------------------------------------------------------------------

    'log'                    => [
        // 日志记录方式，内置 file socket 支持扩展
        'type'  => 'File',
        // 日志保存目录
        'path'  => LOG_PATH,
        // 日志记录级别
        'level' => [],
    ],

    // +----------------------------------------------------------------------
    // | Trace设置 开启 app_trace 后 有效
    // +----------------------------------------------------------------------
    'trace'                  => [
        // 内置Html Console 支持扩展
        'type' => 'Html',
    ],

    // +----------------------------------------------------------------------
    // | 缓存设置
    // +----------------------------------------------------------------------

    'cache'                  => [
        // 驱动方式
        'type'   => 'File',
        // 缓存保存目录
        'path'   => CACHE_PATH,
        // 缓存前缀
        'prefix' => '',
        // 缓存有效期 0表示永久缓存
        'expire' => 0,
    ],

    // +----------------------------------------------------------------------
    // | 会话设置
    // +----------------------------------------------------------------------

    'session'                => [
        'id'             => '',
        // SESSION_ID的提交变量,解决flash上传跨域
        'var_session_id' => '',
        // SESSION 前缀
        'prefix'         => 'think',
        // 驱动方式 支持redis memcache memcached
        'type'           => '',
        // 是否自动开启 SESSION
        'auto_start'     => true,
    ],

    // +----------------------------------------------------------------------
    // | Cookie设置
    // +----------------------------------------------------------------------
    'cookie'                 => [
        // cookie 名称前缀
        'prefix'    => '',
        // cookie 保存时间
        'expire'    => 0,
        // cookie 保存路径
        'path'      => '/',
        // cookie 有效域名
        'domain'    => '',
        //  cookie 启用安全传输
        'secure'    => false,
        // httponly设置
        'httponly'  => '',
        // 是否使用 setcookie
        'setcookie' => true,
    ],

    //分页配置
    'paginate'               => [
        'type'      => 'bootstrap',
        'var_page'  => 'page',
        'list_rows' => 15,
    ],
    //支付宝配置
    'alipay' =>[
        //应用ID,您的APPID。
        'app_id' => "2016091300502524",

        //商户私钥
        'merchant_private_key' => "MIIEpAIBAAKCAQEAsEKALeXfUHsV1BBy9tvP2m+gohcnDWa1E+yTSEN4As+zEFMAIVc2JheeOduKn0JTN/i+8AaB3zBpBhBNivo2iUs+Hmdztut7Bwor/UwjmDFSnVdSLbgv58EmZy2157eGYCLxwye7y0256N16Ry3mm+UDCkRuVQ1jtIOT01mCA5YbdMhVG2p0Y0g0g76/FoK1cNBth3WVseqDxLDGSjcHiEipD7ecgmKFx0TCmGiCs+ouuGqUhzdDd5VGsWJ2q9pfFSnntBmEFk42fu7C9ALMc9F69JMs1T9mA2+M6sHQiHQs0hcmARAlahSfoz1eCo7jvaPyAOL7rfK/Bzu96Vo4gwIDAQABAoIBAGIHSkS8oTugiR5dW6Mh03MYPE2J9OVGJxWCsNMy+u8NVviQQPVKDMqYvh5NlMZIXAI4LPFPnTFlOjPuI0JVMLmhCFZekQO96bmblaWVkAJYBCuP4hudYb9SNCqUSKQr9OdI6A7y7UX/35K8gwJNbAFuGAfA0WAqRzahKzkTgfS9vhN3CXGTl0X0rdUVJfehgt5wUTeaf+oDEOK9DxY1SURWcCSXMdXy50pMw0DxStV057pRwx4STRUhfrFNfXU1BzqtskZaYOJT+VUrHDhubhWgugyeo7fvn1D8E5CPiGWG581wK7MJQgDxosxLjcfvaWtZ6Bu8hnezB8PWp38ebXECgYEA1fMKkMEbF692ugZWA6PKPf4yy1vGgKruyAv64Q6GIkC0VCH/A4OP92z18h9Ipid50s5/hUvg5x1dzG16kPx36errgwzRZ/cMG2yhhfNt7wBYEamFAzJLaHLRvriceKHFUqf2BZAfitwdxH+lQHjIJcr/gZGNU3A9OUH2ghnh5hkCgYEA0ucW+vTOU8PBRQrpdXQPByKU3tyChXaNTaaBh4Q9w0ukHgL1M1YJB1wDo0dms8WXT2VxvUL0dXyM9HnNkVeEXTeGlMc4U4v0gV4x1jr90h8qVC2WO9n625LpDS9vIfeWJCQMFyBk/0GZpEr8koAeLNnKdhWVbeNctPvKgJ8STvsCgYEAlIY8d3EXFcJBcbKkU7KI27B0Iqh7jScczNNEPqiOhYjVpvJSzmWus914f7UoAfC1qZqg/DBI2SiRzTDTPYOG22SySi/Dz6C5TvCC0TLExn4+pURBio6HuuK6qOQP+86R5Wekawg6XXOhVqAmYDN4/oOGDLS2n43zcqRQNNEy+UECgYEAl/oCq1Dhpab4jMIyPXsmoSOgV4BbZcVqSbxktrzqrOLDHwVOoHGtC+qYjH6VWZJXWNVnQtUOx+K6yClFoyiHr4ylpGxzAHFn/hlcnF3iLhpbLFG1YufPR47z9ZZq5PU+8kgvljK31OD20Fdg7kj4daVzqegfyBIA6kJPSKRYUyUCgYA32GZHBpwoN9yegOuqbOyxwuxgZqpYk/lkXBZriKnD44IahTfkRzPcK/Bhzksy1o1AyQaEsjCG7jbQW4o9gvQN6WVgbXY3IDZwvoiG6an334088dsFTzO6G4ZEediMIbKrrITxY2fy7u9maTEoJkHt8v0cNx6t3hVq0RCkDXqBuA==",

        //异步通知地址
        'notify_url' => "http://shop.bigfool.cn/notiyf.html",

        //同步跳转
        'return_url' => "http://shop.bigfool.cn/return.html",

        //编码格式
        'charset' => "UTF-8",

        //签名方式
        'sign_type'=>"RSA2",

        //支付宝网关
        'gatewayUrl' => "https://openapi.alipaydev.com/gateway.do",

        //支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
        'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5ziGIOQT7dH0juRWpfyn3THmy5N+9KZcYaEI3PN8TilPGILI8AB2IB590w/1Msh0OOgMEVxKSDrQayRNZtWj0mnyZ7Lxt0hDr+RsW/9fO+4q7L6VVmjGvvWo2y7FnPkoHXDjwgyZ3MGWFgkyY2F5ihlsxcl7Pk2g2QqRus2P4wqk0Xu9QCRQ4hHTMoCSaBxhCMPgw7zZktAIF9Phi3yHIjoWm1WFQtR5ns4sLc+o1htrtwUN6lmJ2tX/WCAUPeFy1p9DDL5I5rj23j96qMixUuJiyxTHk4ub/1CCqFL/hPBeaSDe5o6Q49cvP55F8m7tuSxr1JGmZQlyhOss0L9HdQIDAQAB",
    ],
];

