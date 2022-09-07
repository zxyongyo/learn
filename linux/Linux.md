# Linux

## 1 Linux的目录结构

1.  root : 该目录为系统管理员目录，root是具有超级权限的用户。

2. **bin ->usr/bin** : 存放系统预装的可执行程序，这里存放的可执行文件可以在系统的任何目录下执行。

3. usr是linux的系统资源目录，里边存放的都是一些系统可执行文件或者系统以来的一些文件库。

4. **usr/local/bin**：存放用户自己的可执行文件，同样这里存放的可执行文件可以在系统的任何目录下执行。

5. lib->usr/lib: 这个目录存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件，几乎所有的应用程序都需要用到这些共享库。

6. boot : 这个目录存放启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。

7. dev: dev是Device(设备)的缩写, 该目录下存放的是Linux的外部设备，Linux中的设备也是以文件的形式存在。

8. **etc**: 这个目录存放所有的系统管理所需要的配置文件。

9. **home**：用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名以用户的账号命名，叫作用户的根目录；用户登录以后，默认打开自己的根目录。

10. var : 这个目录存放着在不断扩充着的东西，我们习惯将那些经常被修改的文件存放在该目录下，比如运行的各种日志文件。

11. mnt : 系统提供该目录是为了让用户临时挂载别的文件系统，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容

12. **opt**: 这是给linux额外安装软件所存放的目录。比如你安装一个Oracle数据库则就可以放到这个目录下，默认为空。

13. tmp: 这个目录是用来存放一些临时文件的。

## 2 linux 系统管理

### 2.1 vi 和 vim 的使用

- vim是vi的增强版，比vi更容易使用。vi的命令几乎全部都可以在vim上使用。

#### 2.1.1 vim 三种常见模式

**一般模式**: 以vi/vim 命令打开一个档案就直接进入一般模式了(这是默认的模式)。在这个模式中，你可以使用『上下左右』按键来移动光标，你可以使用『删除字符』或『删除整行』快捷键来处理档案内容，也可以使用『复制、贴上』快捷键来处理你的文件数据。

**编辑模式**：按下i, I, o, O, a, A, r, R等任何一个字母之后才会进入编辑模式, 一般来说按i即可.

**命令行模式：**在这个模式当中，可以提供你相关指令，完成读取、存盘、替换、离开vim 、显示行号等的动作则是在此模式中达成的 ！

#### 2.1.2 vim 常用快捷键

1. 一般模式拷贝当前行(yy) , 拷贝当前行向下的5行(5yy)，并粘贴(p)。

2. 一般模式删除当前行(dd) , 删除当前行向下的5行(5dd)。

3. 一般模式下，在文件中查找某个单词，[命令模式下：(/关键字)，回车查找, 输入(n) 就是查找下一个]。

4. 一般模式下，使用快捷键到达文档的最首行[gg]和最末行[G]。

5. 一般模式下，在一个文件中输入"xxxx" ,然后又撤销这个动作(u)。

6. 一般模式下，并将光标移动到10行shift+g

   第一步：输入10

   第二步：输入shift+g

   第三步：回车

7. 命令行模式下，设置文件的行号，取消文件的行号.[命令行下(: set nu) 和(:set nonu)]。

### 2.2 用户管理

#### 2.2.1 添加用户

- useradd [参数] 用户名
- useradd -d /home/zs zhangsan：创建一个账号zhangsan，并指定目录/zs

- passwd zhangsan：给zhangsan设置密码

#### 2.2.2 删除用户

- userdel [参数] 用户名
- userdel -r zhangsan：删除用户zhangsan，并把张三的主目录也删除

#### 2.2.3 查询用户信息

- id zhangsan：查看用户zhangsan的信息

#### 2.2.4 切换用户

- su zhangsan：切换用户为zhangsan； exit命令可以回到原来的用户

### 2.3 组管理

- Linux的组类似于角色，系统可以对有共性的多个用户进行统一的管理。每一个用户都至少属于一个组，创建用户时如果不指定组，会默认创建一个跟用户名相同的组，并且把新创建的用户分配到组中

#### 2.3.1 添加组

- groupadd xxx：创建一个组 xxx

#### 2.3.2 删除组

- groupdel xxx：删除组 xxx

#### 2.3.3 添加用户时指定组

- useradd -g dev zhangsan：添加用户zhangsan，并指定属于组dev

#### 2.3.4 将用户 添加/移除 到组

- gpasswd -a / -d zhangsan dev：将用户张三，添加到组dev / 从dev组移除

## 3 Linux 系统操作

- shutdown now：立即关机
- shutdown -h 1：1小时后关机
- shutdown -r now：立即重启
- reboot：立即重启
- sync：把内存的数据同步到硬盘

