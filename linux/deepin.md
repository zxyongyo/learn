# deepin

## 1 美化

### 1.1 任务栏

- `sudo apt-get install plank`

### 1.2 窗口

- `sudo apt install systemsettings`

### 1.3 grub 背景 

- 去除默认选项框

  修改 `/boot/grub/themes/deepin/theme.txt`

  找到 `menu_pixmap_style = "menu_*.png"`用 `#`注释掉即可
  
- 关闭启动延时

  `sudo vim /etc/default/grub` 修改最后一行的`GRUB_TIMEOUT=5`改为0

  `sudo update-grub`	更新grub

### 1.4 修改语音包、鼠标指针、软件图标

- 语音包：`/usr/share/sounds/deepin/stereo`	替换这个目录中系统默认的语音包
- 语音包：`/usr/share/icons/` 
- 语音包：`/usr/share/icons/`	

### 1.5 提升音质

- 安装三个包 `sudo apt install jackd pulseaudio-module-jack caps`

### 1.6 修改命令提示符样式 显示git分支

修改`~/.bashrc`在最下边添加一下代码

```bash
function git_branch {
   branch="`git branch 2>/dev/null | grep "^\*" | sed -e "s/^\*\ //"`"
   if [ "${branch}" != "" ];then
       if [ "${branch}" = "(no branch)" ];then
           branch="(`git rev-parse --short HEAD`...)"
       fi
       echo " ($branch)"
   fi
}
export PS1="\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$(git_branch)\[\033[00m\]\n\$ "
```











