/*
This source is shared under the terms of LGPL 3
www.gnu.org/licenses/lgpl.html

Test git!

You are free to use the code in Commercial or non-commercial projects
*/
	//Set up an associative array
	//The keys represent the framerates
	//The values represent the actual framerate
	var frame_rates = new Array();
	frame_rates["thirty"]=30;
	frame_rates["twentynine"]=29.997;
	frame_rates["twentyfive"]=25;
	frame_rates["twentyfour"]=24;
	frame_rates["twentythree"]=23.98;
	frame_rates["fifteen"]=15;

	//This function finds the framerate based on the 
	//drop down selection
	function getFramerate()
	{
		var frameRateValue = 0;
		//Get a reference to the form id="timeform"
		var theForm = document.forms["timeform"];
	
		//Get a reference to the select id="framerate"
		var selectedFrameRate = theForm.elements["framerate"];
    
		//set framerate value equal to value user chose
		frameRateValue = frame_rates[selectedFrameRate.value];

		// debug
		// console.log('getFramerate processed');

		//finally we return the frame rate value
		return frameRateValue;
	}

	//timecodeToInteger() converts 00:00:00:00 into numbers we can use
	function timecodeToInteger()
	{
		//Get a reference to the form id="timeform"
		var theForm = document.forms["timeform"];
		//Get a reference to the text field id="timecode"
		var inputTimecodeTemp = theForm.elements["timecode"];
		var inputTimecode = inputTimecodeTemp.value;

		//Break up the timecode into h, m, s, f
		timecodeArray = inputTimecode.split(":");
		
		var hours = timecodeArray[0];
		var minutes = timecodeArray[1];
		var seconds = timecodeArray[2];
		var frames = timecodeArray[3];
		
		console.log('Timecode: ' + hours + minutes + seconds + frames);
		
		// divide 1000 by number of frames and round
		var frameRateMod = getFramerate();
		frameRateMod1000 = (1000/frameRateMod);
		//var frameRateRound = Math.pow(frameRateMod1000,2);
		var frameRateRound = Math.round(frameRateMod1000*100)/100;
		console.log('Frames as milliseconds rounded: ' + frameRateRound);

		var timeTemp = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
		console.log('Milliseconds without frames: ' + timeTemp);

		var TotalMilliseconds = timeTemp + (frames * frameRateRound);
		console.log('Total Milliseconds: ' + TotalMilliseconds);
		
		return TotalMilliseconds;
	}

function calculateTotal()
{
    //display the result
    var divobj = document.getElementById('millisecondsfield');
	divobj.style.display='block';
	divobj.innerHTML = "Milliseconds: " + Math.round(timecodeToInteger());
	console.log('------------------');

}

function hideTotal()
{
    var divobj = document.getElementById('millisecondsfield');
    divobj.style.display='none';
}