## 4 linux 实际操作

### 4.1 帮助指令

- man [命令或配置文件] ：获得帮助手册上的信息
- help [命令] ： 获得命令内置的帮助信息

### 4.2 文件目录指令

- pwd ：显示当前目录

- ls [选项] [目录或是文件]  ： 查看文件或目录

  -a ：显示当前目录所有的文件和目录，包括隐藏的。

   -l ：以列表的方式显示信息，相当于ll

- mkdir [选项] 要创建的目录  ： 创建一个目录

  rmdir ：删除一个非空目录

  -p ：创建多级目录

- touch 文件名称列表  ： 创建一个或多个文件

- cp [选项] source dest ： 复制文件或目录

  -r ： 递归复制整个目录

  > 拷贝时，cp指令前带上\，在有冲突时强制覆盖，否则需要一 一确认。

- rm [选项] 要删除的文件或目录 ： 删除一个文件或目录

  -r ： 递归删除整个目录

  -f ： 强制删除不提示

- mv oldFileName newFilename : 文件重命名

  mv /test/movefile  /targetFolder : 移动文件

### 4.3 查看文件

- cat [选项] 要查看的文件名 ： 查看文件内容

  -n ： 显示行号

- more 要查看的文件名：以全屏方式按页显示文本文件的内容

  快捷键：space：向下翻一页； enter：向下翻一行； q：立即离开more；

  ​			ctrl+f：向下滚一屏；ctrl+b：返回上一屏；=： 输出当前行的行号；:f ：输出文件名和当前行 的行号

- less 要查看的文件名：跟more类似，按需加载内容，对大文件效率更高

  space：向下翻动一页； [pagedown]：向下翻动一页；[pageup]：向上翻动一页；

  /字符：向下搜索字符， n:向下查找； N：向上查找；

  ？字符：向上搜索字符，n:向下查找； N：向上查找；

- head 文件 ：查看文件头10行内容； -n ：查看n行

- tail 文件 ：查看文件尾10行内容； -n ：查看n行

- 查看命令 \> 目标文件  ：将前一个查看命令中的结果覆盖写入目标文件中，目标文件不存在自动创建。

  查看命令 >> 目标文件 ： 追加写入

### 4.4 时间日期

- date ：显示当前时间

  date +%Y ：显示当前年份

  date +%m ：显示当前月份

  date +%d ：显示当前是那一天

  date  "+%Y-%m-%d %H:%M:%S" ：显示年月日时分秒

  date -s ：字符串时间

- cal [选项] ：显示日历

### 4.5 查询搜索指令

- find [搜索范围] [选项] 

  -name ： 按名称查找，支持通配符。

  -user ： 按用户名查找

  -size ： 按文件大小查找

- grep [选项] 查找的源文件内容  ：过滤查找

  -n ：显示匹配行和行号

  -i ：忽略大小写

  > 管道符 “ | ”，表示将前一个命令的处理结果输出传递给后面的命令处理。

  cat /home/a.txt | grep zxy ：查找 /home/a.txt文件中zxy字符串

### 4.6 压缩和解压缩

- gzip 文件 ：压缩文件，将文件压缩为 X.gz文件存放在原文件所在目录，压缩成功后会把原文件删除，用于压缩单个文件。

  gunzip 文件 ： 解压文件，将解压后的文件放在原压缩文件所在目录，并把原压缩文件删除。

- zip [选项] xxx.zip 要压缩的文件 ： 将指定文件或目录压缩成xxx.zip

  -r ：递归压缩，压缩目录

  unzip [选项] xxx.zip

  -d 目录 ：指定解压后文件的存放目录

- tar [选项] xxx.tar.gz [打包的内容] ：打包或解压文件

  -c：产生.tar.gz打包文件

  -v：显示详细信息

  -f：指定压缩后的文件名

  -z：打包同时压缩

  -x：解压.tar.gz文件

  -C:  指定解压到哪个目录

  > tar -zcvf test.tar.gz a.txt b.md  ：将当前目录下的a.txt , b.md打包压缩成test.tar.gz
  >
  > tar -zxvf test.tar.gz  ：将当前目录下的test.tar.gz解压

### 4.7 组管理

#### 4.7.1 Linux组

- 在Linux中的每个用户必须属于一个组，不能独立于组外，可以改变用户所属组。
- 在Linux中每个文件所有者、所在的组、其它组，也可以改变文件所在组。

- 一般情况下，谁创建了文件，就自然的成为该文件的所有者，默认情况下所有者所在的组也即是文件坐在的组。

- 查看文件所有者 和 所在组 : ls -ahl 文件名 （a-all，h-human，l-list）

