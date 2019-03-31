<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/16
 * Time: 0:53
 */

namespace app\common\validate;


use think\Validate;

class Category extends Validate
{
    protected $rule = [

        'catname' => 'require',
        'thumb' => 'require',
        'pid' => 'require',
        'description' => 'require',
        'orderby' => 'require',
    ];

    protected $message = [
        'catname.require' =>'栏目名称不能为空',
        'thumb.require' =>'栏目封面图不能为空',
        'pid.require' =>'父级id不能为空',
        'description.require' =>'描述名称不能为空',
        'orderby.require' =>'排序不能为空',

    ];

}