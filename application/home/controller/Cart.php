<?php

namespace app\home\controller;

use app\common\model\Goods;
use app\common\model\Subgoods;
use think\Controller;
use think\Request;
use think\Session;

class Cart extends Controller {
    /**
     * 直接购买商品
     * 不使用直接购买了
     * 将商品信息添加到购物车中 一起结算（网站就是这样的）
     *
     * @return \think\Response
     */
    public function index() {
            // 当时post 提交时 显示单一的商品
            // 将商品加入购物车中

            $data = input('post.data');
            $data = json_decode($data,true);
            // 实例化购物车类
            $cart = new \app\helper\Cart();
            // 将商品添加到session中
            $cart->add( $data );
            // 跳转的购物车页面
            return $this->redirect('/cart.html');
            exit;

    }

    public function lists(){
        $data = Session::get('cart.goods');
        // 将商品信息添加
        if(!is_null($data)){
            foreach ($data as $k=>$v){
                // $info = Goods::get($v['id'])->toArray();
                $cover = Goods::where('gid',$v['id'])->value('cover');
                $data[$k]['cover'] = $cover;
            }
        }

        $data = json_encode($data,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        if($data == '[]'){
            $data='null';
        }
        return view('',compact('data'));
    }

    /**
     *  添加购物车
     */
    public function add() {
        $data = input('post.data');
        $data =json_decode($data,true);

        $cart = new \app\helper\Cart();
        $cart->add( $data );
        $goods = Session::get('cart');
        $msg = ['goods'=>$goods,'code'=>1];
        echo json_encode($msg,JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }


    /**
     * 保存更新的资源
     *
     * @param  \think\Request $request
     * @param  int $id
     *
     * @return \think\Response
     */
    public function update( Request $request ) {
        $Data = [
            "sid" => '027c9134',               // 商品的唯一SID，不是商品的ID
            "num" => 10,                       // 商品数量
        ];
        $cart = new \app\helper\Cart();
        $cart->update($Data);
        $this->success('修改成功','index');
    }

    /**
     * 清空指定资源
     *
     * @param  int $id
     *
     * @return \think\Response
     */
    public function flush() {

        $cart = new \app\helper\Cart();
        $cart->flush();
        $this->success( 'yes', 'index' );
    }
}