#### 4.7.2 修改文件所有者  所在组

- chown 新所有者 文件名
- chown newowner : newgroup file ：同时修改文件的所有者和所在组

- chgrp 新组名 文件名 ：修改文件所在组

  -R 如果是目录则使其下所有文件或目录递归生效

### 4.8 权限管理 - chmod

- 在Linux中，每一个文件和目录都有自己的访问权限，通过文件列表可以查看到。

<img src="C:\Users\12031\AppData\Roaming\Typora\typora-user-images\image-1598924655124.png" align="left" />

#### 4.8.1 RWX权限

- rwx 作用到文件
  1. [ r ] 代表可读（read）：可以读取，查看
  2. [ w ] 代表可写（write）：可以修改，但是不代表可以删除该文件，删除一个文件的前提是对该文件所在的目录有写的权限。
  3. [ x ] 代表可执行（execute）：可以被执行。
- rwx 作用到目录
  1. [ r ] ：可以读取，ls查看目录内容。
  2. [ w ]： 可以修改，目录内创建 删除 重命名
  3. [ x ]：可以进入该目录

#### 4.8.2 权限管理

- 常用参数：**-R ** 对当前目录下所有子文件子目录同时变更 

- 变更文件/目录的权限

  - 第一种方式

  1. chmod u=rwx,g=rx,o=x 文件/目录名

  2. chmod o+w 文件目录名

  3. chmod a-x 文件目录名

     > 说明：u：文件所有者；g：文件所在组用户；o：其它组用户；a：所有用户；
     >
     > ​		=：设置权限；+：增加权限；-：去掉权限；
     >
     > rwx 用数字表示，r=4（即2²）；w=2（即2¹）；x=1（即2⁰）
  
- 实例 

  ```bash
  $ chmod a+w x.txt   # 把x.txt设为所有人可写
  $ chmod 777 x.txt	# 把x.txt设为 -rwxrwxrwx  即所有人可读写执行
  ```

  

## 5 Linux进程管理

​		在Linux中，每个执行的程序（代码）都称为一个进程，每一个进程都分配一个ID，每一个进程都会对应一个父进程。

​		进程有两种运行方式，前台和后台，前台方式是目前用户可以在前台操作的，后台方式是实际在运行，但用户在前台看不见。

​		一般系统的服务都是以后台进程的方式存在，而且都会常驻在系统中。直到关机才结束。

### 5.1 查看系统运行的进程

- ps 参数  ： 查看运行的进程

  -a：显示当前终端下的所有进程信息

  -u：以用户的格式显示进程信息

  -x：显示后台进程运行的参数

  -e：显示所有进程信息

  -f：以全格式显示进程信息

### 5.2 终止进程

- kill 选项 进程ID

  -9 ：表示强制立即终止进程

- killall 进程名称（支持通配符）

### 5.3 服务管理

​		服务是支持Linux运行的一些必要程序，本质上也是进程，叫守护进程。

守护进程通常默默的运行在后台，为应用程序提供必要支撑，比如防火墙等。

#### 5.3.1 服务管理指令

- systemctl [start、stop、restart、reload、status、enable] 服务名称

： 开启、关闭、重启、重新加载、查看服务状态、开机启动

>  systemctl status firewalld.service 查看防火墙状态

## 6 Linux 环境变量 [详细](https://blog.csdn.net/tigerjibo/article/details/8513365)

- linux环境变量文件有：/etc/environment 或 /etc/profile 或 ~/.profile 或 /etc/bash.bashrc 或 ~/.bashrc, 以及~/.bash_profile(一般是用户在自己目录下新建的)，~/.bash_logout.

  1. 在**/etc/profile**文件中添加变量对**所有用户永久生效**，修改后执行`source /etc/profile`立即生效

     ```bash
     # vim /etc/profile
     export text=target	# 设置环境变量
     ```

  2. 在用户目录下的**.bash_profile**文件中增加变量**对单一用户永久生效**;

## 7 变量别名 - alias

-  常用参数：**-p**  列出已经设置的命令别名
-  实例
    ```bash
    $ alias open="xdg-open"	# 设置指令别名 
    ```

- 在终端设置关闭当前终端就失效了，如果想要永久存在可以放到bash的初始化文件 `/etc/bashrc`中

## 8 软链接 硬链接 - ln

- 符号链接（软链接）

  1. 符号链接以路径的形式存在，类似于Windows操作系统中的快捷方式。

  2. 符号链接可以跨文件系统 ，硬链接不可以。

  3. 符号链接可以对一个不存在的文件名进行链接，硬链接不可以。

  4. 符号链接可以对目录进行链接，硬链接不可以。

