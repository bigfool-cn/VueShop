<?php

namespace app\common\model;

use think\Cookie;
use think\Loader;
use think\Model;
use think\Session;

class User extends Model
{
    // 制定表主键 如果符合TP规范 可以不指定
    protected $pk='uid';
    // 设置当前模型对应的完整数据表名称
    protected $table='shop_user';

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'datetime';

    // 只读字段  一旦被写入 就不能被修改
    protected $readonly = ['phone'];

    // 关联subgoods 表
    public function assAddr(){
        return $this->hasMany(Userinfo::class,'uid');
    }

    /**
     * 用户登陆功能
     * @param $data array 传入数据 这里时post提交过来的用户登陆数据
     */
    public function login($data){
        // 引入验证器
        $validate = Loader::validate('Auth');

        // 当验证不通过时
        if (!$validate->check($data,'A')){
            return ['valid'=>0,'msg'=>$validate->getError()];
        }

        // 验证密码是否正确
        // 获取 数据库中用户的信息
        if(isset($data['type']) && $data['type'] == 'phone'){
            // 前台登陆
            $userInfo = $this->where('is_admin',0)->where('phone',$data['username'])->find();
            $userSign = 'customer';
        }else{
            // 后台登陆
            $userInfo = $this->where('is_admin',1)->where('username',$data['username'])->find();
            $userSign = 'admin';
        }
        // 当$userInfo为空时 表示没有找到对应的用户名用户名
        if (!$userInfo){
            return ['valid'=>0,'msg'=>'用户名不存在'];
        }
        // 验证密码是否正确
        if(!password_verify($data['password'],$userInfo['password'])){
            return ['valid'=>0,'msg'=>'密码不正确'];
        }
        // 将用户信息存入到session中
        session('user.user_id',$userInfo['uid']);
        session('user.user_username',$userInfo['username']);
        session('user.sign',md5($userSign));


        if (isset($data['remember']) && $data['remember']){
            Cookie::set(session_name(),session_id(),['expire'=>time()+60*60*24*30]);
        }

        // 返回成功信息
        return ['valid'=>1,'msg'=>'登陆成功'];
    }

    public function changePassword($data){
        //引入验证器
        $validate = Loader::validate('Password');

        // 当验证不通过时
        if (!$validate->check($data)){
            return ['valid'=>0,'msg'=>$validate->getError()];
        }

        // 验证旧密码是否正确
        $oldInfo = $this::find(session('user.user_id'));
        // 取出旧密码
        $oldPassword = $oldInfo['password'];

        // 验证旧密码是否正确
        if(!password_verify($data['oldPassword'],$oldPassword)){
            return ['valid'=>0,'msg'=>'原密码不正确'];
        }

        // 验证数据结束， 皆新密码更新到数据库中
        $oldInfo->password= password_hash($data['newPassword'],PASSWORD_DEFAULT);
        $res = $oldInfo->save();
        if($res){
            return ['valid'=>1,'msg'=>'修改密码成功'];
        }else{
            return ['valid'=>0,'msg'=>'修改密码失败'];
        }
    }

    /**
     *  前台用户注册
     */
    public function userRegister($data){
        // 进行数据验证
        // 1.引入验证器
        $validate = Loader::validate('User');
        // 2.验证数据 当验证不通过时
        if (!$validate->scene('user')->check($data)){
            return ['valid'=>0,'msg'=>$validate->getError()];
        }

        // 验证手机号是否重复
        $phone = $this::where('is_admin',0)->where('phone',$data['extend_field5'])->find();
        // 当能找到 该手机号时 ，说明手机号已经被使用
        if($phone){
            return ['valid'=>0,'msg'=>"该手机号已经注册，请直接进行登陆"];
        }
        // 用户名随机生成
//        $this->username = 'ZY-'.substr(time(),-8);
        $this->username = 'ZY-'.time();
        // 存储手机号
        $this->phone = $data['extend_field5'];
        // 加密后存储
        $this->password = password_hash($data['password'],PASSWORD_DEFAULT);
        // 保存到数据库
        $res = $this->save();
        if ($res){
            return ['valid'=>1,'msg'=>'用户注册成功'];
        }else{
            return ['valid'=>0,'msg'=>'用户注册失败'];
        }

    }

    // 完善 修改用户信息
    public function userInfo($data){
        // 1.引入验证器
        $validate = Loader::validate('Info');
        // 2.验证数据 当验证不通过时
        if (!$validate->check($data)){
            return ['valid'=>0,'msg'=>$validate->getError()];
        }

        // 验证  ，邮箱 ，用户名
        // 验证手机号是否重复
        $oldUsername = Session::get('user.user_username');
        $userId = Session::get('user.user_id');
        $model = User::get($userId);

        $phone = $model->where('is_admin',0)->where('uid','NEQ',$userId)->where('phone',$data['phone'])->find();
        if($phone){
            return ['valid'=>0,'msg'=>"该手机已被其他用户注册"];
        }

        $email = $model->where('is_admin',0)->where('uid','NEQ',$userId)->where('email',$data['email'])->find();
        if($email){
            return ['valid'=>0,'msg'=>"该邮箱已被其他用户使用"];
        }
        $username = $model->where('is_admin',0)->where('uid','NEQ',$userId)->where('username',$oldUsername)->select();


        if($username){
            return ['valid'=>0,'msg'=>"该昵称你进被使用"];
        }

        $model->phone = $data['phone'];
        $model->email = $data['email'];
        $model->username = $data['username'];
        //保存数据到数据库
        $res = $model->save();
        if ($res){
            session('user.user_username',$data['username']);
            return ['valid'=>1,'msg'=>'修改成功'];
        }else{
            return ['valid'=>0,'msg'=>'修改信息失败'];
        }


    }
}
