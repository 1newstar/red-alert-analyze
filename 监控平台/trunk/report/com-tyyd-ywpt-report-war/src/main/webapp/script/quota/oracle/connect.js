function loadConnect(appRoot,dbId,startDate,endDate){
 	//加载主机
    var connects_options = {
        chart: {
            renderTo: 'connect_oracle_quota', 
            type:'spline',
            zoomType: 'xy'
        },
         credits : {
			enabled:false
		},
        //报表名称
        title:{
            text:''
        },
        yAxis: { 
        	min:0, // 定义最小值  
            minPadding: 0.2,   
            maxPadding: 0.2,  
            title: {
                text: '连接数'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        tooltip: {
            formatter: function() {
            	var mydate = new Date(this.x);
            	var year = mydate.getFullYear();
            	var month = parseInt(mydate.getMonth())+1;
            	var day = mydate.getDate();
            	var date = mydate.getHours()+":"+mydate.getMinutes();
            	date = year+"-"+month+"-"+day+" "+date;
        		return date+'<br >'+this.series.name+': '+ (this.y) ;					                  
            }
		},
		plotOptions: {
            area: {
            	allowPointSelect: true,
    		    lineWidth: 0,			
                states: {
                   hover: {			      	   	  
                      lineWidth: 1
                   }
                },
            	marker: {
	                enabled: false,
	 			   radius: 0,
	                states: {
	                   hover: {
	                      enabled: true,
	                      symbol: 'circle',
	                      radius: 2,
	                      lineWidth: 0
	                   }
	                }   
	             }
            },
            pointInterval: 3600000,
            series: {
                cursor: 'pointer',
                events: {
                    click: function(e) {
                        //alert(e.point.id);
                        //location.href = e.point.url;
                        //上面是当前页跳转，如果是要跳出新页面，那就用
                        window.open(appRoot+'/report/stat/oracle/performance/'+e.point.id);
                        //这里的url要后面的data里给出
                        
                    }
                }
            }
        },
        navigation: {
	          menuItemStyle: {
	              fontSize: '10px'
	          }
	      },
        //x轴显示内容
        xAxis: {
            type: 'datetime',
            labels: {
        		overflow: 'justify',
        		formatter:function() {
					var vDate = new Date(this.value);
					return vDate.getHours()+":"+vDate.getMinutes()+":"+vDate.getSeconds();
				}
    		}
        },
        //数据来源   [{},{},{},{}]
        series: [
        	{}
        ]
    };
    
    
    var connects_url =  appRoot+"/report/quota/oracle/data/connect/"+dbId+"/"+startDate+"/"+endDate;
    $.getJSON(connects_url,function(data){
        //报表名称
        connects_options.title.text = data.reportName;
        
        //数据初始化
        var len = data.seriesData.length;
        for(var i=0;i<len;i++){
        	connects_options.series[i] = data.seriesData[i];
        }
      
        new Highcharts.Chart(connects_options);
    });
    
    
    
    
}     			    




