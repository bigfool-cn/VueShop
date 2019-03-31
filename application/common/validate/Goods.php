<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/16
 * Time: 18:00
 */

namespace app\common\validate;


use think\Validate;

class Goods extends Validate
{
    protected $rule = [
        // 用户名必填
        'gname' => 'require',
        'pid' => 'require',
        'gprice' => 'require',
        'atlas' => 'require',
        'details' => 'require',
        'cover' => 'require',
        'description' => 'max:255',
    ];

    protected $message = [
        'gname.require' =>'商品名称不能为空',
        'pid.require' =>'请选择商品分类',
        'gprice.require' =>'商品价格不能为空',
        'atlas.require' =>'商品展示图不能为空',
        'details.require' =>'商品描述不能为空',
        'cover.require' =>'商品封面图不能为空',
        'description.max' =>'描述超过255个字符',
    ];

}