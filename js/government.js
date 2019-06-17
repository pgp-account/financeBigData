$(document).ready(function(){    
    var userName = window.localStorage.getItem("fiuserName");
    $(".goUsername").html(userName);
    //var enterpriseNamArr = new Array();
    //---------------获取未评级的企业名-----------------
    $("#ENameReq").click(function(){
        $("#tbody").html("");
        $.get("http://120.78.209.65:8888/government/enterpriseNameReq", function(result){
            if(result.meta.success){   
                if(result.data.length == 0){
                    alert("无未评级企业信息！");
                }else{
                    for(var i= 0;i<result.data.length;i++){
                        var enterpriseName = result.data[i];
                        var esN = '<tr><td>'+enterpriseName
                        +'</td><td><select><option>1-A</option><option>2-AA</option><option>3-AAA</option></select></td><td><button  type="button" class="btn btn-default rate" >提交</button></td></tr>';
                        $("#tbody").append(esN);
                    }
                }          
            }else{
                alert("无法访问！");
            }
        }); 
    });

    //----------------点击评级，成功后删除该企业--------------------
    $("#tbody").on("click",".rate",function(){
        var enterpriseName = $(this).parent().prev().prev().text();
        var creditRating = $(this).parent().prev().children(":first").val().substr(0,1);
        var deleteenterprise = $(this).parent().parent();
        $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/government/creditRating",
            data:{
                enterpriseName:enterpriseName,
                creditRating:creditRating
            },
            success:function(result){
                alert(result.meta.message);
                deleteenterprise.remove();
                
            },
            error:function(){
                alert("无法访问！");
            }
        });

    });

    //------------发布政策---------------
    $(".release1").click(function(){
        alert("发布成功！");
        var form = $(".form-horizontal");
        $(form)[0].reset();
    });
    //------------发布新闻---------------
    $(".release2").click(function(){
        alert("发布成功！");
        var form = $(".form-horizontal");
        $(form)[1].reset();
    });
    //------------退出-------------------
    $(".exit").click(function(){ 
        alert("退出登录！");
        window.localStorage.clear();
        window.location.href = "index.html";
    });
});