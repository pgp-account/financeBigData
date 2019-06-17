$(document).ready(function(){
    
    var userName = window.localStorage.getItem("fiuserName");
    $(".fiUsername").html(userName);
    $.ajax({
        type : "POST",
        url:"http://120.78.209.65:8888/bank/login/"+userName,
        data:{
            userName :userName
        },
        success:function(result){
            if(!window.localStorage){
                console.log("浏览器不支持localstorage");
            }else{
                var bkName = result.data.bankName;
                window.localStorage.setItem("bankName", bkName);                  
            }
            $("#bankName").text(result.data.bankName);
            $("#bankNum").text(result.data.bankId);
        },
        error:function(){
            alert("错误");
        }
    }); 

    var bankName = window.localStorage.getItem("bankName");
    
    //-----------------产品发布--------------------------------
    $("#release").click(function(){ 
        // var generality =$("#general_product").val().substr(0,1);
        // var guaranteeMode = $("#guarantee_mode").val().substr(0,1);
        // var institutionType = $("#organizationType").val().substr(0,1);
        // var internetLoanType = $("#internetLoanType").val().substr(0,1);
        // var loanLimit = $("#loan_limit").val().substr(0,1);
        // var loanType = $("#loan_category").val().substr(0,1);
        // var paymentType = $("#pay").val().substr(0,1);
        // var productProperties = $("#policy_product").val().substr(0,1);

         
        $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/bank/productRelease",
            data:{
                bankName:bankName,
                description:$("#description").val(),
                fkBankId:$("#bankNum").text(),
                generality:$("#general_product option:selected").val(),
                guaranteeMode:$("#guarantee_mode option:selected").val(),
                institutionType:$("#organizationType option:selected").val(),
                internetLoanType:$("#internetLoanType option:selected").val(),
                loanLimit:$("#loan_limit option:selected").val(),
                loanPeriod:$("#loan_period").val(),
                loanType:$("#loan_category option:selected").val(),
                paymentType:$("#pay option:selected").val(),
                productName:$("#ProductName").val(),
                productProperties:$("#policy_product option:selected").val(),
                rateLowerLimit:$("#rateLowerLimit").val(),
                rateUpperLimit:$("#rateUpperLimit").val(),
                useArea:$("#use_area").val()
            },
            success:function(result){
                alert(result.meta.message);
                var form = $(".form-horizontal");
                $(form)[0].reset();
            },
            error:function(){
                alert("错误");
            }
        });       
    });
    
    //-----------------企业申请--------------------------------
    var productArray = new Array();
    $("#productApply").click(function(){   
          
        //alert(bankName); 
        $(".products-list").html("");
        $(".btn-muted").eq(0).siblings().removeClass("current");
        $(".btn-muted").eq(0).addClass("current");
        $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/bank/productApply",
            data:{
                bankName:bankName
            },
            // 请求发送之前（发送请求前可修改XMLHttpRequest对象的函数，如添加自定义HTTP头。）。
            // beforeSend:function(XMLHttpRequest){
            //     $("#loading").html("<img src='https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%8A%A0%E8%BD%BD%E4%B8%AD&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=1992466295,1145446755&os=4150192825,3836185010&simid=0,0&pn=0&rn=1&di=8250&ln=626&fr=&fmq=1560692862295_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fphotocdn.sohu.com%2F20160127%2Fmp56791937_1453886827459_16.gif&rpstart=0&rpnum=0&adpicid=0&force=undefined' />"); 
            // }, 
            success:function(result){
                if(result.data == null){
                    alert("无结果！")
                }else{
                    // $("#loading").empty();
                    for(var i= 0;i<result.data.length;i++){
                        var ProductName = result.data[i].fkProductName;
                        if($.inArray(ProductName,productArray) < 0){
                            productArray.push(ProductName);
                            $("#productNameSelect").append('<a class="productSelect btn-muted" >'+ProductName+'</a>');
                        } 
                        var productsItem = '<dl class="products-item"><dt><img src="images/bank1.png"></dt><dd><div class="products-title">'
                        +result.data[i].enterpriseName
                        +'</div><div class="products-info"><div class="products-type"><span class="products-type_item"><span>金融产品名称：</span><em class="fkProductName">'
                        +result.data[i].fkProductName
                        +'</em></span><span class="products-type_item"><span>申请时间：</span><em>'
                        +result.data[i].requestTime.substr(0,10)
                        +'</em></span></div><div class="products-action"><button type="button" class="products-btn btn btn-default" >详情</button><button type="button" class="agree-btn btn btn-default" >同意</button></div></div></dd></dl>';

                        $(".products-list").append(productsItem);

                    }
                    
                }
                
            },
            // 请求完成后的回调函数 (请求成功或失败之后均调用)
            complete:function(XMLHttpRequest,textStatus){
                $("#loading").empty();
            }, 
            // 请求失败时调用此函数。
            error:function(XMLHttpRequest,textStatus,errorThrown){
                $("#loading").empty();
                alert("错误");
            } 
        });       
    });

    //根据产品名检索
    $("#productNameSelect").on("click",".productSelect",function(){
        // for(var j=0;j<$(".btn-muted").length;j++){
        //     // alert($(".btn-muted").eq(i).html());
        //     $(".btn-muted").eq(i).removeClass("current");
        // }  
        $(this).siblings().removeClass("current");      
        $(this).addClass("current");
        var productName =  $(this).text();
        for(var i=0;i<$(".fkProductName").length;i++){
            $(".fkProductName").eq(i).parents(".products-item").css("display","block");
            var fkProductName = $(".fkProductName").eq(i).text();
            if(productName != fkProductName){
                $(".fkProductName").eq(i).parents(".products-item").css("display","none");
            }

        }
    });

    //产品名不限时
    $("#productNameSelect").on("click",".productUnlimited",function(){
        // for(var j=0;j<$(".btn-muted").length;j++){
        //     $(".btn-muted").eq(i).removeClass("current");
        // } 
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        
        for(var i=0;i<$(".fkProductName").length;i++){
            $(".fkProductName").eq(i).parents(".products-item").css("display","block");
        }

        
    });

    //----------------------企业详情----------------------------
    $(".products-list").on("click",".products-btn",function(){
        $(".enterpriseApp").css("display","none");
        $("#companyDetail").css("display","block");
        var enterpriseName =  $(this).parents('dd').children('.products-title').html();
        //alert(enterpriseName);
        //window.localStorage.setItem("enterpriseName", enterpriseName);
        //window.location.href = "companyDetail.html";
        $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/bank/enterprieseInfoCkeck",
            data:{
                enterpriseName:enterpriseName	
            },
            success:function(result){
                //alert(result.meta.message);
                var regionArr = ["碑林区","莲湖区","灞桥区","雁塔区","阎良区","未央区","新城区","长安区","临潼区"];
                var region = regionArr[result.data.region];
                $("#enterpriseName").text(result.data.enterpriseName) ;
                $("#socialCode").text(result.data.socialCode) ;
                $("#ownerName").text(result.data.ownerName) ;
                $("#region").text(region) ;
                $("#street").text(result.data.street) ;
                $("#ownerPhone").text(result.data.ownerPhone) ;
                $("#contactName").text(result.data.contactName) ;
                $("#contactPhone").text(result.data.contactPhone) ;
                $("#businessScop").text(result.data.businessScop) ;
    
            },
            error:function(){
                alert("错误");
            }
        });
    });
     $(".return_btn").click(function(){
    // $(".products-list").on("click",".products-btn",function(){
        $(".enterpriseApp").css("display","block");
        $("#companyDetail").css("display","none");
    }) ;

    //---------------申请同意
    $(".products-list").on("click",".agree-btn",function(){
        alert("已同意！");
    });


    // ---------------企业需求----------------------
    
    $("#demandCheck").click(function(){ 
        $("#tbody").html(""); 
        $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/bank/demandCheck",
            data:{
                guaranteeMode:$("#danbao option:selected").val(),
                loanLimit:$("#loanLimit option:selected").val(),
                loanPeriod:$("#loanTime").val(),
                lowerLimit:$("#rate_lower_limmit").val(),
                upperLimit:$("#rate_upper_limmit").val()
            },
            success:function(result){
                
                if(result.meta.success ){
                    if(result.data.length == 0){
                        alert("无符合条件信息！");
                    }else{
                        $("#deResult").css("display", "none");
                        // $("#enterpriseNeed-table").remove("#deResult");
                        for(var i= 0;i<result.data.length;i++){
                            var demandCheck = '<tr><td>'+result.data[i].fkSocialCode
                            +'</td><td>'+result.data[i].enterpriseName
                            +'</td><td>'+result.data[i].loanLimit
                            +'</td><td>'+result.data[i].rateLowerLimmit
                            +'</td><td>'+result.data[i].rateUpperLimmit
                            +'</td><td>'+result.data[i].loanPeriod
                            +'</td><td>'+result.data[i].guaranteeMode
                            +'</td><td>'+result.data[i].financingPurposes
                            +'</td><td>'+result.data[i].projrctSituation
                            +'</td><td>'+result.data[i].remark
                            +'</td></tr>';
                            $("#tbody").append(demandCheck);
                        }
                    }
                    
                }else{
                    alert(result.meta.message);
                    //$("#deResult").css("display", "block");
                }
            },
            error:function(){
                alert("错误");
            }
        });       
    });

    //---------------------退出
    $(".exit").click(function(){ 
        alert("退出登录！");
        window.localStorage.clear();
        window.location.href = "index.html";
    });
});