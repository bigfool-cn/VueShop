<?php

namespace app\common\model;

use think\Model;

class Goods extends Model
{
    // 主键
    protected $pk = 'gid';
    // 表名
    protected $table = 'shop_goods';

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'datetime';

    // 关联subgoods 表
    public function assGoods(){
        return $this->hasMany(Subgoods::class);
    }

}
