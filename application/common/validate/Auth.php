<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/15
 * Time: 20:18
 */

namespace app\common\validate;


use think\Validate;

class Auth extends Validate
{
    protected $rule = [
        // 用户名必填
        'username' => 'require',
        // 密码必填,密码最少6位
        'password'=>'require'
    ];

    protected $message = [
        'username.require' =>'请填写用户名',
        'password.require' =>'请填写用户名密码'
    ];

}