var outline = {
chapter : [
	{
		name : '这里是第1章标题',
		section : [
			{
				name : '这里是第1.1节标题',
				sub : [
					'这里是第1.1.1节标题',
					'这里是第1.1.2节标题'	
				],
			},
			{
				name : '这里是第1.2节标题',
				sub : [
					'这里是第1.2.1节标题',
					'这里是第1.2.2节标题'	
				],
			}
		],
	},
	{
		name : '这里是第2章标题',
		section : [
			{
				name : '这里是第2.1节标题',
				sub : [
					'这里是第2.1.1节标题',
					'这里是第2.1.2节标题'	
				],
			},
			{
				name : '这里是第2.2节标题',
				sub : [
					'这里是第2.2.1节标题',
					'这里是第2.2.2节标题'	
				],
			}
		],
	}
]
}

var str = "大纲：{\n"; 
for(var i = 0; i < outline.chapter.length; i++) 
{ 
if(outline.chapter.section != null) 
{ 
str += outline.chapter.name + "{"; 
for(var j = 0; j < outline.chapter.section .length; j++) 
{ 
if(outline.chapter.section [j] != null) 
{ 
str += outline.chapter.section [j].name + "{"; 
for(var k = 0; k < outline.chapter.section [j].sub.length; k++) 
{ 
str += outline.chapter.section [j].sub[k]; 
if(k != outline.chapter.section [j].sub.length - 1) 
{ 
str += ","; 
} 
} 
str += "}"; 
} 
} 
str += "}\n"; 
} 
} 
str += "}"; 
alert(str); 

