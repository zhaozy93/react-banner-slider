module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
      "plugin:jsx-a11y/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
      "jsx-a11y"
    ],
    "rules": {
        //缩进使用2个空格
        "indent": [ "error", 2, { "SwitchCase": 1 } ],
        //换行的标志，系统相关
        "linebreak-style": [ "error", "unix" ],
        //字符串需要单引号
        "quotes": [ "error", "single" ],
        //每一行结束都需要分号
        "semi": [ "error", "always" ],
        //单行的长度
        "max-len": ["error", 180],
        //key: value之间冒号后需要有空格
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
        //关键字前后需要空格 if ( )
        "keyword-spacing": ["error", { "before": true, "after": true }],
        //数学运算符前后需要有空格  =  +  - % /.....
        "space-infix-ops": ["error", {"int32Hint": false}],
        //非数学运算符前后不需要空格  ! --  ++ != ==....
        "space-unary-ops": "error",
        //数组内部不需要与方括号之间有空格
        "array-bracket-spacing": ["error", "never"],
        //圆括号内部不需要与圆括号之间有空格
        "space-in-parens": ["error", "never"],
        //花括号内部不需要与花括号之间有空格
        // "object-curly-spacing": ["error", "never"],
        //逗号的前面不需要空格，后面需要空格
        "comma-spacing": ["error", { "before": false, "after": true }],
        //类、函数、关键字if() 与{} 之间不需要空格
        "space-before-blocks": ["error",{ "functions": "never", "keywords": "never", "classes": "never" }],
        //分号前不需要空格，分号后需要空格 if(a; b; c)
        "semi-spacing": ["error", { "before": false, "after": true }],
        //注释前后都需要有空格
        "spaced-comment": ["error", "always"],
        //var 语句块后面需要空行与其他语句块隔开
        // "newline-after-var": ["error", "always"],
        //块级注释前后需要空行，line级注释前后不需要空行
        "lines-around-comment": ["error", {
            "beforeBlockComment": true,
            "afterBlockComment": false,
            "beforeLineComment": false,
            "afterLineComment": false,
            "allowBlockStart": true
            }],
        //文件总需要最后一个空行
        "eol-last": ["error", "always"],
        //不检测运算符是否换行，考虑 ？ ：
        "operator-linebreak": ["error", "none"],
        //逗号总是写在后面 [a, 10,] 而不是前面
        "comma-style": ["error", "last"],
        //函数 类 if等语句块的{总是不换行
        // "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
        //要求在每个函数类与方法前面加注释块
        "require-jsdoc": ["error", { "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": false,
            "ClassDeclaration": true
            }}],
        //一个块内不需要把变脸定义在一起
        // "one-var": ["error", "never"],
        //key: value 中的key引号按需加载
        "quote-props": ["error", "as-needed"],
        //每行只允许定义一个对象的属性
        // "object-property-newline": "error",
        //数组、对象最后一个不需要,
        "comma-dangle": ["error", "never"],
        //块级作用域一定需要{}
        curly: "error",
        //不允许使用undefined作为变量初始值
        "no-undefined": "error",
        //强制使用 === !==，不可以使用 == !=
        "eqeqeq": ["error", "always"],
          //for (key in foo) {
          //   if (Object.prototype.hasOwnProperty.call(foo, key)) {
          //     doSomething(key);
          //   }
          //   if ({}.hasOwnProperty.call(foo, key)) {
          //     doSomething(key);
          //   }
          // }
          // for in 循环对象时，一定先判断
        "guard-for-in": "error",
        //变量超出定义范围是报警
        "block-scoped-var": "error",
        //变量定义前使用 报警
        "no-use-before-define": "error",
        //禁止空白的constructor函数
        "no-useless-constructor": "error",
        //变量重复定义  报警
        "no-redeclare": "error",
        //多余的圆括号 报警
        "no-extra-parens": "error",
        //循环内定义函数 报警
        "no-loop-func": "error",
        //tab和space混合使用 报警
        "no-mixed-spaces-and-tabs": "error",
        //能用一个空格完成的东西用多个 报警
        "no-multi-spaces": "error",
        //每行代码最后不允许有空格 报警
        "no-trailing-spaces": "error"
    }
};
