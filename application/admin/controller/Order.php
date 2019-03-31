<?php

namespace app\admin\controller;

use think\Controller;
use app\common\model\Order as OrderModel;
use app\common\model\User;

class Order extends Common
{
    /**
     * 订单列表
     */
    public function list(){
        // 获取商品信息
        $userModel = new User();
        $orderInfo = OrderModel::all();
        foreach ($orderInfo as $k=>$v ){
            $user = $userModel::get($v['user_id']);
            $orderInfo[$k]['username'] =$user['username'];

        }
        return view('',compact('orderInfo'));
    }

    /**
     * 更新订单
     */
    public function update(){
        if(request()->isPost()){
            $id = input('post.id');
            $status = input('post.status');
            // 更新订单表中的订单信息
            $model = OrderModel::get($id);
            $model->status = $status;
            $res = $model->save();
            if ($res){
                $this->success('更新成功','/admin/order/list');
            }else{
                $this->error('更新状态失败');
            }
        }
        $id = input('id');
        $userModel = new User();
        $data = OrderModel::get($id);
        $user = $userModel::get($data['user_id']);
        $username = $user['username'];
        if ($data){
            $data = $data->toArray();
        }else{
            $this->error('参数错误','/admin/order/list');
        }
        return view('',compact('data','username'));
    }
}
