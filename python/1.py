# encoding:utf-8

# 列表(list)
# arr = ['a',['b1','b2'],'c']
# print(len(arr[1])) 
# print(arr[-2])	# 倒数
# arr.append('d')		# 在末尾添加
# arr.insert(1,'in')		# 在当前索引插入
# arr.pop(1)		# 默认删除末尾，传i删除当前i的v
# arr[1] = 'b'	#替换
# print(arr)

# 元组(tuple)
# arr = ('a', 'b', 'c')		# 定义后 无法修改
# t = ('a', 'b', ['c1', 'c2'])
# t[2][1] = 0
# print(t)

#条件判断
# age = input('type your age')
# if age>18:
# 	print u'老了'
# elif age<8:
# 	print u'小孩'
# else:
# 	print u'年轻'
# a=input('brith:')
# brith=int(a)
# if a<2000:
# 	print u'00前'
# else:
# 	print u'00后'
# h=input('hight:')
# w=input('weight:')
# bmi=w/(h*h)
# if bmi< 18.5:
# 	print u'过轻'
# elif bmi>18.5 and bmi<25:
# 	print u'正常'
# elif bmi>25 and bmi<28:
# 	print u'过重'
# elif bmi>28 and bmi<32:
# 	print u'肥胖'
# else:
# 	print u'严重肥胖'

#循环
# names = ['wang', 'lee', 'zhang']
# for name in names:
# 	print name
# a=list(range(101))		#[0-100]
# sum=0
# for x in a:
# 	sum=sum+x
# print sum
# sum=0
# n=99
# while n>0:
# 	sum+=n
# 	n-=2
# print sum
# L = ['Bart', 'Lisa', 'Adam']
# for x in L:
# 	print 'hello',x
#break  continue
# n=0
# while n<100:
# 	n+=1
# 	if n%2 != 0:
# 		continue
# 	if n>10:
# 		break
# 	print n
# print 'end'
#！
# n=123456789
# while True:
# 	n*=3
# 	print n

#dict 和 set
# 和list比较，dict有以下几个特点：
# 1.查找和插入的速度极快，不会随着key的增加而变慢；
# 2.需要占用大量的内存，内存浪费多。

# 而list相反：
# 1.查找和插入的时间随着元素的增加而增加；
# 2.占用空间小，浪费内存很少。
# d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
# d['Adam'] = 67
# 'Bob' in d 		#true
# a = d.get('Thomas')
# print a
#set
# s = set([1, 2, 2, 3])		#重复的元素会被自动过滤掉
# s1 = set([2, 3, 4])
# s.add(4)
# s.remove(2)
# print s
# a = s & s1		#2,3
# b = s | s1		#1,2,3,4
# print b

#str是不变对象，而list是可变对象。
a = ['c','a','b']
a.sort()
print a 	#['a', 'b', 'c']
b = 'abc'
c = b.replace('a', 'A')		#'Abc'
print b 		#'abc'