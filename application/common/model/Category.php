<?php

namespace app\common\model;

use think\Model;
use houdunwang\arr\Arr;

class Category extends Model
{
    // 制定表主键 如果符合TP规范 可以不指定
    protected $pk='cid';
    // 设置当前模型对应的完整数据表名称
    protected $table='shop_category';

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'datetime';
    /**
     * 实例：
     * Arr::tree($data, $title, $fieldPri = 'cid', $fieldPid = 'pid');
    参数                   说明
    $data                 	数组
    $title                	字段名称
    $fieldPri             	主键 id
    $fieldPid             	父 id
     */
    // 获取树形结构数据
    public function getTreeData(){
        // 获取数据库中的数据
        $data = $this::all();
        $data = Arr::tree($data, 'catname');
        return $data;
    }
}
