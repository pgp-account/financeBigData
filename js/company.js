//导航栏
var comUsername;
$(document).ready(function(){
	//------------退出-------------------
	$(".exit").click(function(){ 
		alert("退出登录！");
		window.localStorage.clear();
		window.location.href = "index.html";
	});
  comUsername = window.localStorage.getItem("comUsername");
  $(".comUsername").html(comUsername);
    $.ajax({
        type:"POST",
        url:'http://120.78.209.65:8888/enterprise/InformationModification',
        data: {
            socialCode:comUsername
        },
        success: function (data) {
            $(".e_name").html(data.data.enterpriseName);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("网络错误");
        }
    });
	var myDemandItem = $("#my-demand-item").html();
	$("#post-demand").click(function(){
		$(".post-demand").show();
		$(".my-demand").hide();
		$(".my-products").hide();
		$(".message").hide();
		$(".change-password").hide();
		$(".product-details").hide();
		$("#post-demand").addClass("active");
		$("#my-demand,#products,#message,#change-password").removeClass("active");
	});
	$("#my-demand").click(function(){
		$(".my-demand").show();
		$(".post-demand").hide();
		$(".my-products").hide();
		$(".product-details").hide();
		$(".message").hide();
		$(".change-password").hide();
		$("#my-demand").addClass("active");
		$("#post-demand,#products,#message,#change-password").removeClass("active");

		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/checkdemand',
		    data: {
		    	social_code:comUsername
		    },
            success: function (data) {
                $("#my-demand-tbody").html("<tr id=my-demand-item>"+myDemandItem+"</tr>");
                $.each(data.data,function(i,val){
                    $("#my-demand-tbody").append("<tr id=my-demand-item"+i+">"+myDemandItem+"</tr>");
                    $("#my-demand-item"+i).children().eq(0).text(val.enterpriseName);
                    var loanLimit = val.loanLimit;
                    if (loanLimit == "0") {loanLimit="100万及以下";}
                    if (loanLimit == "1") {loanLimit="200万及以下";}
                    if (loanLimit == "2") {loanLimit="300万及以下";}
                    if (loanLimit == "3") {loanLimit="400万及以下";}
                    if (loanLimit == "4") {loanLimit="1000万及以下";}
                    if (loanLimit == "5") {loanLimit="1000万及以上";}
                    $("#my-demand-item"+i).children().eq(1).text(loanLimit);
                    $("#my-demand-item"+i).children().eq(2).text(val.rateLowerLimmit);
                    $("#my-demand-item"+i).children().eq(3).text(val.rateUpperLimmit);
                    $("#my-demand-item"+i).children().eq(4).text(val.loanPeriod);
                    var guaranteeMode = val.guaranteeMode;
                    if (guaranteeMode == "0") { guaranteeMode = "抵押";}
                    if (guaranteeMode == "1") { guaranteeMode = "信保基金";}
                    if (guaranteeMode == "2") { guaranteeMode = "一般保证";}
                    if (guaranteeMode == "3") { guaranteeMode = "信用";}
                    if (guaranteeMode == "4") { guaranteeMode = "实际控制人夫妇提供个人连带担保";}
                    $("#my-demand-item"+i).children().eq(5).text(guaranteeMode);
                    var financingPurposes = val.financingPurposes;
                    if (financingPurposes == "0") { financingPurposes = "企业厂房建设";}
                    if (financingPurposes == "1") { financingPurposes = "购置设备等固定资产";}
                    if (financingPurposes == "2") { financingPurposes = "增资扩产";}
                    if (financingPurposes == "3") { financingPurposes = "融资租赁贷款";}
                    if (financingPurposes == "4") { financingPurposes = "土地整理贷款";}
                    if (financingPurposes == "4") { financingPurposes = "融资租赁贷款";}
                    $("#my-demand-item"+i).children().eq(6).text(financingPurposes);
                    $("#my-demand-item"+i).children().eq(7).text(val.projrctSituation);
                });
            },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });
	});
	$("#products").click(function(){
		$(".my-products").show();
		$(".post-demand").hide();
		$(".my-demand").hide();
		$(".product-details").hide();
		$(".message").hide();
		$(".change-password").hide();
		$("#products").addClass("active");
		$("#post-demand,#my-demand,#message,#change-password").removeClass("active");
	});
	$("#message").click(function(){
		$(".message").show();
		$(".post-demand").hide();
		$(".my-demand").hide();
		$(".product-details").hide();
		$(".my-products").hide();
		$(".change-password").hide();
		$("#message").addClass("active");
		$("#post-demand,#my-demand,#products,#change-password").removeClass("active");

		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/InformationModification',
		    data: {
		    	socialCode:comUsername
		    },                                      
		    success: function (data) {
		        $("#registeredCaptial").val(data.data.registeredCaptial);
		        $("#ownerName").val(data.data.ownerName);
		        $("#street").val(data.data.street);
						$("#region").val(data.data.region);
						$("#establishTime").val(data.data.establishTime.substr(0, 10));
		        $("#ownerPhone").val(data.data.ownerPhone);
		        $("#contactName").val(data.data.contactName);
		        $("#contactPhone").val(data.data.contactPhone);
		        $("#establishAddress").val(data.data.establishAddress);
		        $("#business_scop").val(data.data.businessScop);
		    },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });
	});
	$("#change-password").click(function(){
		$(".change-password").show();
		$(".my-products").hide();
		$(".post-demand").hide();
		$(".my-demand").hide();
		$(".message").hide();
		$("#change-password").addClass("active");
		$("#post-demand,#my-demand,#message,#products").removeClass("active");
	});


	//发布需求
	$("#issue").click(function(){
		var loan_limit = $("#loan_limit").val().substr(0, 1);
		var guarantee_mode = $("#guarantee_mode").val().substr(0, 1);
		var financing_purposes = $("#financing_purposes").val().substr(0, 1);
		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/requirementRelease',
		    data: {
				enterpriseName:$("#e_name").text(),
				financingPurposes:financing_purposes,
				guaranteeMode:guarantee_mode,
				loanLimit:loan_limit,
				loanPeriod:$("#loan_period").val(),
				lowerLimmit:$("#rate_lower_limmit").val(),
				projrctSituation:$("#projrct_situation").val(),
				remark:$("#remark").val(),
		    	socialCode:comUsername,	    	
		        upperLimmit:$("#rate_upper_limmit").val()  
		    },                                      
		    success: function () {
		        alert("发布成功！");
		        window.location.href = "company.html";
		        
		    },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });
	});

	$("#mydemand-form-btn").click(function(){
		alert("查询成功！");
	});

	//企业信息
	$("#confirm").click(function(){
		var region = $("#region").val().substr(0, 1);
		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/InformationModification/post',
		    headers: {'Content-Type':'application/json'},
		    data:  JSON.stringify({
		    	socialCode:comUsername,
		    	enterpriseName:"阿里",
		    	registeredCaptial:$("#registeredCaptial").val(),
		    	ownerName:$("#ownerName").val(),
		        region:region, 
		        street:$("#street").val(),
		        ownerPhone:$("#ownerPhone").val(),
		        contactName:$("#contactName").val(),
		        contactPhone:$("#contactPhone").val(),
		        establishTime:$("#establishTime").val(),
		        establishAddress:$("#establishAddress").val(),
		        fundQuota:5000000,
		        available:5000000,
		        businessScop:$("#business_scop").val()
		    }),                                      
		    success: function () {
		        alert("修改成功！");
		        window.location.href = "company.html";
		    },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });
	});

	//金融产品查询
	$("#products-search").click(function(){
		var productsGuaranteeMode = $("#products-guaranteeMode").val().substr(0, 1);
		var productsInstitutionType = $("#products-institutionType").val().substr(0, 1);
		var productsInternetLoanType = $("#products-internetLoanType").val().substr(0, 1);
		var productsLoanLimit = $("#products-loanLimit").val().substr(0, 1);
		var productProperties = $("#productProperties").val().substr(0, 1);
		if (productsGuaranteeMode == "不") {
			productsGuaranteeMode = "";
		}
		if (productsInstitutionType == "不") {
			productsInstitutionType = "";
		}
		if (productsInternetLoanType == "不") {
			productsInternetLoanType = "";
		}
		if (productsLoanLimit == "不") {
			productsLoanLimit = "";
		}
		if (productProperties == "不") {
			productProperties = "";
		}		

		var productsItem = $("#products-item").html();	

		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/productCheck/'+comUsername,
		    data:{
		    	institutionType:productsInstitutionType,
		    	loanLimit:productsLoanLimit,
		    	loanPeriod:$("#products-loanPeriod").val(),
		    	guaranteeMode:productsGuaranteeMode,
		        internetLoanType:productsInternetLoanType, 
		        productProperties:productProperties
		    },
            success: function (data) {
                if (data.data == null) {
                    alert("无结果！");
                    $(".products-list").html("<div class='products-item' id=products-item>"+productsItem+"</div>");
                }else{
                    alert("查询成功！");
                    //if ($(".products-list").children(".products-item").length != data.data.length+1 ||$(".products-list").children(".products-item").length == 1) {
                    //if ($(".products-list").children(".products-item").length != data.data.length+1 ) {
                    $(".products-list").html("<div class='products-item' id=products-item>"+productsItem+"</div>")
                    //}
                    $.each(data.data,function(i,val){
                        console.log(val);
                        $(".products-list").append("<div class='products-item' id=products-item"+i+">"+productsItem+"</div>");
                        $("#products-item"+i+" h4").html(val.bankName+"-<span>"+val.productName+"</span>");
                        $("#products-item"+i+" em:eq(0)").html(val.rateLowerLimit+"%-"+val.rateUpperLimit+"%");
                        var proloanLimit = val.loanLimit;
                        if (proloanLimit == "0") {proloanLimit="100万及以下";}
                        if (proloanLimit == "1") {proloanLimit="200万及以下";}
                        if (proloanLimit == "2") {proloanLimit="300万及以下";}
                        if (proloanLimit == "3") {proloanLimit="400万及以下";}
                        if (proloanLimit == "4") {proloanLimit="1000万及以下";}
                        if (proloanLimit == "5") {proloanLimit="1000万及以上";}
                        $("#products-item"+i+" em:eq(1)").html(proloanLimit);
                        var proguaranteeMode = val.guaranteeMode;
                        if (proguaranteeMode == "0") { proguaranteeMode = "抵押";}
                        if (proguaranteeMode == "1") { proguaranteeMode = "信保基金";}
                        if (proguaranteeMode == "2") { proguaranteeMode = "一般保证";}
                        if (proguaranteeMode == "3") { proguaranteeMode = "信用";}
                        if (proguaranteeMode == "4") { proguaranteeMode = "实际控制人夫妇提供个人连带担保";}
                        $("#products-item"+i+" em:eq(2)").html(proguaranteeMode);
                        $("#products-item"+i+" em:eq(3)").html(val.loanPeriod);

                    });
                    //};
                }
            },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });
	});

	//修改企业密码
	$("#changeSure").click(function(){
		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/changepassword',
		    data:{
		    	password:$("#newPassword").val(),
		    	username:comUsername
		    },                                      
		    success: function () {
		    	alert("修改成功！");
		    	window.location.href = "company.html";
		    },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });

	});


	//金融产品详情立即申请
	$("#apply-immediately").click(function(){
		var productName=$("#prodetails-productName").html();
		// var productArr = new Array();
		var productList;
		
		$.ajax({
		    type:"POST",
		    url:'http://120.78.209.65:8888/enterprise/productRequest/'+productName,
		    data: {
		    	socialCode:comUsername,
		    	productName:productName
		    },                                      
		    success: function () {
				alert("申请成功！");
				// alert($(".products-item").length);
				for(var i= 0;i<$(".products-item").length;i++){
					var productItem = $(".products-item").find("h4 span").eq(i+1);
					var productList = productItem.text();
					if(productList == productName){
						// alert($(".products-list").eq(i+1).text());
						$(".products-list").find(".products-item").eq(i+1).remove();	
					}
				}
		    },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {  
		    	alert(XMLHttpRequest.status); 
		    	alert(XMLHttpRequest.readyState);
		    	alert(textStatus);
		    }
	    });
	});

	//金融产品详情返回
	$("#return").click(function(){
		$(".my-products").show();
	    $(".product-details").hide();
	});

});

