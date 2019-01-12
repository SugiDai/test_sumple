$(function () {

    /**
     * 和暦マスタファイル取得 関数
     */
    function getDataJson() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                dataType: "json",
                url: "./data.json"
            })
            .done(function (ret) {
                resolve(ret);
            })
            .fail(function (err) {
                reject(err)
            });
        });
    }

    /**
     * 元号年リスト作成(和暦) 関数
     ＊@param {＊} dataJson 和暦マスタ
     */
    function getYearList(dataJson) {

        /**
         * 最大年取得 関数
         * 現在年と元号終了年を比較して、現在年以降の場合は現在年の和暦を返す。
         * @param {*} toYY 終了年(和暦)
         * @param {*} start 元号開始年(西暦)
         */
        function getMaxYY(toYY, start) {
            // 現在年西暦
            var nowYear = new Date().getFullYear();
            // 最終年西暦
            var endYear = parseInt(start) + parseInt(toYY) - 1;

            var maxYY = toYY;
            if (nowYear < endYear) {
                maxYY = nowYear - parseInt(start) + 1;
            }
            return maxYY;
        }

        /**
         * 元号毎の年リスト作成 関数
         ＊@param {＊} eraName 年号
         ＊@param {＊} fromYY　和暦開始(YY)
         ＊@param {＊} toYY 和暦終了(YY)
         ＊@param {＊} start 和暦開始西暦(YYYY)
         */
        function getYearListElement(eraName, fromYY, toYY, start) {
            var maxYY = getMaxYY(toYY, start);
            var yyList = [];
            for (var i = fromYY; i <= maxYY; i++) {
                yyList.push(eraName + String(i))
            }
            return yyList;
        }

        var rtList = [];
        dataJson.map(function (element) {
            rtList = rtList.concat(getYearListElement(element.eraName, element.fromYY, element.toYY, element.start));
        });
        return rtList;
    }


    /**
     * 選択年月チェック関数
     * @param {*} tgYear 選択和暦年
     * @param {*} tgMonth  選択月
     * @param {*} dataJson マスタ情報
     */
    function validYearMonth(tgYear, tgMonth, dataJson) {

        /**
         * 選択年チェック関数
         */
        function validYear() {
            selectYearData = getYearList(dataJson)
            if (selectYearData.indexOf(tgYear) == -1) {
                return false;
            }
            return true;
        }

        /**
         * 選択月チェック関数
         */
        function validMonth() {
            // 整数チェック
            if (!isFinite(tgMonth)) {
                return false;
            }
            // 1~12チェック
            if (parseInt(tgMonth) < 1 || parseInt(tgMonth) > 12) {
                return false;
            }
            // 元号最終年の場合、最終月チェック
            return dataJson.every(function (element) {
                var maxYY = element.eraName + element.toYY
                if (maxYY == tgYear) {
                    if (parseInt(tgMonth) > element.toMM) {
                        return false;
                    }
                }
                return true;
            });
        }


        // 年チェック実行
        if (!validYear()) {
            return false;
        }
        // 月チェック実行
        if (!validMonth()) {
            return false;
        }
        return true;
    }


    // ****************実行テスト
    async function mainTest() {

        // マスタ情報取得
        dataJson = await getDataJson();

        // 年情報取得
        var selectYearData = getYearList(dataJson);

        selectYearData.forEach((data) => { console.log(data) });

        // 選択肢バリデーション
        var tgYear = "平成30";
        var tgMonth = "12";
        var rtBoolean = validYearMonth(tgYear, tgMonth, dataJson)
        console.log(rtBoolean);
    }

    mainTest();

});