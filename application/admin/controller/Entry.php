<?php

namespace app\admin\controller;

use think\Controller;
use think\Request;

class Entry extends Common
{
    public function index(){
        // 后台首页
        return $this->fetch();
    }

}
