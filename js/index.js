$(document).ready(function(){
  $("#company").click(function(){
    if($("#login-organization").is(":visible")){
      $("#login-organization").slideUp("fast");
    }
    if($("#login-government").is(":visible")){
      $("#login-government").slideUp("fast");
    }

    $("#login-company").slideToggle("fast");
    
  });
  $(document).click(function(){
    $("#login-company").slideUp("fast");
    $("#login-organization").slideUp("fast");
    $("#login-government").slideUp("fast");
  });
  // // 第二步： 将某元素的位置设为不可点击；(此部分点击不会触发点击事件)
  $("#company").click(function(){
    event.stopPropagation();
  });
  $("#login-company").click(function(){
    event.stopPropagation();
  });

  $("#organization").click(function(){
    if($("#login-company").is(":visible")){
      $("#login-company").slideUp("fast");
    }
    if($("#login-government").is(":visible")){
      $("#login-government").slideUp("fast");
    }
    $("#login-organization").slideToggle("fast");
  });
  // $(document).click(function(){
  //   $("#login-organization").slideUp("slow");
  // });
  // // 第二步： 将某元素的位置设为不可点击；(此部分点击不会触发点击事件)
  $("#organization").click(function(){
    event.stopPropagation();
  });
  $("#login-organization").click(function(){
    event.stopPropagation();
  });

  $("#government").click(function(){
    if($("#login-company").is(":visible")){
      $("#login-company").slideUp("fast");
    }
    if($("#login-organization").is(":visible")){
      $("#login-organization").slideUp("fast");
    }
    $("#login-government").slideToggle("fast");
  });
  // $(document).click(function(){
  //   $("#login-government").slideUp("slow");
  // });
  // // 第二步： 将某元素的位置设为不可点击；(此部分点击不会触发点击事件)
  $("#government").click(function(){
    event.stopPropagation();
  });
  $("#login-government").click(function(){
    event.stopPropagation();
  });


  
  $("#login-submit").click(function(){
    var comUsername=$("#username").val();
    $.ajax({
      type: "POST",
      url: 'http://120.78.209.65:8888/enterprise/login',
      data: {
        name:comUsername,
        password:$("#password").val()
      },              
      dataType: "json",                               
      success: function (result) {
        if(result.meta.success){
          window.localStorage.setItem("comUsername", comUsername);
          location.href = "company.html";
        }else{
          alert(result.meta.message);
        }
      },
      error:function(){
        alert("网络错误");
      }
    });
  });
  $("#filogin-submit").click(function(){
    if(!window.localStorage){
      console.log("浏览器不支持localstorage");
    }else{
        // var bkName = $("#bankName").val();
        var userName = $("#fiusername").val();
        
        // alert(bkName);
        // window.localStorage.setItem("bankName", bkName);
        window.localStorage.setItem("fiuserName", userName);
        
    } 
    $.ajax({
      type: "POST",
      url: 'http://120.78.209.65:8888/bank/login',  
      data: {
        // bankname:$("#bankName").val(),
        name:$("#fiusername").val(),
        password:$("#fipassword").val()
      },              
      dataType: "json",                               
      success: function (result) {
        
        if(result.meta.success){
          window.location.href = "financialInstitution.html";
        }else{
          alert(result.meta.message);
        }
      },
      error:function(){
        alert("网络错误");
      }
    });
  });
  $("#gologin-submit").click(function(){
    var userName = $("#gousername").val();
    window.localStorage.setItem("gousername", userName);
    $.ajax({
      type: "POST",
      url: 'http://120.78.209.65:8888/government/login',  
      data: {
        name:$("#gousername").val(),
        password:$("#gopassword").val()
      },              
      dataType: "json",                               
      success: function (result) {
        
        if(result.meta.success){
          window.location.href = "government.html";
        }else{
          alert(result.meta.message);
        }
      },
      error:function(){
          alert("网络错误");
      }
    });
  });
  
  $(".apply").click(function(){
    alert("请登录！");
  })
});


