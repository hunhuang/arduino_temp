var fs = require('fs')
,http = require('http'),
socketio = require('socket.io'),
url = require("url"), 
porting=require("serialport")
SerialPort = porting.SerialPort

var socketServer;
var serialPort;
var portName = 'COM5'; //change this to your Arduino port

// handle contains locations to browse to (vote and poll); pathnames.
function startServer(httpServer)
{
	serialListener();
	initSocketIO(httpServer);
}

function initSocketIO(httpServer)
{
	socketServer = socketio.listen(httpServer);
	socketServer.on('connection', function (socket) {
		console.log("user connected");
		socket.emit('onconnection',{});
		
		socket.on('buttonval', function(data) {
			serialPort.write(data + 'E');
		});
		socket.on('sliderval', function(data) {
			serialPort.write(data + 'P');
		});

	});
}

// Listen to serial port
function serialListener()
{
	var receivedData = "";
	serialPort = new SerialPort(portName
		, {
			baudrate: 9600,
			parser: porting.parsers.readline("\n"),
			bufferSize:10
        // defaults for Arduino serial communication
         // dataBits: 8,
         // parity: 'none',
         // stopBits: 1,
         // flowControl: false
     });

	serialPort.on("open", function () {
		console.log('open serial communication');
            serialPort.on('data', function(data) {
        	x=data.toString();
        	mang=x.split(' ');
        	socketServer.emit('update', {vol_array:[parseFloat(mang[0]), parseFloat(mang[1])]});
        });  
        });  
}

exports.start = startServer;