//金融产品申请
function apply(which){
	var productName=$(which).parent().prev().children("h4").children().html();
	var productList = $(which).parent().parent();
	$.ajax({
	    type:"POST",
	    url:'http://120.78.209.65:8888/enterprise/productRequest/'+productName,
	    data: {
	    	socialCode:comUsername,
	    	productName:productName
	    },                                      
	    success: function () {
			alert("申请成功！");
			productList.remove();
	    },
        error: function(XMLHttpRequest, textStatus, errorThrown) {  
	    	alert(XMLHttpRequest.status); 
	    	alert(XMLHttpRequest.readyState);
	    	alert(textStatus);
	    }
    });
};

//金融产品详情查看
function proDetail(which){
	var productName=$(which).parent().prev().children("h4").children().html();
	$.ajax({
	    type:"POST",
	    url:'http://120.78.209.65:8888/enterprise/finacial_productdetai/'+productName,
	    data: {
	    	productName:productName
	    },
        success: function (data) {
            $("#prodetails-headName").html(data.data.bankName+"-<span id='prodetails-productName'>"+data.data.productName+"</span>");
            $("#prodetails-rateLowerLimit").html(data.data.rateLowerLimit);
            $("#prodetails-rateUpperLimit").html(data.data.rateUpperLimit);
            var prodetailspaymentType = data.data.paymentType;
            if (prodetailspaymentType == "0") {prodetailspaymentType="非人民币";}
            if (prodetailspaymentType == "1") {prodetailspaymentType="人民币";}
            $("#prodetails-paymentType").html(prodetailspaymentType);
            var prodetailsloanType = data.data.loanType;
            if (prodetailsloanType == "0") {prodetailsloanType="经营贷款";}
            if (prodetailsloanType == "1") {prodetailsloanType="流动资金贷款";}
            if (prodetailsloanType == "2") {prodetailsloanType="周转贷款";}
            $("#prodetails-loanType").html(prodetailsloanType);
            var prodetailsloanLimit = data.data.loanLimit;
            if (prodetailsloanLimit == "0") {prodetailsloanLimit="100万及以下";}
            if (prodetailsloanLimit == "1") {prodetailsloanLimit="200万及以下";}
            if (prodetailsloanLimit == "2") {prodetailsloanLimit="300万及以下";}
            if (prodetailsloanLimit == "3") {prodetailsloanLimit="400万及以下";}
            if (prodetailsloanLimit == "4") {prodetailsloanLimit="1000万及以下";}
            if (prodetailsloanLimit == "5") {prodetailsloanLimit="1000万及以上";}
            $("#prodetails-loanLimit").html(prodetailsloanLimit);
            $("#prodetails-loanPeriod").html(data.data.loanPeriod);
            var prodetailsguaranteeMode = data.data.guaranteeMode;
            if (prodetailsguaranteeMode == "0") { prodetailsguaranteeMode = "抵押";}
            if (prodetailsguaranteeMode == "1") { prodetailsguaranteeMode = "信保基金";}
            if (prodetailsguaranteeMode == "2") { prodetailsguaranteeMode = "一般保证";}
            if (prodetailsguaranteeMode == "3") { prodetailsguaranteeMode = "信用";}
            if (prodetailsguaranteeMode == "4") { prodetailsguaranteeMode = "实际控制人夫妇提供个人连带担保";}
            $("#prodetails-guaranteeMode").html(prodetailsguaranteeMode);
            $("#prodetails-useArea").html(data.data.useArea);
            $("#prodetails-description").html(data.data.description);
            $(".my-products").hide();
            $(".product-details").show();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {  
	    	alert(XMLHttpRequest.status); 
	    	alert(XMLHttpRequest.readyState);
	    	alert(textStatus);
	    }
	});
	
};
