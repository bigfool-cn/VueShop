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

////如果有定义绑定后台模块则禁用路由规则
//if (defined('BIND_MODULE') && BIND_MODULE == 'admin')
//    return [];

use think\Route;

Route::rule('/','home/Entry/index');


// user路由组
Route::group(['ext'=>'html'],function(){
    // method ：请求方法
    Route::rule('register','home/User/register','GET|POST');
    Route::rule('login','home/User/login','GET|POST');
    Route::get('logout','home/User/logout');
    //QQ登录
    Route::rule('toqq','home/QQ/login','GET');
    //QQ登录调函数
    Route::rule('qqlogin','home/QQ/qqLogin','GET');
    Route::rule('bindinfo','home/User/bindInfo');
    Route::rule('changepassword','home/User/changePassword');
    // 个人中心
    Route::rule('user','home/User/user');
    // 个人地址管理
    Route::rule('address','home/User/address');
    // 订单列表
    Route::get('orderlist','home/User/orderList');
    // 删除订单
    Route::get('orderdel/:oid','home/User/orderDel');
});

// 首页路由组
Route::group(['ext'=>'html'],function(){
    // 商品分类路由
    Route::rule('category/:cid','home/Entry/category');
    // 商品搜索
    Route::rule('search','home/Entry/search');
    // 商品详情页
    Route::rule('goods/:gid','home/Product/goods');
    // 购物车
    Route::rule('cart','home/Cart/lists');
    // 商品结算
    Route::rule('flow','home/Flow/index');
    // 商品支付
    Route::rule('topay','home/Flow/toPay');
    // 商品支付同步通知
    Route::rule('return','home/Flow/returnUrl');
    // 商品支付异步通知
    Route::rule('notiyf','home/Flow/notiyf');
});



return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],

];


