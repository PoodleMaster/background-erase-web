############################################################
# Copyright 2021 PoodleMaster. All rights reserved. 
############################################################
from flask import Flask, request, render_template, jsonify
from rembg.bg import remove
import base64
import json


############################################################
# Flask
############################################################
app = Flask(__name__)


############################################################
# index.html
############################################################
@app.route("/")
def index():
    return render_template('index.html')


############################################################
# Exec.jsからPOSTされたときに動作
############################################################
@app.route('/output', methods=['POST'])
def output():
    # json形式でデータを受け取る
    b64_data = request.json['b64_pic']
#   display(b64_data, "b64_data")

    # base64デコード
    tmpdata = b64_data.split(',')           # base64のヘッダを削除
    bindata = base64.b64decode(tmpdata[1])  # 「data:image/png;base64,～」以降のデータのみをデコード

    # rembgでバックグランドを削除
    contents = remove(bindata,
                      alpha_matting=True,
                      alpha_matting_foreground_threshold=240,
                      alpha_matting_background_threshold=10,
                      alpha_matting_erode_structure_size=10,
                      alpha_matting_base_size=1000 )

    # base64エンコード
    tmpdata = str(base64.b64encode(contents))
#   display(tmpdata, "tmpdata")
    tmpdata = tmpdata[2:-1]  # 「ｂ’～’」の中身だけをエンコード

    # 返却データ設定
    data1 = "data:image/png;base64," + tmpdata
    data2 = "OK"

    return_data = { "result_pic": data1,
                    "result_result": data2,
                  }

#   display(return_data, "return_data")
    return jsonify(ResultSet=json.dumps(return_data))


############################################################
# debug用
############################################################
def display(data, name):
    print(name)
    print(data)
    print(type(data))
    print("")


############################################################
# flask起動
############################################################
if __name__ == '__main__':
    app.run(port=9000, debug=False)
