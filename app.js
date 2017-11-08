	run_console = true;
	var memory  = null;
	var slide   = false;
	var number  = 1;
	var robot_start = false;
	var robot_interval;

	var template =  ' <input type="text" onkeypress="enterList(event);" placeholder="Todo" '+ 
				    ' class="form-control" id="my_text" name=""></br>'+
				    ' <button onclick="saveTodo();" '+ 
				    ' class="btn btn-primary" id="my_btn">Save</button>&nbsp<button onclick="_refresh(_myUrl());" '+
				    ' class="btn btn-success" id="my_btn">Refresh</button></br></br><ul class="list-group" '+ 
				    ' id="my_list"> </ul>';
	

	_printTo("disp_content",template);

	_focus("my_text");
	

	_onClick("btn_view",function(){
		if (slide==false)
		{
			if (memory==null)
			{	
				alert("Upzz! There's no content");
				return;
			}
			_printTo("disp_content",memory);
			slide=true;
		}else{
			_printTo("disp_content",template);
			_printTo("my_list",memory);
			_focus("my_text");
			slide=false;
		}
		
	});

	function enterList(e)
	{
		if (e.keyCode==13)
		{
			saveTodo();
		}
	}

	function saveTodo()
	{
		var value = _getValById("my_text");

		if (value==='')
		{
			_focus("my_text");
			return;
		}

		var data_list  = [ number+". "+value ];
		number++;
		_addList("my_list","list-group-item",data_list);

		_clear("my_text");
		_focus("my_text");
		memory = _getContent("my_list");
	}

	function getContent()
	{
		if (memory==null)
		{
			alert("Upzz! There's no content");
			return;
		}
		_writeLog(memory);
		_printTo("output_content",_convertHtmlToAscii(memory));
	}

	function reset()
	{
		_clear("my_list",true);
		memory=null;
		number=1;
	}

	_onClick("btn_robot",function(){
			if (robot_start==false)
			{
				_printTo("btn_robot","Stop");
				robot_interval = setInterval(function(){

					var $data = number+". "+_randomStr(3)+_randomInt(3);
					var data_list  = [ $data ];
					number++;

					_setValue("my_text",$data);
					_setTitle($data+" || Play With Garuda Javascript");

					_addList("my_list","list-group-item",data_list);

					memory = _getContent("my_list");

					robot_start = true;
			    },1000);
			}else{
				robot_start = false;
				clearInterval(robot_interval);
				_printTo("btn_robot","Start");
			}
	});
		