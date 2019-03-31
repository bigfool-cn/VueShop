<?php

namespace app\admin\controller;

use app\common\model\Subgoods;
use think\Controller;
use think\Loader;
use think\Request;
use app\common\model\Goods as GoodsModel;
use app\common\model\Category;

class Goods extends Common
{
    /**
     * 显示商品列表
     *
     * @return \think\Response
     */
    public function index()
    {
        // 获取商品 以 pid 进行分类:

        $model = new GoodsModel();
        $data = $model->select();

       return view('index',compact('data'));
    }

    /**
     * 显示 商品添加页面
     *
     * @return \think\Response
     */
    public function create()
    {
        // 获取商品的所有分类:

        $cData = (new Category())->getTreeData();
        return view('create',compact('cData'));
    }

    /**
     * 保存添加的商品
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
         //halt(input('post.'));



        // 简化
        if (request()->isPost()){

            // 引入验证器
            $validate = Loader::validate('Goods');

            // 验证数据
            if(!$validate->check(input('post.'))){
                $this->error($validate->getError());
                exit;
            }

            // 添加商品表
            $db = new GoodsModel();
            $db->gname = input('post.gname');
            $db->pid = input('post.pid');
            $db->gprice = input('post.gprice');
            $db->mprice = input('post.mprice');
            $db->description = input('post.description');
            $db->atlas = input('post.atlas');
            $db->details = input('post.details');
            $db->cover = input('post.cover');
            $db->click = input('post.click');
            $db->save();

            // 添加货品表
            foreach (json_decode(input('post.subclass'),true) as $v){
                // 通过多表关联  进行数据添加
                $db->assGoods()->save(
                  ['sname'=>$v['sname'],'snum'=>$v['snum']]
                );
            }


            $this->success( '添加成功');
            exit;
        }

    }


    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        // 获取旧数据
        $oldData = GoodsModel::get($id);
        // 获取货品表数据

        // 获取货品的详细信息
        $oldSub = $oldData->assGoods()->select();
        $oldSub = json_encode($oldSub,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        // 获取商品分类
        $cData = (new Category())->getTreeData();

        // 分配数据
       return view('',compact('oldData','cData','oldSub'));
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {


        if (request()->isPost()){

            // 引入验证器
            $validate = Loader::validate('Goods');

            // 验证数据
            if(!$validate->check(input('post.'))){
                $this->error($validate->getError());
                exit;
            }

            $db = GoodsModel::get($id);
            $db->gname = input('post.gname');
            $db->pid = input('post.pid');
            $db->gprice = input('post.gprice');
            $db->mprice = input('post.mprice');
            $db->description = input('post.description');
            $db->atlas = input('post.atlas');
            $db->details = input('post.details');
            $db->cover = input('post.cover');
            $db->click = input('post.click');
            $db->save();

            // 保存商品数据到货品表
            // 先删后填
            $db->assGoods()->delete();

            // 添加货品表
            foreach (json_decode(input('post.subclass'),true) as $v){
                // 通过多表关联  进行数据添加
                $db->assGoods()->save(
                    ['sname'=>$v['sname'],'snum'=>$v['snum']]
                );
            }

            $this->success( '修改成功','admin/goods/index');
            exit;
        }
        $this->error('请求非法');
        exit;
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        // 送数据库删除数据
        // 判断是否为顶级栏目
        //  获取旧数据
        GoodsModel::destroy($id);
        // 删除货品表数据
        Subgoods::where('goods_id',$id)->delete();
        $this->success('删除成功');
        exit();

    }
}
