/*  
############################################################
# by PoodleMaster
############################################################
*/

  //---------------------------------------------------------------------------
  // Execボタン押下イベント
  //---------------------------------------------------------------------------
    function exec_button() {

    document.getElementById('exec').disabled = true;
    $('#ResultImg').css( { 'width' : '200' });
    $('#exec').css( { 'cursor' : 'wait' });
//  wait_pic = 'static/wait.gif?' + (new Date()).getTime()
    wait_pic = 'static/wait.gif'
    document.getElementById('ResultImg').src = wait_pic
    const pic = document.getElementById('previewtImg').src;
//  console.log(pic);

    // JQueryによるPOST処理
    // javascript→pythonへPNGデータ転送
    var textData = JSON.stringify({'b64_pic':pic});
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
        var response = JSON.parse(data.ResultSet);
//      console.log(response);

        $('#ResultImg').css( { 'width' : '300' });
        $('#exec').css( { 'cursor' : 'no-drop' });
        document.getElementById('ResultImg').src = response.result_pic;
        document.getElementById('link').href = response.result_pic;
        document.getElementById('link').download = 'download.png';
        document.getElementById('link').innerHTML = "Click to Download!!";
//      console.log(response.result_pic);

        var okng = response.result_okng;
//      console.log(okng);
      }
    });
  }

  //---------------------------------------------------------------------------
  // ファイルが選択されたときの処理
  //---------------------------------------------------------------------------
  const file_select = document.getElementById('file_select');

  // ファイル選択 or キャンセルで実行される
  const handleFileSelect = () => {
    const files = file_select.files;
    const freader = new FileReader();

    // ファイルが読み込まれたときに実行する
    freader.onload = function (e) {
      const imageUrl = e.target.result;
      document.getElementById('previewtImg').src = imageUrl;
      document.getElementById('ResultImg').src = '';
      document.getElementById('link').href = '';
      document.getElementById('link').download = '';
      document.getElementById('link').innerHTML = '';
      document.getElementById('exec').disabled = false;
      $('#exec').css( { 'cursor' : 'pointer' });
//    console.log(imageUrl);
    }

    // ファイルが読み込み
    if (files.length > 0) {
      freader.readAsDataURL(files[0]);
    }
  }

  // イベント登録
  file_select.addEventListener('change', handleFileSelect);
  $('#exec').css( { 'cursor' : 'no-drop' });
