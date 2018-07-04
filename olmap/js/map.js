/*//获取样式
var styleFunction = function(feature) {
    var geometry = feature.getGeometry();
    //线段样式
    var styles = [
    new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#0044CC'
        }), 
        stroke: new ol.style.Stroke({  
            lineDash:[1,3,5],
            width: 2,  
            color: [255, 0, 0, 1]  
        })  
    })
    ];
    //箭头样式
    geometry.forEachSegment(function(start, end) {
        var arrowLonLat = [(end[0]+start[0])/2,(end[1]+start[1])/2];
        var dx = end[0]- start[0]; 
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(arrowLonLat),
            image: new ol.style.Icon({
                src: "images/arrow.png",
                anchor: [0.75, 0.5],
                rotateWithView: true,
                rotation: -rotation
            })
        }));
    });
    return styles;
};*/

//标记数据集
var source = new ol.source.Vector();

//地图层
var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

//标记点集
var vector = new ol.layer.Vector({
    source: source/*,
    style: styleFunction*/
});

//标记层
var layer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

//起始中心点        
var center = [116.3973900000, 39.9088600000];

//总图层
var map = new ol.Map({
    layers: [raster,vector,layer],
    target: 'map',
    view: new ol.View({
        center: GPStoM(center),
        zoom: 11
    })
});

function MtoGPS(m){
	return ol.proj.transform(m, "EPSG:3857", "EPSG:4326");
}

function GPStoM(gps){
	return ol.proj.transform(gps, "EPSG:4326", "EPSG:3857");
}

function refreshPoint(){
	map.getOverlays().clear();//清空所有点位
	drawStation();
	drawPersonnelAndCar();
	curPoint = null;
}

function drawStation(){
	for (var i = 0; i < stationList.length; i++) {
    	drawPoint(stationList[i], "station");
    }
}

function drawPersonnelAndCar(){
	var pointList = [];
	//获得已选中的，循环
	$.each($("#Personnel input:hidden:checked"), function(i,n){
		var id = $(this).attr("id");
		for (var i = 0; i < pers_car_list.length; i++) {
	    	if(pers_car_list[i].id.indexOf(id) != -1){
	    		pointList.push(pers_car_list[i]);
	    	}
	    }
	});
	$.each($("#Vehicle input:hidden:checked"), function(i,n){
		var id = $(this).attr("id");
		for (var i = 0; i < pers_car_list.length; i++) {
	    	if(pers_car_list[i].id.indexOf(id) != -1 && pointList.indexOf(pers_car_list[i]) == -1){
	    		pointList.push(pers_car_list[i]);
	    	}
	    }
	});
	if(pointList.length > 0){
		for (var i = 0; i < pointList.length; i++) {
			drawPoint(pointList[i], "point_blue");
	    }
	}
}

function drawPoint(pointInfo, type){//[x,y]
	var point = document.createElement("img");
    if(type=="point_blue"){
    	point.onclick = function(){showPointInfo(pointInfo)};
		point.setAttribute("src","images/map/point_blue.gif");
    }else if(type=="point_twinkle"){
    	point.setAttribute("src","images/tag-point.gif");
    	point.setAttribute("width","40px");
    	point.setAttribute("height","40px");
    	point.onclick = function(){closePointInfo(pointInfo)};
    }else if(type=="station"){
    	point.onclick = function(){showPointInfo(pointInfo)};
    	point.setAttribute("src","images/map/station.png");
    }else if(type=="station2"){
    	point.onclick = function(){closePointInfo(pointInfo)};
    	point.setAttribute("src","images/map/station.png");
    }
	var marker = new ol.Overlay({
		id:pointInfo.id,
		position: GPStoM([pointInfo.longitude, pointInfo.latitude]),
        //positioning: "center-center",
        element: point,
        stopEvent: true //当前元素上停止地图的事件
    });
	map.addOverlay(marker);
	$(".ol-selectable").addClass("sizeClass");
}

function removeOverlay(id){
	var point = map.getOverlayById(id);
	if(point!=null){
		map.removeOverlay(point);
	}
}



function trajectoryPlay(){
	$(".trackTeplayBox").removeClass("dn bounceOutDown").addClass("bounceInUp");
}

