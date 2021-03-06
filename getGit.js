const url = require('url')
const client = require('cheerio-httpcli')
const user_url = "https://github.com/"
// user_url은 추후에 입력받게 할 예정 
// 테스트는 링크로 진행하였지만 실제는 계정만 검색 가능할 수 있도록 할 예정입니다.
const log = console.log

log("getGit페이지가 실행되기는 합니다.")

// 실질적으로 크롤링 하는 부분
const functionCall = async function gitCrawling(nickName) {
    const crawlData = {
        todayData: "",
        yearData: ""
    }
    // url 에 유저 닉네임이 없을 경우 입력을 요청하는 함수

    // 요청에 대한 응답이 돌아왔을때 유저 닉네임을 링크로 추가 시키는 함수
    function changeUrl(url, name) {
        returnUrl = url + '/' + name;
        return returnUrl;
    }
    let crawlUrl = changeUrl(user_url, nickName)
    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();
        log(yyyy + '-' + (mm[1] ? mm + '-' : '0' + mm[0] + '-') + (dd[1] ? dd : '0' + dd[0]))
        return yyyy + '-' + (mm[1] ? mm + '-' : '0' + mm[0] + '-') + (dd[1] ? dd : '0' + dd[0]);
    }
    const today = (new Date()).yyyymmdd()
    // yyyy-mm-dd 형태로 오늘을 저장

    // 입력한 url 을 통해 접속하여 데이터를 스크래핑해옴
    client.fetch(crawlUrl, await function (err, $, res) {
        if (err) {
            log(err)
            return
        }
        // parseInt를 통해 int 형의 자료형의 데이터만 가져온다.
        crawlData.todayData = parseInt($(`[data-date=${today}]`)[0]['attribs']['data-count'])
        crawlData.yearData = parseInt($('div.js-yearly-contributions').children('div.position-relative').children('h2').text())
        log("Today Commit : ",crawlData.todayData)
        log("Year Commit : ",crawlData.yearData)
    });

    log('크롤링 진행중 입니다.....(인터넷 속도가 느리면 실패할 수도 있습니다.)')
    return crawlData;
}

// git 함수 실행
// let data = gitCrawling()
// checkUrl("https://github.com/9992")
// checkUrl("https://github.com/")

module.exports = functionCall;
// gitCrawling 내부에서 USERNAME CHECK 할 수 있도록 검색해야함
// 검색 이후 외부 웹 페이지와 연동해 줄 수 있도록 해야함 -> (해당부분 검색해야함)