<?php

namespace app\admin\controller;

use think\Controller;
use app\common\model\User;

class Login extends Controller
{
    /**
     *  用户登录功能
     */
    public function login(){
        // 当提交时post提交时 进行 操作
        // 验证登陆 使用验证器
        // 在模型中进行验证
        if(request()->isPost()){

            $res = (new User())->login(input('post.'));
            if ($res['valid']){
                // 当valid 为1时 成立 登陆成功 进行跳转
                $this->success($res['msg'],'admin/entry/index');
            }else{
                // 登陆失败
                $this->error($res['msg']);
                exit;
            }
        }

        return view('');
    }
}
