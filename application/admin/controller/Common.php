<?php

namespace app\admin\controller;

use think\Controller;
use think\Request;

class Common extends Controller
{
    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        // 验证前后台
        if (!session('user.user_id') || session('user.sign') !== md5('admin')){
            $this->error('没有权限进行访问,请正确登陆后在进行访问','/admin/Login/login');
            exit;
        }

    }
}
