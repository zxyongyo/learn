# Shell - bash

[学习文档 (wangdoc)](https://wangdoc.com/bash/expansion.html)

bash是Unix和Linux系统的一种shell（命令行环境），是目前大多数发行版的默认shell

## 1 基本语法

### 1.1 echo命令

- 作用：在屏幕上输出一段文本

- `echo hello world`    如果想要输出多行文本，文本需要放在引号里面

- 常用参数：

  | -n   | 取消输出文本末尾的回车                                       |
  | ---- | ------------------------------------------------------------ |
  | -e   | 解释引号中的特殊字符（比如换行符\n），默认情况下不解释特殊字符原样输出 |

### 2 命令格式

- `command [arg1 ... [ argN ] ]`
- 单个命令一般都是一行，按下回车键即执行，在一行的**末尾加上反斜杠**（\）可以让下一行和当前行一起解释

### 3 常用符号

- 分号`;`：使一行可以防止多个命令，上一个命令执行结束后，再执行下一个命令
- `&&`：`command1 && command2` 如果command1运行成功，才继续运行command2，否则command2不运行
- `||`：`command1 && command2` 如果command1运行失败，才继续运行command2，否则command1不运行

### 4 type命令

- 作用：用来判断一个命令的来源

- 常用参数：

  | -a   | 查看一个命令的所有定义                                       |
  | ---- | ------------------------------------------------------------ |
  | -t   | 返回一个命令的类型：别名(alias)，关键词(keyword)，函数(function)，内置命令(builtin)，文件(file) |

### 5 快捷键

| CTRL + L | 清除屏幕并将当前行移到页面顶部 |
| -------- | ------------------------------ |
| CTRL + C | 终止当前正在执行的命令         |
| CTRL + U | 从光标位置删除到行首           |
| CTRL + K | 从光标位置删除到行尾           |

## 2 模式扩展

## 3 引号和转义

## 4 变量

### 4.1 环境变量

​	环境变量通常是bash环境自带的变量，进入shell时已经定义好了，可以直接使用。

- `env`或`printenv`命令可以显示所有环境变量

- 查看一个变量可以用： `$ printenv PATH ` 或 `$ echo $PATH`

### 4.2 定义变量

```bash
$ msg=hello;name=zxy	# 一行定义两个变量用';'隔开，重复赋值 第二次赋的值会覆盖原来的值
$ echo $msg ${name}	# hello zxy	可以写为$msg 或 ${name}
$ p=PATH
$ echo ${!p}	# 如果变量的值也是变量 可以用${!prama}读
$ unset p	# unset命令用来删除一个变量 也可以直接将这个变量等于空字符串 p=''
```

### 4.3 特殊变量

​	Bash提供一些特殊变量，这些变量由shell提供，用户不能修改

| $?   | 用来判断上一个命令是否执行成功, 返回0表示上一个命令执行成功，如果不是零，表示上一个命令执行失败 |
| ---- | ------------------------------------------------------------ |
| $$   | `$ echo $$ `       输出当前shell的进程ID                     |
| $_   | 上一个命令的最后一个参数                                     |

### 4.4 变量的默认值

- `${count:-0}` 表示如果变量count存在且不为空，返回它的值，否则返回 0

- `${name:=zxy}` 表示如果变量name存在且不为空，返回它的值，否则将它设为 zxy 并返回

- `${count:+1}` 表示如果变量count存在且不为空，返回 1，否则返回空值，用来判断变量是否存在

- `${name:?message}` 表示如果变量name存在且不为空，返回它的值，否则打印 'name：message' 并终端脚本执行，如果省略message则输出‘parameter null or not set’

**以上四种语法在脚本中，变量名的部分可以用数字1到9，表示脚本的参数**

### 4.5 declare命令

`declare OPTION VARIABLE=value`
declare命令可以声明一些特殊类型的变量，为变量设置一些限制，比如声明只读类型的变量和整数类型的变量。

- 常用参数

  | -a   | 声明数组变量                |
  | ---- | --------------------------- |
  | -f   | 输出所有函数定义            |
  | -F   | 输出所有函数名              |
  | -i   | 声明整数变量                |
  | -l   | 声明变量为小写字母          |
  | -p   | 查看变量信息                |
  | -r   | 声明只读变量 等同于readonly |
  | -u   | 声明变量为大写字母          |
  | -x   | 该变量输出为环境变量        |

### 4.6 let命令

- let 声明变量时，可以直接执行算数表达式

  ```bash
  $ let "v1=1" "v2=v1++"
  $ echo $v1,$v2
    2,1
  ```

## 5 字符串操作

`${#varname}` 获取字符串长度

### 5.2 提取字串

`${varname:offset:length} ` 返回从offset开始，长度为length的字串

```bash
$ name=zxyongge
$ ${name:0:3} # zxy  从第0位到第3位  只能通过变量提取字符串，不会改变原字符串
$ ${name:3} # ong 如果省略length 则从offset开始一直到字符串的结尾
$ ${name: -3} # gge 如果offset为负数 表示从后往前
$ ${name: -3, -1} # gg  length为负数 表示排除
```

### 5.5 字符串搜索和替换

。。。

- 转为大写：`${varname^^}`； 转为小写：`${varname,,}`

## 6 行操作

bash内置了Readline库，具有这个库提供的很多“行操作”，能大大提高操作效率

**[文档](https://wangdoc.com/bash/readline.html)**

## 7 脚本入门

​	脚本就是包含一些列命令的一个文本文件，shell读取这个文件，一次执行里面的所有命令；

​	脚本的好处就是可以重复使用，也可以指定特定的场合自动调用，比如系统启动或关闭时自动执行脚本。

### 7.1 shebang行

脚本的第一行通常时指定这个脚本必须通过什么解释器执行，这一行以 `#!`字符开头

```bash
#!/bin/bash
```

- shebang行不是必须的，建议加上；如果缺少改行，使用时就需要手动将脚本传给解释器，

```bash
$ ./script.sh	# 有shebang行
$ /bin/bash ./script.sh	# 无shebang行
```

### 7.2 执行权限和路径

- 写完脚本后 要给脚本加上可执行的权限

- 可以在主目录建一个`~/bin`目录，专门存放可执行脚本然后把`~/bin`加入`$PATH`

```bash
export PATH=$PATH:~bin	# 把这一行写入到 ~/.bashrc
$ source ~/.bashrc
$ script.sh	 # 然后在任何目录下都可以直接执行脚本
```

### 7.3 env命令

- `env`命令总是指向`/usr/bin/env`文件，或者说这个二进制文件总是在`usr/bin`

- `#!/usr/bin/env NAME`这个语法的意思是，让shell查找$PATH环境变量里面第一个匹配的NAME

  所以Shebang行可以写成: `#!usr/bin/env bash`

### 7.4脚本参数

​	调用脚本时候脚本文件后可以带有参数
- 脚本文件内部使用特殊变量引用这些参数
  - $0：脚本文件名
  - $1 - $9：对应脚本的第一个到第九个参数
  - $#：参数的总数
  - $@：全部的参数，参数之间使用空格分隔
  - $*：全部的参数，参数之间使用空格分隔
  - 如果参数多余9个，第十个用 ${10}引用，以此类推

### 7.5 shift命令

​	shift命令可以改变脚本参数，每执行一次都会移除脚本当前的第一个参数，是后面的参数向前一位

```bash
#!/bin/bash
# while循环介个shift命令，读取每一个参数
while [ "$1" != "" ]; do
	echo "剩下 $# 个参数"
	echo "参数：$1"
	shift
done
```

​	sheift 命令还可以接受一个整数作为参数，指定要移除的参数个数，默认是1

### 7.6 getopts命令

​	`getopts`命令用在脚本内部，可以解析复杂的脚本命令行参数，通常与`while`循环一起使用，去除脚本中所有带有 `-`的参数

```bash
# 有三个配置项参数 -l,-h,-a，其中-a可以带有参数值，后面必须带有一个冒号，getopts第二个参数是一个变量名，用来保存当前取到的配置项参数
while getopts 'lha:' OPTION; do
  case "$OPTION" in
    l)
      echo "linuxconfig"
      ;;
    h)
      echo "h stands for h"
      ;;
    a)
      avalue="$OPTARG"	# 例如 -a foo 那么环境变量 OPTARG 保存的就是参数值
      echo "The value provided is $OPTARG"
      ;;
    ?)
      echo "script usage: $(basename $0) [-l] [-h] [-a somevalue]" >&2
      exit 1
      ;;
  esac
done
shift "$(($OPTIND - 1))"	# $OPTIND表示已处理的连线词参数个数，把这些参数移除，保证后面可以使用$1,$2处理主参数
```

### 7.7 exit命令

​	exit命令用于终止当前脚本的执行，并向shell返回一个退出值，0表示执行成功，

```bash
# id -u 返回用户的id，如果用户的id不是0，脚本就会退出
if [ $(id -u) != "0"]; then
	echo "根用户才能执行当前脚本"
	exit 1
fi
```

### 7.8 read 命令

​	在脚本执行过程中可能需要用户提供一部分数据，这是可以使用read命令

- read可以接收用户输入的多个值 `read firstname lastname; echo "$firstname $lastname"`
- 如果用户输入项少于read命令给出的变量数目，那么额外的变量值为空，如果用户输入项多余定义的变量，那么多余的输入项包含在最后一个变量中
- 如果read后面没有定义变量，那么环境变量`REPLY`会包含所有的输入

- 常用参数

  | -t   | 设置超时秒数，如果超过执行事件用户没有输入，继续向下执行 |
  | ---- | -------------------------------------------------------- |
  | -p   | 指定用户输入的提示信息                                   |
  | -a   | 把用户的输入赋值给一个数组，从零开始                     |
  | -n   | 指定只读取若干个字符作为变量值，而不是整行读取           |

- `IFS`变量用来指定分隔符，默认是空格

## 8 条件判断

### 8.1 if结构

```bash
if cd xxx; then 
	rm *; echo '删除成功'
elif cd aaa; then 
	rm *; echo '删除成功'
else 
	echo '删除失败，没有那个目录' 
fi
```

### 8.2 test命令

​	if 接口的判断条件，一般使用test命令，三种写法：

```bash
test expression
[ expression ] 	# [ 是test用符号的写法，后边必须有空格
[[ expression ]] 	# 这种写法支持正则表达式
test -e /tmp/foo.txt 	# 判断文件是否存在
```

- case结构

```bash
read -n 1 -p "Type a character > "
case $REPLY in
  [[:upper:]])    echo "'$REPLY' is upper case." ;;& # ;;&匹配到后继续向下执行, ;;匹配到后退出case
  [[:lower:]])    echo "'$REPLY' is lower case." ;;&
  [[:alpha:]])    echo "'$REPLY' is alphabetic." ;;&
  [[:digit:]])    echo "'$REPLY' is a digit." ;;&
  [[:graph:]])    echo "'$REPLY' is a visible character." ;;&
  [[:punct:]])    echo "'$REPLY' is a punctuation symbol." ;;&
  [[:space:]])    echo "'$REPLY' is a whitespace character." ;;&
  [[:xdigit:]])   echo "'$REPLY' is a hexadecimal digit." ;;&
esac
```

## 9 循环

### 9.1 while 循环

```bash
# 用test命令，如果小于10，等一秒 输出并加一
number=1
while [ $number -lt 10 ]; do
	sleep 1
	echo "Number = $number"
	number=$((number+1))
done
```

### 9.2 until 循环

​	until循环与while循环相反，条件为false时，执行代码块，一旦为true就退出循环

### 9.3 for...in 循环

​	for...in用来遍历列表的每一项

```bash
# 列表可以由通配符产生
for item in *.png; do
	ls -l $item
done
```

### 9.4 for循环

```bash
# 括号内使用变量不用加 $
for ((i=0; i<10; i++)); do
	echo $i
done
```

### 9.5 break, continue

break: 立即终止循环，不再执行接下来的循环；

continue：立即终止本次循环，开始执行下次循环；

### 9.6 select

```bash
select os in window linux android; do
	case $os in
		"window"|"linux")
			echo "computer"
			break
         ;;
         "android")
         	echo "phone"
         	break
         ;;
         *)
          	echo "invalid"
          	break
         ;;
     esac
done
```

## 10 函数

```bash
fn() {}
function fn(){}
```

- 函数中定义的变量默认是全局的，可以用local声明局部变量

## 11 数组

### 11.1 创建数组

```bash
arrName[index]=value	# 逐个赋值 创建
arrName=(val1 val2 ....)	# 一次性创建
arr=([1]=b [0]=a [2]=c)	# 指定每项的位置
images=( *.png )	# 可以使用通配符创建
declare -a arrName	# 使用declare -a 创建一个数组
read -a msg		# 将用户的输入读入一个数组
```

### 11.2 读取数组

- `${arr[i]}` 读取单个元素
- `${arr[@]}` 或 `${arr[*]}` 读取所有元素，如果`${arr[*]}`放在双引号中，所有元素会变成单个字符串

### 11.3 数组长度

- `${#arr[@]}` 或 `${#arr[*]}` 返回数组的长度

### 11.4 提取数组序号

- `${!arr[@]}` 或 `${!arr[*]}` 返回数组成员的序号，即哪些位置是有值的

### 11.5 提取数组成员

- `${arr[@]:1:3}` 返回arr中从下标1开始的三个元素， 如果省略结束位置，默认到最后

### 11.6 追加数组元素

```bash
$ arr=(a b c)
$ arr+=(d f)	# 可以用 += 往数组后边追加元素
$ arr=(aa bb ${arr[@]} dd)  # 也可以用这种方式追加
```

### 11.7 删除数组

`unset arr[2]` 删除数组中一个元素  `unset arrName` 清空整个数组

### 11.8 关联数组

```bash
declare -A colors	# bash新版本支持关联数组，只能用 declare -A 声明
color["red"]="#f00"
echo ${color["red"]}
```

## 12 set, shopt 命令





