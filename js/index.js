var date_object = {
  "positionCountMontn": {
    "month": [
      "2023-01",
      "2022-12",
      "2022-11",
      "2022-10",
      "2022-09",
      "2022-08",
      "2022-07",
      "2022-06",
      "2022-05",
      "2022-04",
      "2022-03",
      "2022-02"
    ],
    "count": [
      "1",
      "1144",
      "6554",
      "1144",
      "1144",
      "0",
      "111",
      "0",
      "54454",
      "0",
      "1224",
      "4755"
    ]
  }
}

var month = date_object.positionCountMontn.month
var count = date_object.positionCountMontn.count

createMonthLineChart(month,count)

function createMonthLineChart(month,count) {
  var chartX = document.createElement('div')
  chartX.setAttribute("class", "chartX")
  // 总数
  var result = 0
  var result_max = 0

  for (let i = 0; i < count.length; i++) {
    result_max = Math.max(result_max, count[i])
    result += parseInt(count[i])
  }



  for (let i = month.length - 1; i >= 0; i--) {
    if (i < 10) {
      const el_month = month[i]
      const el_count = parseInt(count[i])
      // 数量/总数*100%
      var percentage = (el_count / result_max * 100).toFixed(0)

      if (percentage < 1) {
        if (el_count > 0) {
          percentage = 1
        }
      }

      var dot = document.createElement('div')
      dot.setAttribute("class", "dot")
      var result_bar = document.createElement('div')
      result_bar.setAttribute("class", "result-bar")
      result_bar.style.height = percentage + "%"
      result_bar.appendChild(dot)

      var result_bg = document.createElement('div')
      result_bg.setAttribute("class", "result-bg")
      // result_bg.style.width = calc((100% - 16 * 13) / 12)
      result_bg.setAttribute("data-month", el_month);
      result_bg.appendChild(result_bar)

      chartX.appendChild(result_bg)
    }

  }

  var str = result_max
  var cahr = result_max;
  for (let i = 0; i < 5; i++) {
    cahr = (cahr * 0.2).toFixed(0)
    if (i < 4) {
      str += "\n" + cahr
    } else {
      str += "\n" + 0
    }
  }
  chartX.setAttribute("data-beforeData", str)
  document.body.appendChild(chartX)

  const bars = document.querySelectorAll('.result-bar .dot')
  bars.forEach((bar, index) => {
    const nextBar = bars[index + 1]
    if (!nextBar) {
      return
    }
    let elLine = bar.querySelector('i')
    if (!elLine) {
      elLine = document.createElement('i')
      elLine.setAttribute('line', '')
      bar.appendChild(elLine)
    }
    // 计算线段长度和旋转弧度
    let boundThis = bar.getBoundingClientRect(),
      boundNext = nextBar.getBoundingClientRect(),
      x1 = boundThis.left,
      y1 = boundThis.top,
      x2 = boundNext.left,
      y2 = boundNext.top,
      distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)),
      radius = Math.atan((y2 - y1) / (x2 - x1))
    // console.log(distance, radius)
    elLine.style.width = `${distance}px`
    elLine.style.transform = `rotate(${radius}rad)`
  })
}