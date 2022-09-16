## grid 网格布局

> [CSS Grid 网格布局教程 - 阮一峰](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)


### 容器属性

- `grid-template-columns` - 指定每一列的列宽
- `grid-template-rows` - 指定每一行的行高
- 
- `row-gap` - 设置行与行的间隔（行间距）
- `column-gap` - 设置列与列的间隔（列间距）
- `gap` - 前两个属性的缩写形式  `gap: <row-gap> <column-gap>`
- 
- `grid-template-areas` - 定义区域

- `grid-auto-flow` - 项目放置顺序；默认值是 `row` 表示先行后列， `column`表示先列后行
- 
- `justify-items` - 单元格内容的水平位置
- `align-items` - 单元格内容的垂直位置
- `place-items` - 前两个属性的缩写形式  `place-items: <align-items> <justify-items>`
- 
- `justify-content` - 整个内容区域在容器中的水平位置
- `align-centent` - 整个内容区域在容器中的垂直位置
- `place-centent` - 前两个属性的缩写形式 `place-content: <align-content> <justify-content>`
- `grid-auto-columns` - 设置浏览器自动创建的多余网格的列宽
- `grid-auto-rows` - 设置浏览器自动创建的多余网格的行高

### 项目属性

- `grid-column-start` 左边网格线所在的垂直网格线
- `grid-column-end` 右边网格线所在的垂直网格线
- `grid-column` 前面两个属性的缩写形式 `grid-column: <start-line> / <end-line>`
- `grid-row-start` 上边网格线所在的水平网格线
- `grid-row-end` 下边网格线所在的水平网格线
- `grid-row` 前面两个属性的缩写形式 `grid-row: <start-line> / <end-line>`
- `grid-area` - 指定项目放在哪一个区域，也能用作缩写形式 `grid-area: <row-start> / <column-start> / <row-end> / <column-end>`
- 
- `justify-self` - 设置单元格内容的水平位置
- `align-self` - 设置单元格内容的垂直位置
- `place-self` - 前面两个属性的缩写形式  `place-self: <align-self> <justify-self>`

