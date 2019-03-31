<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/15
 * Time: 20:18
 */

namespace app\common\validate;


use think\Validate;

class Password extends Validate
{
    protected $rule = [
        // 旧密码必填
      'oldPassword' => 'require',
        // 新密码必填 验证两次密码是否一致
      'newPassword' => 'require|confirm:rePassword',
        // 重复密码必填 验证两次密码是否一致
      'rePassword' => 'require',


    ];

    protected $message = [
        'username.require' =>'请填写用户名',
        'password.require' =>'请填写用户名密码',
        'newPassword.confirm' =>'两次密码不一致',
    ];

}