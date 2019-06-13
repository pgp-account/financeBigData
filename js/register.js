$(document).ready(function(){

    // -----------------金融注册
    
    $("#fi-regist").click(function(){
        // var regin =$("#regin").val().substr(0,1);
        if(!window.localStorage){
            console.log("浏览器不支持localstorage");
        }else{
            var bkName = $("#bankName").val();
            var fkUserName = $("#fkUserName").val()
            // alert(bkName);
            window.localStorage.setItem("bankName", bkName);
            window.localStorage.setItem("fiuserName", fkUserName);
        } 
        if($('#checkbox-id').is(':checked')){            
            $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/bank/register",
            data:{
                bankId:$("#bankId").val(),
                bankName:$("#bankName").val(),
                contactName:$("#contactName").val(),
                contactPhone:$("#contactPhone").val(),
                fkUserName:$("#fkUserName").val(),
                password:$("#loginpwd").val(),
                regin:$("#regin option:selected").val(),
                street:$("#street").val()	
            },
            success:function(result){
                
                var form = $(".form-horizontal");
                $(form)[0].reset();
                if(result.meta.success ){
                    window.location.href = "financialInstitution.html";
                }else{
                    alert(result.meta.message);
                }
                
            }
        });
        }else{
            alert('请认真阅读用户注册协议，并勾选“我接受用户服务协议”');
        }
        
    });

    //    ----------------------------------企业注册
    
    $("#co-regist").click(function(){
        //alert($("#companycode").val().length);
        if($('#checkbox-id').is(':checked')){  
            if($("#companycode").val().length == 18){
                $.ajax({
                    type : "POST",
                    url:"http://120.78.209.65:8888/enterprise/register",
                    data:{
                        available:$("#availableCredit").val(),
                        businessScop:$("#businessScope").val(),
                        contactName:$("#username").val(),
                        contactPhone:$("#phoneno").val(),
                        enterpriseName:$("#pci_namecn").val(),
                        establishAddress:$("#registAddress").val(),
                        establishTime:$("#establishmentTime").val(),
                        fundQuota:$("#fundQuota").val(),
                        ownerName:$("#ownername").val(),
                        ownerPhone:$("#ownerno").val(),
                        password:$("#loginpwd").val(),
                        region:$("#pci_branchno option:selected").val(),
                        registeredCaptial:$("#companyRegisterNo").val(),
                        socialCode:$("#companycode").val(),
                        street:$("#pci_branchno_town").val()
                        
                        
                    },
                    success:function(result){
                        var comUsername = $("#companycode").val();
                        var form = $(".form-horizontal");
                        $(form)[0].reset();
                        if(result.meta.success ){
                            window.localStorage.setItem("comUsername", comUsername);
                            location.href = "company.html";
                        }else{
                            alert(result.meta.message);
                        }
                    },
                    error:function(){
                        alert("错误");
                    }
                });
            }else{
                alert("统一社会信用代码长度不满足18位，请仔细检查后重新填写！");
            }          
            
        }else{
            alert('请认真阅读用户注册协议，并勾选“我接受用户服务协议”');
        }
        
    });
    
    $("#affirmpwd").blur(function(){
        var sepasw = $("#affirmpwd").val();
        var pasw = $("#loginpwd").val();
        if(sepasw != pasw){
            alert("两次密码不同，请确认密码！");
        }
      });

    //    ----------------------------------政府注册
    
    $("#go-regist").click(function(){
        
        if($('#checkbox-id').is(':checked')){            
            $.ajax({
            type : "POST",
            url:"http://120.78.209.65:8888/government/register",
            data:{
                departmentName:$("#departmentName").val(),
                fkUserName:$("#fkUserName").val(),
                govrenmentCode:$("#govrenmentCode").val(),
                password:$("#loginpwd").val(),
                principalName:$("#principalName").val(),
                principalPhone:$("#principalPhone").val()
            },
            success:function(result){
                
                var form = $(".form-horizontal");
                $(form)[0].reset();
                if(result.meta.success ){
                    window.location.href = "government.html";
                }else{
                    alert(result.meta.message);
                }
            },
            error:function(){
                alert("错误");
            }
        });
        }else{
            alert('请认真阅读用户注册协议，并勾选“我接受用户服务协议”');
        }
        
    });
});