function loadPersonnelAndCarById(id){
	var content = "";
	for (var i = 0; i < pers_car_list.length; i++) {
    	var pers_car = pers_car_list[i];
    	if(pers_car.id == id){
    		var personnel_info = pers_car.personnel_info;
    		var car_info = pers_car.car_info;
    		
    		content = '<div class="pop-tips" ><div class="tips">';
    		content += '<div class="tips-top"></div>';
    		content += '<div class="tips-mid">';
    		content += '<h6>人员信息</h6><h6>车辆信息</h6>';
    		content += '<dl id = "personnel_info">';
    		content += "<dt>编号：" + personnel_info.id + "</dt><dt>姓名：" + personnel_info.name + "</dt><dt>年龄：" + personnel_info.age + "</dt><dt>性别：" + personnel_info.sex + "</dt><dt>电话：" + personnel_info.phone + "</dt><dt>单位：" + personnel_info.company + "</dt><dt>疲劳值：" + personnel_info.tired_value + "</dt>";
    		content += '</dl>';
    		content += '<dl id="car_info">';
    		content += "<dt>车辆编号：" + car_info.id + "</dt><dt>车牌：" + car_info.plate_number + "</dt><dt>所属路线：" + car_info.route + "</dt><dt>发车时间：" + car_info.start_time + "</dt><dt>到达时间：" + car_info.end_time + "</dt><dt>归属单位：" + car_info.company + "</dt><dt>车辆状态：" + car_info.car_state + "</dt>";
    		content += '</dl>';
    		content += '</div>';
    		content += '<div class="tips-end"></div>';
    		content += '</div></div>';
    		content += '<div class="pop-tips" ><div class="tips-methods">';
    		content += '<p></p>';
    		content += '<dl><dd>轨迹回放：<em class="icon-play trackTeplay" onclick="trajectoryPlay()" ></em></dd><dd>视频监控：<em class="icon-arrow"></em></dd><dd>短信：<input type="text" /><em class="icon-arrow"></em></dd><dd>IP电话：<em class="icon-phone-green"></em><em class="icon-phone-red"></em></dd></dl>';
    		content += '</div></div>';
    	}
    }
	return content;
}

function loadStationById(id){
	var content = "";
	for (var i = 0; i < stationList.length; i++) {
    	var station = stationList[i];
    	if(station.id == id){
    		content += '<div><h6>车站信息</h6>';
    		content += "<p>车站编号：" + station.id + "</p><p>车站名称：" + station.name + "</p><p>管理人：" + station.user + "</p><p>电话：" + station.phone + "</p><p>车站描述：" + station.detail + "</p>";
    		content += '</div>';
    	}
    }
	return content;
}



var curPoint = null;//当前信息展示的点位
//单机点位
function showPointInfo(pointInfo){
	if(curPoint!=null){
		removeOverlay(curPoint.id);
		drawPoint(curPoint, curPoint.type);
	}
	removeOverlay(pointInfo.id);
	drawPoint(pointInfo, pointInfo.type=="station"?"station2":"point_twinkle");
	curPoint = pointInfo;
	
	//移动到此点位（中心显示）
	var view = map.getView();
    view.setCenter(GPStoM([pointInfo.longitude, pointInfo.latitude]));
    popup(pointInfo);
}

function closePointInfo(pointInfo){
	if(pointInfo.type=="station"){
		removeOverlay("popupStation");
	}else{
		removeOverlay("popupPoint");
	}
	//重画当前点位
	removeOverlay(pointInfo.id);
	drawPoint(pointInfo, pointInfo.type);
}

//弹出悬浮窗
function popup(pointInfo){
	/*去查询数据，显示不同点位的数据*/
    removeOverlay("popupPoint");
    removeOverlay("popupStation");
	var popupDiv = document.createElement("div");
	var id = "popupStation";
	var divHtml = "";
	if(pointInfo.type=="station"){
		popupDiv.setAttribute("class", "ol-popup");
		divHtml = loadStationById(pointInfo.id);
	}else if(pointInfo.type=="point_blue"){
		id = "popupPoint";
		popupDiv.setAttribute("style", "width:635px;height:145px;");
		divHtml = loadPersonnelAndCarById(pointInfo.id);
	}
	
	var popup = new ol.Overlay({
		id: id,
    	positioning: 'bottom-left',
    	element : popupDiv
    });
    map.addOverlay(popup);
    var element = popup.getElement();
    /*去查询数据，显示不同点位的数据*/
    element.innerHTML = divHtml;
    
    //显示悬浮窗口
    popup.setPosition(GPStoM([pointInfo.longitude, pointInfo.latitude]));
}
/*map.on('singleclick', function(evt) {
	var container = document.getElementById('popupStation');

    var overlay = new ol.Overlay({
      element: container
    });
    map.addOverlay(overlay);
	
	var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));

    container.innerHTML = '<p>You clicked here:</p><code>' + hdms +
        '</code>';
    overlay.setPosition(coordinate);
  });*/
        

       
        

 
