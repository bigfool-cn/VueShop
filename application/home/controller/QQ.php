<?php
/**
 * Created by PhpStorm.
 * User: JS_chen
 * Date: 2018/6/23
 * Time: 10:26
 */

namespace app\home\controller;
use think\Controller;
use qqlogin\login\QC;
use qqlogin\login\Oauth;
use think\Db;

class QQ extends Controller
{

    public function login()
    {
        $qq = new Oauth();
        $url = $qq->qq_login();
        print_r($url);exit;
        $this->redirect($url);
    }
    public function qqLogin()
    {
        $qq = new Oauth();
        $token = $qq->qq_callback();
        $openid = $qq->get_openid();
        $data = new QC($token, $openid);
        $info = $data->get_user_info();
        $openuser = Db::name('openuser')->where('openid',$openid)->find();
        if($openuser['openid'])
        {
            $openuser = Db::name('openuser')->where('openid',$openid)->field('uid')->find();
            session('user.user_username',$info['nickname']);
            session('user.sign',md5('customer'));
            session('openid',$openid);
            if($openuser['uid']==0)
            {
                $this->redirect('/bindinfo.html');
            }
            session('user.user_id',$openuser['uid']);
            $this->redirect('/');

        }else{
            $useInfo = [
                'nickname'=>$info['nickname'],
                'gender'=>$info['gender'],
                'figureurl'=>$info['figureurl'],
                'openid'=>$openid
            ];
            session('openid',$openid);
            session('user.user_username',$info['nickname']);
            session('user.sign',md5('customer'));
            Db::name('openuser')->insert($useInfo);
            $this->redirect('/bindinfo.html');
        }
        // 将用户信息存入到session中
        print_r($info);
    }
}