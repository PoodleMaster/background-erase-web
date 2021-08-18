/*  
############################################################
# Copyright 2021 PoodleMaster. All rights reserved. 
############################################################
*/

  //---------------------------------------------------------------------------
  // 変数
  //---------------------------------------------------------------------------
  // リサイズ用
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.crossOrigin = "Anonymous";

  // 画像送信用
  var send_pic;

  // 画像受信用
  var response;

  // モード用
  var mode = 0;
  var resize_flag = true;


  //---------------------------------------------------------------------------
  // タイトル 押下イベント
  //---------------------------------------------------------------------------
  function author() {
    window.open('https://qiita.com/PoodleMaster');
  }


  //---------------------------------------------------------------------------
  // モード変更 押下イベント
  //---------------------------------------------------------------------------
  function mode_change() {
    mode++;

    resize_flag = true;
    if (mode < 10) {
      document.getElementById('Good').innerHTML = '👍+' + String(mode);
    } else {
      if ((mode % 2) == 0) {
        document.getElementById('Good').innerHTML = '😋';
      } else {
        document.getElementById('Good').innerHTML = '😑';
        resize_flag = false;
      }
    }
    image.onload();
  }


  //---------------------------------------------------------------------------
  // image.onloadイベント (送信画像設定)
  //---------------------------------------------------------------------------
  image.onload = function(){
    var pic        = document.getElementById('previewtImg').src;
    var pic_width  = document.getElementById('previewtImg').naturalWidth;
    var pic_height = document.getElementById('previewtImg').naturalHeight;
//  console.log(pic);
    send_pic = pic;

    var dst_width;
    var dst_height;

    if (resize_flag && ((pic_width > 1024) || (pic_height > 1024))) {
      if (pic_width < pic_height) {
        dst_width  = pic_width * (1024 / pic_height);
        dst_height = 1024;
      } else {
        dst_width  = 1024;
        dst_height = pic_height * (1024 / pic_width);
      }
      canvas.width  = dst_width;
      canvas.height = dst_height;
      ctx.drawImage(image, 0, 0, pic_width, pic_height, 0, 0, dst_width, dst_height);
      send_pic = canvas.toDataURL();
    }
//  console.log(send_pic);

    document.getElementById('exec').disabled = false;
    $('#exec').css( { 'cursor' : 'pointer' });
  }


  //---------------------------------------------------------------------------
  // Execボタン 押下イベント (切り抜き処理開始)
  //---------------------------------------------------------------------------
  function exec_button() {

    document.getElementById('exec').disabled = true;
    $('#ResultImg').css( { 'width' : '200' });
    $('#exec').css( { 'cursor' : 'wait' });
//  wait_pic = 'static/wait.gif?' + (new Date()).getTime();
    wait_pic = 'static/wait.gif';
    document.getElementById('ResultImg').src = wait_pic;
    document.getElementById('link').href       = '';
    document.getElementById('link').download   = '';
    document.getElementById('link').innerHTML  = '';
  }

  //---------------------------------------------------------------------------
  // ResultImgLoadWait loadイベント
  //---------------------------------------------------------------------------
  function ResultImgLoadWait() {

    document.getElementById('ResultImg').removeEventListener('load', ResultImgLoadWait);
    document.getElementById('ResultImg').addEventListener('load', ResultImgLoadResult);

    // JQueryによるPOST処理
    // javascript→pythonへ画像データ転送
    var textData = JSON.stringify({'b64_pic':send_pic});
//  console.log(textData);

    $.ajax({
      type:'POST',
      url:'/output',
      data:textData,
      contentType:'application/json',

      // python→javascriptへデータ返送
      // 非同期通信が成功したら実行される
      success:function(data){

        // 返却jsonデータからparseしてデータ取り出し
        response = JSON.parse(data.ResultSet);
//      console.log(response);
//      console.log(response.result_pic);
//      console.log(response.result_result);

        $('#ResultImg').css( { 'width' : '300' });
        $('#exec').css( { 'cursor' : 'no-drop' });
        document.getElementById('ResultImg').src  = response.result_pic;
      }
    });
  }


  //---------------------------------------------------------------------------
  // ResultImgLoadResult loadイベント
  //---------------------------------------------------------------------------
  function ResultImgLoadResult() {

    document.getElementById('ResultImg').removeEventListener('load', ResultImgLoadResult);
    document.getElementById('ResultImg').addEventListener('load', ResultImgLoadWait);

    document.getElementById('link').href      = response.result_pic;
    document.getElementById('link').download  = 'download.png';
    document.getElementById('link').innerHTML = "Click to Download!!";
  }


  //---------------------------------------------------------------------------
  // ファイル選択処理
  //---------------------------------------------------------------------------
  const file_select = document.getElementById('file_select');

  // ファイル選択 or キャンセルで実行される
  const handleFileSelect = () => {
    const files = file_select.files;
    const freader = new FileReader();

    // ファイルが読み込まれたときに実行する
    freader.onload = function (e) {
      document.getElementById('exec').disabled = true;
      const imageUrl = e.target.result;
      document.getElementById('previewtImg').src = imageUrl;
      document.getElementById('ResultImg').src   = '';
      document.getElementById('link').href       = '';
      document.getElementById('link').download   = '';
      document.getElementById('link').innerHTML  = '';
      image.src = imageUrl;
//    console.log(imageUrl);
    }

    // ファイルが読み込み
    if (files.length > 0) {
      freader.readAsDataURL(files[0]);
    }
  }

  // イベント登録
  file_select.addEventListener('change', handleFileSelect);
  document.getElementById('ResultImg').addEventListener('load', ResultImgLoadWait);
  $('#exec').css( { 'cursor' : 'no-drop' });