- 硬链接

  1. 硬链接以文件副本的形式存在，但不占用实际空间。

  2. 硬链接不允许给目录创建硬链接。

  3. 硬链接只有在同一个文件系统中才能创建。

- 常用参数： 

  | -b   | 为每个已存在的目标文件创建备份文件                   |
  | ---- | ---------------------------------------------------- |
  | -d   | 此选项允许“root”用户建立目录的硬链接                 |
  | -f   | 强制创建链接，即使目标文件已经存在                   |
  | -n   | 把指向目录的符号链接视为一个普通文件                 |
  | -i   | 交互模式，若目标文件已经存在，则提示用户确认进行覆盖 |
  | -s   | 对源文件建立符号（软链接）链接，而非硬链接           |
  | -v   | 详细信息模式，输出指令的详细执行过程                 |

- 实例 

  ```bash
  $ ln -sv ./dir/Linux.md ./linux.md  # 创建符号链接
  ```

  

## 9 Linux软件包管理

### 9.1 RPM包管理

 #### 9.1.1 rpm包查询

- rpm -qa ：查询所安装的所有软件包
- rpm -qa|more：分页查询所安装的所有软件包
- rpm -qa|grep xxx：过滤查询安装的指定软件包

#### 9.1.2 rpm包卸载

- rpm -e 选项 软件包名称

  --nodeps  ：表示强制删除，用于被删除的软件包有依赖的情况

#### 9.1.3 rpm包安装

- rpm 选项 rpm包全路径名

  -i (install) ：安装

  -v(verbose) ：提示

  -h(hash) ：进度条

### 9.2 YUM包管理

- Yum 是一个Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器(在公网上)自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。
- yum list [ installed ] | grep xx  ：查询YUM服务器上的 [ 已经安装到本地 ] 软件包
- yum install 包名 ：安装
- yun remove 包名 ： 卸载

### <font color=red>9.3 deb包管理 - dpkg</font> *（Debian package）*

- 常用参数

  | -i   | 安装软件包             |
  | ---- | ---------------------- |
  | -r   | 删除软件包             |
  | -l   | 显示已安装软件包列表   |
  | -L   | 显示于软件包关联的文件 |
  | -c   | 显示软件包内文件列表   |



### 安装anyconnect 连接vpn

115.233.219.154:4330		SevenWang		18244241714

- 下载anyconnect-linux64-4.9.00086-predeploy-k9.tar.gz包

- ｀tar -zxvf anyconnect.....tar.gz  -C /opt/apps｀ 解压

- 进入解压的目录下的vpn目录　执行`sudo ./vpn_install.sh` 

- 找到anyconnect 打开 changesetting 取消最后一项  按提示输入，连接

- 终端连接

  ```bash
  $ /anyconnect/bin/vpn -s connect 115.233.219.154:4330	 # 连接 按提示输入用户名密码
  $ /anyconnect/bin/vpn -s state		# 查看连接状态
  $ /anyconnect/bin/vpn -s stats		# 查看连接的详细信息
  $ /anyconnect/bin/vpn -s disconnect 115.233.219.154:4330	# 断开连接
  ```

- **脚本连接**

  ```bash
  $ vim vpn_info	# 新建一个文件保存连接信息
  	y
  	SevenWang
  	18244241714
  $ vim vpn_connect.sh	# 创建连接脚本
  	#!/bin/bash
  	host="115.233.219.154:4330"
  	/anyconnect/bin/vpn -s < ./vpn_info connect ${host}
  $ chmod +x vpn_connect.sh	# 让脚本可执行
  ```




### 安装node'

- 官网下载tar 用`tar -xvf node-xxxx.tar`解压

- `mv node-xxx ~/Downloads/softwares` 移动到自定义目录

- 建立软链接`ln -s ~/Downloads/softwares/node-v14.16.0-linux-x64/bin/node /usr/local/bin`

- 同样方式建立npm的软链接

- 安装npm淘宝镜像cnpm 

  `npm install -g cnpm --registry=https://registry.npm.taobao.org`

  建立cnpm软链接`sudo ln -s cnpm所在路径/cnpm /usr/local/bin`

### 安装Git

- 安装 `sudo apt-get install git`
- 生成ssh key `ssh-keygen -t rsa -C "邮箱"`

### 安装wine

- **首先安装deepin-wine5: `sudo apt install deepin-wine5`**

- https://bbs.deepin.org/post/201663

### 安装hbuildx

- 官网下载安装包 解压  找到hbuildx.exe 右键打开方式 选择wine
- 插件市场安装node-sass插件  解压到hbuildx安装目录/plugin目录下 修改文件为compile-node-sass 重启hbuildx











