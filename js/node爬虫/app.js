const cheerio = require('cheerio')
const axios = require('axios');
const express = require('express')
const app = express()

// 解码字符串
function unescapeString(str){
  if(!str){
      return ''
  }else{
      return unescape(str.replace(/&#x/g,'%u').replace(/;/g,''));
  }
}

function getData(language) {
  let url = "https://www.cnblogs.com/cate/" + (!!language ? '/' + language : '')
  return axios.get(url)
    .then(function (res) {

      let html_string = res.data; // 获取网页内容
      if (html_string) {
        console.log('获取数据成功')
      }
      const $ = cheerio.load(html_string); // 传入页面内容
      let list_array = []; // 用来存放数据
      $('#main #post_list .post_item').each(function (index) {
        let titleLnk = $(this).find('a.titlelnk');
        let itemFoot=$(this).find('.post_item_foot');

        let title = titleLnk.html(); // 标题
        let href = titleLnk.attr('href'); // 链接
        let author=itemFoot.find('a.lightblue').html(); //作者
        let headLogo=$(this).find('.post_item_summary a img').attr('src'); //头像
        let summary=$(this).find('.post_item_summary').text(); //简介
        let postedTime=itemFoot.text().split('发布于 ')[1].substr(0,16); //发布时间
        let readNum=itemFoot.text().split('阅读')[1]; //阅读量
        readNum = readNum.split("(").join("").split(")").join("");

        title = unescapeString(title);
        href = unescapeString(href);
        author = unescapeString(author);
        headLogo = unescapeString(headLogo);
        summary = unescapeString(summary);
        postedTime = unescapeString(postedTime);
        readNum = unescapeString(readNum);

        list_array.push({
          index,
          title,
          href,
          author,
          headLogo,
          summary,
          postedTime,
          readNum
        });
      })
      let result = JSON.stringify(list_array)
      return Promise.resolve(result);
    })
    .catch(function (err) {
      console.log(err)
    })
}

app.get('/', (req, res) => {
  let promise = getData('all'); // 发起抓取
  promise.then(response => {
    res.json(JSON.parse(response)); // 数据返回
  });
})

app.get('/:language', (req, res) => {
  const { language } = req.params;
  let promise = getData(language); // 发起抓取
  promise.then(response => {
      res.json(JSON.parse(response)); // 数据返回
  });
})


app.listen(3000, () => console.log('Listening on port 3000!'))