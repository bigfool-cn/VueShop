<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/17
 * Time: 16:08
 */

namespace app\common\validate;


use think\Validate;

class User extends Validate
{
    protected $rule = [
        // 用户名必填
        'extend_field5' => 'require',
        'username'=>'require',
        'phone'=>'require|mobile',
        'email'=>'require|email',
        // 密码必填,密码最少6位
        'password'=>'require|confirm:confirm_password',
        // 确认密码
        'confirm_password'=>'require'
    ];
    protected $regex = [
        'mobile'    => '/^1[3|4|5|6|8]\d{9}$/',
    ];

    protected $message = [
        'username.require' =>'请填写用户名',
        'phone.require'=>'请填写手机号码',
        'phone.mobile'=>'手机号码格式错误',
        'email.require'=>'请填写邮箱',
        'email.email'=>'邮箱格式错误',
        'password.require' =>'请填写用户名密码',
        'password.confirm' =>'两次密码不一致'
    ];
    protected $scene = [
        'bind'=>['phone','email','password','confirm_password'],
        'user'=>['username','password','confirm_password'],
    ];

}