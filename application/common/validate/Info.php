<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/17
 * Time: 16:08
 */

namespace app\common\validate;


use think\Validate;

class Info extends Validate
{
    protected $rule = [
        // 用户名必填
        'username' => 'require',
        'email'    => 'require|email',
        'phone'    => 'require',

    ];

    protected $message = [
        'username.require' => '请填写用户名',
        'email.require'    => '请填写邮箱名称',
        'email.email'      => '输入的邮箱格式不正确',
        'phone.require'    => '请填写手机号',
    ];

}