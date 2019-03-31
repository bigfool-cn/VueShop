<?php

namespace app\api\controller;

use app\common\model\Goods;
use app\helper\Cart;
use think\Controller;
use think\Request;
use think\Session;

class Api extends Controller
{
    /**
     * 购物车
     *
     * @return \think\Response
     */
    public function cart()
    {
        // 获取购物车数据
        $goods = Session::get('cart.goods');
        if(!is_null($goods)){
            foreach ($goods as $k=>$v){
                // $info = Goods::get($v['id'])->toArray();
                $cover = Goods::where('gid',$v['id'])->value('cover');
                $goods[$k]['cover'] = $cover;
            }
        }
        $cart = json_encode($goods,JSON_UNESCAPED_UNICODE| JSON_UNESCAPED_SLASHES);
        if($cart == '[]'){
            $cart = 'null';
        }
        echo $cart;
        exit;
    }

    /**
     * 删除指定资源
     *
     * @param  int $id
     *
     * @return \think\Response
     */
    public function delete() {
        $sid = input('get.sid');
        $cart = new Cart();
        $cart->del($sid);
        // 在返回 购物车信息
        $this->cart();
    }

    /**
     * 删除指定资源
     *
     * @param  int $id
     *
     * @return \think\Response
     */
    public function deletes() {
        $sid = input('get.sid');
        $cart = new Cart();
        $cart->del($sid);
        // 在返回 购物车信息 加 货品形象数据
        $data = Session::get('cart.goods');
        // 将商品信息添加
        if(!is_null($data)){
            foreach ($data as $k=>$v){
                $info = Goods::get($v['id'])->toArray();
                $data[$k]['info'] = $info;
            }
        }

        $data = json_encode($data,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        if($data == '[]'){
            $data = 'null';
        }
        echo $data;
        exit;
    }

    // 添加购物车
    /**
     *  添加购物车
     */
    public function add() {
        $data = input('post.data');
        $data =json_decode($data,true);

        $cart = new Cart();
        $cart->add( $data );
        // 在返回 购物车信息
        $this->cart();
    }

    // 更新商品
    public function update(){
        $Data = input();

        $cart = new Cart();
        $cart->update($Data);
        echo 1;
        exit;
    }


}
